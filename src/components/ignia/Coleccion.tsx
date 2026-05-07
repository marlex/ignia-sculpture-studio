import { useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { Sculpture3DModal } from "./Sculpture3DModal";
import { getCatalogueWorks } from "@/data/igniaWorks";

export const Coleccion = () => {
  const lang = useLang();
  const obras = getCatalogueWorks(lang);
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
          return (
            <article key={i} className="bg-white group">
              <Link to={`/obra/${o.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={o.image} alt={o.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </Link>
              <div className="p-5">
                <button
                  onClick={() => setOpen3d(i)}
                  className="inline-flex items-center gap-1.5 mb-2 font-body text-[10px] font-light text-muted-line uppercase tracking-[0.14em] border-[0.5px] border-border px-2 py-1 hover:text-ink hover:border-ink transition-colors"
                >
                  <span aria-hidden>◇</span> {t.view3d}
                </button>
                <h3 className="font-display font-bold text-[17px] text-ink mb-1">{o.title}</h3>
                <div className="font-body text-[14px] font-light text-gray mb-1.5">{o.artist}</div>
                <div className="font-body text-[12px] font-light text-muted-line uppercase tracking-[0.14em] mb-2">{o.material}</div>
                <div className="flex items-center gap-1.5 mb-3 font-body text-[11px] font-light text-muted-line normal-case tracking-normal">
                  <span aria-hidden className="text-ink">◆</span>
                   <span>{t.auth} <span className="font-mono text-ink/70">{o.authenticity}</span></span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t-[0.5px] border-border gap-3">
                  <span className="font-body text-[14px] font-normal text-ink">{o.price}</span>
                  <Link
                     to={`/obra/${o.slug}`}
                    className="font-body text-[12px] font-normal text-ink uppercase tracking-[0.12em] border-b-[0.5px] border-ink pb-px hover:opacity-60 transition-opacity"
                  >
                    {t.viewObra} →
                  </Link>
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
          titulo={obras[open3d].title}
          artista={obras[open3d].artist}
          material={obras[open3d].material}
          photoSrc={obras[open3d].image}
          model={obras[open3d].model}
        />
      )}
    </section>
  );
};
