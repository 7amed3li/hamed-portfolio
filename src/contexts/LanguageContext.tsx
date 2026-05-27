"use client";
import { createContext, useContext, ReactNode } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

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
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const lang = (params?.lang as Lang) || "en";
  const isRTL = lang === "ar";

  const changeLang = (newLang: Lang) => {
    if (newLang === lang) return;
    const currentPath = pathname || `/${lang}`;
    // Replace the current language in the path with the new one
    // e.g. /en/about -> /ar/about
    const segments = currentPath.split("/");
    if (segments.length >= 2 && ["en", "ar", "tr"].includes(segments[1])) {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }
    const newPath = segments.join("/");
    router.push(newPath);
  };

  const toggleLang = () => {
    let nextLang: Lang = "en";
    if (lang === "en") nextLang = "tr";
    if (lang === "tr") nextLang = "ar";
    changeLang(nextLang);
  };

  const setLanguage = (newLang: Lang) => changeLang(newLang);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
