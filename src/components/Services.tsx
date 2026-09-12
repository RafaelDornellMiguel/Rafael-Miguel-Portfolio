import { ArrowRight, BarChart3, Code2, Database, Lightbulb } from "lucide-react";
import { useState } from "react";

import { services, type Service } from "@/content/services";
import { useReveal } from "@/hooks/useReveal";
import { useTranslation } from "@/i18n";

import ServiceModal from "./ServiceModal";
import styles from "./Services.module.css";

const ICONS = {
  chart: BarChart3,
  database: Database,
  code: Code2,
  bulb: Lightbulb,
} as const;

export default function Services() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section className="section" id="servicos">
      <div ref={ref} className={`container reveal`}>
        <header className={styles.header}>
          <p className="sectionLabel">{t("services.label")}</p>
          <h2 className="sectionTitle">{t("services.title")}</h2>
          <p className="sectionSubtitle">{t("services.subtitle")}</p>
        </header>

        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <button
                key={service.id}
                type="button"
                className={styles.card}
                onClick={() => setSelected(service)}
              >
                <span className={styles.cardTop}>
                  <span className={styles.icon}>
                    <Icon size={18} />
                  </span>
                  <span className={styles.number}>{service.number}</span>
                </span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardText}>{service.subtitle}</p>
                <span className={styles.cta}>
                  {t("services.cta")}
                  <ArrowRight size={14} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <ServiceModal
          service={selected}
          onClose={() => setSelected(null)}
          onQuote={() => {
            setSelected(null);
            document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}
    </section>
  );
}
