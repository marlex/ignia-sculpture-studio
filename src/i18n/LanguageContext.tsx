import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "es" | "en";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("ignia.lang") as Lang) || "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ignia.lang", l);
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
