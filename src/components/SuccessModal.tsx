import { Check, X } from "lucide-react";
import { useEffect } from "react";

import { useTranslation } from "@/i18n";

import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./SuccessModal.module.css";

export default function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(onClose, 6_000);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.box}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <X size={15} />
        </button>

        <span className={styles.icon}>
          <Check size={22} />
        </span>

        <h3 id="success-title" className={styles.title}>
          {t("contact.successTitle")}
        </h3>
        <p className={styles.message}>{t("contact.successMessage")}</p>

        <p className={styles.redirect}>
          <WhatsAppIcon size={16} />
          {t("contact.redirecting")}
        </p>
      </div>
    </div>
  );
}
