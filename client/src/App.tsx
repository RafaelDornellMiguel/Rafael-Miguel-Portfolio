import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import ParticleCanvas from "./components/ParticleCanvas";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Curriculum from "./components/Curriculum";
import Contact from "./components/Contact";
import News from "./components/News";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import usePreloadAssets from './hooks/usePreloadAssets';
import useServiceWorker from './hooks/useServiceWorker';
import StructuredData from './components/StructuredData';
import { Route, Switch } from 'wouter';

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Registrar Service Worker para offline
  useServiceWorker();

  // Precarregar assets críticos
  usePreloadAssets({
    images: [
      '/img/rafael-profile.jpg.png',
      '/public/img/service-ETL.png',
      '/public/img/service-analise.png',
      '/public/img/service-03_Power.png',
      '/public/img/service-consultoria.png',
      '/img/project-01.png',
      '/img/project-02.png',
      '/img/project-03.png',
      '/img/project-04.png',
      '/img/project-05.png',
    ],
    videos: [
      'client/public/img/gif_7d02e1e5.mp4',
      'client/public/img/gif2_b7dba10d.mp4',
    ],
  });

  useEffect(() => {
    // Simular carregamento de recursos com delay para permitir precarregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Rafael Dornell Miguel | Desenvolvedor & Engenheiro de Dados</title>
        <meta name="description" content="Desenvolvedor de Software e Engenheiro de Dados especializado em ETL, automação de processos e desenvolvimento com Python, SQL e Power BI. Soluções corporativas de dados e desenvolvimento." />
        <meta name="keywords" content="Rafael Dornell Miguel, Desenvolvedor, Engenheiro de Dados, ETL, Python, SQL, Power BI, Automação, Dados, Tecnologia" />
        <meta name="author" content="Rafael Dornell Miguel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Rafael Dornell Miguel | Desenvolvedor & Engenheiro de Dados" />
        <meta property="og:description" content="Soluções corporativas de dados e desenvolvimento com especialidade em ETL, automação e engenharia de dados." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rafael-miguel-portfolio.vercel.app/" />
        <link rel="preload" as="image" href="/public/img/rafael-profile.jpg.png" />
        <link rel="preload" as="video" href="/public/img/gif_7d02e1e5.mp4" />
        <link rel="preload" as="image" href="/public/img/service-ETL.png" />
        <meta name="theme-color" content="#030303" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:url" content="https://rafael-miguel-portfolio.vercel.app/" />
        <meta property="og:image" content="https://rafael-miguel-portfolio.vercel.app/img/rafael-profile.jpg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rafael Dornell Miguel | Desenvolvedor & Engenheiro de Dados" />
        <meta name="twitter:description" content="Soluções corporativas de dados e desenvolvimento com especialidade em ETL, automação e engenharia de dados." />
        <meta name="twitter:image" content="https://rafael-miguel-portfolio.vercel.app/img/rafael-profile.jpg.png" />
      </Helmet>
      <LoadingScreen isLoading={isLoading} />
      <StructuredData />
      {!isLoading && <ParticleCanvas />}
      <main className="main-content" role="main">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Curriculum />
        <News />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" switchable={true}>
          <TooltipProvider>
            <Toaster />
            <Header />
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/blog" component={Blog} />
            </Switch>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
