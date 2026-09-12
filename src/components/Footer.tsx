import { site } from "@/content/site";
import { useTranslation } from "@/i18n";

import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {year} {site.name} — {t("footer.rights")}
        </p>

        <nav className={styles.links} aria-label="Redes sociais">
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <LinkedinIcon size={14} /> LinkedIn
          </a>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <GithubIcon size={14} /> GitHub
          </a>
          <a
            href={site.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </nav>
      </div>
    </footer>
  );
}
