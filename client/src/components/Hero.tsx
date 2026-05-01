import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import AOS from 'aos';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, offset: 60 });
  }, []);

  const scrollToContact = () => {
    const contactElement = document.getElementById('contato');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero-section" 
      className="hero-section" 
      role="region" 
      aria-label="Seção Hero - Apresentação"
    >
      <div className="hero-content">
        <div className="hero-subtitle" data-aos="fade-up">
          {t('hero.name') || 'Rafael Dornell Miguel'}
        </div>
        
        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
          {t('hero.title1') || 'Desenvolvedor'}<br />
          & {t('hero.title2') || 'Engenheiro de Dados'}
        </h1>
        
        <p className="hero-description" data-aos="fade-up" data-aos-delay="200">
          {t('hero.description') || 'Especialista em ETL, automação de processos e desenvolvimento de sistemas. Transformo dados em decisões estratégicas para empresas reais.'}
        </p>

        <div className="hero-ctas" data-aos="fade-up" data-aos-delay="300">
          <button 
            className="btn-primary-lg"
            onClick={scrollToContact}
            aria-label="Entrar em contato"
          >
            {t('contact.submit')}
            <ArrowRight size={20} />
          </button>
          <a 
            href="#work" 
            className="btn-secondary-lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver projetos
          </a>
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
          <div className="stat">
            <span className="stat-value">2+</span>
            <span className="stat-label">Anos de experiência</span>
          </div>
          <div className="stat">
            <span className="stat-value">8+</span>
            <span className="stat-label">Projetos concluídos</span>
          </div>
          <div className="stat">
            <span className="stat-value">13+</span>
            <span className="stat-label">Clientes satisfeitos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
