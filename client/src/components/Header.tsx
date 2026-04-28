import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import './Header.css';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      setIsHidden(y > lastY && y > 200);
      setLastY(y);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden-nav' : ''}`}>
      <div className="logo-login">RM</div>

      {/* Desktop Navigation */}
      <nav className="nav-desktop">
        <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre</a>
        <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Serviços</a>
        <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>Projetos</a>
        <a href="#curriculo" onClick={(e) => { e.preventDefault(); scrollToSection('curriculo'); }}>Currículo</a>
        <button 
          className="btn-theme" 
          onClick={toggleTheme}
          aria-label="Alternar tema claro/escuro"
          title="Modo Claro/Escuro"
        >
          <i className={`bx ${theme === 'light' ? 'bx-moon' : 'bx-sun'}`}></i>
        </button>
        <a href="#contato" className="btn-nav-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}>
          Orçamento
        </a>
      </nav>

      {/* Mobile Navigation */}
      <div className="nav-mobile">
        <button 
          className="btn-theme" 
          onClick={toggleTheme}
          aria-label="Alternar tema"
        >
          <i className={`bx ${theme === 'light' ? 'bx-moon' : 'bx-sun'}`}></i>
        </button>
        <button 
          className="btn-theme btn-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu active" role="dialog" aria-modal="true" aria-label="Menu de navegação">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>Sobre</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Serviços</a>
          <a href="#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>Projetos</a>
          <a href="#curriculo" onClick={(e) => { e.preventDefault(); scrollToSection('curriculo'); }}>Currículo</a>
          <a href="#contato" className="btn-mobile-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}>
            Iniciar Projeto
          </a>
        </div>
      )}
    </header>
  );
}
