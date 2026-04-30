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
      <div className="about-grid">
        <div className="about-image-wrapper" data-aos="fade-right">
          <img 
            src="/img/rafael-profile.jpg.png"
            alt="Foto de Rafael Dornell Miguel"
            className="about-img-wrap"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div data-aos="fade-left">
          <p className="section-label">{t('about.label') || 'Background'}</p>
          <h2 className="about-title">
            {t('about.name') || 'Rafael Dornell Miguel'}<br />
            {t('about.role1') || 'Desenvolvedor'} &amp;<br />
            {t('about.role2') || 'Engenharia de Dados'}
          </h2>
          <p className="about-text">
            {t('about.description') || `Atuo no desenvolvimento de soluções orientadas a dados, com foco em ETL, automação e integração de sistemas. Na Clinicorp Solution, fui responsável por projetos críticos de dados, incluindo atuação como QA técnico e desenvolvimento de ferramentas internas que reduziram drasticamente o trabalho manual.`}
            <br /><br />
            {t('about.experience') || `Tenho experiência prática com Python, SQL e JavaScript/TypeScript, criando APIs, pipelines e sistemas que conectam diferentes fontes de dados com eficiência e confiabilidade. Minha especialidade é transformar dados em insights acionáveis através de ETL, Power BI e automação de processos.`}
          </p>
          <div className="tech-pills">
            <div className="tech-pill">SQL Server</div>
            <div className="tech-pill">Python Expert</div>
            <div className="tech-pill">Power BI</div>
            <div className="tech-pill">Flask / Pandas</div>
            <div className="tech-pill">ETL</div>
            <div className="tech-pill">Automação</div>
          </div>
        </div>
      </div>
    </section>
  );
}
