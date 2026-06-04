import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { getHeroWorks } from "@/data/igniaWorks";
import { GlbViewer } from "./GlbViewer";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const [actual, setActual] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const [tapFlash, setTapFlash] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

  // Touch swipe (mobile)
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchStartX.current == null) return;
    const dx = touchDeltaX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  };

  const handleSculptureTap = () => {
    if (!isMobile) return;
    setTapFlash(true);
    setTimeout(() => setTapFlash(false), 150);
    navigate(`/obra/${o.slug}`);
  };

  return (
    <section
      className="hero-section relative w-screen overflow-hidden bg-surface"
      style={{ height: "calc(100vh - 220px)" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-arrows { display: none !important; }
          .hero-view-floating { display: none !important; }
          .hero-thumbs { display: none !important; }
          .hero-info-desktop { display: none !important; }
          .hero-bottom-strip { padding: 0 !important; padding-bottom: 0 !important; padding-top: 0 !important; }
        }
        @media (min-width: 769px) {
          .hero-dots { display: none !important; }
          .hero-info-mobile { display: none !important; }
        }
        .hero-sculpture-tap { transition: opacity 150ms ease-out, transform 300ms ease-out; }
        .hero-sculpture-tap.tap-flash { opacity: 0.85; }
      `}</style>

      <div
        className={`absolute inset-0 hero-sculpture-tap ${tapFlash ? "tap-flash" : ""}`}
        onClick={isMobile ? handleSculptureTap : undefined}
        style={{ cursor: isMobile ? "pointer" : "default" }}
      >
        {o.glbUrl ? (
          <GlbViewer url={o.glbUrl} alt={o.title} minHeight="100vh" bgColor="#1c1c1a" />
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
      </div>

      {/* Smooth bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none z-[1]" style={{ background: "linear-gradient(to bottom, rgba(28,28,26,0) 0%, rgba(28,28,26,0.15) 35%, rgba(255,255,255,0.55) 70%, rgba(255,255,255,0.95) 92%, #ffffff 100%)" }} />

      {/* hint chip */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 font-body text-[11px] font-light tracking-[0.2em] uppercase z-[5] pointer-events-none whitespace-nowrap transition-opacity duration-[1200ms] bg-white/85 backdrop-blur px-4 py-2 border-[0.5px] border-border text-ink"
        style={{ opacity: showHint ? 0.95 : 0 }}
      >
        ◆ {t.hint}
      </div>

      {/* arrows (desktop only) */}
      <button onClick={prev} aria-label={t.prev} className="hero-arrows absolute top-1/2 -translate-y-1/2 left-6 md:left-12 z-20 w-10 h-10 flex items-center justify-center text-[15px] border-[0.5px] border-border backdrop-blur-md transition-colors hover:bg-white"
        style={{ background: "rgba(248,248,246,0.9)", color: "#111" }}>←</button>
      <button onClick={next} aria-label={t.next} className="hero-arrows absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20 w-10 h-10 flex items-center justify-center text-[15px] border-[0.5px] border-border backdrop-blur-md transition-colors hover:bg-white"
        style={{ background: "rgba(248,248,246,0.9)", color: "#111" }}>→</button>

      {/* Floating View work button (desktop) */}
      <Link
        to={`/obra/${o.slug}`}
        className="hero-view-floating absolute left-1/2 -translate-x-1/2 bottom-[210px] md:bottom-[180px] z-20 font-body text-[11px] font-light tracking-[0.22em] uppercase text-ink/85 hover:text-ink transition-colors flex items-center gap-2 bg-white/85 backdrop-blur px-3 py-2 border-[0.5px] border-border"
      >
        <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-ink" />
        {t.view}
      </Link>

      {/* bottom strip */}
      <div className="hero-bottom-strip absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-8 md:pb-9 flex flex-col md:flex-row items-stretch md:items-end gap-6 md:gap-12 pt-16">
        {/* thumbs (desktop) */}
        <div className="hero-thumbs flex md:flex-col gap-2 shrink-0">
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

        {/* dot indicators (mobile) */}
        <div
          className="hero-dots"
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: "10px 0" }}
        >
          {obras.map((ob, i) => (
            <button
              key={ob.slug}
              onClick={() => setActual(i)}
              aria-label={ob.title}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: i === actual ? "#111111" : "rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* info desktop */}
        <div className="hero-info-desktop flex-1 text-ink">
          <h1 className="leading-[1.1] tracking-[0.01em] mb-3 text-ink" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(22px, 3vw, 44px)" }}>
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

        {/* info mobile */}
        <div
          className="hero-info-mobile"
          style={{ padding: "14px 20px", background: "#ffffff", lineHeight: 1.3 }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: 22,
              color: "#111111",
              lineHeight: 1.3,
              margin: 0,
              marginBottom: 4,
            }}
          >
            {o.title}
          </h1>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "#666666",
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              margin: 0,
            }}
          >
            {o.artist} · {o.material} · {lang === "es" ? "Autenticidad" : "Authenticity"} {o.authenticity}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 6,
              lineHeight: 1.3,
            }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 20, color: "#111111", lineHeight: 1.3 }}>
              {o.price}
            </span>
            <Link
              to={`/obra/${o.slug}`}
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#111111",
                borderBottom: "0.5px solid #111111",
                paddingBottom: 1,
                lineHeight: 1.3,
              }}
            >
              {t.view}
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};
