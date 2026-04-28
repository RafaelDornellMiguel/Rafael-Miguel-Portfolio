import { useEffect } from 'react';
import AOS from 'aos';
import './Curriculum.css';

export default function Curriculum() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="curriculo" className="curriculum-section">
      <div className="cv-box" data-aos="fade-up">
        <div className="cv-header">
          <div>
            <h2>Currículo Profissional de Rafael Dornell Miguel</h2>
            <p className="cv-label">Desenvolvedor de Software & Engenheiro de Dados</p>
          </div>
          <a href="/seu-curriculo.pdf" download className="btn-download" aria-label="Baixar currículo em PDF">
            <i className="bx bxs-download"></i> Baixar PDF
          </a>
        </div>

        <div className="cv-content">
          <div className="cv-networks">
            <p className="cv-section-label">Redes Profissionais</p>
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/rafael-dornell-miguel/" 
                target="_blank" 
                rel="noopener"
                className="social-link"
                aria-label="LinkedIn de Rafael Dornell Miguel"
              >
                <i className="bx bxl-linkedin"></i> LinkedIn
              </a>
              <a 
                href="https://github.com/RafaelDornellMiguel" 
                target="_blank" 
                rel="noopener"
                className="social-link"
                aria-label="GitHub de Rafael Dornell Miguel"
              >
                <i className="bx bxl-github"></i> GitHub
              </a>
            </div>
          </div>

          <div className="cv-experience">
            <p className="cv-section-label">Experiência Recente</p>
            <div className="cv-timeline">
              <div className="cv-timeline-item">
                <div className="cv-timeline-dot"></div>
                <h3>Desenvolvedor & Analista de Dados (ETL)</h3>
                <p className="company">Clinicorp Solution</p>
                <p className="description">
                  Atuação no desenvolvimento de pipelines de dados e automação de processos utilizando Python e SQL. 
                  Responsável por projetos críticos de validação de dados, incluindo atuação como QA técnico, garantindo integridade e consistência em migrações complexas entre múltiplos bancos (PostgreSQL, SQL Server, Firebird).
                  <br /><br />
                  Desenvolvimento de ferramentas internas e microsserviços que reduziram significativamente o esforço operacional e aumentaram a eficiência da equipe. Experiência com ETL, automação de processos, validação de dados e integração de sistemas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
