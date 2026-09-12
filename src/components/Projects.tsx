import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { projects } from "@/content/projects";
import { useReveal } from "@/hooks/useReveal";
import { useTranslation } from "@/i18n";

import styles from "./Projects.module.css";

export default function Projects() {
  const { t } = useTranslation();
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section" id="projetos">
      <div ref={ref} className="container reveal">
        <header className={styles.header}>
          <p className="sectionLabel">{t("projects.label")}</p>
          <h2 className="sectionTitle">{t("projects.title")}</h2>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
            >
              <div className={styles.thumb}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={640}
                  height={400}
                  className={styles.image}
                  sizes="(max-width: 860px) 100vw, 33vw"
                />
              </div>

              <div className={styles.body}>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <span className={styles.link}>
                  {t("projects.viewMore")}
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
