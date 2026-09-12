import type { NextApiRequest, NextApiResponse } from "next";

import {
  ApiError,
  InternalServerError,
  MethodNotAllowedError,
  TooManyRequestsError,
  type SerializedError,
} from "./errors";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;
type MethodMap = Partial<Record<"GET" | "POST", Handler>>;

/**
 * Envelope de toda rota /api/v1/*:
 *  - carimba request_id e devolve no header (correlação cliente ↔ log);
 *  - roteia por método (fail-closed: método não declarado = 405);
 *  - converte qualquer exceção em erro estruturado, sem vazar stack para o cliente.
 */
export function createApiHandler(methods: MethodMap): Handler {
  return async (req, res) => {
    const requestId = crypto.randomUUID();
    res.setHeader("x-request-id", requestId);

    const method = req.method as keyof MethodMap | undefined;
    const handler = method ? methods[method] : undefined;

    if (!handler) {
      const allowed = Object.keys(methods);
      res.setHeader("Allow", allowed.join(", "));
      return sendError(
        res,
        requestId,
        new MethodNotAllowedError({
          message: "Método não permitido para este recurso.",
          action: `Utilize um dos métodos suportados: ${allowed.join(", ")}.`,
          errorLocationCode: "HANDLER:CREATE_API_HANDLER:METHOD_NOT_ALLOWED",
        }),
      );
    }

    try {
      await handler(req, res);
    } catch (caught) {
      const error =
        caught instanceof ApiError
          ? caught
          : new InternalServerError({
              message: "Ocorreu um erro inesperado ao processar sua solicitação.",
              action: `Tente novamente. Se persistir, informe o request_id "${requestId}".`,
              errorLocationCode: "HANDLER:CREATE_API_HANDLER:UNCAUGHT_EXCEPTION",
              cause: caught,
            });

      sendError(res, requestId, error);
    }
  };
}

export function sendError(res: NextApiResponse, requestId: string, error: ApiError): void {
  const body: SerializedError = error.serialize(requestId);

  logError(requestId, error);

  if (error instanceof TooManyRequestsError) {
    res.setHeader("Retry-After", String(error.retryAfterSeconds));
  }

  res.status(error.statusCode).json(body);
}

/** Log interno estruturado: é aqui — e só aqui — que detalhe sensível pode aparecer. */
function logError(requestId: string, error: ApiError): void {
  const payload = {
    level: error.statusCode >= 500 ? "error" : "warn",
    request_id: requestId,
    error_id: error.errorId,
    error_location_code: error.errorLocationCode,
    name: error.name,
    status_code: error.statusCode,
    message: error.message,
    internal_context: error.internalContext,
    cause: error.cause instanceof Error ? error.cause.message : error.cause,
    stack: error.statusCode >= 500 ? error.stack : undefined,
  };

  if (error.statusCode >= 500) {
    console.error(JSON.stringify(payload));
  } else {
    console.warn(JSON.stringify(payload));
  }
}

/** IP do cliente atrás do proxy da Vercel. Usado apenas para rate limiting. */
export function getClientIp(req: NextApiRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(",")[0]?.trim();
  return first || req.socket.remoteAddress || "unknown";
}
