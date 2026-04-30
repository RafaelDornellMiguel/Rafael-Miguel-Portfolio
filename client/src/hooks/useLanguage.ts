import { useState, useEffect } from 'react';
import i18next from '@/i18n/config';

export function useLanguage() {
  const [language, setLanguage] = useState<'pt' | 'en'>(
    (localStorage.getItem('language') as 'pt' | 'en') || 'pt'
  );

  useEffect(() => {
    i18next.changeLanguage(language);
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return { language, toggleLanguage, setLanguage };
}
