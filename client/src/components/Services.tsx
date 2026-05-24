import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import ServiceModal from './ServiceModal';
import { ArrowRight, Database, BarChart3, Code2, Lightbulb } from 'lucide-react';
import './Services.css';

interface Service {
  id: string;
  number: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  image: string;
  modalTitle: string;
  price: string;
  time: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    id: 'etl',
    number: '01',
    icon: <BarChart3 size={22} />,
    title: 'ETL & BI',
    subtitle: 'Pipelines automatizados e dashboards em tempo real. Dados brutos → decisões.',
    image: '/img/service-ETL.png',
    modalTitle: 'ETL & Power BI',
    price: 'R$ 2.500 – R$ 8.000',
    time: '15–30 dias',
    description: 'Construção de pipelines automatizados que coletam dados de diversas fontes (CSV, SQL, Firebird) e entregam dashboards em tempo real. Integração com Power BI, Google Data Studio e ferramentas BI sob medida.'
  },
  {
    id: 'dados',
    number: '02',
    icon: <Database size={22} />,
    title: 'Eng. de Dados',
    subtitle: 'Arquitetura de bancos relacionais escaláveis e migração segura de dados.',
    image: '/img/service-analise.png',
    modalTitle: 'Engenharia de Dados',
    price: 'Sob Consulta',
    time: 'Mensal / Projeto',
    description: 'Modelagem de bancos de dados escaláveis, migração entre sistemas (PostgreSQL, SQL Server, Firebird) e manutenção de integridade referencial em ambientes críticos.'
  },
  {
    id: 'backend',
    number: '03',
    icon: <Code2 size={22} />,
    title: 'Desenvolvimento de Sistemas',
    subtitle: 'APIs, microsserviços e automação de fluxos em Python e TypeScript.',
    image: '/img/service-Power.png',
    modalTitle: 'Dev Backend & Sistemas',
    price: 'R$ 3.000+',
    time: '20–45 dias',
    description: 'Desenvolvimento de APIs REST e microsserviços para automação interna, integrações entre sistemas e automação de processos operacionais com Python, Flask e Node.js.'
  },
  {
    id: 'consultoria',
    number: '04',
    icon: <Lightbulb size={22} />,
    title: 'Consultoria',
    subtitle: 'Diagnóstico técnico e planejamento estratégico de infraestrutura de dados.',
    image: '/img/service-consultoria.png',
    modalTitle: 'Consultoria TI',
    price: 'R$ 350/h',
    time: 'Agendado',
    description: 'Análise da infraestrutura de dados atual, identificação de gargalos, proposta de arquitetura e roadmap de implementação. Ideal para times que precisam de direção técnica sênior.'
  }
];

export default function Services() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="services-section">
      <div className="services-wrapper">

        <div className="services-header">
          <p className="section-label">Serviços</p>
          <h2>{t('services.title') || 'Soluções Corporativas'}</h2>
          <p className="services-subtitle">
            Especializado em dados, automação e desenvolvimento backend
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              className="service-card"
              onClick={() => setSelectedService(service)}
              data-aos="fade-up"
              data-aos-delay={`${index * 80}`}
              aria-label={`Saiba mais sobre ${service.title}`}
            >
              <div className="service-icon">{service.icon}</div>
              <div className="service-num">{service.number}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.subtitle}</p>
              <span className="service-cta">
                Saiba mais <ArrowRight size={14} />
              </span>
            </button>
          ))}
        </div>

      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onContactClick={() => {
            setSelectedService(null);
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </section>
  );
}
