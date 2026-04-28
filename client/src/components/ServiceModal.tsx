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
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal active" role="dialog" aria-modal="true" aria-labelledby="modalTitle" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
          <i className="bx bx-x"></i>
        </button>
        <h2 className="modal-title" id="modalTitle">{service.modalTitle}</h2>
        <div className="modal-meta">
          <div className="modal-meta-box">
            <span>Investimento</span>
            <b>{service.price}</b>
          </div>
          <div className="modal-meta-box">
            <span>Tempo Médio</span>
            <b>{service.time}</b>
          </div>
        </div>
        <p className="modal-desc">{service.description}</p>
        <button className="btn-modal-cta" onClick={onContactClick}>
          Fazer Orçamento
        </button>
      </div>
    </div>
  );
}
