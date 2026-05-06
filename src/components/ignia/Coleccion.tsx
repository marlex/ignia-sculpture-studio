import { useState } from "react";
import { Link } from "react-router-dom";
import obra1 from "@/assets/obra-1.jpg";
import obra2 from "@/assets/obra-2.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra4 from "@/assets/obra-4.jpg";
import obra5 from "@/assets/obra-5.jpg";
import obra6 from "@/assets/obra-6.jpg";
import obra7 from "@/assets/obra-7.jpg";
import obra8 from "@/assets/obra-8.jpg";
import { useLang } from "@/i18n/LanguageContext";
import { Sculpture3DModal } from "./Sculpture3DModal";

const SLUGS = ["lirio-en-vuelo", "ofrenda", "torsion-i"];

const OBRAS = {
  es: [
    { img: obra1, material: "Bronce", titulo: "Confluencia", artista: "Marcos Iriarte", precio: "€ 8.400" },
    { img: obra2, material: "Mármol", titulo: "Pliegue III", artista: "Alba Costa", precio: "€ 12.200" },
    { img: obra3, material: "Acero corten", titulo: "Vértigo", artista: "Diego Lara", precio: "€ 6.700" },
    { img: obra4, material: "Madera de roble", titulo: "Raíz", artista: "Sofía Méndez", precio: "€ 3.900" },
    { img: obra5, material: "Cerámica esmaltada", titulo: "Origen", artista: "Lucía Pardo", precio: "€ 1.200" },
    { img: obra6, material: "Bronce", titulo: "Eco", artista: "Pablo Reyes", precio: "€ 9.600" },
    { img: obra7, material: "Alabastro", titulo: "Quietud", artista: "Inés Ferrer", precio: "€ 5.300" },
    { img: obra8, material: "Vidrio soplado", titulo: "Luz interior", artista: "Tomás Vigo", precio: "€ 4.150" },
  ],
  en: [
    { img: obra1, material: "Bronze", titulo: "Confluence", artista: "Marcos Iriarte", precio: "€ 8,400" },
    { img: obra2, material: "Marble", titulo: "Fold III", artista: "Alba Costa", precio: "€ 12,200" },
    { img: obra3, material: "Corten steel", titulo: "Vertigo", artista: "Diego Lara", precio: "€ 6,700" },
    { img: obra4, material: "Oak wood", titulo: "Root", artista: "Sofía Méndez", precio: "€ 3,900" },
    { img: obra5, material: "Glazed ceramic", titulo: "Origin", artista: "Lucía Pardo", precio: "€ 1,200" },
    { img: obra6, material: "Bronze", titulo: "Echo", artista: "Pablo Reyes", precio: "€ 9,600" },
    { img: obra7, material: "Alabaster", titulo: "Stillness", artista: "Inés Ferrer", precio: "€ 5,300" },
    { img: obra8, material: "Blown glass", titulo: "Inner light", artista: "Tomás Vigo", precio: "€ 4,150" },
  ],
};

export const Coleccion = () => {
  const lang = useLang();
  const obras = OBRAS[lang];
  const [open3d, setOpen3d] = useState<number | null>(null);
  const t = lang === "es" ? {
    h: "Descubre todas las colecciones",
    cta: "Ver las 843 obras →",
    sub: "843 obras · Actualizado semanalmente",
    search: "Buscar artista, obra, material…",
    filters: ["Material", "Precio", "Técnica"],
    view3d: "Ver en 3D",
    viewObra: "Ver escultura",
    auth: "Autenticidad",
    state: "Disponible · 3D",
  } : {
    h: "Discover the full collection",
    cta: "Browse all 843 works →",
    sub: "843 works · Updated weekly",
    search: "Search artist, work, material…",
    filters: ["Material", "Price", "Technique"],
    view3d: "View in 3D",
    viewObra: "View sculpture",
    auth: "Authenticity",
    state: "Available · 3D",
  };

  return (
    <section className="bg-surface px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.h}</h2>
        <a href="#" className="link-arrow">{t.cta}</a>
      </div>
      <p className="font-body text-[14px] font-light text-gray mb-8">{t.sub}</p>

      <div className="flex flex-wrap gap-3 mb-10">
        <input type="search" placeholder={t.search} className="w-60 border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors" />
        {t.filters.map(s => (
          <select key={s} className="border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors">
            <option>{s}</option>
          </select>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
        {obras.map((o, i) => {
          const slug = SLUGS[i % SLUGS.length];
          return (
            <article key={i} className="bg-white group">
              <Link to={`/obra/${slug}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={o.img} alt={o.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </Link>
              <div className="p-5">
                <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-1.5">{o.material}</div>
                <h3 className="font-display font-bold text-[17px] text-ink mb-1">{o.titulo}</h3>
                <div className="font-body text-[14px] font-light text-gray mb-3">{o.artista}</div>
                <div className="flex items-center gap-1.5 mb-3 font-body text-[11px] font-light text-muted-line normal-case tracking-normal">
                  <span aria-hidden className="text-ink">◆</span>
                  <span>{t.auth} <span className="font-mono text-ink/70">#0x{(i * 7919 + 0x3a9f).toString(16)}…{(i * 1117 + 0xc21).toString(16).slice(-3)}</span></span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t-[0.5px] border-border gap-3">
                  <span className="font-body text-[14px] font-normal text-ink">{o.precio}</span>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/obra/${slug}`}
                      className="font-body text-[12px] font-normal text-ink uppercase tracking-[0.12em] border-b-[0.5px] border-ink pb-px hover:opacity-60 transition-opacity"
                    >
                      {t.viewObra} →
                    </Link>
                    <button
                      onClick={() => setOpen3d(i)}
                      className="font-body text-[11px] font-light text-muted-line uppercase tracking-[0.12em] hover:text-ink transition-colors"
                    >
                      {t.view3d}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {open3d !== null && (
        <Sculpture3DModal
          open={open3d !== null}
          onClose={() => setOpen3d(null)}
          obraIndex={open3d}
          titulo={obras[open3d].titulo}
          artista={obras[open3d].artista}
          material={obras[open3d].material}
        />
      )}
    </section>
  );
};
