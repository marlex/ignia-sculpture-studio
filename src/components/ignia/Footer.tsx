import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react";
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
        { label: "Editorial", to: "/editorial" },
      ],
    },
    {
      label: "Escultura",
      links: [
        { label: "Colección", to: "/coleccion" },
        { label: "Escultores", to: "/escultores" },
        { label: "Guía 3D", to: "/aprende" },
      ],
    },
    {
      label: "Para artistas",
      links: [
        { label: "Publicar obra", to: "/login" },
        { label: "Mi perfil", to: "/perfil/escultor" },
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
        { label: "Editorial", to: "/editorial" },
      ],
    },
    {
      label: "Sculpture",
      links: [
        { label: "Collection", to: "/coleccion" },
        { label: "Sculptors", to: "/escultores" },
        { label: "3D guide", to: "/aprende" },
      ],
    },
    {
      label: "For artists",
      links: [
        { label: "Submit your work", to: "/login" },
        { label: "My profile", to: "/perfil/escultor" },
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
    <footer className="footer-section bg-white border-t-[0.5px] border-border px-6 md:px-12 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {cols.map((c, i) => (
          i === 0 ? (
            <div key={c.label}>
              <Logo />
              <p className="font-body text-[14px] font-light text-gray mt-4 max-w-[260px]">{tagline}</p>
              {SHOW_PUBLIC_AUTH && (
                <div className="flex flex-col gap-2.5 mt-4">
                  {c.links.map(l => (
                    <Link key={l.label} to={l.to} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">{l.label}</Link>
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
                  <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em]">{c.label}</div>
                  <ChevronDown
                    className="w-4 h-4 text-muted-line transition-transform duration-300 md:hidden"
                    style={{ transform: open[c.label] ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2.5 mt-4">
                  {c.links.map(l => (
                    <Link key={l.label} to={l.to} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">{l.label}</Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        ))}
      </div>
      <div className="border-t-[0.5px] border-border mt-10 pt-5">
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/igniagallery/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={16} className="text-gray hover:text-ink transition-colors" />
          </a>
          <a href="https://www.linkedin.com/company/igniagallery/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} className="text-gray hover:text-ink transition-colors" />
          </a>
          <a href="https://www.facebook.com/igniagallery" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={16} className="text-gray hover:text-ink transition-colors" />
          </a>
        </div>
        <div className="mt-5 flex justify-between flex-wrap gap-3 items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-body text-[14px] font-light text-gray">© 2026 Ignia Gallery</span>
            <Link to="/legal/terminos" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
              {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
            </Link>
            <Link to="/legal/privacidad" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
              {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
            </Link>
            <Link to="/legal/envios-y-devoluciones" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
              {lang === "es" ? "Envíos y Devoluciones" : "Shipping & Returns"}
            </Link>
          </div>
          <span className="font-body text-[14px] font-light" style={{ color: "#444" }}>{status}</span>
        </div>
      </div>
    </footer>
  );
};
