import { z } from "zod";

import { ServiceError, ValidationError } from "@/lib/api/errors";
import { createApiHandler, getClientIp } from "@/lib/api/handler";
import { enforceRateLimit } from "@/lib/api/rateLimit";
import type { Article, NewsResponse } from "@/types/article";

const DEVTO_API = "https://dev.to/api/articles";
const UPSTREAM_TIMEOUT_MS = 8_000;

/** Allowlist: a tag vira query string de terceiro — entrada externa nunca passa crua. */
const ALLOWED_TAGS = ["technology", "data", "python", "sql", "etl"] as const;

const querySchema = z.object({
  tag: z.enum(ALLOWED_TAGS).default("technology"),
  limit: z.coerce.number().int().min(1).max(50).default(6),
});

type DevToArticle = {
  id: number;
  title: string;
  description: string | null;
  url: string;
  cover_image: string | null;
  published_at: string;
  user?: { name?: string };
  tag_list?: string[];
  reading_time_minutes?: number;
};

function mapArticle(article: DevToArticle): Article {
  return {
    id: article.id,
    title: article.title,
    description: article.description ?? "",
    url: article.url,
    image: article.cover_image ?? null,
    author: article.user?.name ?? "DEV.to",
    publishedAt: article.published_at,
    tags: Array.isArray(article.tag_list) ? article.tag_list.slice(0, 3) : [],
    readingTime: article.reading_time_minutes ?? 1,
  };
}

export default createApiHandler({
  GET: async (req, res) => {
    enforceRateLimit({
      key: `news:${getClientIp(req)}`,
      limit: 60,
      windowMs: 60_000,
      errorLocationCode: "API:V1:NEWS:RATE_LIMIT_EXCEEDED",
    });

    const parsed = querySchema.safeParse(req.query);

    if (!parsed.success) {
      throw new ValidationError({
        message: "Parâmetros de busca inválidos.",
        action: `Use "tag" entre: ${ALLOWED_TAGS.join(", ")} e "limit" entre 1 e 50.`,
        errorLocationCode: "API:V1:NEWS:INVALID_QUERY",
        internalContext: { issues: parsed.error.issues },
      });
    }

    const { tag, limit } = parsed.data;
    const params = new URLSearchParams({
      tag,
      per_page: String(limit),
      state: "published",
    });

    let upstream: Response;
    try {
      upstream = await fetch(`${DEVTO_API}?${params.toString()}`, {
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        headers: { Accept: "application/json", "User-Agent": "rafael-portfolio/2.0" },
      });
    } catch (cause) {
      throw new ServiceError({
        message: "A fonte de artigos está indisponível no momento.",
        action: "Tente novamente em alguns minutos.",
        errorLocationCode: "API:V1:NEWS:UPSTREAM_UNREACHABLE",
        cause,
      });
    }

    if (!upstream.ok) {
      throw new ServiceError({
        message: "A fonte de artigos respondeu com erro.",
        action: "Tente novamente em alguns minutos.",
        errorLocationCode: "API:V1:NEWS:UPSTREAM_BAD_STATUS",
        internalContext: { upstreamStatus: upstream.status },
      });
    }

    const payload: unknown = await upstream.json().catch(() => null);

    if (!Array.isArray(payload)) {
      throw new ServiceError({
        message: "A fonte de artigos retornou um formato inesperado.",
        action: "Tente novamente em alguns minutos.",
        errorLocationCode: "API:V1:NEWS:UPSTREAM_INVALID_PAYLOAD",
      });
    }

    const body: NewsResponse = {
      articles: (payload as DevToArticle[]).map(mapArticle),
      tag,
      count: payload.length,
    };

    // Cache de borda: a mesma lista serve todos os visitantes por 5 min.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json(body);
  },
});
