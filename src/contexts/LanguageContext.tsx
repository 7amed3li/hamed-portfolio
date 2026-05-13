"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "ar" | "tr";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  setLanguage: (lang: Lang) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggleLang: () => {},
  setLanguage: () => {},
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => {
    setLang((l) => {
      if (l === "en") return "tr";
      if (l === "tr") return "ar";
      return "en";
    });
  };

  const setLanguage = (newLang: Lang) => setLang(newLang);

  const isRTL = lang === "ar";

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
