import { useState, useEffect } from 'react';
import AOS from 'aos';
import './Contact.css';

const WHATSAPP_NUMBER = '5547996825170';

export default function Contact() {
  const [formData, setFormData] = useState({
    servico: 'etl',
    desc: '',
    nome: '',
    whats: ''
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      servico: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const msg = encodeURIComponent(
      `Olá Rafael! Tenho interesse em: *${formData.servico.toUpperCase()}*\n\nDescrição: ${formData.desc || '–'}\n\nNome/Empresa: ${formData.nome || '–'}\nWhatsApp: ${formData.whats || '–'}`
    );
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    
    // Reset form
    setFormData({
      servico: 'etl',
      desc: '',
      nome: '',
      whats: ''
    });
  };

  return (
    <section id="contato" className="contact-section">
      <div className="contact-wrapper" data-aos="fade-up">
        <h2 className="contact-title">Iniciar Projeto com Rafael Dornell Miguel</h2>
        <p className="contact-sub">Descreva seu problema e receba uma solução técnica sob medida em ETL, engenharia de dados ou desenvolvimento.</p>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {/* Service selector */}
          <div className="field-group">
            <label>Qual serviço você precisa?</label>
            <div className="service-pills" role="radiogroup" aria-label="Tipo de serviço">
              {[
                { value: 'etl', label: 'ETL & BI', icon: 'bx-bar-chart-alt-2' },
                { value: 'dados', label: 'Eng. Dados', icon: 'bx-data' },
                { value: 'backend', label: 'Backend', icon: 'bx-code-alt' },
                { value: 'consultoria', label: 'Consultoria', icon: 'bx-bulb' }
              ].map(service => (
                <label key={service.value} className="pill-label">
                  <input
                    type="radio"
                    name="servico"
                    value={service.value}
                    checked={formData.servico === service.value}
                    onChange={(e) => handleServiceChange(e.target.value)}
                  />
                  <i className={`bx ${service.icon}`}></i> {service.label}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="field-group">
            <label htmlFor="desc">Descreva o desafio</label>
            <textarea
              id="desc"
              name="desc"
              rows={4}
              placeholder="Explique brevemente o problema ou o processo que precisa ser otimizado…"
              value={formData.desc}
              onChange={handleInputChange}
              aria-label="Descrição do projeto"
            />
          </div>

          {/* Name + phone */}
          <div className="field-row">
            <div className="field-group">
              <label htmlFor="nome">Nome / Empresa</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Ex: João Silva"
                value={formData.nome}
                onChange={handleInputChange}
                autoComplete="name"
              />
            </div>
            <div className="field-group">
              <label htmlFor="whats">WhatsApp</label>
              <input
                type="tel"
                id="whats"
                name="whats"
                placeholder="(47) 9 0000-0000"
                value={formData.whats}
                onChange={handleInputChange}
                autoComplete="tel"
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-submit" aria-label="Enviar solicitação de orçamento">
            <i className="bx bxl-whatsapp"></i>
            Enviar solicitação
          </button>
        </form>
      </div>
    </section>
  );
}
