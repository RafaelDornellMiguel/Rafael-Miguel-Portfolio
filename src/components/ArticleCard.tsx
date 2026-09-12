import { ArrowUpRight, Clock } from "lucide-react";

import type { Article } from "@/types/article";

import styles from "./ArticleCard.module.css";

const SOURCE_LABEL: Record<Article["source"], string> = {
  devto: "DEV.to",
  tabnews: "TabNews",
};

export default function ArticleCard({ article, locale }: { article: Article; locale: string }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <div className={styles.top}>
        <span className={styles.category} data-source={article.source}>
          {SOURCE_LABEL[article.source]}
        </span>
        {article.readingTime !== null && (
          <span className={styles.reading}>
            <Clock size={12} /> {article.readingTime} min
          </span>
        )}
      </div>

      <h3 className={styles.title}>{article.title}</h3>
      {article.description && <p className={styles.description}>{article.description}</p>}

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
