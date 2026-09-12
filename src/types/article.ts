/** Contrato público de /api/v1/news — compartilhado entre rota e cliente. */
export type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string | null;
  author: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
};

export type NewsResponse = {
  articles: Article[];
  tag: string;
  count: number;
};
