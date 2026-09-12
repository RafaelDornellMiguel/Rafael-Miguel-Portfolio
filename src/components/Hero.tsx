import { ArrowRight } from "lucide-react";

import { site } from "@/content/site";
import { useTranslation } from "@/i18n";

import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import styles from "./Hero.module.css";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className={styles.hero} id="inicio">
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden="true" />
          {t("hero.available")}
        </p>

        <h1 className={styles.title}>
          Rafael Dornell
          <br />
          <span className={styles.titleAccent}>Miguel</span>
        </h1>

        <p className={styles.description}>{t("hero.description")}</p>

        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={() => scrollTo("contato")}>
            {t("hero.ctaPrimary")}
            <ArrowRight size={16} />
          </button>
          <button type="button" className={styles.secondary} onClick={() => scrollTo("projetos")}>
            {t("hero.ctaSecondary")}
          </button>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>

        <dl className={styles.stats}>
          {site.stats.map((stat) => (
            <div key={stat.labelKey} className={styles.stat}>
              <dt className={styles.statValue}>{stat.value}</dt>
              <dd className={styles.statLabel}>{t(stat.labelKey)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
