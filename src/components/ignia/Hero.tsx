import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { getHeroWorks } from "@/data/igniaWorks";
import { GlbViewer } from "./GlbViewer";

export const Hero = () => {
  const [actual, setActual] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const lang = useLang();
  const obras = getHeroWorks(lang);
  const o = obras[actual];
  const t = lang === "es"
    ? { hint: "Click en la pieza para verla en 3D", prev: "Anterior", next: "Siguiente", view: "Ver escultura →", expand: "Ampliar 3D" }
    : { hint: "Click the piece to view it in 3D", prev: "Previous", next: "Next", view: "View sculpture →", expand: "Expand 3D" };

  const next = () => setActual((actual + 1) % obras.length);
  const prev = () => setActual((actual + obras.length - 1) % obras.length);

  return (
    <section className="relative w-screen overflow-hidden bg-surface" style={{ height: "calc(100vh - 120px)" }}>
      {o.glbUrl ? (
        <div className="absolute inset-0">
          <GlbViewer url={o.glbUrl} alt={o.title} minHeight="100vh" bgColor="#1c1c1a" />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => navigate(`/obra/${o.slug}`)}
          aria-label={t.view}
          className="absolute inset-0 block w-full h-full cursor-zoom-in"
        >
          <img
            src={o.image}
            alt={o.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
            width={1280}
            height={1600}
          />
        </button>
      )}

      {/* Smooth bottom fade from dark scene to white UI */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none z-[1]" style={{ background: "linear-gradient(to bottom, rgba(28,28,26,0) 0%, rgba(28,28,26,0.15) 35%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.95) 92%, #ffffff 100%)" }} />

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

      {/* View work button */}
      <Link
        to={`/obra/${o.slug}`}
        className="absolute left-1/2 -translate-x-1/2 bottom-[210px] md:bottom-[180px] z-20 font-body text-[11px] font-light tracking-[0.22em] uppercase text-ink/85 hover:text-ink transition-colors flex items-center gap-2 bg-white/85 backdrop-blur px-3 py-2 border-[0.5px] border-border"
      >
        <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-ink" />
        {t.view}
      </Link>

      {/* bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-8 md:pb-9 flex flex-col md:flex-row items-stretch md:items-end gap-6 md:gap-12 pt-16">
        {/* thumbs */}
        <div className="flex md:flex-col gap-2 shrink-0">
          {obras.map((ob, i) => (
            <button
              key={ob.slug}
              onClick={() => setActual(i)}
              aria-label={ob.title}
              className="cursor-pointer transition-opacity"
              style={{ opacity: i === actual ? 1 : 0.35 }}
            >
              <div
                className="w-12 h-16 border-[0.5px] border-border overflow-hidden"
                style={{ borderBottom: i === actual ? "2px solid hsl(var(--ink))" : undefined }}
              >
                <img src={ob.image} alt="" className="w-full h-full object-cover" />
              </div>
            </button>
          ))}
        </div>

        {/* info */}
        <div className="flex-1 text-ink">
          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] mb-3 text-ink" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            {o.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mb-3.5 font-body text-[14px] font-light tracking-wide text-gray">
            <span>{o.artist}</span>
            <span className="text-border">·</span>
            <span>{o.material}</span>
            <span className="text-border">·</span>
            <span className="font-mono text-[12px]">{lang === "es" ? "Autenticidad" : "Authenticity"} {o.authenticity}</span>
          </div>
          <div className="flex items-baseline gap-7">
            <span className="font-display font-bold text-[22px] tracking-[-0.01em] text-ink">{o.price}</span>
            <Link to={`/obra/${o.slug}`} className="font-body text-[13px] font-light tracking-[0.14em] uppercase border-b-[0.5px] border-ink pb-px hover:opacity-50 transition-opacity text-ink">
              {t.view}
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};
