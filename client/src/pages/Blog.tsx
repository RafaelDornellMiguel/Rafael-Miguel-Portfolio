import { useState, useEffect } from 'react';
import AOS from 'aos';
import { trpc } from '@/lib/trpc';
import { useTranslation } from '@/hooks/useTranslation';
import { Helmet } from 'react-helmet-async';
import './Blog.css';

const ITEMS_PER_PAGE = 9;

export default function Blog() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('technology');

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
    refetch,
  } = trpc.news.getLatest.useQuery(
    { tag: selectedTag, limit: 50 },
    { retry: 2, retryDelay: 800 },
  );

  useEffect(() => {
    AOS.refresh();
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedTag]);

  // Filtrar artigos por busca
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginação
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const tags = [
    { id: 'technology', label: t('news.technology') || 'Tecnologia' },
    { id: 'data', label: t('news.data') || 'Dados' },
    { id: 'python', label: t('news.python') || 'Python' },
    { id: 'sql', label: t('news.sql') || 'SQL' },
    { id: 'etl', label: t('news.etl') || 'ETL' },
  ];

  return (
    <>
      <Helmet>
        <title>{t('blog.title') || 'Blog'} | Rafael Dornell Miguel</title>
        <meta name="description" content={t('blog.subtitle') || 'Artigos sobre ETL, engenharia de dados e desenvolvimento'} />
      </Helmet>
      
      <div className="blog-page">
        <div className="blog-container" style={{ paddingTop: '2rem' }}>
          <a href="/" className="back-home-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>
            <i className="bx bx-arrow-back"></i>
            {t('blog.backHome') || 'Voltar para Home'}
          </a>
        </div>
        {/* Hero */}
        <section className="blog-hero" data-aos="fade-up">
          <div className="blog-hero-content">
            <h1>{t('blog.title') || 'Blog de Tecnologia e Dados'}</h1>
            <p>{t('blog.subtitle') || 'Artigos, tutoriais e insights sobre ETL, engenharia de dados e desenvolvimento'}</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="blog-section">
          <div className="blog-container">
            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Search */}
              <div className="search-box" data-aos="fade-right">
                <i className="bx bx-search"></i>
                <input
                  type="text"
                  placeholder={t('blog.search') || 'Buscar artigos...'}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Categories */}
              <div className="categories" data-aos="fade-right" data-aos-delay="100">
                <h3>{t('blog.categories') || 'Categorias'}</h3>
                <div className="category-list">
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      className={`category-btn ${selectedTag === tag.id ? 'active' : ''}`}
                      onClick={() => setSelectedTag(tag.id)}
                    >
                      <span className="category-dot"></span>
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="blog-stats" data-aos="fade-right" data-aos-delay="200">
                <div className="stat-item">
                  <span className="stat-number">{filteredArticles.length}</span>
                  <span className="stat-label">{t('blog.totalArticles') || 'Artigos'}</span>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="blog-main">
              {isError && (
                <div
                  className="blog-error-banner"
                  style={{
                    marginBottom: '1.25rem',
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    color: 'var(--text)',
                  }}
                >
                  <strong>Não foi possível carregar os artigos.</strong>{' '}
                  {error?.message ?? 'Verifique se o backend está rodando (porta 8080) e tente de novo.'}
                  <button
                    type="button"
                    onClick={() => refetch()}
                    style={{
                      marginLeft: '1rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid var(--accent)',
                      background: 'transparent',
                      color: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                  >
                    Tentar novamente
                  </button>
                </div>
              )}
              {/* Articles Grid */}
              <div className="blog-grid">
                {isLoading ? (
                  // Skeleton Loading
                  Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                    <div key={idx} className="article-card skeleton" data-aos="fade-up">
                      <div className="skeleton-image"></div>
                      <div className="skeleton-content">
                        <div className="skeleton-tag"></div>
                        <div className="skeleton-title"></div>
                        <div className="skeleton-desc"></div>
                        <div className="skeleton-footer"></div>
                      </div>
                    </div>
                  ))
                ) : paginatedArticles.length > 0 ? (
                  paginatedArticles.map((article) => (
                    <a
                      key={article.id}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="article-card"
                      data-aos="fade-up"
                    >
                      {/* Image */}
                      {article.image && (
                        <div className="article-image">
                          <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="article-content">
                        {/* Tags */}
                        <div className="article-tags">
                          {article.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="article-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="article-title">{article.title}</h3>

                        {/* Description */}
                        <p className="article-desc">{article.description}</p>

                        {/* Meta */}
                        <div className="article-meta">
                          <div className="author-info">
                            {article.authorImage && (
                              <img
                                src={article.authorImage}
                                alt={article.author}
                                className="author-avatar"
                                loading="lazy"
                              />
                            )}
                            <div>
                              <p className="author-name">{article.author}</p>
                              <p className="publish-date">
                                {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <div className="reading-time">
                            <i className="bx bx-time"></i>
                            {article.readingTime}m
                          </div>
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="empty-state">
                    <i className="bx bx-inbox"></i>
                    <p>{t('blog.noArticles') || 'Nenhum artigo encontrado'}</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination" data-aos="fade-up">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <i className="bx bx-left-arrow-alt"></i>
                    {t('blog.previous') || 'Anterior'}
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      // Mostrar apenas páginas próximas
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            className={`page-num ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return (
                          <span key={pageNum} className="page-ellipsis">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    {t('blog.next') || 'Próximo'}
                    <i className="bx bx-right-arrow-alt"></i>
                  </button>
                </div>
              )}
            </main>
          </div>
        </section>
      </div>
    </>
  );
}
