import { useCallback, useEffect, useState } from "react";

import { apiFetch } from "@/lib/api/client";
import type { SerializedError } from "@/lib/api/errors";
import type { Article, ArticleSource, NewsResponse } from "@/types/article";

type State = {
  articles: Article[];
  isLoading: boolean;
  error: SerializedError | null;
};

/**
 * Shell estático + dados por API: a home é pré-renderizada e os artigos
 * chegam depois, direto de /api/v1/news.
 */
export function useNews(source: ArticleSource, tag: string, limit: number) {
  const [state, setState] = useState<State>({ articles: [], isLoading: true, error: null });

  const load = useCallback(
    async (signal?: { cancelled: boolean }) => {
      setState((current) => ({ ...current, isLoading: true, error: null }));

      const params = new URLSearchParams({ source, tag, limit: String(limit) });
      const result = await apiFetch<NewsResponse>(`/api/v1/news?${params.toString()}`);

      if (signal?.cancelled) return;

      setState(
        result.ok
          ? { articles: result.data.articles, isLoading: false, error: null }
          : { articles: [], isLoading: false, error: result.error },
      );
    },
    [source, tag, limit],
  );

  useEffect(() => {
    const signal = { cancelled: false };
    void load(signal);
    return () => {
      signal.cancelled = true;
    };
  }, [load]);

  return { ...state, refetch: () => void load() };
}
