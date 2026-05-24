import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import SuccessModal from './SuccessModal';
import WhatsAppIcon from './WhatsAppIcon';
import './Contact.css';

const WHATSAPP_NUMBER = '5547996825170';

const SERVICE_OPTIONS = [
  { value: 'etl',         label: 'ETL & BI' },
  { value: 'dados',       label: 'Eng. Dados' },
  { value: 'backend',     label: 'Backend' },
  { value: 'consultoria', label: 'Consultoria' },
];

export default function Contact() {
  const [form, setForm]       = useState({ servico: 'etl', desc: '', nome: '', whats: '' });
  const [submitting, setSub]  = useState(false);
  const [success, setSuccess] = useState(false);

  const mutation = trpc.contact.create.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        const msg = encodeURIComponent(
          `Olá Rafael! Interesse em: *${form.servico.toUpperCase()}*\n\nDescrição: ${form.desc || '–'}\n\nNome/Empresa: ${form.nome || '–'}\nWhatsApp: ${form.whats || '–'}`,
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
      }, 800);
      setForm({ servico: 'etl', desc: '', nome: '', whats: '' });
      setSub(false);
    },
    onError: (err) => {
      toast.error(err.message || 'Erro ao enviar. Tente novamente.');
      setSub(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim())  { toast.error('Preencha seu nome');      return; }
    if (!form.whats.trim()) { toast.error('Preencha seu WhatsApp');  return; }
    if (!form.desc.trim())  { toast.error('Descreva o desafio');     return; }
    setSub(true);
    const phone = form.whats.replace(/\D/g, '');
    mutation.mutate({
      name:    form.nome,
      email:   `${phone || 'contato'}@rafael-contact.local`,
      phone:   form.whats,
      subject: `Interesse em: ${form.servico.toUpperCase()}`,
      message: form.desc,
    });
  };

  return (
    <section id="contato" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-wrapper" data-aos="fade-up">

        <div className="contact-header">
          <p className="section-label">Contato</p>
          <h2 id="contact-heading">Iniciar um Projeto</h2>
          <p className="contact-sub">
            Descreva seu desafio e receba uma proposta técnica sob medida.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="contact-form" noValidate>

          <div className="form-group">
            <p className="form-label">Qual serviço você precisa?</p>
            <div className="service-type-row" role="radiogroup">
              {SERVICE_OPTIONS.map(opt => (
                <label
                  key={opt.value}
                  className={`service-type-pill${form.servico === opt.value ? ' active' : ''}`}
                >
                  <input
                    type="radio"
                    name="servico"
                    value={opt.value}
                    checked={form.servico === opt.value}
                    onChange={e => setForm(p => ({ ...p, servico: e.target.value }))}
                    disabled={submitting}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-desc">Descreva o desafio</label>
            <textarea
              id="contact-desc"
              className="form-textarea"
              name="desc"
              rows={4}
              placeholder="Explique o problema ou processo que precisa ser otimizado…"
              value={form.desc}
              onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
              disabled={submitting}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="contact-nome">Nome / Empresa</label>
              <input
                id="contact-nome"
                className="form-input"
                type="text"
                placeholder="Ex: João Silva"
                value={form.nome}
                onChange={e => setForm(p => ({ ...p, nome: e.target.value }))}
                autoComplete="name"
                disabled={submitting}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-whats">WhatsApp</label>
              <input
                id="contact-whats"
                className="form-input"
                type="tel"
                placeholder="(47) 9 0000-0000"
                value={form.whats}
                onChange={e => setForm(p => ({ ...p, whats: e.target.value }))}
                autoComplete="tel"
                disabled={submitting}
                required
              />
            </div>
          </div>

          <button type="submit" className="form-submit" disabled={submitting}>
            <WhatsAppIcon size={18} />
            {submitting ? 'Enviando…' : 'Enviar pelo WhatsApp'}
          </button>

        </form>
      </div>

      <SuccessModal isOpen={success} onClose={() => setSuccess(false)} />
    </section>
  );
}
