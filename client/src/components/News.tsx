import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'wouter';
import './News.css';

const TAGS = [
  { id: 'technology', label: 'Tecnologia' },
  { id: 'data',       label: 'Dados' },
  { id: 'python',     label: 'Python' },
  { id: 'sql',        label: 'SQL' },
  { id: 'etl',        label: 'ETL' },
];

export default function News() {
  const [selectedTag, setSelectedTag] = useState('technology');

  const { data: articles = [], isLoading, isError, refetch } = trpc.news.getLatest.useQuery(
    { tag: selectedTag, limit: 6 },
    { retry: 1, retryDelay: 1000 },
  );

  return (
    <section className="news-section" id="news" aria-label="Artigos e notícias">
      <div className="news-wrapper">

        <div className="news-header">
          <p className="section-label">Artigos</p>
          <h2 className="news-title">Notícias & Artigos em Tempo Real</h2>
          <p className="news-subtitle">
            Conteúdo atualizado via DEV.to sobre tecnologia, dados e engenharia de software
          </p>
        </div>

        <div className="news-filters" role="group" aria-label="Filtrar por categoria">
          {TAGS.map(tag => (
            <button
              key={tag.id}
              className={`filter-btn${selectedTag === tag.id ? ' active' : ''}`}
              onClick={() => setSelectedTag(tag.id)}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {isError && (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
            Não foi possível carregar os artigos.{' '}
            <button
              onClick={() => refetch()}
              style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}
            >
              <RefreshCw size={14} /> Tentar novamente
            </button>
          </div>
        )}

        <div className="news-grid">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="news-card skeleton">
                  <div className="skeleton-header" />
                  <div className="skeleton-title" />
                  <div className="skeleton-description" />
                  <div className="skeleton-footer" />
                  <div className="skeleton-link" />
                </div>
              ))
            : articles.length > 0
            ? articles.map(article => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-card"
                >
                  <div className="news-card-header">
                    <span className="news-category">{article.tags?.[0] || 'TECH'}</span>
                  </div>
                  <h3 className="news-card-title">{article.title}</h3>
                  <p className="news-card-description">{article.description}</p>
                  <div className="news-card-footer">
                    <span className="news-source">{article.author || 'Dev.to'}</span>
                    <span className="news-date">
                      {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <span className="news-card-link">
                    Ler artigo <ArrowRight size={14} />
                  </span>
                </a>
              ))
            : !isError && (
                <div className="news-empty">
                  <p>Nenhum artigo encontrado nesta categoria.</p>
                </div>
              )}
        </div>

        {!isLoading && articles.length > 0 && (
          <div className="news-cta">
            <Link href="/blog" className="news-cta-btn">
              Ver todos os artigos <ArrowRight size={16} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
