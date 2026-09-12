/** Contrato público de /api/v1/news — compartilhado entre rota e cliente. */

export type ArticleSource = "devto" | "tabnews";

export type Article = {
  id: string;
  title: string;
  /** Vazio quando a fonte não expõe resumo (caso do TabNews). */
  description: string;
  url: string;
  image: string | null;
  author: string;
  publishedAt: string;
  tags: string[];
  /** Null quando a fonte não calcula tempo de leitura. */
  readingTime: number | null;
  source: ArticleSource;
};

export type NewsResponse = {
  articles: Article[];
  source: ArticleSource;
  tag: string | null;
  count: number;
};
