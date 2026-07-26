import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import patriziaAsset from "@/assets/collector-patrizia.webp.asset.json";
import joannouAsset from "@/assets/collector-joannou.webp.asset.json";
import warburgAsset from "@/assets/collector-warburg.jpg.asset.json";

const FOTO_PRINCIPAL = patriziaAsset.url;
const FOTO_JOANNOU = joannouAsset.url;
const FOTO_WARBURG = warburgAsset.url;

const COLECCIONISTAS = {
  es: {
    principal: {
      foto: FOTO_PRINCIPAL,
      nombre: "Patrizia Sandretto Re Rebaudengo",
      ubicacion: "Turín, Italia",
      foco: "Escultura contemporánea · Instalación · Fotografía",
      extracto: "Una de las patronas de arte contemporáneo más influyentes del mundo. Presidenta de la Fondazione Sandretto Re Rebaudengo desde 1995, su colección reúne más de 1.500 obras, incluyendo escultura de Tony Cragg, Adrián Villar Rojas y Maurizio Cattelan. Lleva más de tres décadas apoyando a escultores emergentes.",
    },
    secundarios: [
      {
        foto: FOTO_JOANNOU,
        nombre: "Dakis Joannou",
        ubicacion: "Atenas, Grecia",
        foco: "Escultura · Instalación · Contemporáneo",
        extracto: "Fundador de la DESTE Foundation for Contemporary Art. Su colección de más de 1.500 obras incluye piezas clave de Urs Fischer, Maurizio Cattelan y Jeff Koons. Cada verano comisiona escultura site-specific en el antiguo matadero de la isla de Hidra.",
      },
      {
        foto: FOTO_WARBURG,
        nombre: "Mei & Allan Warburg",
        ubicacion: "Sonoma, California",
        foco: "Escultura exterior · Site-specific · Gran formato",
        extracto: "Fundadores de Donum Estate, una de las colecciones de escultura al aire libre más significativas del mundo. Más de 60 obras monumentales de Ai Weiwei, Louise Bourgeois, Yayoi Kusama y Olafur Eliasson, integradas en 200 hectáreas de viñedo en el norte de California.",
      },
    ],
  },
  en: {
    principal: {
      foto: FOTO_PRINCIPAL,
      nombre: "Patrizia Sandretto Re Rebaudengo",
      ubicacion: "Turin, Italy",
      foco: "Contemporary sculpture · Installation · Photography",
      extracto: "One of the most influential contemporary art patrons in the world. President of the Fondazione Sandretto Re Rebaudengo since 1995, her collection spans over 1,500 works including sculpture by Tony Cragg, Adrián Villar Rojas and Maurizio Cattelan. She has championed emerging sculptors for over three decades.",
    },
    secundarios: [
      {
        foto: FOTO_JOANNOU,
        nombre: "Dakis Joannou",
        ubicacion: "Athens, Greece",
        foco: "Sculpture · Installation · Contemporary",
        extracto: "Founder of the DESTE Foundation for Contemporary Art. His collection of over 1,500 works includes major sculpture by Urs Fischer, Maurizio Cattelan and Jeff Koons. Each summer he commissions site-specific sculpture at the former slaughterhouse on the island of Hydra.",
      },
      {
        foto: FOTO_WARBURG,
        nombre: "Mei & Allan Warburg",
        ubicacion: "Sonoma, California",
        foco: "Outdoor sculpture · Site-specific · Large scale",
        extracto: "Founders of Donum Estate, one of the world's most significant outdoor sculpture collections. Over 60 monumental works by Ai Weiwei, Louise Bourgeois, Yayoi Kusama and Olafur Eliasson, integrated across 200 acres of vineyard in Northern California.",
      },
    ],
  },
};

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const Colectores = () => {
  const lang = useLang();
  const data = COLECCIONISTAS[lang];
  const t = lang === "es"
    ? { h: "Coleccionistas", all: "Ver todos →", featured: "Coleccionistas destacados", view: "Ver coleccionista →" }
    : { h: "Collectors", all: "View all →", featured: "Featured collectors", view: "View collector →" };

  const principal = data.principal;

  return (
    <section className="px-6 md:px-12 py-[60px]" style={{ background: "#f5f5f5" }}>
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink">{t.h}</h2>
        <a href="#" className="link-arrow">{t.all}</a>
      </div>

      <article className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center mb-16">
        <Link to={`/coleccionista/${slug(principal.nombre)}`} aria-label={principal.nombre} className="block aspect-[16/9] overflow-hidden bg-secondary group">
          <img src={principal.foto} alt={principal.nombre} loading="lazy" width={1600} height={900} className="w-full h-full object-cover object-[center_35%] transition-transform duration-[700ms] group-hover:scale-[1.02]" />
        </Link>
        <div>
          <Link to={`/coleccionista/${slug(principal.nombre)}`} className="block group">
            <h3 className="font-display text-[28px] max-md:text-[25px] font-semibold text-ink mb-4 leading-tight">
              {principal.nombre}
            </h3>
            <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-6">{principal.extracto}</p>
            <div className="font-body text-[13px] font-normal text-muted-line uppercase tracking-[0.14em] mb-6">
              {principal.ubicacion} · {principal.foco}
            </div>
            <span className="link-arrow">{t.view}</span>
          </Link>
        </div>
      </article>

      <div className="border-t border-border pt-10">
        <div className="font-body text-[12px] font-normal text-muted-line uppercase tracking-[0.18em] mb-6">{t.featured}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {data.secundarios.map((c) => (
            <article key={c.nombre} className="group grid grid-cols-1 md:grid-cols-[40%_60%] gap-5 items-start">
              <Link to={`/coleccionista/${slug(c.nombre)}`} aria-label={c.nombre} className="block aspect-square overflow-hidden bg-secondary">
                <img src={c.foto} alt={c.nombre} loading="lazy" width={800} height={800} className="w-full h-full object-cover object-[center_35%] transition-transform duration-[700ms] group-hover:scale-[1.03]" />
              </Link>
              <div>
                <Link to={`/coleccionista/${slug(c.nombre)}`} className="block hover:opacity-65 transition-opacity">
                  <h3 className="font-display font-semibold text-[28px] max-md:text-[25px] text-ink mb-1.5 leading-tight">{c.nombre}</h3>
                  <div className="font-body text-[13px] font-normal text-muted-line uppercase tracking-[0.14em] mb-3">{c.ubicacion} · {c.foco}</div>
                  <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-3">{c.extracto}</p>
                  <span className="link-arrow text-[12px]">{t.view}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="md:hidden mt-8 flex justify-end">
        <a href="#" className="link-arrow">{t.all}</a>
      </div>
    </section>
  );
};
