import { z } from "zod";

import { ServiceError, ValidationError } from "@/lib/api/errors";
import { createApiHandler, getClientIp } from "@/lib/api/handler";
import { enforceRateLimit } from "@/lib/api/rateLimit";
import type { Article, ArticleSource, NewsResponse } from "@/types/article";

const UPSTREAM_TIMEOUT_MS = 8_000;

/** Allowlist: a tag vira query string de terceiro — entrada externa nunca passa crua. */
const ALLOWED_TAGS = ["technology", "data", "python", "sql", "etl"] as const;

const querySchema = z.object({
  source: z.enum(["devto", "tabnews"]).default("devto"),
  tag: z.enum(ALLOWED_TAGS).default("technology"),
  limit: z.coerce.number().int().min(1).max(50).default(6),
});

/**
 * Resposta de terceiro é dado hostil como qualquer outro: cada item passa por
 * schema e os malformados são descartados, não propagados para o cliente.
 */
const devToItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  description: z.string().nullish(),
  cover_image: z.string().url().nullish(),
  published_at: z.string(),
  user: z.object({ name: z.string().nullish() }).nullish(),
  tag_list: z.array(z.string()).nullish(),
  reading_time_minutes: z.number().nullish(),
});

const tabNewsItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  owner_username: z.string(),
  published_at: z.string().nullish(),
  created_at: z.string(),
  children_deep_count: z.number().nullish(),
});

async function fetchUpstream(url: string, locationPrefix: string): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      headers: { Accept: "application/json", "User-Agent": "rafael-portfolio/2.0" },
    });
  } catch (cause) {
    throw new ServiceError({
      message: "A fonte de artigos está indisponível no momento.",
      action: "Tente novamente em alguns minutos.",
      errorLocationCode: `${locationPrefix}:UPSTREAM_UNREACHABLE`,
      cause,
    });
  }

  if (!response.ok) {
    throw new ServiceError({
      message: "A fonte de artigos respondeu com erro.",
      action: "Tente novamente em alguns minutos.",
      errorLocationCode: `${locationPrefix}:UPSTREAM_BAD_STATUS`,
      internalContext: { upstreamStatus: response.status },
    });
  }

  const payload: unknown = await response.json().catch(() => null);

  if (!Array.isArray(payload)) {
    throw new ServiceError({
      message: "A fonte de artigos retornou um formato inesperado.",
      action: "Tente novamente em alguns minutos.",
      errorLocationCode: `${locationPrefix}:UPSTREAM_INVALID_PAYLOAD`,
    });
  }

  return payload;
}

async function fetchDevTo(tag: string, limit: number): Promise<Article[]> {
  const params = new URLSearchParams({ tag, per_page: String(limit), state: "published" });
  const payload = await fetchUpstream(
    `https://dev.to/api/articles?${params.toString()}`,
    "API:V1:NEWS:DEVTO",
  );

  return (payload as unknown[]).flatMap((item) => {
    const parsed = devToItemSchema.safeParse(item);
    if (!parsed.success) return [];
    const article = parsed.data;

    return [
      {
        id: `devto-${article.id}`,
        title: article.title,
        description: article.description ?? "",
        url: article.url,
        image: article.cover_image ?? null,
        author: article.user?.name ?? "DEV.to",
        publishedAt: article.published_at,
        tags: article.tag_list?.slice(0, 3) ?? [],
        readingTime: article.reading_time_minutes ?? null,
        source: "devto" as const,
      },
    ];
  });
}

async function fetchTabNews(limit: number): Promise<Article[]> {
  const params = new URLSearchParams({
    page: "1",
    per_page: String(limit),
    strategy: "relevant",
  });
  const payload = await fetchUpstream(
    `https://www.tabnews.com.br/api/v1/contents?${params.toString()}`,
    "API:V1:NEWS:TABNEWS",
  );

  return (payload as unknown[]).flatMap((item) => {
    const parsed = tabNewsItemSchema.safeParse(item);
    if (!parsed.success) return [];
    const content = parsed.data;

    const comments = content.children_deep_count ?? 0;

    return [
      {
        id: `tabnews-${content.id}`,
        title: content.title,
        // A listagem do TabNews não traz corpo; o card mostra a métrica da comunidade.
        description: comments > 0 ? `${comments} comentário(s) na discussão` : "",
        url: `https://www.tabnews.com.br/${content.owner_username}/${content.slug}`,
        image: null,
        author: content.owner_username,
        publishedAt: content.published_at ?? content.created_at,
        tags: ["tabnews"],
        readingTime: null,
        source: "tabnews" as const,
      },
    ];
  });
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
        action: `Use "source" entre: devto, tabnews; "tag" entre: ${ALLOWED_TAGS.join(
          ", ",
        )}; e "limit" entre 1 e 50.`,
        errorLocationCode: "API:V1:NEWS:INVALID_QUERY",
        internalContext: { issues: parsed.error.issues },
      });
    }

    const { source, tag, limit } = parsed.data;
    const isDevTo = source === "devto";

    const articles = isDevTo ? await fetchDevTo(tag, limit) : await fetchTabNews(limit);

    const body: NewsResponse = {
      articles,
      source: source as ArticleSource,
      // TabNews não expõe filtro por tag na listagem.
      tag: isDevTo ? tag : null,
      count: articles.length,
    };

    // Cache de borda: a mesma lista serve todos os visitantes por 5 min.
    res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    res.status(200).json(body);
  },
});
