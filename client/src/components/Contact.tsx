import { useState, useEffect } from 'react';
import AOS from 'aos';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import SuccessModal from './SuccessModal';
import './Contact.css';

const WHATSAPP_NUMBER = '5547996825170';

export default function Contact() {
  const [formData, setFormData] = useState({
    servico: 'etl',
    desc: '',
    nome: '',
    whats: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const createContactMutation = trpc.contact.create.useMutation({
    onSuccess: () => {
      setShowSuccessModal(true);
      setTimeout(() => {
        const msg = encodeURIComponent(
          `Olá Rafael! Tenho interesse em: *${formData.servico.toUpperCase()}*\n\nDescrição: ${formData.desc || '–'}\n\nNome/Empresa: ${formData.nome || '–'}\nWhatsApp: ${formData.whats || '–'}`,
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      }, 800);
      setFormData({
        servico: 'etl',
        desc: '',
        nome: '',
        whats: '',
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao enviar');
      setIsSubmitting(false);
    },
  });

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, servico: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      toast.error('Por favor, preencha seu nome');
      return;
    }
    if (!formData.whats.trim()) {
      toast.error('Por favor, preencha seu WhatsApp');
      return;
    }
    if (!formData.desc.trim()) {
      toast.error('Por favor, descreva o desafio');
      return;
    }

    setIsSubmitting(true);
    const cleanPhone = formData.whats.replace(/\D/g, '');
    const validEmail = `${cleanPhone || 'contato'}@rafael-contact.local`;

    createContactMutation.mutate({
      name: formData.nome,
      email: validEmail,
      phone: formData.whats,
      subject: `Interesse em: ${formData.servico.toUpperCase()}`,
      message: formData.desc,
    });
  };

  return (
    <section id="contato" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-wrapper" data-aos="fade-up">
        <h2 id="contact-title" className="contact-title">Iniciar Projeto com Rafael Dornell Miguel</h2>
        <p className="contact-sub">
          Descreva seu problema e receba uma solução técnica sob medida em ETL, engenharia de dados ou
          desenvolvimento.
        </p>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <fieldset className="field-group">
            <legend className="sr-only">Qual serviço você precisa?</legend>
            <p className="field-label" aria-hidden="true">Qual serviço você precisa?</p>
            <div className="service-pills" role="radiogroup">
              {[
                { value: 'etl', label: 'ETL & BI', icon: 'bx-bar-chart-alt-2' },
                { value: 'dados', label: 'Eng. Dados', icon: 'bx-data' },
                { value: 'backend', label: 'Backend', icon: 'bx-code-alt' },
                { value: 'consultoria', label: 'Consultoria', icon: 'bx-bulb' },
              ].map((service) => (
                <label key={service.value} className={`pill-label ${formData.servico === service.value ? 'checked' : ''}`}>
                  <input
                    type="radio"
                    name="servico"
                    value={service.value}
                    checked={formData.servico === service.value}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    disabled={isSubmitting}
                    className="sr-only"
                  />
                  <i className={`bx ${service.icon}`} aria-hidden="true"></i> <span>{service.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field-group">
            <label htmlFor="desc">Descreva o desafio</label>
            <textarea
              id="desc"
              name="desc"
              rows={4}
              placeholder="Explique brevemente o problema ou o processo que precisa ser otimizado…"
              value={formData.desc}
              onChange={handleInputChange}
              required
              aria-required="true"
              disabled={isSubmitting}
            />
          </div>

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
                required
                aria-required="true"
                disabled={isSubmitting}
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
                required
                aria-required="true"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            <i className={`bx ${isSubmitting ? 'bx-loader-alt bx-spin' : 'bxl-whatsapp'}`} aria-hidden="true"></i>
            <span>{isSubmitting ? 'Enviando...' : 'Enviar solicitação'}</span>
          </button>
        </form>
      </div>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </section>
  );
}
