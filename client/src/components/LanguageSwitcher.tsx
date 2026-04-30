import { useLanguage } from '@/hooks/useLanguage';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={`Mudar idioma para ${language === 'pt' ? 'Inglês' : 'Português'}`}
      title={`${language === 'pt' ? 'English' : 'Português'}`}
    >
      <span className="lang-flag">
        {language === 'pt' ? '🇧🇷' : '🇺🇸'}
      </span>
      <span className="lang-code">{language.toUpperCase()}</span>
    </button>
  );
}
