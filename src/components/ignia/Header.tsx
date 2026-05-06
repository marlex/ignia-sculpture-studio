import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLang, useSetLang, type Lang } from "@/i18n/LanguageContext";

const NAV = {
  es: [
    { label: "Colección", to: "/coleccion" },
    { label: "Escultores", to: "/escultores" },
    { label: "Aprende", to: "/aprende" },
    { label: "Editorial", to: "/editorial" },
    { label: "Ignia gallery", to: "/ignia-gallery" },
  ],
  en: [
    { label: "Collection", to: "/coleccion" },
    { label: "Sculptors", to: "/escultores" },
    { label: "Learn", to: "/aprende" },
    { label: "Editorial", to: "/editorial" },
    { label: "Ignia gallery", to: "/ignia-gallery" },
  ],
};

export const Header = () => {
  const lang = useLang();
  const setLang = useSetLang();
  const items = NAV[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-14 bg-white/95 backdrop-blur border-b border-border flex items-center px-6 md:px-12">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center" aria-label="Ignia Gallery">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-9">
          {items.map(item => (
            <Link key={item.label} to={item.to} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <LangDropdown lang={lang} setLang={setLang} />
          <Link to="/login" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {lang === "es" ? "Entrar" : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  );
      </div>
    </header>
  );
};

const LANGS: { code: Lang; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

const LangDropdown = ({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const others = LANGS.filter((l) => l.code !== lang);
  return (
    <div ref={ref} className="relative font-body text-[12px] uppercase tracking-[0.14em]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-ink hover:opacity-70 transition-opacity"
      >
        {LANGS.find((l) => l.code === lang)?.label}
        <span aria-hidden className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 top-full mt-2 min-w-[60px] bg-white border-[0.5px] border-border shadow-sm z-50">
          {others.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-gray hover:text-ink hover:bg-secondary transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
