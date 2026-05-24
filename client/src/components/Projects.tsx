import { useEffect } from 'react';
import AOS from 'aos';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

interface Project {
  id: string;
  tags: string[];
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'guia-etl',
    tags: ['ETL', 'Python'],
    title: 'Guia Prático de ETL',
    description: 'Plataforma interativa com guias e ferramentas para aprender e dominar ETL. Deploy na Vercel.',
    image: '/img/project-01.png',
    link: 'https://guia-elt.vercel.app/',
    technologies: ['Python', 'ETL', 'Data Pipeline']
  },
  {
    id: 'stammers',
    tags: ['React', 'Design'],
    title: 'Stammers — Official',
    description: 'Site oficial da banda Stammers. Design imersivo com integração de redes sociais e vitrine completa.',
    image: '/img/project-02.png',
    link: 'https://www.stammerofficial.com/',
    technologies: ['React', 'Design', 'Web']
  },
  {
    id: 'data-tools',
    tags: ['Data Science'],
    title: 'Ferramentas de Dados',
    description: 'Suite completa de ferramentas para limpeza, transformação e análise de dados. Interface intuitiva e pronta para produção.',
    image: '/img/project-03.png',
    link: 'https://data-toolkit.streamlit.app/',
    technologies: ['Streamlit', 'Pandas', 'Data Science']
  },
  {
    id: 'crm',
    tags: ['CRM', 'Automation'],
    title: 'CRM WhatsApp',
    description: 'Sistema de CRM integrado com WhatsApp. Automação de comunicação, gestão de leads e histórico de conversas.',
    image: '/img/project-04.png',
    link: 'https://github.com/RafaelDornellMiguel/CRM-WhatsApp',
    technologies: ['WhatsApp API', 'CRM', 'Automation']
  },
  {
    id: 'arquitetura',
    tags: ['Artigo', 'Arquitetura'],
    title: 'Arquitetura Limpa',
    description: 'Guia e resumo sobre Arquitetura Limpa. Conceitos fundamentais, padrões de design e boas práticas documentadas.',
    image: '/img/project-05.png',
    link: 'https://www.notion.so/Arquiterura-Limpa-Development-21311cf0a24c815bac44e58ee434114b',
    technologies: ['Architecture', 'Design Patterns', 'Best Practices']
  }
];

export default function Projects() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="work" className="projects-section">
      <div className="projects-wrapper">

        <div className="projects-header">
          <p className="section-label">{t('projects.label') || 'Portfolio'}</p>
          <h2 className="projects-title">{t('projects.title') || 'Projetos de Dados & Desenvolvimento'}</h2>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              className="project-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={project.title}
              data-aos="fade-up"
              data-aos-delay={`${index * 80}`}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>

              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-links">
                  <span className="project-link">
                    {t('projects.viewMore') || 'Ver Projeto'}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
