import { z } from "zod";

import { classifyDevice, buildVisitorHash, extractReferrerHost } from "@/lib/analytics/visitor";
import { ValidationError } from "@/lib/api/errors";
import { createApiHandler, getClientIp } from "@/lib/api/handler";
import { enforceRateLimit } from "@/lib/api/rateLimit";
import { isDatabaseConfigured, query } from "@/lib/db/client";

/**
 * Allowlist de rotas: o cliente não escolhe o texto que vai para o banco.
 * Caminho desconhecido é normalizado, nunca gravado cru.
 */
const KNOWN_PATHS = ["/", "/blog", "/admin", "/404"] as const;

const bodySchema = z.object({
  path: z.string().max(120),
  referrer: z.string().max(2_048).optional(),
});

export const config = {
  api: { bodyParser: { sizeLimit: "2kb" } },
};

function normalizePath(path: string): string {
  const clean = path.split("?")[0]?.split("#")[0] ?? "/";
  return (KNOWN_PATHS as readonly string[]).includes(clean) ? clean : "/outro";
}

export default createApiHandler({
  POST: async (req, res) => {
    enforceRateLimit({
      key: `pageview:${getClientIp(req)}`,
      limit: 60,
      windowMs: 60_000,
      errorLocationCode: "API:V1:EVENTS:PAGEVIEW:RATE_LIMIT_EXCEEDED",
    });

    const parsed = bodySchema.safeParse(req.body);

    if (!parsed.success) {
      throw new ValidationError({
        message: "Evento inválido.",
        action: "Envie um corpo com o campo path.",
        errorLocationCode: "API:V1:EVENTS:PAGEVIEW:INVALID_BODY",
      });
    }

    // Sem banco ou sem sal, a coleta simplesmente não acontece — e o visitante
    // não paga por isso: a resposta é 202 e a navegação segue.
    if (!isDatabaseConfigured() || !process.env.ANALYTICS_SALT) {
      res.status(202).json({ status: "skipped" });
      return;
    }

    const userAgent = String(req.headers["user-agent"] ?? "").slice(0, 512);
    const host = String(req.headers.host ?? "");
    const country = String(req.headers["x-vercel-ip-country"] ?? "").slice(0, 2) || null;

    await query(
      `INSERT INTO page_views (path, referrer_host, country, device, visitor_hash)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        normalizePath(parsed.data.path),
        extractReferrerHost(parsed.data.referrer, host),
        country,
        classifyDevice(userAgent),
        buildVisitorHash(getClientIp(req), userAgent),
      ],
    );

    res.status(202).json({ status: "recorded" });
  },
});
