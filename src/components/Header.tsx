import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/i18n";

import styles from "./Header.module.css";

const SECTIONS = [
  { id: "sobre", labelKey: "nav.sobre" },
  { id: "servicos", labelKey: "nav.servicos" },
  { id: "projetos", labelKey: "nav.projetos" },
  { id: "curriculo", labelKey: "nav.curriculo" },
];

export default function Header() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    if (router.pathname !== "/") {
      void router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label={`${t("nav.sobre")} — home`}>
          <span className={styles.logoMark} aria-hidden="true">
            &gt;_
          </span>
          <span className={styles.logoText}>rafael.miguel</span>
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`/#${section.id}`}
              className={styles.navLink}
              onClick={(event) => {
                event.preventDefault();
                goToSection(section.id);
              }}
            >
              {t(section.labelKey)}
            </a>
          ))}
          <Link href="/blog" className={styles.navLink}>
            {t("nav.blog")}
          </Link>
        </nav>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleLanguage}
            aria-label={language === "pt" ? "Switch to English" : "Mudar para Português"}
          >
            <span className={styles.langCode}>{language.toUpperCase()}</span>
          </button>

          <button
            type="button"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="/#contato"
            className={styles.contactButton}
            onClick={(event) => {
              event.preventDefault();
              goToSection("contato");
            }}
          >
            {t("nav.contato")}
          </a>

          <button
            type="button"
            className={`${styles.iconButton} ${styles.menuButton}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Menu mobile">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`/#${section.id}`}
              className={styles.mobileLink}
              onClick={(event) => {
                event.preventDefault();
                goToSection(section.id);
              }}
            >
              {t(section.labelKey)}
            </a>
          ))}
          <Link href="/blog" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            {t("nav.blog")}
          </Link>
          <a
            href="/#contato"
            className={styles.mobileCta}
            onClick={(event) => {
              event.preventDefault();
              goToSection("contato");
            }}
          >
            {t("nav.contato")}
          </a>
        </nav>
      )}
    </header>
  );
}
