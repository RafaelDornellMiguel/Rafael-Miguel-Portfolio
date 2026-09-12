import { Download } from "lucide-react";

import { additionalSkills, coreSkills, experiences } from "@/content/experience";
import { site } from "@/content/site";
import { useReveal } from "@/hooks/useReveal";
import { useTranslation } from "@/i18n";

import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import WhatsAppIcon from "./WhatsAppIcon";
import styles from "./Curriculum.module.css";

export default function Curriculum() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="curriculo">
      <div ref={ref} className="container reveal">
        <header className={styles.header}>
          <div>
            <p className="sectionLabel">{t("curriculum.label")}</p>
            <h2 className="sectionTitle">{t("curriculum.title")}</h2>
          </div>

          {site.resumeUrl && (
            <a href={site.resumeUrl} download className={styles.download}>
              <Download size={14} />
              {t("curriculum.download")}
            </a>
          )}
        </header>

        <div className={styles.grid}>
          <div>
            <h3 className={styles.columnTitle}>{t("curriculum.experience")}</h3>

            <ol className={styles.timeline}>
              {experiences.map((experience) => (
                <li key={experience.company} className={styles.item}>
                  <div className={styles.itemMeta}>
                    <span className={styles.year}>{experience.year}</span>
                    {experience.badge && <span className={styles.badge}>{experience.badge}</span>}
                  </div>
                  <div className={styles.itemBody}>
                    <p className={styles.itemTitle}>{experience.title}</p>
                    <p className={styles.company}>{experience.company}</p>
                    <p className={styles.itemText}>{experience.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.socials}>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <LinkedinIcon size={15} /> LinkedIn
              </a>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <GithubIcon size={15} /> GitHub
              </a>
              <a
                href={site.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <WhatsAppIcon size={15} /> WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h3 className={styles.columnTitle}>{t("curriculum.skills")}</h3>

            <ul className={styles.skills}>
              {coreSkills.map((skill) => (
                <li key={skill.label} className={styles.skillRow}>
                  <div className={styles.skillMeta}>
                    <span>{skill.label}</span>
                    <span className={styles.skillValue}>{skill.level}%</span>
                  </div>
                  <div
                    className={styles.bar}
                    role="progressbar"
                    aria-label={skill.label}
                    aria-valuenow={skill.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className={styles.barFill} style={{ width: `${skill.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            <p className={styles.tagsLabel}>{t("curriculum.moreSkills")}</p>
            <ul className={styles.tags}>
              {additionalSkills.map((skill) => (
                <li key={skill} className={styles.tag}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
