/**
 * Erros estruturados da API — contrato inspirado no TabNews/curso.dev.
 *
 * Toda falha que chega ao cliente carrega o mesmo shape:
 *   { name, message, action, status_code, error_id, request_id, error_location_code }
 *
 * `message` e `action` são escritos para o usuário final.
 * Detalhe interno (stack, query, causa) vive apenas em `internalContext`,
 * que NUNCA é serializado na resposta — só vai para o log do servidor.
 */

export type SerializedError = {
  name: string;
  message: string;
  action: string;
  status_code: number;
  error_id: string;
  request_id: string;
  error_location_code: string;
};

type ApiErrorOptions = {
  message: string;
  action: string;
  errorLocationCode: string;
  /** Dado sensível de diagnóstico: fica no log, nunca na resposta HTTP. */
  internalContext?: Record<string, unknown>;
  cause?: unknown;
};

export class ApiError extends Error {
  readonly statusCode: number;
  readonly action: string;
  readonly errorId: string;
  readonly errorLocationCode: string;
  readonly internalContext?: Record<string, unknown>;

  constructor(name: string, statusCode: number, options: ApiErrorOptions) {
    super(options.message);
    this.name = name;
    this.statusCode = statusCode;
    this.action = options.action;
    this.errorLocationCode = options.errorLocationCode;
    this.internalContext = options.internalContext;
    this.errorId = crypto.randomUUID();
    if (options.cause !== undefined) this.cause = options.cause;
  }

  serialize(requestId: string): SerializedError {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
      error_id: this.errorId,
      request_id: requestId,
      error_location_code: this.errorLocationCode,
    };
  }
}

export class ValidationError extends ApiError {
  constructor(options: ApiErrorOptions) {
    super("ValidationError", 400, options);
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(options: ApiErrorOptions) {
    super("MethodNotAllowedError", 405, options);
  }
}

export class TooManyRequestsError extends ApiError {
  readonly retryAfterSeconds: number;

  constructor(options: ApiErrorOptions & { retryAfterSeconds: number }) {
    super("TooManyRequestsError", 429, options);
    this.retryAfterSeconds = options.retryAfterSeconds;
  }
}

export class ServiceError extends ApiError {
  constructor(options: ApiErrorOptions) {
    super("ServiceError", 503, options);
  }
}

export class InternalServerError extends ApiError {
  constructor(options: ApiErrorOptions) {
    super("InternalServerError", 500, options);
  }
}
