import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import ServiceModal from './ServiceModal';
import { ArrowRight } from 'lucide-react';
import './Services.css';

interface Service {
  id: string;
  number: string;
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
    title: 'ETL & BI',
    subtitle: 'Inteligência de Dados e Dashboards.',
    image: '/public/img/service-ETL.png',
    modalTitle: 'ETL & Power BI',
    price: 'R$ 2.500 – R$ 8.000',
    time: '15–30 dias',
    description: 'Construção de pipelines automatizados que coletam dados de diversas fontes (CSV, SQL, Firebird) e entregam dashboards em tempo real.'
  },
  {
    id: 'dados',
    number: '02',
    title: 'Eng. Dados',
    subtitle: 'Estruturação de Bancos Relacionais.',
    image: '/public/img/service-analise.png',
    modalTitle: 'Engenharia de Dados',
    price: 'Sob Consulta',
    time: 'Mensal/Projeto',
    description: 'Arquitetura de bancos de dados escaláveis, migração e manutenção de integridade.'
  },
  {
    id: 'backend',
    number: '03',
    title: 'Desenvolvimento de Sistemas',
    subtitle: 'Automação de fluxos em Python/Flask.',
    image: '/public/img/service-Power.png',
    modalTitle: 'Dev Web Backend',
    price: 'R$ 3.000+',
    time: '20–45 dias',
    description: 'Desenvolvimento de APIs e microsserviços para automação interna.'
  },
  {
    id: 'consultoria',
    number: '04',
    title: 'Consultoria',
    subtitle: 'Estratégia de eficiência tecnológica.',
    image: '/public/img/service-consultoria.png',
    modalTitle: 'Consultoria TI',
    price: 'R$ 350/h',
    time: 'Agendado',
    description: 'Diagnóstico técnico e planejamento estratégico de infraestrutura.'
  }
];

export default function Services() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const handleContactClick = () => {
    setShowModal(false);
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 data-aos="fade-down">{t('services.title') || 'Soluções Corporativas'}</h2>
          <p className="services-subtitle" data-aos="fade-up">Serviços especializados em dados e desenvolvimento</p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="service-card group/card"
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="service-overlay" />
              <div className="service-content">
                <div className="service-number">{service.number}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.subtitle}</p>
                <button
                  className="service-btn"
                  onClick={() => handleServiceClick(service)}
                  aria-label={`Saiba mais sobre ${service.title}`}
                >
                  Saiba mais
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onContactClick={handleContactClick}
        />
      )}
    </section>
  );
}
