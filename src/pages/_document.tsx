import { Head, Html, Main, NextScript } from "next/document";

import { themeBootstrapScript } from "@/contexts/ThemeContext";

export default function Document() {
  return (
    <Html lang="pt-BR" data-theme="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <body>
        {/* Aplica o tema salvo antes da primeira pintura — evita flash de tema errado. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
