import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from './LanguageSwitcher';
import { Sun, Moon, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    if (location !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t('nav.sobre'), id: 'about' },
    { label: t('nav.servicos'), id: 'services' },
    { label: t('nav.projetos'), id: 'work' },
    { label: t('nav.curriculo'), id: 'curriculo' },
    { label: t('nav.blog') || 'Blog', id: 'blog' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link href="/">
          <div className="logo" tabIndex={0} role="button">
            <span className="logo-text">RM</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Navigation principal">
          {navItems.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
          <a href="/#blog" onClick={(e) => {
            e.preventDefault();
            navigate('/blog');
          }} className="nav-link">
            {t('nav.blog') || 'Blog'}
          </a>
        </nav>

        {/* Right controls */}
        <div className="header-controls">
          <LanguageSwitcher />
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? (
              <Moon size={20} />
            ) : (
              <Sun size={20} />
            )}
          </button>
          <a href="/#contato" className="btn-contact" onClick={(e) => {
            e.preventDefault();
            scrollToSection('contato');
          }}>
            {t('contact.submit')}
          </a>

          {/* Mobile Menu Button */}
          <button
            className="btn-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="mobile-menu" role="navigation" aria-label="Menu de navegação mobile">
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.id === 'blog') {
                    navigate('/blog');
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className="mobile-nav-link"
              >
                {item.label}
              </a>
            ))}
            <a href="/#contato" className="mobile-nav-cta" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contato');
            }}>
              {t('contact.submit')}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
