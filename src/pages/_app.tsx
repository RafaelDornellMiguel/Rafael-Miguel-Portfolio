import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageViewTracker from "@/components/PageViewTracker";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/i18n";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // O painel tem cabeçalho próprio: o do site público não aparece lá.
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider>
        <LanguageProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#0a0c10" />
          </Head>
          <PageViewTracker />
          {!isAdmin && <Header />}
          <main>
            <Component {...pageProps} />
          </main>
          {!isAdmin && <Footer />}
        </LanguageProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
