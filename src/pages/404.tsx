import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import Seo from "@/components/Seo";
import { useTranslation } from "@/i18n";

import styles from "./404.module.css";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <>
      <Seo title="404 | Rafael Dornell Miguel" path="/404" />
      <div className={`container ${styles.wrapper}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>{t("notFound.title")}</h1>
        <p className={styles.description}>{t("notFound.description")}</p>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={16} /> {t("notFound.back")}
        </Link>
      </div>
    </>
  );
}
