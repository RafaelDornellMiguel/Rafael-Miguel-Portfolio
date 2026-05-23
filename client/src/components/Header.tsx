import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
    }
  };

  const navItems = [
    { label: t('nav.sobre') || 'Sobre', id: 'about' },
    { label: t('nav.servicos') || 'Serviços', id: 'services' },
    { label: t('nav.projetos') || 'Projetos', id: 'work' },
    { label: t('nav.curriculo') || 'Currículo', id: 'curriculo' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="header-container">

        {/* Logo */}
        <Link href="/">
          <div className="logo" role="link" aria-label="Rafael Dornell Miguel — home">
            <span className="logo-text">Rafael Miguel</span>
            <span className="logo-dot" aria-hidden="true" />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" aria-label="Navegação principal">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="nav-link"
              onClick={e => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/blog"
            className="nav-link"
            onClick={e => { e.preventDefault(); navigate('/blog'); }}
          >
            Blog
          </a>
        </nav>

        {/* Controls */}
        <div className="header-controls">
          <LanguageSwitcher />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a
            href="/#contato"
            className="btn-contact"
            onClick={e => { e.preventDefault(); scrollTo('contato'); }}
          >
            Contato
          </a>
          <button
            className="btn-menu"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="mobile-menu" aria-label="Menu mobile">
          <div className="mobile-menu-content">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="mobile-nav-link"
                onClick={e => { e.preventDefault(); scrollTo(item.id); }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/blog"
              className="mobile-nav-link"
              onClick={e => { e.preventDefault(); setMobileMenuOpen(false); navigate('/blog'); }}
            >
              Blog
            </a>
            <a
              href="/#contato"
              className="mobile-nav-cta"
              onClick={e => { e.preventDefault(); scrollTo('contato'); }}
            >
              Entrar em contato
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
