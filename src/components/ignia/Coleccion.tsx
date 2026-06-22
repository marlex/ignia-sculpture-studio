import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { GlbViewer } from "./GlbViewer";
import { getCatalogueWorks, type LocalizedWork } from "@/data/igniaWorks";
import { artistSlug } from "@/lib/artistSlug";
import { Maximize2, X, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const parsePrice = (price: string): number => {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : 0;
};

const techniqueOf = (material: string): string => material.split(" ")[0];

type FilterKey = "price" | "material" | "technique";

export const Coleccion = () => {
  const lang = useLang();
  const allWorks = getCatalogueWorks(lang);

  const [open3d, setOpen3d] = useState<number | null>(null);
  const [openFeatured3d, setOpenFeatured3d] = useState(false);
  const [query, setQuery] = useState("");
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [material, setMaterial] = useState<string>("");
  const [technique, setTechnique] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);

  const t = lang === "es" ? {
    h: "Colección",
    worksLabel: "obras",
    search: "Buscar artista, obra, material…",
    priceAsc: "Precio: menor a mayor",
    priceDesc: "Precio: mayor a menor",
    materialAll: "Todos los materiales",
    techniqueAll: "Todas las técnicas",
    chipPrice: "Precio",
    chipMaterial: "Material",
    chipTechnique: "Técnica",
    apply: "Aplicar",
    view3d: "Ver en 3D",
    viewObra: "Comprar",
    auth: "Autenticidad",
    close: "Cerrar",
    hint: "Arrastra para rotar · Scroll para zoom",
  } : {
    h: "Collection",
    worksLabel: "works",
    search: "Search artist, work, material…",
    priceAsc: "Price: low to high",
    priceDesc: "Price: high to low",
    materialAll: "All materials",
    techniqueAll: "All techniques",
    chipPrice: "Price",
    chipMaterial: "Material",
    chipTechnique: "Technique",
    apply: "Apply",
    view3d: "View in 3D",
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

  const totalCount = allWorks.length;

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

  // Active chip indicator
  const chipActive = (key: FilterKey) => {
    if (key === "price") return priceSort !== "asc";
    if (key === "material") return !!material;
    if (key === "technique") return !!technique;
    return false;
  };

  const sheetTitle =
    activeFilter === "price" ? t.chipPrice :
    activeFilter === "material" ? t.chipMaterial :
    activeFilter === "technique" ? t.chipTechnique : "";

  return (
    <section className="bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-6 sm:py-10 md:py-[60px]">
      {/* Title + dynamic count (mobile + desktop) */}
      <div className="mb-3 sm:mb-6">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">
          {t.h}
        </h2>
      </div>

      {/* MOBILE: full-width search */}
      <div className="sm:hidden mb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" strokeWidth={1.5} />
          <input
            type="search"
            placeholder={t.search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-[0.5px] border-border bg-white font-body text-[14px] font-light pl-9 pr-3 py-2.5 outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>

      {/* MOBILE: scrollable filter chips */}
      <div className="sm:hidden mb-5 -mx-4 px-4 overflow-x-auto scrollbar-none" style={{ scrollbarWidth: "none" }}>
        <div className="flex gap-2 w-max">
          {([
            { key: "price" as const, label: t.chipPrice },
            { key: "material" as const, label: t.chipMaterial },
            { key: "technique" as const, label: t.chipTechnique },
          ]).map(c => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveFilter(c.key)}
              className={`font-body text-[11px] tracking-[0.18em] uppercase px-4 py-2 border-[0.5px] transition-colors whitespace-nowrap ${
                chipActive(c.key)
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-white text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* DESKTOP: original filters */}
      <div className="hidden sm:flex flex-wrap gap-3 mb-10">
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
              className="block relative md:col-span-2 aspect-[4/5] md:aspect-[16/10] overflow-hidden bg-secondary"
            >
              <img
                src={featured.heroImage || featured.image}
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="flex flex-col justify-end md:col-span-1">
              <h3 className="font-display font-bold text-[clamp(36px,4vw,52px)] leading-[1.05] text-ink mb-2"><Link to={`/obra/${featured.slug}`} className="hover:underline underline-offset-4">{featured.title}</Link></h3>
              <Link to={`/perfil/escultor/${artistSlug(featured.artist)}`} className="font-body text-[18px] font-light text-gray mb-1.5 hover:text-ink hover:underline underline-offset-4 transition-colors w-fit">{featured.artist}</Link>
              <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{featured.material}</div>
              <div className="flex items-center gap-1.5 mb-5 font-body text-[12px] font-light text-muted-line">
                <span aria-hidden className="text-ink">◆</span>
                <span>{t.auth} <span className="font-mono text-ink/70">{featured.authenticity}</span></span>
              </div>
              {/* Mobile: price + 3D on a row, Buy full-width below */}
              <div className="flex sm:hidden items-center justify-between mb-3">
                <span className="font-body text-[16px] font-normal text-ink">{featured.price}</span>
                {featured.glbUrl && (
                  <button
                    type="button"
                    onClick={() => setOpenFeatured3d(true)}
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
                to={`/obra/${featured.slug}?buy=1`}
                className="sm:hidden font-body text-[12px] font-medium tracking-[0.22em] uppercase border-[0.5px] border-ink text-ink px-5 py-3 hover:bg-ink hover:text-white transition-colors block w-full text-center"
              >
                {t.viewObra}
              </Link>

              {/* Desktop: unchanged */}
              <div className="hidden sm:flex items-center justify-between gap-3 flex-wrap">
                <span className="font-body text-[16px] font-normal text-ink">{featured.price}</span>
                <div className="flex items-center gap-2">
                  {featured.glbUrl && (
                    <button
                      type="button"
                      onClick={() => setOpenFeatured3d(true)}
                      aria-label={t.view3d}
                      className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium tracking-[0.22em] uppercase text-ink px-4 py-2.5 hover:opacity-90 transition-opacity flex-shrink-0"
                      style={{ backgroundColor: "#CCFF00" }}
                    >
                      <Maximize2 className="w-3.5 h-3.5" strokeWidth={2} />
                      3D
                    </button>
                  )}
                  <Link
                    to={`/obra/${featured.slug}?buy=1`}
                    className="font-body text-[12px] font-medium tracking-[0.22em] uppercase border-[0.5px] border-ink text-ink px-5 py-2.5 hover:bg-ink hover:text-white transition-colors text-center"
                  >
                    {t.viewObra}
                  </Link>
                </div>
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
                <h3 className="font-display font-bold text-[28px] text-ink mb-0.5 sm:mb-1"><Link to={`/obra/${o.slug}`} className="hover:underline underline-offset-4">{o.title}</Link></h3>
                <Link to={`/perfil/escultor/${artistSlug(o.artist)}`} className="block font-body text-[15px] sm:text-[16px] font-light text-gray mb-0.5 sm:mb-1.5 hover:text-ink hover:underline underline-offset-4 transition-colors w-fit">{o.artist}</Link>
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

      {/* MOBILE: bottom sheet for filters */}
      <Sheet open={activeFilter !== null} onOpenChange={(o) => { if (!o) setActiveFilter(null); }}>
        <SheetContent
          side="bottom"
          className="h-[60vh] rounded-t-2xl p-0 flex flex-col sm:max-w-none"
        >
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-border text-left">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" aria-hidden />
            <SheetTitle className="font-body text-[12px] font-medium tracking-[0.22em] uppercase text-ink">
              {sheetTitle}
            </SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {activeFilter === "price" && (
              <ul className="divide-y divide-border">
                {[
                  { v: "asc" as const, label: t.priceAsc },
                  { v: "desc" as const, label: t.priceDesc },
                ].map(opt => (
                  <li key={opt.v}>
                    <label className="flex items-center justify-between py-3.5 cursor-pointer">
                      <span className="font-body text-[15px] font-light text-ink">{opt.label}</span>
                      <input
                        type="radio"
                        name="price-sort"
                        checked={priceSort === opt.v}
                        onChange={() => setPriceSort(opt.v)}
                        className="accent-ink w-4 h-4"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {activeFilter === "material" && (
              <ul className="divide-y divide-border">
                <li>
                  <label className="flex items-center justify-between py-3.5 cursor-pointer">
                    <span className="font-body text-[15px] font-light text-ink">{t.materialAll}</span>
                    <input
                      type="radio"
                      name="material"
                      checked={material === ""}
                      onChange={() => setMaterial("")}
                      className="accent-ink w-4 h-4"
                    />
                  </label>
                </li>
                {materialOptions.map(m => (
                  <li key={m}>
                    <label className="flex items-center justify-between py-3.5 cursor-pointer">
                      <span className="font-body text-[15px] font-light text-ink">{m}</span>
                      <input
                        type="radio"
                        name="material"
                        checked={material === m}
                        onChange={() => setMaterial(m)}
                        className="accent-ink w-4 h-4"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {activeFilter === "technique" && (
              <ul className="divide-y divide-border">
                <li>
                  <label className="flex items-center justify-between py-3.5 cursor-pointer">
                    <span className="font-body text-[15px] font-light text-ink">{t.techniqueAll}</span>
                    <input
                      type="radio"
                      name="technique"
                      checked={technique === ""}
                      onChange={() => setTechnique("")}
                      className="accent-ink w-4 h-4"
                    />
                  </label>
                </li>
                {techniqueOptions.map(tk => (
                  <li key={tk}>
                    <label className="flex items-center justify-between py-3.5 cursor-pointer">
                      <span className="font-body text-[15px] font-light text-ink">{tk}</span>
                      <input
                        type="radio"
                        name="technique"
                        checked={technique === tk}
                        onChange={() => setTechnique(tk)}
                        className="accent-ink w-4 h-4"
                      />
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-5 pb-6 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => setActiveFilter(null)}
              className="w-full font-body text-[12px] font-medium tracking-[0.22em] uppercase bg-ink text-white py-3.5 hover:opacity-90 transition-opacity"
            >
              {t.apply}
            </button>
          </div>
        </SheetContent>
      </Sheet>

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
