import { ArrowLeft, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import ArticleCard from "@/components/ArticleCard";
import Seo from "@/components/Seo";
import { newsSources, newsTags } from "@/content/site";
import { useNews } from "@/hooks/useNews";
import { useTranslation } from "@/i18n";
import type { ArticleSource } from "@/types/article";

import styles from "./blog.module.css";

const PAGE_SIZE = 9;

export default function BlogPage() {
  const { t, language } = useTranslation();
  const [source, setSource] = useState<ArticleSource>(newsSources[0].id);
  const [tag, setTag] = useState<string>(newsTags[0].id);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { articles, isLoading, error, refetch } = useNews(source, tag, 50);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return articles;
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.description.toLowerCase().includes(term),
    );
  }, [articles, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <Seo
        title={`${t("blog.title")} | Rafael Dornell Miguel`}
        description={t("blog.subtitle")}
        path="/blog"
      />

      <div className="container">
        <div className={styles.topbar}>
          <Link href="/" className={styles.back}>
            <ArrowLeft size={15} /> {t("blog.back")}
          </Link>
        </div>

        <header className={styles.hero}>
          <p className="sectionLabel">{t("blog.label")}</p>
          <h1 className="sectionTitle">{t("blog.title")}</h1>
          <p className="sectionSubtitle">{t("blog.subtitle")}</p>
        </header>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.searchBox}>
              <Search size={14} />
              <input
                type="search"
                className={styles.searchInput}
                placeholder={t("blog.search")}
                aria-label={t("blog.searchLabel")}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
              />
            </div>

            <p className={styles.sidebarTitle}>{t("news.sourceLabel")}</p>
            <div className={styles.tagList}>
              {newsSources.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.tagButton} ${source === item.id ? styles.tagActive : ""}`}
                  onClick={() => {
                    setSource(item.id);
                    setPage(1);
                  }}
                  aria-pressed={source === item.id}
                >
                  {t(item.labelKey)}
                </button>
              ))}
            </div>

            {source === "devto" && (
              <>
                <p className={styles.sidebarTitle}>{t("blog.categories")}</p>
                <div className={styles.tagList}>
                  {newsTags.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.tagButton} ${tag === item.id ? styles.tagActive : ""}`}
                      onClick={() => {
                        setTag(item.id);
                        setPage(1);
                      }}
                      aria-pressed={tag === item.id}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </aside>

          <div>
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
                : visible.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      locale={language === "pt" ? "pt-BR" : "en-US"}
                    />
                  ))}
            </div>

            {!isLoading && !error && filtered.length === 0 && (
              <p className={styles.empty}>{t("blog.noArticles")}</p>
            )}

            {totalPages > 1 && !isLoading && (
              <nav className={styles.pagination} aria-label="Paginação">
                <button
                  type="button"
                  className={styles.pageButton}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  disabled={currentPage === 1}
                >
                  {t("blog.previous")}
                </button>
                <span className={styles.pageInfo}>
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  className={styles.pageButton}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  disabled={currentPage === totalPages}
                >
                  {t("blog.next")}
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
