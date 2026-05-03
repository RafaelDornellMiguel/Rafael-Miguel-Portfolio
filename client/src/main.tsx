import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

// 3. Cliente tRPC - Configuração Direta
// Removido qualquer wrapper de fetch para evitar conflito com o transformer
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_SUPABASE_URL 
        ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/trpc`
        : "/api/trpc",
    }),
  ],
});

// 4. Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div className="p-10">Erro crítico ao carregar interface.</div>,
  },
]);

// 5. Analytics
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

// 6. Render
const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </trpc.Provider>
    </React.StrictMode>
  );
  loadAnalytics();
}