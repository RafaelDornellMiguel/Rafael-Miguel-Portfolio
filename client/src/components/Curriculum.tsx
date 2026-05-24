import { useEffect } from 'react';
import AOS from 'aos';
import { Download, Github, Linkedin } from 'lucide-react';
import './Curriculum.css';

const EXPERIENCE = [
  {
    year: '2022–',
    title: 'Desenvolvedor & Analista de Dados (ETL)',
    company: 'Clinicorp Solution',
    desc: 'Desenvolvimento de pipelines ETL e automação de processos com Python e SQL. QA técnico em migrações críticas entre PostgreSQL, SQL Server e Firebird. Criação de ferramentas internas que reduziram significativamente o esforço operacional.',
  },
];

const SKILLS = [
  { label: 'Python', level: 90 },
  { label: 'SQL / PostgreSQL', level: 88 },
  { label: 'ETL & Pipelines', level: 85 },
  { label: 'Power BI', level: 80 },
  { label: 'TypeScript / Node.js', level: 72 },
  { label: 'Flask / Pandas', level: 78 },
];

export default function Curriculum() {
  useEffect(() => { AOS.refresh(); }, []);

  return (
    <section id="curriculo" className="curriculum-section">
      <div className="curriculum-wrapper" data-aos="fade-up">

        <div className="curriculum-header">
          <p className="section-label">Currículo</p>
          <div className="curriculum-heading-row">
            <h2>Experiência Profissional</h2>
            <a
              href="/seu-curriculo.pdf"
              download
              className="curriculum-download"
              aria-label="Baixar currículo em PDF"
            >
              <Download size={15} /> Baixar PDF
            </a>
          </div>
        </div>

        <div className="curriculum-grid">

          {/* Left — Experience + Social */}
          <div className="curriculum-col">
            <h3>Experiência</h3>
            <div className="timeline">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <span className="timeline-year">{exp.year}</span>
                  <div className="timeline-content">
                    <p className="timeline-title">{exp.title}</p>
                    <p className="timeline-sub">{exp.company}</p>
                    <p className="timeline-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="curriculum-social">
              <a
                href="https://www.linkedin.com/in/rafael-dornell-miguel/"
                target="_blank"
                rel="noopener noreferrer"
                className="curriculum-social-link"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://github.com/RafaelDornellMiguel"
                target="_blank"
                rel="noopener noreferrer"
                className="curriculum-social-link"
                aria-label="GitHub"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          {/* Right — Skills */}
          <div className="curriculum-col">
            <h3>Habilidades Técnicas</h3>
            <div className="skills-list">
              {SKILLS.map(skill => (
                <div key={skill.label} className="skill-row">
                  <div className="skill-meta">
                    <span className="skill-name">{skill.label}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
