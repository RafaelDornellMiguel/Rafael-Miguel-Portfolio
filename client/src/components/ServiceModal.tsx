import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import './ServiceModal.css';

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

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  onContactClick: () => void;
}

export default function ServiceModal({ service, onClose, onContactClick }: ServiceModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-box">
        <button className="modal-close-btn" onClick={onClose} aria-label="Fechar">
          <X size={16} />
        </button>

        <h2 className="modal-heading" id="modal-heading">{service.modalTitle}</h2>

        <div className="modal-meta">
          <div className="modal-meta-item">
            <span>Investimento</span>
            <strong>{service.price}</strong>
          </div>
          <div className="modal-meta-item">
            <span>Tempo Médio</span>
            <strong>{service.time}</strong>
          </div>
        </div>

        <p className="modal-description">{service.description}</p>

        <button className="modal-cta" onClick={onContactClick}>
          Fazer Orçamento <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
