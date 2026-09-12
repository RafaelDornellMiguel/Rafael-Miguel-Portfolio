import { useState } from "react";

import { serviceOptions, services } from "@/content/services";
import { site } from "@/content/site";
import { useReveal } from "@/hooks/useReveal";
import { useTranslation } from "@/i18n";
import { apiFetch } from "@/lib/api/client";

import SuccessModal from "./SuccessModal";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./Contact.module.css";

type FormState = {
  service: string;
  message: string;
  name: string;
  phone: string;
};

const EMPTY_FORM: FormState = {
  service: serviceOptions[0]?.value ?? "etl",
  message: "",
  name: "",
  phone: "",
};

function buildWhatsAppUrl(form: FormState): string {
  const serviceLabel = services.find((item) => item.id === form.service)?.title ?? form.service;
  const text = [
    `Olá Rafael! Interesse em: *${serviceLabel}*`,
    "",
    `Descrição: ${form.message}`,
    "",
    `Nome/Empresa: ${form.name}`,
    `WhatsApp: ${form.phone}`,
  ].join("\n");

  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export default function Contact() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const update = (patch: Partial<FormState>) => setForm((current) => ({ ...current, ...patch }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFeedback(null);

    if (form.name.trim().length < 2) return setFeedback(t("errors.nameRequired"));
    if (form.phone.trim().length < 8) return setFeedback(t("errors.phoneRequired"));
    if (form.message.trim().length < 10) return setFeedback(t("errors.descriptionRequired"));

    setSubmitting(true);

    const result = await apiFetch("/api/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: form.service,
        name: form.name.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
      }),
    });

    setSubmitting(false);

    if (!result.ok) {
      // A API já entrega mensagem e ação prontas para o usuário.
      setFeedback(`${result.error.message} ${result.error.action}`);
      return;
    }

    const whatsappUrl = buildWhatsAppUrl(form);
    setSuccess(true);
    setForm(EMPTY_FORM);
    window.setTimeout(() => window.open(whatsappUrl, "_blank", "noopener,noreferrer"), 900);
  };

  return (
    <section className="section" id="contato">
      <div ref={ref} className={`container ${styles.inner} reveal`}>
        <header className={styles.header}>
          <p className="sectionLabel">{t("contact.label")}</p>
          <h2 className="sectionTitle">{t("contact.title")}</h2>
          <p className="sectionSubtitle">{t("contact.subtitle")}</p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <fieldset className={styles.fieldset} disabled={submitting}>
            <legend className={styles.label}>{t("contact.service")}</legend>
            <div className={styles.pills}>
              {serviceOptions.map((option) => (
                <label
                  key={option.value}
                  className={`${styles.pill} ${
                    form.service === option.value ? styles.pillActive : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={option.value}
                    checked={form.service === option.value}
                    onChange={() => update({ service: option.value })}
                    className="srOnly"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="contact-message">
              {t("contact.description")}
            </label>
            <textarea
              id="contact-message"
              className={styles.textarea}
              rows={4}
              maxLength={2000}
              placeholder={t("contact.descriptionPlaceholder")}
              value={form.message}
              onChange={(event) => update({ message: event.target.value })}
              disabled={submitting}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-name">
                {t("contact.name")}
              </label>
              <input
                id="contact-name"
                className={styles.input}
                type="text"
                maxLength={120}
                autoComplete="name"
                placeholder={t("contact.namePlaceholder")}
                value={form.name}
                onChange={(event) => update({ name: event.target.value })}
                disabled={submitting}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="contact-phone">
                {t("contact.phone")}
              </label>
              <input
                id="contact-phone"
                className={styles.input}
                type="tel"
                maxLength={20}
                autoComplete="tel"
                placeholder={t("contact.phonePlaceholder")}
                value={form.phone}
                onChange={(event) => update({ phone: event.target.value })}
                disabled={submitting}
                required
              />
            </div>
          </div>

          {feedback && (
            <p className={styles.feedback} role="alert">
              {feedback}
            </p>
          )}

          <button type="submit" className={styles.submit} disabled={submitting}>
            <WhatsAppIcon size={18} />
            {submitting ? t("contact.submitting") : t("contact.submit")}
          </button>
        </form>
      </div>

      <SuccessModal open={success} onClose={() => setSuccess(false)} />
    </section>
  );
}
