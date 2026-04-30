import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

export default function Header() {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
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
    
    if (location !== '/') {
      navigate('/');
      // Aguarda a navegação e tenta rolar após um pequeno delay
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBlogClick = () => {
    setMobileMenuOpen(false);
    navigate('/blog');
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden-nav' : ''}`}>
      <Link href="/">
        <div className="logo-login" style={{ cursor: 'pointer' }}>RM</div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="nav-desktop">
        <a href="/#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('nav.sobre')}</a>
        <a href="/#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t('nav.servicos')}</a>
        <a href="/#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>{t('nav.projetos')}</a>
        <a href="/#curriculo" onClick={(e) => { e.preventDefault(); scrollToSection('curriculo'); }}>{t('nav.curriculo')}</a>
        <button onClick={handleBlogClick} className={`nav-link ${location === '/blog' ? 'active' : ''}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}>{t('nav.blog') || 'Blog'}</button>
        <LanguageSwitcher />
        <button 
          className="btn-theme" 
          onClick={toggleTheme}
          aria-label="Alternar tema claro/escuro"
          title="Modo Claro/Escuro"
        >
          <i className={`bx ${theme === 'light' ? 'bx-moon' : 'bx-sun'}`}></i>
        </button>
        <a href="/#contato" className="btn-nav-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}>
          {t('contact.submit')}
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
          <a href="/#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('nav.sobre')}</a>
          <a href="/#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t('nav.servicos')}</a>
          <a href="/#work" onClick={(e) => { e.preventDefault(); scrollToSection('work'); }}>{t('nav.projetos')}</a>
          <a href="/#curriculo" onClick={(e) => { e.preventDefault(); scrollToSection('curriculo'); }}>{t('nav.curriculo')}</a>
          <button onClick={handleBlogClick} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', width: '100%', textAlign: 'left', padding: '12px 0' }}>{t('nav.blog') || 'Blog'}</button>
          <a href="/#contato" className="btn-mobile-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contato'); }}>
            {t('contact.submit')}
          </a>
        </div>
      )}
    </header>
  );
}
