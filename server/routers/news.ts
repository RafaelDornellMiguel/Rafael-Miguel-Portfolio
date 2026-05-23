import { z } from "zod";
import axios from "axios";

import { publicProcedure, router } from "../_core/trpc.js";

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

type MappedArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string | null;
  author: string;
  authorUsername: string;
  authorImage: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
};

function mapArticle(article: DevToArticle): MappedArticle {
  return {
    id: article.id,
    title: article.title,
    description: article.description ?? "",
    url: article.url,
    image: article.cover_image ?? null,
    author: article.user?.name ?? "Autor",
    authorUsername: article.user?.username ?? "",
    authorImage: article.user?.profile_image ?? "",
    publishedAt: article.published_at,
    tags: Array.isArray(article.tag_list) ? article.tag_list.slice(0, 3) : [],
    readingTime: article.reading_time_minutes ?? 1,
  };
}

async function fetchDevToArticles(tag: string, limit: number): Promise<DevToArticle[]> {
  const safeLimit = Math.min(Math.max(limit, 1), 50);

  const params = new URLSearchParams({
    per_page: safeLimit.toString(),
    state: "published",
  });

  if (tag?.trim()) {
    params.set("tag", tag.trim());
  }

  const url = `${DEVTO_API}?${params.toString()}`;
  console.log("[NEWS_API] Fetching:", url);

  try {
    const response = await axios.get<DevToArticle[]>(url, {
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "User-Agent": "rafael-portfolio",
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error("DEV.to retornou formato inválido");
    }

    return response.data;
  } catch (err) {
    console.error("[NEWS_API_ERROR]", err);
    return [];
  }
}

export const newsRouter = router({
  getLatest: publicProcedure
    .input(
      z.object({
        tag: z.string().optional(),
        limit: z.coerce.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const tag = input.tag?.trim() || "technology";
      const limit = input.limit ?? 6;
      const articles = await fetchDevToArticles(tag, limit);
      return articles.map(mapArticle);
    }),

  searchByTag: publicProcedure
    .input(
      z.object({
        tag: z.string().min(1).max(64),
        limit: z.coerce.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 6;
      const articles = await fetchDevToArticles(input.tag, limit);
      return articles.map(mapArticle);
    }),
});
