import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Curriculum from "./components/Curriculum";
import Contact from "./components/Contact";
import News from "./components/News";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import StructuredData from './components/StructuredData';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, Switch } from 'wouter';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Rafael Dornell Miguel | Engenheiro de Dados & Desenvolvedor</title>
        <meta name="description" content="Engenheiro de Dados e Desenvolvedor de Software especializado em ETL, pipelines de dados, Python e SQL. Transformo dados em sistemas e decisões." />
        <meta name="keywords" content="Rafael Dornell Miguel, Engenheiro de Dados, ETL, Python, SQL, Power BI, Automação, Desenvolvedor" />
        <meta name="author" content="Rafael Dornell Miguel" />
        <meta property="og:title" content="Rafael Dornell Miguel | Engenheiro de Dados & Desenvolvedor" />
        <meta property="og:description" content="Especialista em ETL, automação de dados e engenharia de software." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rafael-miguel-portfolio.vercel.app/" />
        <meta property="og:image" content="https://rafael-miguel-portfolio.vercel.app/img/rafael-profile.jpg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rafael-miguel-portfolio.vercel.app/" />
        <meta name="theme-color" content="#080808" />
      </Helmet>
      <StructuredData />
      <main role="main">
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

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" switchable={true}>
          <TooltipProvider>
            <Toaster />
            <Header />
            <Switch>
              <Route path="/"     component={HomePage} />
              <Route path="/blog" component={Blog} />
            </Switch>
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
