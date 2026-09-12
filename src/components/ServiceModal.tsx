import { ArrowRight, X } from "lucide-react";
import { useEffect } from "react";

import type { Service } from "@/content/services";
import { useTranslation } from "@/i18n";

import styles from "./ServiceModal.module.css";

type Props = {
  service: Service;
  onClose: () => void;
  onQuote: () => void;
};

export default function ServiceModal({ service, onClose, onQuote }: Props) {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.box}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <X size={16} />
        </button>

        <h2 id="service-modal-title" className={styles.title}>
          {service.modalTitle}
        </h2>

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt>{t("services.investment")}</dt>
            <dd>{service.price}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt>{t("services.duration")}</dt>
            <dd>{service.time}</dd>
          </div>
        </dl>

        <p className={styles.description}>{service.description}</p>

        <button type="button" className={styles.quote} onClick={onQuote}>
          {t("services.quote")}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
