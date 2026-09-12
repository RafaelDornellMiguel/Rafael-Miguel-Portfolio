import { ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { newsTags } from "@/content/site";
import { useNews } from "@/hooks/useNews";
import { useReveal } from "@/hooks/useReveal";
import { useTranslation } from "@/i18n";

import ArticleCard from "./ArticleCard";
import styles from "./News.module.css";

export default function News() {
  const { t, language } = useTranslation();
  const ref = useReveal<HTMLDivElement>();
  const [tag, setTag] = useState<string>(newsTags[0].id);
  const { articles, isLoading, error, refetch } = useNews(tag, 6);

  return (
    <section className="section" id="artigos">
      <div ref={ref} className="container reveal">
        <header className={styles.header}>
          <p className="sectionLabel">{t("news.label")}</p>
          <h2 className="sectionTitle">{t("news.title")}</h2>
          <p className="sectionSubtitle">{t("news.subtitle")}</p>
        </header>

        <div className={styles.filters} role="group" aria-label={t("news.label")}>
          {newsTags.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.filter} ${tag === item.id ? styles.filterActive : ""}`}
              onClick={() => setTag(item.id)}
              aria-pressed={tag === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        {error && (
          <div className={styles.error} role="alert">
            <p className={styles.errorMessage}>{error.message}</p>
            <p className={styles.errorAction}>{error.action}</p>
            <button type="button" className={styles.retry} onClick={refetch}>
              <RefreshCw size={14} /> {t("news.retry")}
            </button>
            <code className={styles.errorCode}>{error.error_location_code}</code>
          </div>
        )}

        <div className={styles.grid}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.skeleton} aria-hidden="true" />
              ))
            : articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  locale={language === "pt" ? "pt-BR" : "en-US"}
                />
              ))}
        </div>

        {!isLoading && !error && articles.length === 0 && (
          <p className={styles.empty}>{t("news.empty")}</p>
        )}

        {!isLoading && articles.length > 0 && (
          <div className={styles.footer}>
            <Link href="/blog" className={styles.seeAll}>
              {t("news.seeAll")} <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
