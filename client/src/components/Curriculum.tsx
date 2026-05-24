import { useEffect } from 'react';
import AOS from 'aos';
import { Github, Linkedin } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './Curriculum.css';

const EXPERIENCE = [
  {
    year: '2026–',
    badge: 'Atual',
    title: 'Analista de Implantação & Integração de Dados',
    company: 'Multiplier Tecnologia',
    companyClass: 'company-multiplier',
    desc: 'Implantação de soluções SaaS, análise e validação de dados relacionados à implementação de softwares e serviços da plataforma. Integrações técnicas em parceria com equipes de desenvolvimento, organização de fluxos operacionais, suporte técnico especializado, controle de chamados e processos de pós-venda. Responsável por: integração de sistemas, APIs REST, automação de processos, estruturação e validação de dados, gerenciamento de banco de dados, implantação de software, troubleshooting técnico e onboarding SaaS.',
  },
  {
    year: '2022–',
    badge: '',
    title: 'Desenvolvedor & Analista de Dados (ETL)',
    company: 'Clinicorp Solution',
    companyClass: 'company-clinicorp',
    desc: 'Desenvolvimento de pipelines ETL e automação de processos com Python e SQL. QA técnico em migrações críticas entre PostgreSQL, SQL Server e Firebird. Criação de ferramentas internas que reduziram significativamente o esforço operacional e aumentaram a eficiência da equipe.',
  },
];

const SKILLS_MAIN = [
  { label: 'Python',              level: 90 },
  { label: 'SQL / PostgreSQL',    level: 88 },
  { label: 'ETL & Pipelines',     level: 85 },
  { label: 'APIs REST',           level: 82 },
  { label: 'Integração de Dados', level: 83 },
  { label: 'Power BI',            level: 80 },
  { label: 'Flask / Pandas',      level: 78 },
  { label: 'TypeScript / Node.js',level: 72 },
];

const SKILLS_TAGS = [
  'Postman', 'Supabase', 'Firebase', 'Airflow',
  'Automação de Processos', 'Implantação SaaS',
  'Troubleshooting Técnico', 'Validação de Dados',
  'Integração de Sistemas', 'Rust (aprendendo)',
  'PMI / Gestão', 'Onboarding Técnico',
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
              <span className="cv-download-glow" />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              <span>Baixar PDF</span>
            </a>
          </div>
        </div>

        <div className="curriculum-grid">

          {/* ── Left: Experience + Social ── */}
          <div className="curriculum-col">
            <h3>Experiência</h3>
            <div className="timeline">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-left">
                    <span className="timeline-year">{exp.year}</span>
                    {exp.badge && <span className="timeline-badge">{exp.badge}</span>}
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-title">{exp.title}</p>
                    <p className={`timeline-sub ${exp.companyClass}`}>{exp.company}</p>
                    <p className="timeline-desc">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="curriculum-social">
              <a href="https://www.linkedin.com/in/rafael-dornell-miguel/" target="_blank" rel="noopener noreferrer" className="curriculum-social-link" aria-label="LinkedIn">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://github.com/RafaelDornellMiguel" target="_blank" rel="noopener noreferrer" className="curriculum-social-link" aria-label="GitHub">
                <Github size={15} /> GitHub
              </a>
              <a href="https://wa.me/5547996825170" target="_blank" rel="noopener noreferrer" className="curriculum-social-link curriculum-social-link--wa" aria-label="WhatsApp">
                <WhatsAppIcon size={15} /> WhatsApp
              </a>
            </div>
          </div>

          {/* ── Right: Skills ── */}
          <div className="curriculum-col">
            <h3>Habilidades Técnicas</h3>

            <div className="skills-list">
              {SKILLS_MAIN.map(skill => (
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

            <div className="skills-tags-section">
              <p className="skills-tags-label">Mais tecnologias</p>
              <div className="skills-tags">
                {SKILLS_TAGS.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
