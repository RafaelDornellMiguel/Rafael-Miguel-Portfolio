import { useEffect, useState } from 'react';
import './SuccessModal.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Auto-close após 5 segundos
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div className={`success-modal-overlay ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      <div className={`success-modal ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        {/* Animated checkmark */}
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Content */}
        <h3 className="success-title">Mensagem Enviada com Sucesso!</h3>
        <p className="success-message">
          Obrigado por entrar em contato. Você será redirecionado para o WhatsApp em breve.
        </p>

        {/* Redirect info */}
        <div className="success-info">
          <p className="info-text">
            <i className="bx bxl-whatsapp"></i>
            Redirecionando para WhatsApp...
          </p>
        </div>

        {/* Close button */}
        <button className="success-close" onClick={handleClose} aria-label="Fechar modal">
          <i className="bx bx-x"></i>
        </button>

        {/* Progress bar */}
        <div className="success-progress"></div>
      </div>
    </div>
  );
}
