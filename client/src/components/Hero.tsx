import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import AOS from 'aos';
import './Hero.css';

/** Vídeos no Supabase servidos via backend `/assets-cloud/*` (proxy). */
const DARK_VIDEO = '/public/img/gif_7d02e1e5.mp4';
const LIGHT_VIDEO = '/public/img/gif2_b7dba10d.mp4';

export default function Hero() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, offset: 60 });
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.src = theme === 'light' ? LIGHT_VIDEO : DARK_VIDEO;
    el.preload = 'auto';
    el.load();

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        /* autoplay pode ser bloqueado */
      });
    }
  }, [theme]);

  return (
    <section id="hero-section" className="hero-section" role="region" aria-label="Seção Hero com vídeo de fundo">
      <video
        ref={videoRef}
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="hero-video"
        preload="auto"
      />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title" data-aos="fade-up" role="heading" aria-level={1}>
          {t('hero.name') || 'Rafael Dornell Miguel'}<br />{t('hero.title1') || 'Software'}<br />& {t('hero.title2') || 'Dados'}
        </h1>
        <p className="hero-sub" data-aos="fade-up" data-aos-delay="200" role="doc-subtitle">
          {t('hero.description') || 'Desenvolvedor focado em automação e dados. Crio sistemas que eliminam processos manuais, reduzem erros e aumentam eficiência operacional em empresas reais. Especialista em ETL, engenharia de dados e desenvolvimento com Python, SQL e Power BI.'}
        </p>
      </div>
    </section>
  );
}
