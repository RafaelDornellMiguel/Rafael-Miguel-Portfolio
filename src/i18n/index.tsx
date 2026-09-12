import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

export type Language = "pt" | "en";

const dictionaries: Record<Language, Record<string, unknown>> = { pt, en };
const STORAGE_KEY = "portfolio.language";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolve(dictionary: Record<string, unknown>, key: string): string {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);

  return typeof value === "string" ? value : key;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSG renderiza sempre em pt; a preferência do visitante entra na hidratação.
  const [language, setLanguage] = useState<Language>("pt");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    if (stored === "pt" || stored === "en") {
      setLanguage(stored);
      return;
    }

    if (navigator.language.toLowerCase().startsWith("en")) setLanguage("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* armazenamento bloqueado: preferência vale só para esta sessão */
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === "pt" ? "en" : "pt"));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      toggleLanguage,
      t: (key: string) => resolve(dictionaries[language], key),
    }),
    [language, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useTranslation precisa estar dentro de LanguageProvider");
  return context;
}
