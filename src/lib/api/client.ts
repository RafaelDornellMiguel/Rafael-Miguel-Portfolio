import type { SerializedError } from "./errors";

export type ApiFailure = {
  ok: false;
  error: SerializedError;
};

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

const DEFAULT_TIMEOUT_MS = 12_000;

function isSerializedError(value: unknown): value is SerializedError {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as SerializedError).message === "string" &&
    typeof (value as SerializedError).action === "string" &&
    typeof (value as SerializedError).status_code === "number"
  );
}

function networkFailure(message: string, action: string, locationCode: string): ApiFailure {
  return {
    ok: false,
    error: {
      name: "NetworkError",
      message,
      action,
      status_code: 0,
      error_id: "client-side",
      request_id: "client-side",
      error_location_code: locationCode,
    },
  };
}

/**
 * Cliente único da API: todo erro chega ao componente no mesmo shape,
 * venha ele do servidor (estruturado) ou da rede (timeout, offline).
 */
export async function apiFetch<T>(
  path: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<ApiResult<T>> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...requestInit } = init;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(path, {
      ...requestInit,
      signal: controller.signal,
      headers: { Accept: "application/json", ...requestInit.headers },
    });

    const payload: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      return isSerializedError(payload)
        ? { ok: false, error: payload }
        : networkFailure(
            "O servidor respondeu de forma inesperada.",
            "Tente novamente em instantes.",
            "CLIENT:API_FETCH:UNPARSEABLE_ERROR",
          );
    }

    return { ok: true, data: payload as T };
  } catch (error) {
    const aborted = error instanceof DOMException && error.name === "AbortError";
    return networkFailure(
      aborted
        ? "A solicitação demorou mais que o esperado."
        : "Não foi possível conectar ao servidor.",
      "Verifique sua conexão e tente novamente.",
      aborted ? "CLIENT:API_FETCH:TIMEOUT" : "CLIENT:API_FETCH:NETWORK_FAILURE",
    );
  } finally {
    clearTimeout(timer);
  }
}
