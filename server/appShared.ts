/**
 * Espelho das constantes em `shared/` para o Node (tsx/ESM no Windows falhava em `../shared/const`).
 * Mantenha alinhado com shared/const.ts e shared/_core/errors (Forbidden).
 */
export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = "Please login (10001)";
export const NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";

class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const ForbiddenError = (msg: string) => new HttpError(403, msg);
