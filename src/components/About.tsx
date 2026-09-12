import Image from "next/image";

import { site } from "@/content/site";
import { useReveal } from "@/hooks/useReveal";
import { useTranslation } from "@/i18n";

import styles from "./About.module.css";

export default function About() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="sobre">
      <div ref={ref} className={`container ${styles.inner} reveal`}>
        <div className={styles.media}>
          <Image
            src={site.profileImage}
            alt={site.name}
            width={480}
            height={600}
            className={styles.photo}
            sizes="(max-width: 860px) 100vw, 40vw"
          />
        </div>

        <div className={styles.content}>
          <p className="sectionLabel">{t("about.label")}</p>
          <h2 className="sectionTitle">
            {site.name}
            <br />
            <span className={styles.role}>
              {t("about.role1")} &amp; {t("about.role2")}
            </span>
          </h2>

          <p className={styles.text}>{t("about.description")}</p>
          <p className={styles.text}>{t("about.experience")}</p>

          <ul className={styles.skills}>
            {site.aboutSkills.map((skill) => (
              <li key={skill} className={styles.skill}>
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
