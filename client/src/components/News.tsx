import { useState, useEffect } from 'react';
import AOS from 'aos';
import { trpc } from '@/lib/trpc';
import { useTranslation } from '@/hooks/useTranslation';
import './News.css';

// Skeleton Card Component
function SkeletonCard() {
  return (
    <div className="news-card skeleton">
      <div className="skeleton-header">
        <div className="skeleton-emoji"></div>
        <div className="skeleton-category"></div>
      </div>
      <div className="skeleton-title"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-footer"></div>
      <div className="skeleton-link"></div>
    </div>
  );
}

export default function News() {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState('technology');
  
  const { data: news = [], isLoading, isError, refetch } = trpc.news.getLatest.useQuery(
    { tag: selectedTag, limit: 6 },
    { retry: 2, retryDelay: 800 },
  );

  useEffect(() => {
    AOS.refresh();
  }, [news]);

  const tags = [
    { id: 'technology', label: t('news.technology') || 'Tecnologia' },
    { id: 'data', label: t('news.data') || 'Dados' },
    { id: 'python', label: t('news.python') || 'Python' },
    { id: 'sql', label: t('news.sql') || 'SQL' },
    { id: 'etl', label: t('news.etl') || 'ETL' },
  ];

  return (
    <section className="news-section" id="news" data-aos="fade-up">
      <div className="news-wrapper">
        {/* Header */}
        <div className="news-header">
          <p className="section-label">{t('news.label') || 'NOTÍCIAS'}</p>
          <h2 className="news-title">{t('news.title') || 'Notícias & Artigos em Tempo Real'}</h2>
          <p className="news-subtitle">
            {t('news.subtitle') || 'Acompanhe as últimas novidades sobre tecnologia, dados e desenvolvimento'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="news-filters">
          {tags.map(tag => (
            <button
              key={tag.id}
              className={`filter-btn ${selectedTag === tag.id ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag.id)}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {isError && (
          <p className="news-error" style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--muted)' }}>
            Não foi possível carregar as notícias.{' '}
            <button type="button" onClick={() => refetch()} style={{ color: 'var(--accent)', textDecoration: 'underline', background: 'none', border: 0, cursor: 'pointer' }}>
              Tentar novamente
            </button>
          </p>
        )}

        {/* News Grid */}
        <div className="news-grid">
          {isLoading ? (
            // Skeleton Loading
            <>
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </>
          ) : news.length > 0 ? (
            news.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
                data-aos="fade-up"
              >
                {/* Card Header */}
                <div className="news-card-header">
                  <span className="news-emoji">📰</span>
                  <span className="news-category">{article.tags?.[0] || 'TECH'}</span>
                </div>

                {/* Title */}
                <h3 className="news-card-title">{article.title}</h3>

                {/* Description */}
                <p className="news-card-description">{article.description}</p>

                {/* Footer */}
                <div className="news-card-footer">
                  <span className="news-source">{article.author || 'Dev.to'}</span>
                  <span className="news-date">
                    {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {/* CTA */}
                <a href={article.url} className="news-card-link" onClick={(e) => e.preventDefault()}>
                  {t('news.readMore') || 'Ler Artigo'}
                  <i className="bx bx-right-arrow-alt"></i>
                </a>
              </a>
            ))
          ) : (
            <div className="news-empty">
              <i className="bx bx-inbox" style={{ fontSize: '48px', marginBottom: '16px' }}></i>
              <p>{t('news.empty') || 'Nenhum artigo encontrado'}</p>
            </div>
          )}
        </div>

        {/* Updated Info */}
        {!isLoading && news.length > 0 && (
          <div className="news-updated">
            <i className="bx bx-check-circle"></i>
            {t('news.updated') || 'Atualizado em tempo real via Dev.to'}
          </div>
        )}
      </div>
    </section>
  );
}
