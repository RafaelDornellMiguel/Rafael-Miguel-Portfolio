import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AOS from 'aos';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ once: true, duration: 600, offset: 40 });
  }, []);

  return (
    <section id="hero-section" className="hero-section" role="banner">
      <div className="hero-content">

        <div className="hero-eyebrow" data-aos="fade-up">
          <span className="hero-eyebrow-dot" aria-hidden="true" />
          Disponível para projetos
        </div>

        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="80">
          Rafael Dornell<br />
          <span className="hero-title-accent">Miguel</span>
        </h1>

        <p className="hero-description" data-aos="fade-up" data-aos-delay="160">
          {t('hero.description') ||
            'Engenheiro de dados e desenvolvedor de software. Especialista em ETL, pipelines de dados e automação — transformo dados brutos em sistemas que geram decisões.'}
        </p>

        <div className="hero-ctas" data-aos="fade-up" data-aos-delay="240">
          <button
            className="btn-primary-lg"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Falar sobre um projeto
            <ArrowRight size={18} />
          </button>
          <button
            className="btn-secondary-lg"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver projetos
          </button>
          <a
            href="https://github.com/RafaelDornellMiguel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-lg"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/rafaeldornellmiguel"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-lg"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="320">
          <div className="stat">
            <span className="stat-value">2+</span>
            <span className="stat-label">Anos de experiência</span>
          </div>
          <div className="stat">
            <span className="stat-value">8+</span>
            <span className="stat-label">Projetos entregues</span>
          </div>
          <div className="stat">
            <span className="stat-value">13+</span>
            <span className="stat-label">Clientes atendidos</span>
          </div>
        </div>

      </div>
    </section>
  );
}
