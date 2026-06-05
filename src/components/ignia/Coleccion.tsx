import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { GlbViewer } from "./GlbViewer";
import { getCatalogueWorks } from "@/data/igniaWorks";
import { X } from "lucide-react";

export const Coleccion = () => {
  const lang = useLang();
  const obras = getCatalogueWorks(lang);
  const [open3d, setOpen3d] = useState<number | null>(null);

  const t = lang === "es" ? {
    h: "Descubre todas las colecciones",
    cta: "Ver obras →",
    sub: "843 obras · Actualizado semanalmente",
    search: "Buscar artista, obra, material…",
    filters: ["Material", "Precio", "Técnica"],
    view3d: "Ver en 3D",
    viewAngles: "Ver ángulos",
    viewObra: "Ver escultura",
    auth: "Autenticidad",
    close: "Cerrar",
    hint: "Arrastra para rotar · Scroll para zoom",
  } : {
    h: "Discover the full collection",
    cta: "Browse works →",
    sub: "843 works · Updated weekly",
    search: "Search artist, work, material…",
    filters: ["Material", "Price", "Technique"],
    view3d: "View in 3D",
    viewAngles: "View angles",
    viewObra: "View sculpture",
    auth: "Authenticity",
    close: "Close",
    hint: "Drag to rotate · Scroll to zoom",
  };

  const open = open3d !== null ? obras[open3d] : null;

  useEffect(() => {
    if (open3d === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen3d(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open3d]);

  return (
    <section className="bg-white px-6 md:px-12 py-[60px]">
      <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.h}</h2>
        <Link to="/coleccion" className="link-arrow">{t.cta}</Link>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {obras.map((o, i) => {
          const has3d = !!o.glbUrl;
          return (
            <article key={i} className="bg-white group">
              <Link to={`/obra/${o.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#faf9f7]">
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {has3d && (
                  <span className="absolute top-2.5 right-2.5 bg-white text-ink font-body text-[10px] tracking-[0.12em] px-2 py-0.5 border border-border">
                    · 3D
                  </span>
                )}
              </Link>
              <div className="bg-white pt-3 pb-1">
                <div className="font-body text-[11px] uppercase tracking-[0.16em] text-gray mb-1">{o.artist}</div>
                <h3 className="font-body text-[14px] font-medium text-ink mb-1">{o.title}</h3>
                <div className="font-body text-[14px] font-semibold text-ink">{o.price}</div>
              </div>
            </article>
          );
        })}
      </div>


      {open && open.glbUrl && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col">
          <header className="flex items-center justify-between px-6 md:px-10 h-14 border-b border-white/10 text-white">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-[16px]">{open.title}</span>
              <span className="font-body text-[12px] uppercase tracking-[0.14em] text-white/55">{open.artist} · {open.material}</span>
            </div>
            <button onClick={() => setOpen3d(null)} aria-label={t.close} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </header>
          <div className="relative flex-1">
            <GlbViewer url={open.glbUrl} />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/55 font-body text-[11px] uppercase tracking-[0.18em] pointer-events-none">
              {t.hint}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
