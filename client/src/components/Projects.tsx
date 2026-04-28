import { useEffect } from 'react';
import AOS from 'aos';
import './Projects.css';

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const PROJECTS: Project[] = [
  {
    id: 'guia-etl',
    tag: 'Guia ETL',
    title: 'Guia Prático de ETL',
    description: 'Plataforma interativa com guias e ferramentas para aprender e dominar ETL. Desenvolvido com tecnologias modernas e deploy na Vercel.',
    image: '/img/project-01.png',
    link: 'https://guia-elt.vercel.app/'
  },
  {
    id: 'stammers',
    tag: 'Rock Band',
    title: 'Stammers - Official',
    description: 'Site oficial da banda Stammers. Design moderno com experiência imersiva para fãs. Vitrine completa da banda com integração de redes sociais.',
    image: '/img/project-02.png',
    link: 'https://www.stammerofficial.com/'
  },
  {
    id: 'data-tools',
    tag: 'Data Tools',
    title: 'Ferramentas de Tratamento de Dados',
    description: 'Suite completa de ferramentas para limpeza, transformação e análise de dados. Interface intuitiva e pronta para uso em produção.',
    image: '/img/project-03.png',
    link: 'https://data-toolkit.streamlit.app/'
  },
  {
    id: 'crm',
    tag: 'CRM',
    title: 'CRM WhatsApp',
    description: 'Sistema de CRM integrado com WhatsApp. Automação de comunicação, gestão de leads e histórico de conversas em um único lugar.',
    image: '/img/project-04.png',
    link: 'https://github.com/RafaelDornellMiguel/CRM-WhatsApp'
  },
  {
    id: 'arquitetura',
    tag: 'Artigo',
    title: 'Arquitetura Limpa',
    description: 'Guia e resumo sobre Arquitetura Limpa em desenvolvimento. Conceitos fundamentais, padrões de design e boas práticas documentadas.',
    image: '/img/project-05.png',
    link: 'https://www.notion.so/Arquiterura-Limpa-Development-21311cf0a24c815bac44e58ee434114b'
  }
];

export default function Projects() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="work" className="projects-section">
      <div className="projects-container">
        <p className="section-label">Portfolio</p>
        <h2 className="projects-title">Projetos de Dados e Desenvolvimento</h2>
        
        <div className="work-grid">
          {PROJECTS.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="work-card"
              style={{ backgroundImage: `url('${project.image}')` }}
              target="_blank"
              rel="noopener"
              aria-label={`${project.title} - ${project.description}`}
            >
              <span className="work-card-tag">{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <i className="bx bx-up-arrow-alt work-card-arrow"></i>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
