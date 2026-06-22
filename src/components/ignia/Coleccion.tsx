import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { GlbViewer } from "./GlbViewer";
import { getCatalogueWorks, type LocalizedWork } from "@/data/igniaWorks";
import { Maximize2, X } from "lucide-react";

const parsePrice = (price: string): number => {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

const techniqueOf = (material: string): string => material.split(" ")[0];

export const Coleccion = () => {
  const lang = useLang();
  const allWorks = getCatalogueWorks(lang);

  const [open3d, setOpen3d] = useState<number | null>(null);
  const [openFeatured3d, setOpenFeatured3d] = useState(false);
  const [query, setQuery] = useState("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [material, setMaterial] = useState<string>("");
  const [technique, setTechnique] = useState<string>("");

  const t = lang === "es" ? {
    h: "Descubre todas las colecciones",
    cta: "Ver obras →",
    sub: "843 obras · Actualizado semanalmente",
    search: "Buscar artista, obra, material…",
    priceAsc: "Precio: menor a mayor",
    priceDesc: "Precio: mayor a menor",
    materialAll: "Material: todos",
    techniqueAll: "Técnica: todas",
    view3d: "Ver en 3D",
    viewAngles: "Ver ángulos",
    viewObra: "Comprar",
    auth: "Autenticidad",
    close: "Cerrar",
    hint: "Arrastra para rotar · Scroll para zoom",
  } : {
    h: "Discover the full collection",
    cta: "Browse works →",
    sub: "843 works · Updated weekly",
    search: "Search artist, work, material…",
    priceAsc: "Price: low to high",
    priceDesc: "Price: high to low",
    materialAll: "Material: all",
    techniqueAll: "Technique: all",
    view3d: "View in 3D",
    viewAngles: "View angles",
    viewObra: "Buy",
    auth: "Authenticity",
    close: "Close",
    hint: "Drag to rotate · Scroll to zoom",
  };

  const materialOptions = useMemo(
    () => Array.from(new Set(allWorks.map(w => w.material))).sort(),
    [allWorks]
  );
  const techniqueOptions = useMemo(
    () => Array.from(new Set(allWorks.map(w => techniqueOf(w.material)))).sort(),
    [allWorks]
  );

  const sorted = useMemo(() => {
    const arr = [...allWorks].sort((a, b) => {
      const diff = parsePrice(a.price) - parsePrice(b.price);
      return priceSort === "asc" ? diff : -diff;
    });
    return arr;
  }, [allWorks, priceSort]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sorted.filter(w => {
      if (material && w.material !== material) return false;
      if (technique && techniqueOf(w.material) !== technique) return false;
      if (q) {
        const hay = `${w.title} ${w.artist} ${w.material}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [sorted, query, material, technique]);

  const FEATURED_SLUG = "ulmuk-vase";
  const featured = filtered.find(w => w.slug === FEATURED_SLUG) ?? filtered[0];
  const gridWorks = filtered.filter(w => w.slug !== featured?.slug);

  const open = open3d !== null ? gridWorks[open3d] : null;

  useEffect(() => {
    const isOpen = open3d !== null || openFeatured3d;
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen3d(null); setOpenFeatured3d(false); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open3d, openFeatured3d]);

  return (
    <section className="bg-white px-8 md:px-16 lg:px-24 py-[60px]">
      <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.h}</h2>
        <Link to="/coleccion" className="link-arrow">{t.cta}</Link>
      </div>
      <p className="font-body text-[16px] font-light text-gray mb-8">{t.sub}</p>

      <div className="flex flex-wrap gap-3 mb-10">
        <input
          type="search"
          placeholder={t.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-60 border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors"
        />
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value as "asc" | "desc")}
          className="border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors"
        >
          <option value="asc">{t.priceAsc}</option>
          <option value="desc">{t.priceDesc}</option>
        </select>
        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors"
        >
          <option value="">{t.materialAll}</option>
          {materialOptions.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={technique}
          onChange={(e) => setTechnique(e.target.value)}
          className="border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors"
        >
          <option value="">{t.techniqueAll}</option>
          {techniqueOptions.map(tk => <option key={tk} value={tk}>{tk}</option>)}
        </select>
      </div>

      {featured && (
        <article className="mb-20 md:mb-24 group">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch">
            <Link
              to={`/obra/${featured.slug}`}
              className="block relative md:col-span-2 aspect-[16/10] overflow-hidden bg-secondary"
            >
              <img
                src={featured.heroImage || featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {featured.glbUrl && (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenFeatured3d(true); }}
                  className="absolute top-4 right-4 z-10 bg-white/90 border border-border font-body text-[12px] uppercase tracking-[0.16em] px-4 py-2 hover:bg-white transition-colors"
                >
                  {t.view3d}
                </button>
              )}
            </Link>
            <div className="flex flex-col justify-end md:col-span-1">
              <h3 className="font-display font-bold text-[clamp(36px,4vw,52px)] leading-[1.05] text-ink mb-2">{featured.title}</h3>
              <div className="font-body text-[18px] font-light text-gray mb-1.5">{featured.artist}</div>
              <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{featured.material}</div>
              <div className="flex items-center gap-1.5 mb-5 font-body text-[12px] font-light text-muted-line">
                <span aria-hidden className="text-ink">◆</span>
                <span>{t.auth} <span className="font-mono text-ink/70">{featured.authenticity}</span></span>
              </div>
              <div className="font-body text-[22px] font-normal text-ink mb-5">{featured.price}</div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
                <Link
                  to={`/obra/${featured.slug}?buy=1`}
                  className="font-body text-[12px] font-medium tracking-[0.22em] uppercase border-[0.5px] border-ink text-ink px-7 py-3.5 hover:bg-ink hover:text-white transition-colors block w-full md:w-auto text-center"
                >
                  {t.viewObra}
                </Link>
                {featured.glbUrl && (
                  <button
                    type="button"
                    onClick={() => setOpenFeatured3d(true)}
                    className="link-arrow bg-transparent border-none p-0 cursor-pointer text-center md:text-left"
                  >
                    {t.view3d} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-10 sm:gap-y-14 lg:gap-x-20 lg:gap-y-24">
        {gridWorks.map((o, i) => {
          const has3d = !!o.glbUrl;
          return (
            <article key={o.slug} className="bg-white group">
              <Link to={`/obra/${o.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={o.image} alt={o.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </Link>
              <div className="px-0 pt-2 pb-3 sm:pt-3 sm:pb-5">
                <h3 className="font-display font-bold text-[24px] sm:text-[28px] text-ink mb-0.5 sm:mb-1">{o.title}</h3>
                <div className="font-body text-[15px] sm:text-[16px] font-light text-gray mb-0.5 sm:mb-1.5">{o.artist}</div>
                <div className="font-body text-[11px] sm:text-[12px] font-light text-muted-line uppercase tracking-[0.14em] mb-1 sm:mb-2">{o.material}</div>
                <div className="flex items-center gap-1.5 mb-1.5 sm:mb-3 font-body text-[11px] font-light text-muted-line normal-case tracking-normal">
                  <span aria-hidden className="text-ink">◆</span>
                   <span>{t.auth} <span className="font-mono text-ink/70">{o.authenticity}</span></span>
                </div>
                <div className="pt-2 sm:pt-3">
                  {/* Mobile: price + 3D in one row, Buy full-width below */}
                  <div className="flex sm:hidden items-center justify-between mb-3">
                    <span className="font-body text-[16px] font-normal text-ink">{o.price}</span>
                    {has3d && (
                      <button
                        type="button"
                        onClick={() => setOpen3d(i)}
                        aria-label={t.view3d}
                        className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium tracking-[0.22em] uppercase text-ink px-4 py-2.5 hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#CCFF00" }}
                      >
                        <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
                        3D
                      </button>
                    )}
                  </div>
                  <Link
                    to={`/obra/${o.slug}`}
                    className="sm:hidden font-body text-[12px] font-medium tracking-[0.22em] uppercase border-[0.5px] border-ink text-ink px-5 py-3 hover:bg-ink hover:text-white transition-colors block w-full text-center"
                  >
                    {t.viewObra}
                  </Link>

                  {/* Desktop: unchanged */}
                  <div className="hidden sm:flex items-center justify-between gap-3">
                    <span className="font-body text-[16px] font-normal text-ink">{o.price}</span>
                    <div className="flex items-center gap-2">
                      {has3d && (
                        <button
                          type="button"
                          onClick={() => setOpen3d(i)}
                          aria-label={t.view3d}
                          className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium tracking-[0.22em] uppercase text-ink px-4 py-2.5 hover:opacity-90 transition-opacity flex-shrink-0"
                          style={{ backgroundColor: "#CCFF00" }}
                        >
                          <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
                          3D
                        </button>
                      )}
                      <Link
                        to={`/obra/${o.slug}`}
                        className="font-body text-[12px] font-medium tracking-[0.22em] uppercase border-[0.5px] border-ink text-ink px-5 py-2.5 hover:bg-ink hover:text-white transition-colors text-center"
                      >
                        {t.viewObra}
                      </Link>
                    </div>
                  </div>
                </div>
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
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full max-w-[min(90vh,1100px)] aspect-square bg-secondary overflow-hidden">
              <GlbViewer url={open.glbUrl} onClose={() => setOpen3d(null)} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-ink/55 font-body text-[11px] uppercase tracking-[0.18em] pointer-events-none">
                {t.hint}
              </div>
            </div>
          </div>
        </div>
      )}

      {openFeatured3d && featured?.glbUrl && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col">
          <header className="flex items-center justify-between px-6 md:px-10 h-14 border-b border-white/10 text-white">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-[16px]">{featured.title}</span>
              <span className="font-body text-[12px] uppercase tracking-[0.14em] text-white/55">{featured.artist} · {featured.material}</span>
            </div>
            <button onClick={() => setOpenFeatured3d(false)} aria-label={t.close} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </header>
          <div className="flex-1 flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full max-w-[min(90vh,1100px)] aspect-square bg-secondary overflow-hidden">
              <GlbViewer url={featured.glbUrl} onClose={() => setOpenFeatured3d(false)} />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-ink/55 font-body text-[11px] uppercase tracking-[0.18em] pointer-events-none">
                {t.hint}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
