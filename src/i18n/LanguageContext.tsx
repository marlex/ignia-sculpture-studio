import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "ignia:lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") return stored;
    } catch {}
    const nav = typeof navigator !== "undefined" ? navigator.language : "";
    return nav && nav.toLowerCase().startsWith("es") ? "es" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
};

export const useLang = () => useContext(Ctx).lang;
export const useSetLang = () => useContext(Ctx).setLang;

// Helper: pick translation by current lang
export function pick<T>(lang: Lang, dict: { es: T; en: T }): T {
  return dict[lang];
}
