import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useLang } from "@/i18n/LanguageContext";

const COLS = {
  es: [
    {
      label: "Explorar",
      links: [
        { label: "Colección", to: "/coleccion" },
        { label: "Escultores", to: "/escultores" },
        { label: "Editorial", to: "/editorial" },
        { label: "Ignia Aprende", to: "/aprende" },
      ],
    },
    {
      label: "Para artistas",
      links: [
        { label: "Publicar obra", to: "/login" },
        { label: "Mi perfil", to: "/perfil/escultor" },
        { label: "Guía 3D", to: "/aprende" },
        { label: "Ignia Aprende", to: "/aprende" },
      ],
    },
    {
      label: "IGNIA GALLERY",
      links: [
        { label: "Sobre Ignia", to: "/ignia-gallery" },
        { label: "Editorial", to: "/editorial" },
        { label: "Contacto", to: "/ignia-gallery" },
        { label: "Entrar", to: "/login" },
      ],
    },
  ],
  en: [
    {
      label: "Explore",
      links: [
        { label: "Collection", to: "/coleccion" },
        { label: "Sculptors", to: "/escultores" },
        { label: "Editorial", to: "/editorial" },
        { label: "Ignia Learn", to: "/aprende" },
      ],
    },
    {
      label: "For artists",
      links: [
        { label: "Submit your work", to: "/login" },
        { label: "My profile", to: "/perfil/escultor" },
        { label: "3D guide", to: "/aprende" },
        { label: "Ignia Learn", to: "/aprende" },
      ],
    },
    {
      label: "IGNIA GALLERY",
      links: [
        { label: "About Ignia", to: "/ignia-gallery" },
        { label: "Editorial", to: "/editorial" },
        { label: "Contact", to: "/ignia-gallery" },
        { label: "Sign in", to: "/login" },
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

  return (
    <footer className="bg-white border-t-[0.5px] border-border px-6 md:px-12 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="font-body text-[14px] font-light text-gray mt-4 max-w-[260px]">{tagline}</p>
        </div>
        {cols.map(c => (
          <div key={c.label}>
            <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-4">{c.label}</div>
            <div className="flex flex-col gap-2.5">
              {c.links.map(l => (
                <Link key={l.label} to={l.to} className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-[0.5px] border-border mt-10 pt-5 flex justify-between flex-wrap gap-3 items-center">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-body text-[14px] font-light text-gray">© 2026 Ignia Gallery</span>
          <a href="/legal/terminos.html" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {lang === "es" ? "Términos y Condiciones" : "Terms & Conditions"}
          </a>
          <a href="/legal/privacidad.html" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {lang === "es" ? "Política de Privacidad" : "Privacy Policy"}
          </a>
          <a href="/legal/envios-y-devoluciones.html" className="font-body text-[14px] font-light text-gray hover:text-ink transition-colors">
            {lang === "es" ? "Envíos y Devoluciones" : "Shipping & Returns"}
          </a>
        </div>
        <span className="font-body text-[14px] font-light" style={{ color: "#444" }}>{status}</span>
      </div>
    </footer>
  );
};
