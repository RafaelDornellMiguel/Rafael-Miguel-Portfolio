import { useState, useEffect, useCallback } from 'react';
import './SuccessModal.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`success-modal-overlay ${isVisible ? 'visible' : ''}`} 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className={`success-modal ${isVisible ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">
          <svg viewBox="0 0 52 52">
            <circle className="success-circle" cx="26" cy="26" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
            <path className="success-check" fill="none" stroke="currentColor" strokeWidth="2" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        
        <h3 id="success-title" className="success-title">Mensagem Enviada com Sucesso!</h3>
        <p className="success-message">Obrigado por entrar em contato. Você será redirecionado para o WhatsApp em breve.</p>
        
        <div className="success-info">
          <p className="info-text">
            <i className="bx bxl-whatsapp"></i>
            Redirecionando para o WhatsApp...
          </p>
        </div>

        <button className="success-close" onClick={handleClose} aria-label="Fechar">
          <i className="bx bx-x"></i>
        </button>

        <div className="success-progress"></div>
      </div>
    </div>
  );
}
