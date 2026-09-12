import About from "@/components/About";
import Contact from "@/components/Contact";
import Curriculum from "@/components/Curriculum";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Projects from "@/components/Projects";
import Seo from "@/components/Seo";
import Services from "@/components/Services";

/**
 * Shell estático (SSG): todo o conteúdo institucional é pré-renderizado no build.
 * Só a seção de artigos hidrata depois, via /api/v1/news.
 */
export default function HomePage() {
  return (
    <>
      <Seo withStructuredData />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Curriculum />
      <News />
      <Contact />
    </>
  );
}
