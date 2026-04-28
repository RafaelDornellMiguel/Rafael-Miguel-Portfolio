import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import ServiceModal from './ServiceModal';
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
    image: '/img/service-01.png',
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
    image: '/img/service-02.png',
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
    image: '/img/service-03.png',
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
    image: '/img/service-04.png',
    modalTitle: 'Consultoria TI',
    price: 'R$ 350/h',
    time: 'Agendado',
    description: 'Diagnóstico técnico e planejamento estratégico de infraestrutura.'
  }
];

export default function Services() {
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

  return (
    <section id="services" className="services-section">
      <h2>Soluções Corporativas de Dados e Desenvolvimento</h2>
      
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 45,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 20000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={700}
        modules={[EffectCoverflow, Autoplay]}
        className="services-swiper"
      >
        {SERVICES.map((service) => (
          <SwiperSlide key={service.id} className="service-slide">
            <div
              className="service-card"
              style={{ backgroundImage: `url('${service.image}')` }}
              onClick={() => handleServiceClick(service)}
            >
              <span className="slide-num">{service.number}</span>
              <h3 className="slide-title">{service.title}</h3>
              <p className="slide-desc">{service.subtitle}</p>
              <button 
                className="slide-btn"
                aria-label={`Ver detalhes ${service.title}`}
              >
                Ver detalhes →
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showModal && selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setShowModal(false)}
          onContactClick={() => {
            setShowModal(false);
            document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </section>
  );
}
