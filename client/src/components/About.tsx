import { useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AOS from 'aos';
import './About.css';

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-wrapper">

        <div className="about-image" data-aos="fade-right">
          <img
            src="/img/rafael-profile.jpg.png"
            alt="Rafael Dornell Miguel"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="about-content" data-aos="fade-left">
          <p className="section-label">{t('about.label') || 'Background'}</p>
          <h2 className="about-title">
            {t('about.name') || 'Rafael Dornell Miguel'}<br />
            {t('about.role1') || 'Desenvolvedor'} &amp; {t('about.role2') || 'Engenheiro de Dados'}
          </h2>
          <p className="about-text">
            {t('about.description') ||
              'Atuo no desenvolvimento de soluções orientadas a dados, com foco em ETL, automação e integração de sistemas. Na Clinicorp Solution, fui responsável por projetos críticos de dados, incluindo atuação como QA técnico e desenvolvimento de ferramentas internas que reduziram drasticamente o trabalho manual.'}
          </p>
          <p className="about-text">
            {t('about.experience') ||
              'Tenho experiência prática com Python, SQL e TypeScript, criando APIs, pipelines e sistemas que conectam diferentes fontes de dados com eficiência e confiabilidade. Especialidade em transformar dados em insights acionáveis via ETL, Power BI e automação.'}
          </p>
          <div className="about-skills">
            {['SQL Server', 'Python', 'Power BI', 'Flask / Pandas', 'ETL', 'Automação', 'TypeScript', 'PostgreSQL'].map(skill => (
              <span key={skill} className="about-skill">{skill}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
