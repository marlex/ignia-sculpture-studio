import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useLang, useSetLang, type Lang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";

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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openInvite = () => {
    window.dispatchEvent(new Event("ignia:open-invite"));
  };

  const t = lang === "es"
    ? { publish: "Solicitar invitación", signin: "Entrar", signout: "Salir", dashboard: "Mi panel" }
    : { publish: "Request invitation", signin: "Sign in", signout: "Sign out", dashboard: "Dashboard" };


  return (
    <header className="fixed top-0 left-0 right-0 z-[100] h-14 bg-white/95 backdrop-blur border-b border-border flex items-center px-6 md:px-12">
      <style>{`
        @media (max-width: 768px) {
          .header-nav-links { display: none !important; }
          .header-user-links { display: none !important; }
          .header-invite-btn { display: none !important; }
          .header-signin-link { display: none !important; }
        }
        @media (min-width: 769px) {
          .header-hamburger { display: none !important; }
        }
      `}</style>
      <div className="flex items-center justify-between w-full gap-4">
        <Link to="/" className="flex items-center" aria-label="Ignia Gallery">
          <Logo />
        </Link>
        <nav className="header-nav-links hidden md:flex items-center gap-9">
          {items.map(item => (
            <Link key={item.label} to={item.to} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LangDropdown lang={lang} setLang={setLang} />
          {user ? (
            <div className="header-user-links hidden md:flex items-center gap-3">
              <Link to="/dashboard" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
                {t.dashboard}
              </Link>
              <button onClick={() => { logout(); navigate("/"); }} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
                {t.signout}
              </button>
            </div>
          ) : (
            <Link to={`/login?redirect=${encodeURIComponent(location.pathname)}`} className="header-signin-link font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
              {t.signin}
            </Link>
          )}
          <button
            type="button"
            onClick={openInvite}
            className="header-invite-btn hidden sm:inline-flex btn-primary !py-2 !px-4 text-[11px]"
          >
            {t.publish}
          </button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="header-hamburger"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
              padding: 6,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={{ width: 16, height: 1, background: "#111111", display: "block" }} />
            <span style={{ width: 16, height: 1, background: "#111111", display: "block" }} />
            <span style={{ width: 16, height: 1, background: "#111111", display: "block" }} />
          </button>
        </div>
      </div>

      {mobileOpen && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000000",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            style={{
              position: "absolute",
              top: 18,
              right: 22,
              background: "transparent",
              border: "none",
              color: "#FFFFFF",
              fontSize: 28,
              lineHeight: 1,
              cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
            }}
          >
            ×
          </button>
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: 32,
                color: "#FFFFFF",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => { setMobileOpen(false); openInvite(); }}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: 32,
              color: "#FFFFFF",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            {t.publish}
          </button>
        </div>,
        document.body
      )}
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
