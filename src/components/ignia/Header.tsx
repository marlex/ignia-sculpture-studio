import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { useLang, useSetLang, type Lang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";
import { SHOW_PUBLIC_AUTH } from "@/config/featureFlags";
import { supabase } from "@/integrations/supabase/client";

type NavItem = { label: string; to?: string; action?: "partners" };

// Left nav (desktop): Sculptors, Guidance, Community, Learn, Sobre Ignia
const NAV_LEFT: Record<"es" | "en", NavItem[]> = {
  es: [
    { label: "Escultores", to: "/join/escultores" },
    { label: "Guidance", to: "/guidance" },
    { label: "Comunidad", to: "/editorial" },
    { label: "Aprende", to: "/aprende" },
    { label: "Sobre Ignia", to: "/ignia-gallery" },
  ],
  en: [
    { label: "Sculptors", to: "/join/sculptors" },
    { label: "Guidance", to: "/guidance" },
    { label: "Community", to: "/editorial" },
    { label: "Learn", to: "/aprende" },
    { label: "Sobre Ignia", to: "/ignia-gallery" },
  ],
};

// Right nav (desktop): Sculptures, Partnerships
const NAV_RIGHT: Record<"es" | "en", NavItem[]> = {
  es: [
    { label: "Esculturas", to: "/coleccion" },
    { label: "Partnerships", action: "partners" },
  ],
  en: [
    { label: "Sculptures", to: "/coleccion" },
    { label: "Partnerships", action: "partners" },
  ],
};

// Full nav order for mobile drawer (left + right)
const NAV_ALL: Record<"es" | "en", NavItem[]> = {
  es: [...NAV_LEFT.es, ...NAV_RIGHT.es],
  en: [...NAV_LEFT.en, ...NAV_RIGHT.en],
};

export const Header = () => {
  const lang = useLang();
  const setLang = useSetLang();
  const leftItems = NAV_LEFT[lang];
  const rightItems = NAV_RIGHT[lang];
  const allItems = NAV_ALL[lang];
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mobile floating header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openInvite = () => {
    window.dispatchEvent(new CustomEvent("ignia:open-invite", { detail: { source: "header" } }));
  };


  const openPartners = () => {
    window.dispatchEvent(new CustomEvent("ignia:open-invite", { detail: { variant: "partners" } }));
  };

  const navLinkClass = "font-body text-[16px] font-normal text-gray hover:opacity-65 transition-opacity";
  const renderNavItem = (item: NavItem) =>
    item.action === "partners" ? (
      <button key={item.label} type="button" onClick={openPartners} className={navLinkClass}>
        {item.label}
      </button>
    ) : (
      <Link key={item.label} to={item.to!} className={navLinkClass}>
        {item.label}
      </Link>
    );

  // Detect Supabase session + admin role
  const [sbUser, setSbUser] = useState<{ id: string; email: string | null } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let alive = true;
    const load = async (uid?: string) => {
      if (!uid) { if (alive) setIsAdmin(false); return; }
      const { data } = await supabase.from("profiles").select("role").eq("id", uid).maybeSingle();
      if (alive) setIsAdmin(data?.role === "admin");
    };
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      if (!alive) return;
      setSbUser(u ? { id: u.id, email: u.email ?? null } : null);
      load(u?.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user;
      setSbUser(u ? { id: u.id, email: u.email ?? null } : null);
      load(u?.id);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  const handleSbLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const t = lang === "es"
    ? { publish: "Únete a Ignia", joinMobile: "ÚNETE", login: "Entrar", signin: "Entrar", signout: "Salir", dashboard: "Mi panel", adminPanel: "Panel admin" }
    : { publish: "Join Ignia", joinMobile: "JOIN", login: "Login", signin: "Sign in", signout: "Sign out", dashboard: "Dashboard", adminPanel: "Admin panel" };




  return (
    <header
      className={`ignia-header fixed top-0 left-0 right-0 z-[100] h-14 bg-white/95 backdrop-blur border-b border-border flex items-center px-6 md:px-12 ${scrolled ? "is-scrolled" : ""}`}
    >
      <style>{`
        @media (max-width: 1279px) {
          .header-nav-links { display: none !important; }
          .header-user-links { display: none !important; }
          .header-invite-btn { display: none !important; }
          .header-signin-link { display: none !important; }
          .header-lang { display: none !important; }
          .header-gallery-link { display: none !important; }
          .header-right-cluster { justify-content: flex-end !important; }
          /* Floating semi-transparent pill on scroll (mobile + tablet) */
          .ignia-header.is-scrolled {
            top: 12px !important;
            left: 12px !important;
            right: 12px !important;
            height: 52px !important;
            border-radius: 9999px !important;
            border: 0.5px solid rgba(0,0,0,0.06) !important;
            background: rgba(255,255,255,0.72) !important;
            -webkit-backdrop-filter: saturate(180%) blur(14px) !important;
            backdrop-filter: saturate(180%) blur(14px) !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
            transition: all 240ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
        }
        @media (min-width: 1280px) {
          .header-hamburger,
          .header-invite-icon-mobile { display: none !important; }
          /* Floating semi-transparent pill on scroll (desktop) */
          .ignia-header.is-scrolled {
            top: 12px !important;
            left: 12px !important;
            right: 12px !important;
            height: 52px !important;
            border-radius: 0 !important;
            border: 0.5px solid rgba(0,0,0,0.06) !important;
            background: rgba(255,255,255,0.72) !important;
            -webkit-backdrop-filter: saturate(180%) blur(14px) !important;
            backdrop-filter: saturate(180%) blur(14px) !important;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
            padding-left: 14px !important;
            padding-right: 14px !important;
            transition: all 240ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
        }
        .ignia-header { transition: all 240ms cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full gap-9">
        {/* LEFT: desktop nav + mobile hamburger */}
        <div className="col-start-1 flex items-center gap-9 justify-start">
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
            <span style={{ width: 18, height: 1, background: "#121212", display: "block" }} />
            <span style={{ width: 18, height: 1, background: "#121212", display: "block" }} />
            <span style={{ width: 18, height: 1, background: "#121212", display: "block" }} />
          </button>
          <nav className="header-nav-links hidden xl:flex items-center gap-9">
            {leftItems.map(renderNavItem)}
          </nav>
        </div>

        {/* CENTER: logo */}
        <Link to="/" className="col-start-2 flex items-center justify-center" aria-label="Ignia Gallery">
          <span style={{ display: "inline-block", transform: "scaleX(1.05)", transformOrigin: "center" }}>
            <Logo />
          </span>
        </Link>

        {/* RIGHT: desktop cluster + mobile invite icon */}
        <div className="header-right-cluster col-start-3 flex items-center justify-end gap-9">
          <nav className="header-nav-links hidden xl:flex items-center gap-9">
            {rightItems.map(renderNavItem)}
          </nav>
          <div className="header-lang hidden xl:flex">
            <LangDropdown lang={lang} setLang={setLang} />
          </div>
          {SHOW_PUBLIC_AUTH && (user ? (
            <div className="header-user-links hidden xl:flex items-center gap-9">
              <Link to="/dashboard" className="font-body text-[16px] font-normal text-gray hover:opacity-65 transition-opacity">
                {t.dashboard}
              </Link>
              <button onClick={() => { logout(); navigate("/"); }} className="font-body text-[16px] font-normal text-gray hover:opacity-65 transition-opacity">
                {t.signout}
              </button>
            </div>
          ) : (
            <Link to={`/login?redirect=${encodeURIComponent(location.pathname)}`} className="header-signin-link font-body text-[16px] font-normal text-gray hover:opacity-65 transition-opacity">
              {t.signin}
            </Link>
          ))}
          <div className="hidden xl:flex items-center gap-3">
            {sbUser && isAdmin ? (
              <>
                <Link
                  to="/admin/dashboard"
                  className="header-invite-btn inline-flex btn-primary !py-2 !px-4 text-[13px] font-medium"
                >
                  {t.adminPanel}
                </Link>
                <button
                  onClick={handleSbLogout}
                  className="header-invite-btn inline-flex !py-2 !px-4 text-[13px] font-medium"
                  style={{
                    background: "#121212",
                    color: "#FFFFFF",
                    border: "1px solid #121212",
                    fontFamily: "var(--f-body)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "opacity 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {t.signout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="header-invite-btn inline-flex btn-primary !py-2 !px-4 text-[13px] font-medium"
                >
                  {t.login}
                </Link>
                <button
                  type="button"
                  onClick={openInvite}
                  className="header-invite-btn inline-flex !py-2 !px-4 text-[13px] font-medium"
                  style={{
                    background: "#121212",
                    color: "#FFFFFF",
                    border: "1px solid #121212",
                    fontFamily: "var(--f-body)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    transition: "opacity 0.2s",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {t.publish}
                </button>
              </>
            )}
          </div>
          {/* Mobile-only invitation text */}
          <button
            type="button"
            onClick={openInvite}
            aria-label={t.publish}
            className="header-invite-icon-mobile font-body text-[13px] font-medium tracking-[0.18em] uppercase text-ink"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              padding: "0 2px",
              cursor: "pointer",
              color: "#121212",
              textDecoration: "none",
            }}
          >
            {t.joinMobile}
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
              fontWeight: 400,
            }}
          >
            ×
          </button>
          {allItems.map((item) => {
            const style = {
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: 32,
              color: "#FFFFFF",
              textAlign: "center" as const,
              textDecoration: "none",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            };
            return item.action === "partners" ? (
              <button key={item.label} type="button" onClick={() => { setMobileOpen(false); openPartners(); }} style={style}>
                {item.label}
              </button>
            ) : (
              <Link key={item.label} to={item.to!} onClick={() => setMobileOpen(false)} style={style}>
                {item.label}
              </Link>
            );
          })}
          {/* Language switch inside mobile drawer */}
          <div style={{ display: "flex", gap: 18 }}>
            {LANGS.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { setLang(l.code); }}
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: active ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                  }}
                  aria-pressed={active}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: 26,
              color: "rgba(255,255,255,0.7)",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            {t.login}
          </Link>

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
        className="flex items-center gap-1.5 text-ink font-normal hover:opacity-65 transition-opacity"
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
                className="w-full text-left px-3 py-2 text-gray hover:opacity-65 transition-opacity"
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
