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
        @media (min-width: 769px) {
          .hero-sculpture-desktop {
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='4' fill='%23111111'/><line x1='12' y1='2' x2='12' y2='8' stroke='%23111111' stroke-width='1'/><line x1='12' y1='16' x2='12' y2='22' stroke='%23111111' stroke-width='1'/><line x1='2' y1='12' x2='8' y2='12' stroke='%23111111' stroke-width='1'/><line x1='16' y1='12' x2='22' y2='12' stroke='%23111111' stroke-width='1'/></svg>") 12 12, pointer;
          }
          .hero-svg-arrow { opacity: 0; transition: opacity 200ms ease-in, transform 200ms ease-in; }
          .hero-svg-arrow.left { transform: translateX(-16px); }
          .hero-svg-arrow.right { transform: translateX(16px); }
          .hero-section:hover .hero-svg-arrow { opacity: 1; transform: translateX(0); transition: opacity 280ms cubic-bezier(0.16,1,0.3,1), transform 280ms cubic-bezier(0.16,1,0.3,1); }
          .hero-svg-arrow svg { transition: transform 180ms ease; }
          .hero-svg-arrow svg line { transition: stroke 180ms ease; }
          .hero-svg-arrow:hover svg { transform: scale(1.15); }
          .hero-svg-arrow:hover svg line { stroke: rgba(255,255,255,1) !important; }
        }
      `}</style>


      <div
        className={`absolute inset-0 hero-sculpture-tap hero-sculpture-desktop ${tapFlash ? "tap-flash" : ""}`}
        onClick={() => navigate(`/obra/${o.slug}`)}
        style={{ cursor: isMobile ? "pointer" : undefined }}
      >
        {o.glbUrl ? (
          <GlbViewer url={o.glbUrl} alt={o.title} minHeight="100vh" bgColor="#1c1c1a" enableFullscreen={false} />
        ) : (
          <img
            src={o.image}
            alt={o.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 35%" }}
            width={1280}
            height={1600}
          />
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

      {/* arrows (desktop minimal SVG; mobile hidden via .hero-arrows rule) */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        aria-label={t.prev}
        className="hero-arrows hero-svg-arrow left absolute top-1/2 -translate-y-1/2 z-20"
        style={{ left: 24, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
      >
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden>
          <line x1="27" y1="8" x2="7" y2="8" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="7" y1="8" x2="13.55" y2="3.41" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="7" y1="8" x2="13.55" y2="12.59" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        aria-label={t.next}
        className="hero-arrows hero-svg-arrow right absolute top-1/2 -translate-y-1/2 z-20"
        style={{ right: 24, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
      >
        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden>
          <line x1="1" y1="8" x2="21" y2="8" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="21" y1="8" x2="14.45" y2="3.41" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="21" y1="8" x2="14.45" y2="12.59" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </button>

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
                className="w-[58px] h-[74px] border-[0.5px] border-border overflow-hidden"
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
          <h1 className="leading-[1.05] tracking-[0.01em] mb-1.5 text-ink" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(27px, 3.4vw, 49px)" }}>
            {o.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mb-2 font-body text-[14px] font-light tracking-wide text-gray">
            <span>{o.artist}</span>
            <span className="text-border">·</span>
            <span>{o.material}</span>
            <span className="text-border">·</span>
            <span style={{ fontWeight: 400 }}>{lang === "es" ? "Autenticidad" : "Authenticity"} {o.authenticity}</span>
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
          style={{ padding: "40px 20px", background: "#ffffff", lineHeight: 1.3 }}
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
