import { TooManyRequestsError } from "./errors";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Evita crescimento ilimitado do Map em instâncias de vida longa. */
function evictExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Janela fixa em memória, por instância serverless.
 * Não é proteção contra DDoS distribuído — é freio contra abuso trivial
 * (flood de formulário, script ingênuo). Barreira de borda fica no CDN.
 */
export function enforceRateLimit(options: {
  key: string;
  limit: number;
  windowMs: number;
  errorLocationCode: string;
}): void {
  const now = Date.now();

  if (buckets.size > 5_000) evictExpired(now);

  const bucket = buckets.get(options.key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(options.key, { count: 1, resetAt: now + options.windowMs });
    return;
  }

  bucket.count += 1;

  if (bucket.count > options.limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    throw new TooManyRequestsError({
      message: "Você fez muitas solicitações em pouco tempo.",
      action: `Aguarde ${retryAfterSeconds} segundos e tente novamente.`,
      errorLocationCode: options.errorLocationCode,
      retryAfterSeconds,
      internalContext: { key: options.key, count: bucket.count, limit: options.limit },
    });
  }
}
