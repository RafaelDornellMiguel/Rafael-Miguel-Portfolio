import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { ADMIN_LOGIN_REDIRECT, requireAdminPage } from "@/lib/auth/guard";
import { apiFetch } from "@/lib/api/client";
import type { SerializedError } from "@/lib/api/errors";
import type { AnalyticsSummary, Breakdown } from "@/types/analytics";

import styles from "./admin.module.css";

const RANGES = [7, 30, 90] as const;

function BreakdownList({ title, rows }: { title: string; rows: Breakdown[] }) {
  const max = Math.max(1, ...rows.map((row) => row.views));

  return (
    <section className={styles.panel}>
      <h2 className={styles.panelTitle}>{title}</h2>
      {rows.length === 0 ? (
        <p className={styles.empty}>Sem dados no período.</p>
      ) : (
        <ul className={styles.breakdown}>
          {rows.map((row) => (
            <li key={row.label} className={styles.breakdownRow}>
              <span className={styles.breakdownLabel}>{row.label}</span>
              <span className={styles.breakdownBar}>
                <span style={{ width: `${(row.views / max) * 100}%` }} />
              </span>
              <span className={styles.breakdownValue}>{row.views}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function AdminDashboard({ login }: { login: string }) {
  const [days, setDays] = useState<number>(30);
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<SerializedError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void apiFetch<AnalyticsSummary>(`/api/v1/admin/analytics?days=${days}`).then((result) => {
      if (cancelled) return;
      setLoading(false);
      if (result.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [days]);

  const peak = Math.max(1, ...(data?.daily.map((d) => d.views) ?? [1]));

  return (
    <>
      <Head>
        <title>Painel | Rafael Dornell Miguel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>&gt;_</span>
            <span>painel</span>
          </div>
          <div className={styles.topbarActions}>
            <Link href="/" className={styles.topbarLink}>
              Ver site
            </Link>
            <span className={styles.user}>{login}</span>
            <button
              type="button"
              className={styles.signOut}
              onClick={() => void signOut({ callbackUrl: "/" })}
            >
              Sair
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>Acessos</h1>
              <p className={styles.subtitle}>
                Medição sem cookie e sem IP: o visitante é um pseudônimo que troca todo dia.
              </p>
            </div>
            <div className={styles.ranges}>
              {RANGES.map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`${styles.range} ${days === range ? styles.rangeActive : ""}`}
                  onClick={() => setDays(range)}
                  aria-pressed={days === range}
                >
                  {range}d
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className={styles.error} role="alert">
              <p className={styles.errorMessage}>{error.message}</p>
              <p className={styles.errorAction}>{error.action}</p>
              <code className={styles.errorCode}>{error.error_location_code}</code>
            </div>
          )}

          {data && !data.databaseConfigured && (
            <div className={styles.warning} role="status">
              Banco não configurado neste ambiente — nenhum acesso está sendo gravado.
            </div>
          )}

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Visualizações</span>
              <span className={styles.statValue}>
                {loading ? "—" : (data?.totals.views ?? 0)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Visitantes únicos</span>
              <span className={styles.statValue}>
                {loading ? "—" : (data?.totals.visitors ?? 0)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Período</span>
              <span className={styles.statValue}>{days} dias</span>
            </div>
          </div>

          <section className={styles.panel}>
            <h2 className={styles.panelTitle}>Por dia</h2>
            {!data || data.daily.length === 0 ? (
              <p className={styles.empty}>Sem dados no período.</p>
            ) : (
              <div className={styles.chart}>
                {data.daily.map((point) => (
                  <div key={point.day} className={styles.chartCol} title={`${point.day}: ${point.views} visualizações`}>
                    <div
                      className={styles.chartBar}
                      style={{ height: `${Math.max(4, (point.views / peak) * 100)}%` }}
                    />
                    <span className={styles.chartLabel}>{point.day.slice(8)}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className={styles.grid}>
            <BreakdownList title="Páginas" rows={data?.paths ?? []} />
            <BreakdownList title="Origem do tráfego" rows={data?.referrers ?? []} />
            <BreakdownList title="Dispositivo" rows={data?.devices ?? []} />
            <BreakdownList title="País" rows={data?.countries ?? []} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{ login: string }> = async (context) => {
  const guard = await requireAdminPage(context);
  if (!guard.ok) return ADMIN_LOGIN_REDIRECT;

  return { props: { login: guard.login } };
};
