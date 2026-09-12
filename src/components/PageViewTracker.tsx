import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

/**
 * Envia um evento de visualização por navegação. Falha em silêncio de propósito:
 * medição nunca pode atrapalhar a navegação de quem está no site.
 */
export default function PageViewTracker() {
  const router = useRouter();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const send = (path: string) => {
      // O painel não é medido: é a sua própria navegação.
      if (path.startsWith("/admin") || lastPath.current === path) return;
      lastPath.current = path;

      void fetch("/api/v1/events/pageview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, referrer: document.referrer || undefined }),
        keepalive: true,
      }).catch(() => {
        /* medição é best-effort */
      });
    };

    send(router.pathname);
    router.events.on("routeChangeComplete", send);
    return () => router.events.off("routeChangeComplete", send);
  }, [router]);

  return null;
}
