import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { GithubIcon } from "@/components/BrandIcons";
import { isAuthConfigured } from "@/lib/auth/guard";

import styles from "./admin.module.css";

export default function AdminLoginPage({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const hasError = typeof router.query.error === "string";

  return (
    <>
      <Head>
        <title>Entrar | Painel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          <p className={styles.loginMark}>&gt;_</p>
          <h1 className={styles.loginTitle}>Painel</h1>
          <p className={styles.loginText}>
            Acesso restrito à conta administradora do site.
          </p>

          {!configured && (
            <p className={styles.loginError} role="alert">
              O painel ainda não foi configurado neste ambiente: faltam as
              credenciais do GitHub OAuth. Consulte o .env.example.
            </p>
          )}

          {configured && hasError && (
            <p className={styles.loginError} role="alert">
              Esta conta não tem permissão para entrar no painel.
            </p>
          )}

          <button
            type="button"
            className={styles.loginButton}
            disabled={submitting || !configured}
            onClick={() => {
              setSubmitting(true);
              void signIn("github", { callbackUrl: "/admin" });
            }}
          >
            <GithubIcon size={18} />
            {submitting ? "Redirecionando…" : "Entrar com GitHub"}
          </button>

          <p className={styles.loginNote}>
            A verificação em duas etapas é a da sua conta GitHub.
          </p>
        </div>
      </div>
    </>
  );
}

// Lido no servidor: o navegador nunca vê nome de variável de ambiente.
export const getServerSideProps: GetServerSideProps<{ configured: boolean }> = async () => ({
  props: { configured: isAuthConfigured() },
});
