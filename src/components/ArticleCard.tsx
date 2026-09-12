import { ArrowUpRight, Clock } from "lucide-react";

import type { Article } from "@/types/article";

import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article, locale }: { article: Article; locale: string }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.top}>
        <span className={styles.category}>{article.tags[0] ?? "dev"}</span>
        <span className={styles.reading}>
          <Clock size={12} /> {article.readingTime} min
        </span>
      </div>

      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.description}>{article.description}</p>

      <div className={styles.footer}>
        <span className={styles.author}>{article.author}</span>
        <span className={styles.date}>
          {new Date(article.publishedAt).toLocaleDateString(locale)}
          <ArrowUpRight size={13} className={styles.arrow} />
        </span>
      </div>
    </a>
  );
}
