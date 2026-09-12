import type { AppProps } from "next/app";
import Head from "next/head";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/i18n";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0a0c10" />
        </Head>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
