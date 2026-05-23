import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { ArrowLeft, Search, RefreshCw, Clock } from 'lucide-react';
import './Blog.css';

const ITEMS_PER_PAGE = 9;

const TAGS = [
  { id: 'technology', label: 'Tecnologia' },
  { id: 'data',       label: 'Dados' },
  { id: 'python',     label: 'Python' },
  { id: 'sql',        label: 'SQL' },
  { id: 'etl',        label: 'ETL' },
];

export default function Blog() {
  const [page, setPage]           = useState(1);
  const [search, setSearch]       = useState('');
  const [selectedTag, setTag]     = useState('technology');

  const { data: articles = [], isLoading, isError, refetch } = trpc.news.getLatest.useQuery(
    { tag: selectedTag, limit: 50 },
    { retry: 1, retryDelay: 1000 },
  );

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated   = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleTagChange = (id: string) => {
    setTag(id);
    setPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Blog | Rafael Dornell Miguel</title>
        <meta name="description" content="Artigos sobre ETL, engenharia de dados e desenvolvimento de software" />
      </Helmet>

      <div className="blog-page">
        <div className="blog-inner">

          {/* Top bar */}
          <div className="blog-topbar">
            <Link href="/" className="blog-back">
              <ArrowLeft size={16} /> Voltar para home
            </Link>
          </div>

          {/* Hero */}
          <div className="blog-hero">
            <p className="section-label">Blog</p>
            <h1>Artigos & Insights</h1>
            <p>Conteúdo sobre ETL, engenharia de dados, Python, SQL e desenvolvimento de software</p>
          </div>

          {/* Layout */}
          <div className="blog-layout">

            {/* Sidebar */}
            <aside className="blog-sidebar">

              <div className="sidebar-section">
                <h3>Buscar</h3>
                <div className="blog-search">
                  <Search size={14} />
                  <input
                    type="search"
                    placeholder="Buscar artigos..."
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                  />
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Categorias</h3>
                <div className="category-list">
                  {TAGS.map(tag => (
                    <button
                      key={tag.id}
                      className={`category-btn${selectedTag === tag.id ? ' active' : ''}`}
                      onClick={() => handleTagChange(tag.id)}
                    >
                      <span className="category-dot" />
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <div className="blog-stat">
                  <span className="blog-stat-num">{filtered.length}</span>
                  <span className="blog-stat-label">artigos</span>
                </div>
              </div>

            </aside>

            {/* Main */}
            <main className="blog-main">

              {isError && (
                <div className="blog-error">
                  <span>Não foi possível carregar os artigos.</span>
                  <button className="blog-error-retry" onClick={() => refetch()}>
                    <RefreshCw size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    Tentar novamente
                  </button>
                </div>
              )}

              <div className="articles-grid">
                {isLoading
                  ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                      <div key={i} className="article-card skeleton">
                        <div className="skeleton-image" />
                        <div className="skeleton-content">
                          <div className="skeleton-tag" />
                          <div className="skeleton-title" />
                          <div className="skeleton-desc" />
                          <div className="skeleton-footer" />
                        </div>
                      </div>
                    ))
                  : paginated.length > 0
                  ? paginated.map(article => (
                      <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="article-card"
                      >
                        {article.image && (
                          <div className="article-image">
                            <img src={article.image} alt={article.title} loading="lazy" />
                          </div>
                        )}
                        <div className="article-body">
                          <div className="article-tags">
                            {article.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="article-tag">{tag}</span>
                            ))}
                          </div>
                          <h3 className="article-title">{article.title}</h3>
                          <p className="article-desc">{article.description}</p>
                          <div className="article-meta">
                            <div className="author-info">
                              {article.authorImage && (
                                <img src={article.authorImage} alt={article.author} className="author-avatar" loading="lazy" />
                              )}
                              <div>
                                <p className="author-name">{article.author}</p>
                                <p className="publish-date">
                                  {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>
                            <div className="reading-time">
                              <Clock size={12} />
                              {article.readingTime}m
                            </div>
                          </div>
                        </div>
                      </a>
                    ))
                  : !isError && (
                      <div className="articles-empty">
                        <p>Nenhum artigo encontrado.</p>
                      </div>
                    )}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeft size={14} /> Anterior
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(n => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
                      .reduce<(number | string)[]>((acc, n, idx, arr) => {
                        if (idx > 0 && (n as number) - (arr[idx - 1] as number) > 1) acc.push('…');
                        acc.push(n);
                        return acc;
                      }, [])
                      .map((item, i) =>
                        item === '…'
                          ? <span key={`e-${i}`} className="page-ellipsis">…</span>
                          : <button
                              key={item}
                              className={`page-num${currentPage === item ? ' active' : ''}`}
                              onClick={() => setPage(item as number)}
                            >
                              {item}
                            </button>
                      )}
                  </div>

                  <button
                    className="pagination-btn"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Próximo <ArrowLeft size={14} style={{ transform: 'scaleX(-1)' }} />
                  </button>
                </div>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  );
}
