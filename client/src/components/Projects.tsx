import { useEffect } from 'react';
import AOS from 'aos';
import { useTranslation } from '@/hooks/useTranslation';
import './Projects.css';

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: 'guia-etl',
    tag: 'Guia ETL',
    title: 'Guia Prático de ETL',
    description: 'Plataforma interativa com guias e ferramentas para aprender e dominar ETL. Desenvolvido com tecnologias modernas e deploy na Vercel.',
    image: '/img/project-01.png',
    link: 'https://guia-elt.vercel.app/',
    technologies: ['Python', 'ETL', 'Data Pipeline'],
    color: '#10b981'
  },
  {
    id: 'stammers',
    tag: 'Rock Band',
    title: 'Stammers - Official',
    description: 'Site oficial da banda Stammers. Design moderno com experiência imersiva para fãs. Vitrine completa da banda com integração de redes sociais.',
    image: '/img/project-02.png',
    link: 'https://www.stammerofficial.com/',
    technologies: ['React', 'Design', 'Web'],
    color: '#f59e0b'
  },
  {
    id: 'data-tools',
    tag: 'Data Tools',
    title: 'Ferramentas de Tratamento de Dados',
    description: 'Suite completa de ferramentas para limpeza, transformação e análise de dados. Interface intuitiva e pronta para uso em produção.',
    image: '/img/project-03.png',
    link: 'https://data-toolkit.streamlit.app/',
    technologies: ['Streamlit', 'Pandas', 'Data Science'],
    color: '#3b82f6'
  },
  {
    id: 'crm',
    tag: 'CRM',
    title: 'CRM WhatsApp',
    description: 'Sistema de CRM integrado com WhatsApp. Automação de comunicação, gestão de leads e histórico de conversas em um único lugar.',
    image: '/img/project-04.png',
    link: 'https://github.com/RafaelDornellMiguel/CRM-WhatsApp',
    technologies: ['WhatsApp API', 'CRM', 'Automation'],
    color: '#25d366'
  },
  {
    id: 'arquitetura',
    tag: 'Artigo',
    title: 'Arquitetura Limpa',
    description: 'Guia e resumo sobre Arquitetura Limpa em desenvolvimento. Conceitos fundamentais, padrões de design e boas práticas documentadas.',
    image: '/img/project-05.png',
    link: 'https://www.notion.so/Arquiterura-Limpa-Development-21311cf0a24c815bac44e58ee434114b',
    technologies: ['Architecture', 'Design Patterns', 'Best Practices'],
    color: '#8b5cf6'
  }
];

export default function Projects() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="work" className="projects-section">
      <div className="projects-container">
        <p className="section-label">{t('projects.label') || 'Portfolio'}</p>
        <h2 className="projects-title">{t('projects.title') || 'Projetos de Dados e Desenvolvimento'}</h2>
        
        <div className="work-grid">
          {PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              className="work-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} - ${project.description}`}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              {/* Background Image */}
              <div 
                className="work-card-image"
                style={{ backgroundImage: `url('${project.image}')` }}
              >
                <div className="work-card-overlay"></div>
              </div>

              {/* Content */}
              <div className="work-card-content">
                <div className="work-card-header">
                  <span className="work-card-tag" role="status">{project.tag}</span>
                  <div className="work-card-icon">
                    <i className="bx bx-up-arrow-alt"></i>
                  </div>
                </div>

                <h3 role="heading" aria-level={3}>{project.title}</h3>
                <p>{project.description}</p>

                {/* Technologies */}
                <div className="work-card-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                {/* CTA */}
                <div className="work-card-cta">
                  <span>{t('projects.viewMore') || 'Ver Projeto'}</span>
                  <i className="bx bx-right-arrow-alt"></i>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
