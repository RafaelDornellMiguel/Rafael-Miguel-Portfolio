import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

const DEVTO_API = "https://dev.to/api/articles";

type DevToArticle = {
  id: number;
  title: string;
  description: string | null;
  url: string;
  cover_image: string | null;
  published_at: string;
  user?: {
    name: string;
    username: string;
    profile_image: string;
  };
  tag_list: string[];
  reading_time_minutes?: number;
};

function mapArticle(article: DevToArticle) {
  const u = article.user;
  return {
    id: article.id,
    title: article.title,
    description: article.description ?? "",
    url: article.url,
    image: article.cover_image,
    author: u?.name ?? "Autor",
    authorUsername: u?.username ?? "",
    authorImage: u?.profile_image ?? "",
    // Retornamos como String ISO para evitar erros de serialização do superjson
    publishedAt: new Date(article.published_at).toISOString(),
    tags: (article.tag_list ?? []).slice(0, 3),
    readingTime: article.reading_time_minutes ?? 1,
  };
}

async function fetchDevToArticles(tag: string, limit: number): Promise<DevToArticle[]> {
  const params = new URLSearchParams({
    per_page: Math.min(Math.max(limit, 1), 50).toString(),
    state: "published",
    sort_by: "latest",
  });
  if (tag.trim()) {
    params.set("tag", tag.trim());
  }

  const response = await fetch(`${DEVTO_API}?${params}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Rafael-Portfolio/1.0 (portfolio; +https://github.com)",
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.warn(`[News] dev.to HTTP ${response.status}: ${text.slice(0, 200)}`);
    throw new Error(`Erro ao buscar artigos: ${response.status}`);
  }

  const json: unknown = await response.json();
  if (!Array.isArray(json)) {
    console.warn("[News] dev.to resposta inesperada (não é array)");
    throw new Error("Resposta inesperada da API");
  }

  return json as DevToArticle[];
}

export const newsRouter = router({
  getLatest: publicProcedure
    .input(
      z.object({
        tag: z.string().min(1).max(64).optional(),
        limit: z.coerce.number().min(1).max(50).optional(), // Use coerce aqui
      }),
    )
    .query(async ({ input }) => {
      const tag = input.tag?.trim() || "technology";
      const limit = input.limit ?? 6;
      try {
        const articles = await fetchDevToArticles(tag, limit);
        return articles.map(mapArticle);
      } catch (e) {
        console.error("[News] getLatest:", e);
        throw new Error("Não foi possível buscar os artigos mais recentes.");
      }
    }),

  searchByTag: publicProcedure
    .input(
      z.object({
        tag: z.string().min(1).max(64),
        limit: z.number().min(1).max(50).optional(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 6;
      try {
        const articles = await fetchDevToArticles(input.tag, limit);
        return articles.map(mapArticle);
      } catch (e) {
        console.error("[News] searchByTag:", e);
        throw new Error("Não foi possível buscar artigos para a tag especificada.");
      }
    }),
});
