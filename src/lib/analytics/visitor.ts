import { createHash } from "node:crypto";

/**
 * Pseudônimo de vida curta para contar visitantes únicos sem guardar quem eles são.
 *
 * hash = sha256(ip + user-agent + sal_secreto + dia)[0..31]
 *
 * O sal secreto impede voltar do hash ao IP por força bruta (o espaço de IPs é
 * pequeno; sem sal, um hash de IP é reversível em minutos). A troca diária
 * impede correlacionar o mesmo visitante entre dias — ou seja, não existe
 * histórico de navegação de uma pessoa, por construção.
 */
export function buildVisitorHash(ip: string, userAgent: string): string {
  const salt = process.env.ANALYTICS_SALT;
  if (!salt) throw new Error("ANALYTICS_SALT não configurada");

  const day = new Date().toISOString().slice(0, 10);

  return createHash("sha256").update(`${ip}|${userAgent}|${salt}|${day}`).digest("hex").slice(0, 32);
}

/** Categoria grossa do dispositivo. Não é fingerprint: só três valores possíveis. */
export function classifyDevice(userAgent: string): "mobile" | "tablet" | "desktop" {
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk/.test(ua)) return "tablet";
  if (/mobi|android|iphone|ipod/.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Só o domínio de origem. A URL completa carrega termo de busca e parâmetro
 * pessoal — guardar isso seria coletar mais do que o necessário.
 */
export function extractReferrerHost(referrer: string | undefined, selfHost: string): string | null {
  if (!referrer) return null;

  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (!host || host === selfHost.toLowerCase()) return null;
    return host.slice(0, 255);
  } catch {
    return null;
  }
}
