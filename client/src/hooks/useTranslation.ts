import { useState, useEffect } from 'react';
import i18next from '@/i18n/config';

export function useTranslation() {
  const [, setLanguage] = useState(i18next.language);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setLanguage(lng);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const t = (key: string) => i18next.t(key);

  return { t, language: i18next.language };
}
