import { useEffect } from 'react';
import AOS from 'aos';
import './About.css';

export default function About() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-grid">
        <div className="about-image-wrapper" data-aos="fade-right">
          <div 
            className="about-img-wrap"
            style={{
              backgroundImage: "url('/img/rafael-profile.jpg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            role="img"
            aria-label="Foto de Rafael Dornell Miguel"
          />
        </div>

        <div data-aos="fade-left">
          <p className="section-label">Background</p>
          <h2 className="about-title">
            Rafael Dornell Miguel<br />
            Desenvolvedor &amp;<br />
            Engenharia de Dados
          </h2>
          <p className="about-text">
            Atuo no desenvolvimento de soluções orientadas a dados, com foco em <strong>ETL, automação e integração de sistemas</strong>. 
            Na Clinicorp Solution, fui responsável por projetos críticos de dados, incluindo atuação como <strong>QA técnico</strong> e desenvolvimento de ferramentas internas que reduziram drasticamente o trabalho manual.
            <br /><br />
            Tenho experiência prática com <strong>Python, SQL e JavaScript/TypeScript</strong>, criando APIs, pipelines e sistemas que conectam diferentes fontes de dados com eficiência e confiabilidade. Minha especialidade é transformar dados em insights acionáveis através de ETL, Power BI e automação de processos.
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
