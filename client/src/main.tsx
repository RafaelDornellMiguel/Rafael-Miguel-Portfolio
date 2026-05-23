import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import superjson from "superjson";

import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";
import '@/i18n/config';

// 1. Configuração do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof TRPCClientError && error.message === UNAUTHED_ERR_MSG) return false;
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5,
    },
  },
});

// 2. Lógica de Redirecionamento (Auth)
const redirectToLoginIfUnauthorized = (error: unknown): void => {
  if (error instanceof TRPCClientError && error.message === UNAUTHED_ERR_MSG) {
    const loginUrl = getLoginUrl();
    if (window.location.pathname !== loginUrl) {
      window.location.href = loginUrl;
    }
  }
};

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    redirectToLoginIfUnauthorized(event.query.state.error);
  }
});

// 3. Cliente tRPC com transformer superjson (alinhado com o servidor)
const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});

// 4. Analytics opcional
const loadAnalytics = () => {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const siteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (endpoint && siteId) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `${endpoint.replace(/\/+$/, "")}/script.js`;
    script.setAttribute("data-website-id", siteId);
    document.head.appendChild(script);
  }
};

// 5. Render — wouter em App.tsx é o único roteador (react-router-dom removido)
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </trpc.Provider>
    </React.StrictMode>
  );
  loadAnalytics();
}
