import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/i18n/LanguageContext";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { SHOW_PUBLIC_AUTH } from "@/config/featureFlags";


const COLS = {
  es: [
    {
      label: "IGNIA GALLERY",
      links: [
        { label: "Entrar", to: "/login" },
      ],
    },
    {
      label: "Sobre Ignia",
      links: [
        { label: "Sobre Ignia", to: "/ignia-gallery" },
        { label: "Contacto", to: "/ignia-gallery" },
      ],
    },
    {
      label: "Escultura",
      links: [
        { label: "Colección", to: "/coleccion" },
        { label: "Escultores", to: "/escultores" },
      ],
    },
    {
      label: "News",
      links: [
        { label: "Comunidad", to: "/editorial" },
        { label: "Ignia Aprende", to: "/aprende" },
      ],
    },
  ],
  en: [
    {
      label: "IGNIA GALLERY",
      links: [
        { label: "Sign in", to: "/login" },
      ],
    },
    {
      label: "About",
      links: [
        { label: "About Ignia", to: "/ignia-gallery" },
        { label: "Contact", to: "/ignia-gallery" },
      ],
    },
    {
      label: "Sculpture",
      links: [
        { label: "The Collection", to: "/coleccion" },
        { label: "Sculptors", to: "/escultores" },
      ],
    },
    {
      label: "News",
      links: [
        { label: "Community", to: "/editorial" },
        { label: "Ignia Learn", to: "/aprende" },
      ],
    },
  ],
};

export const Footer = () => {
  const lang = useLang();
  const cols = COLS[lang];
  const tagline = lang === "es"
    ? "La primera galería digital dedicada exclusivamente a la escultura."
    : "The first digital gallery devoted exclusively to sculpture.";
  const status = lang === "es" ? "v0.1 — Beta" : "v0.1 — Beta";
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const toggle = (label: string) => {
    setOpen(prev => ({ ...prev, [label]: !prev[label] }));
  };


  return (
    <footer className="footer-section bg-white border-t-[0.5px] border-border px-6 md:px-12 pt-14 pb-0 flex flex-col">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 md:gap-6">
        {cols.map((c, i) => (
          i === 0 ? (
            <div key={c.label}>
              <Logo />
              <p className="font-body text-[16px] font-normal text-gray mt-4 max-w-[320px]">{tagline}</p>
              {SHOW_PUBLIC_AUTH && (
                <div className="flex flex-col gap-2.5 mt-4">
                  {c.links.map(l => (
<Link key={l.label} to={l.to} className="font-body text-[16px] font-normal text-gray hover:opacity-65 transition-opacity">{l.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Collapsible
              key={c.label}
              open={isDesktop || !!open[c.label]}
              onOpenChange={() => !isDesktop && toggle(c.label)}
            >
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between md:justify-start md:pointer-events-none outline-none">
                  <div className="font-body text-[14px] font-normal text-muted-line uppercase tracking-[0.14em]">{c.label}</div>
                  <ChevronDown
                    className="w-4 h-4 text-muted-line transition-transform duration-300 md:hidden"
                    style={{ transform: open[c.label] ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2.5 mt-4">
                  {c.links.map(l => (
                    <Link key={l.label} to={l.to} className="font-body text-[16px] font-normal text-gray hover:opacity-65 transition-opacity">{l.label}</Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        ))}
      </div>

      <div className="mt-10 pt-10 pb-0 border-t border-border">
        <div className="font-body text-[14px] font-normal text-muted-line uppercase tracking-[0.14em] mb-5">Connect</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:max-w-[520px] gap-x-6 gap-y-4 items-center">
          <a href="https://www.instagram.com/igniagallery/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center gap-3 text-ink hover:opacity-65 transition-opacity duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.072 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a2.337 2.337 0 11-4.674 0 2.337 2.337 0 014.674 0z"/></svg>
            <span className="font-body text-[14px] font-normal tracking-[0.14em] uppercase">Instagram</span>
          </a>
          <a href="https://www.linkedin.com/company/igniagallery/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-3 text-ink hover:opacity-65 transition-opacity duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 012.063-2.063 2.064 2.064 0 012.063 2.063 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            <span className="font-body text-[14px] font-normal tracking-[0.14em] uppercase">LinkedIn</span>
          </a>
          <a href="https://www.facebook.com/people/Ignia-Gallery/61591349492969/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center gap-3 text-ink hover:opacity-65 transition-opacity duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M9.101 23.691v-10.98H6.627v-3.63h2.474v-2.17c0-3.66 1.697-5.698 5.524-5.698 1.558 0 2.426.156 2.833.226v3.266h-1.943c-1.528 0-2.056.573-2.056 2.174v1.202h4.03l-.553 3.63h-3.477v10.98H9.101z"/></svg>
            <span className="font-body text-[14px] font-normal tracking-[0.14em] uppercase">Facebook</span>
          </a>
          <a href="https://www.tiktok.com/@igniagallery" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex items-center gap-3 text-ink hover:opacity-65 transition-opacity duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            <span className="font-body text-[14px] font-normal tracking-[0.14em] uppercase">TikTok</span>
          </a>
          <a href="https://x.com/igniagallery" target="_blank" rel="noopener noreferrer" aria-label="X" className="flex items-center gap-3 text-ink hover:opacity-65 transition-opacity duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            <span className="font-body text-[14px] font-normal tracking-[0.14em] uppercase">X</span>
          </a>
          <a href="https://www.youtube.com/@IgniaGallery" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex items-center gap-3 text-ink hover:opacity-65 transition-opacity duration-200">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span className="font-body text-[14px] font-normal tracking-[0.14em] uppercase">YouTube</span>
          </a>
        </div>
      </div>
      </div>

      <div className="-mx-6 md:-mx-12 px-6 md:px-12 py-6 bg-secondary flex justify-between flex-wrap gap-x-8 gap-y-3 items-center mt-20">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link to="/legal/terminos" className="font-body text-[13px] font-normal text-ink hover:opacity-65 transition-opacity tracking-[0.14em] uppercase">
            {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
          </Link>
          <Link to="/legal/privacidad" className="font-body text-[13px] font-normal text-ink hover:opacity-65 transition-opacity tracking-[0.14em] uppercase">
            {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
          </Link>
          <Link to="/legal/envios-y-devoluciones" className="font-body text-[13px] font-normal text-ink hover:opacity-65 transition-opacity tracking-[0.14em] uppercase">
            {lang === "es" ? "Envíos y Devoluciones" : "Shipping & Returns"}
          </Link>
          <Link to="/legal/cookies" className="font-body text-[13px] font-normal text-ink hover:opacity-65 transition-opacity tracking-[0.14em] uppercase">
            {lang === "es" ? "Política de Cookies" : "Cookie Policy"}
          </Link>
          <Link to="/legal/accesibilidad" className="font-body text-[13px] font-normal text-ink hover:opacity-65 transition-opacity tracking-[0.14em] uppercase">
            {lang === "es" ? "Accesibilidad" : "Accessibility"}
          </Link>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-body text-[13px] font-normal text-ink tracking-[0.14em] uppercase">© 2026 Ignia Gallery</span>
          <span className="font-body text-[13px] font-normal tracking-[0.14em] uppercase" style={{ color: "#444" }}>{status}</span>
        </div>
      </div>
    </footer>
  );
};
