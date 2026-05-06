import { useEffect, useState } from "react";
import { Sculpture3DModal } from "./Sculpture3DModal";
import { SculptureViewer } from "./SculptureViewer";
import hero1 from "@/assets/hero-real-1.jpg";
import hero2 from "@/assets/hero-real-2.jpg";
import hero3 from "@/assets/hero-real-3.jpg";
import { useLang } from "@/i18n/LanguageContext";

const photos = [hero1, hero2, hero3];

const OBRAS = {
  es: [
    { nombre: "Lirio en vuelo", artista: "Ana Ruiz", material: "Bronce a la cera perdida", precio: "€ 14.800", slug: "lirio-en-vuelo", auth: "Autenticidad #0x3a9f…c21" },
    { nombre: "Ofrenda", artista: "Helena Vázquez", material: "Bronce pulido a mano", precio: "€ 22.500", slug: "ofrenda", auth: "Autenticidad #0x7b14…e08" },
    { nombre: "Torsión I", artista: "Camila Soler", material: "Alabastro blanco", precio: "€ 11.600", slug: "torsion-i", auth: "Autenticidad #0x2d5c…a93" },
  ],
  en: [
    { nombre: "Lily in flight", artista: "Ana Ruiz", material: "Lost-wax bronze", precio: "€ 14,800", slug: "lirio-en-vuelo", auth: "Authenticity #0x3a9f…c21" },
    { nombre: "Offering", artista: "Helena Vázquez", material: "Hand-polished bronze", precio: "€ 22,500", slug: "ofrenda", auth: "Authenticity #0x7b14…e08" },
    { nombre: "Torsion I", artista: "Camila Soler", material: "White alabaster", precio: "€ 11,600", slug: "torsion-i", auth: "Authenticity #0x2d5c…a93" },
  ],
};

export const Hero = () => {
  const [actual, setActual] = useState(0);
  const [open3d, setOpen3d] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const lang = useLang();
  const obras = OBRAS[lang];
  const o = obras[actual];
  const t = lang === "es"
    ? { hint: "Pulsa para verla en 3D", prev: "Anterior", next: "Siguiente", view: "Ver escultura →", view3d: "Ver en 3D", of: "de" }
    : { hint: "Tap to view in 3D", prev: "Previous", next: "Next", view: "View sculpture →", view3d: "View in 3D", of: "of" };

  const next = () => setActual((actual + 1) % 3);
  const prev = () => setActual((actual + 2) % 3);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-surface">
      {/* Real photo */}
      <div className="absolute inset-0">
        <img
          src={photos[actual]}
          alt={o.nombre}
          className="w-full h-full object-cover transition-[object-position] duration-700"
          style={{ objectPosition: `center ${focalY[actual]}` }}
          width={1280}
          height={1600}
        />
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.45) 100%)" }} />

      {/* hint chip */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 font-body text-[11px] font-light tracking-[0.2em] uppercase z-[5] pointer-events-none whitespace-nowrap transition-opacity duration-[1200ms] bg-white/85 backdrop-blur px-4 py-2 border-[0.5px] border-border text-ink"
        style={{ opacity: showHint ? 0.95 : 0 }}
      >
        ◆ {t.hint}
      </div>

      {/* arrows */}
      <button onClick={prev} aria-label={t.prev} className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 z-20 w-10 h-10 flex items-center justify-center text-[15px] border-[0.5px] border-border backdrop-blur-md transition-colors hover:bg-white"
        style={{ background: "rgba(248,248,246,0.9)", color: "#111" }}>←</button>
      <button onClick={next} aria-label={t.next} className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20 w-10 h-10 flex items-center justify-center text-[15px] border-[0.5px] border-border backdrop-blur-md transition-colors hover:bg-white"
        style={{ background: "rgba(248,248,246,0.9)", color: "#111" }}>→</button>

      {/* Floating 3D link (centered low, subtle) */}
      <button
        onClick={() => setOpen3d(true)}
        className="absolute left-1/2 -translate-x-1/2 bottom-[210px] md:bottom-[180px] z-20 font-body text-[10px] font-light tracking-[0.22em] uppercase text-white/85 hover:text-white transition-colors flex items-center gap-2"
      >
        <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-white/70" />
        {t.view3d}
      </button>

      {/* bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-8 md:pb-9 flex flex-col md:flex-row items-stretch md:items-end gap-6 md:gap-12 bg-gradient-to-t from-white via-white/95 to-white/0 pt-16">
        {/* thumbs */}
        <div className="flex md:flex-col gap-2 shrink-0">
          {obras.map((ob, i) => (
            <button
              key={ob.slug}
              onClick={() => setActual(i)}
              aria-label={ob.nombre}
              className="cursor-pointer transition-opacity"
              style={{ opacity: i === actual ? 1 : 0.35 }}
            >
              <div
                className="w-12 h-16 border-[0.5px] border-border overflow-hidden"
                style={{ borderBottom: i === actual ? "2px solid hsl(var(--ink))" : undefined }}
              >
                <img src={photos[i]} alt="" className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>

        {/* info */}
        <div className="flex-1 text-ink">
          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] mb-3 text-ink" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            {o.nombre}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mb-3.5 font-body text-[14px] font-light tracking-wide text-gray">
            <span>{o.artista}</span>
            <span className="text-border">·</span>
            <span>{o.material}</span>
            <span className="text-border">·</span>
            <span className="font-mono text-[12px]">{o.auth}</span>
          </div>
          <div className="flex items-baseline gap-7">
            <span className="font-display font-bold text-[22px] tracking-[-0.01em] text-ink">{o.precio}</span>
            <a href={`/obra/${o.slug}`} className="font-body text-[13px] font-light tracking-[0.14em] uppercase border-b-[0.5px] border-ink pb-px hover:opacity-50 transition-opacity text-ink">
              {t.view}
            </a>
          </div>
        </div>
      </div>

      <Sculpture3DModal
        open={open3d}
        onClose={() => setOpen3d(false)}
        obraIndex={actual}
        titulo={o.nombre}
        artista={o.artista}
        material={o.material}
      />
    </section>
  );
};
