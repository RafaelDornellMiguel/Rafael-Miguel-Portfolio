import { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import AOS from 'aos';
import './Hero.css';

const DARK_VIDEO = '/img/gif.mp4';
const LIGHT_VIDEO = '/img/gif2.mp4';

export default function Hero() {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 700, offset: 60 });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const videoSrc = theme === 'light' ? LIGHT_VIDEO : DARK_VIDEO;
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  }, [theme]);

  return (
    <section id="hero-section" className="hero-section">
      <video
        ref={videoRef}
        id="hero-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="hero-video"
      />
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title" data-aos="fade-up">
          Rafael Dornell Miguel<br />Software<br />& Dados
        </h1>
        <p className="hero-sub" data-aos="fade-up" data-aos-delay="200">
          Desenvolvedor focado em automação e dados. Crio sistemas que eliminam processos manuais, reduzem erros e aumentam eficiência operacional em empresas reais. Especialista em ETL, engenharia de dados e desenvolvimento com Python, SQL e Power BI.
        </p>
      </div>
    </section>
  );
}
