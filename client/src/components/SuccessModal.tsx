import { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import './SuccessModal.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [visible, setVisible] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const t = setTimeout(handleClose, 5000);
      return () => clearTimeout(t);
    }
  }, [isOpen, handleClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  if (!isOpen && !visible) return null;

  return (
    <div
      className={`success-modal-overlay${visible ? ' visible' : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div
        className={`success-modal${visible ? ' visible' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button className="success-close" onClick={handleClose} aria-label="Fechar">
          <X size={15} />
        </button>

        <div className="success-icon">
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" />
            <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M14 27l8 8 16-16" />
          </svg>
        </div>

        <h3 id="success-title" className="success-title">Mensagem Enviada!</h3>
        <p className="success-message">
          Obrigado pelo contato. Você será redirecionado para o WhatsApp em instantes.
        </p>

        <div className="success-info">
          <WhatsAppIcon size={20} className="success-whatsapp-icon" />
          <span>Redirecionando para o WhatsApp…</span>
        </div>

        <div className="success-progress" />
      </div>
    </div>
  );
}
