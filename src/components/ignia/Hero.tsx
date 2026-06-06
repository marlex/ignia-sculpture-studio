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
    ? { hint: "Click en la pieza para verla en 3D", prev: "Anterior", next: "Siguiente", view: "Ver escultura →", expand: "Ampliar 3D", buy: "Comprar", view3d: "Ver en 3D →", viewObra: "Ver obra →", certified: "Autenticidad certificada", insured: "Envío asegurado", certificate: "Certificado de autenticidad", returns: "Devolución 14 días" }
    : { hint: "Click the piece to view it in 3D", prev: "Previous", next: "Next", view: "View sculpture →", expand: "Expand 3D", buy: "Buy", view3d: "View in 3D →", viewObra: "View artwork →", certified: "Certified authenticity", insured: "Insured shipping", certificate: "Certificate of authenticity", returns: "Free 14-day returns" };

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
      className="hero-section relative w-screen overflow-hidden bg-secondary"
      style={{ height: "calc(100vh - 220px)" }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-section { height: auto !important; min-height: calc(100vh - 56px); }
          .hero-sculpture-wrap { position: relative !important; inset: auto !important; height: 62vh !important; }
          .hero-fade { display: none !important; }
          .hero-arrows { display: none !important; }
          .hero-view-floating { display: none !important; }
          .hero-thumbs { display: none !important; }
          .hero-info-desktop { display: none !important; }
          .hero-bottom-strip { position: static !important; padding: 0 !important; gap: 0 !important; padding-top: 0 !important; }
          .hero-dots { position: absolute !important; left: 0 !important; right: 0 !important; top: calc(62vh - 22px) !important; padding: 0 !important; z-index: 4 !important; }
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
        className={`absolute inset-0 hero-sculpture-wrap hero-sculpture-tap hero-sculpture-desktop ${tapFlash ? "tap-flash" : ""}`}
        onClick={() => navigate(`/obra/${o.slug}`)}
        style={{ cursor: isMobile ? "pointer" : undefined }}
      >
        {o.heroImage ? (
          <img
            src={o.heroImage}
            alt={o.title}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 45%" }}
            width={1920}
            height={1080}
          />
        ) : o.glbUrl ? (
          <GlbViewer url={o.glbUrl} alt={o.title} minHeight="100vh" bgColor="#f8f8f5" enableFullscreen={false} />
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
      <div className="hero-fade absolute inset-x-0 bottom-0 h-[55%] pointer-events-none z-[1]" style={{ background: "linear-gradient(to bottom, rgba(248,248,245,0) 0%, rgba(248,248,245,0.4) 45%, rgba(248,248,245,0.85) 80%, #f8f8f5 100%)" }} />

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

        {/* info desktop — purchase card */}
        <div
          className="hero-info-desktop text-ink w-full max-w-[460px] pt-5 px-6 pb-5 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.82)", border: "0.5px solid hsl(var(--border))" }}
        >
          <div className="font-body text-[11px] font-light tracking-[0.22em] uppercase text-gray mb-2">
            {o.artist}
          </div>
          <h1 className="leading-[1.05] tracking-[0.01em] mb-2 text-ink" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "clamp(32px, 3.4vw, 46px)" }}>
            {o.title}
          </h1>
          <div className="font-body text-[13px] font-light tracking-wide text-gray mb-2.5">
            {o.material} · {o.year}
          </div>
          <div className="flex items-center gap-2 border-[0.5px] border-border px-4 py-2 mb-2.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink shrink-0" aria-hidden>
              <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1 1" />
              <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1-1" />
            </svg>
            <span className="font-body text-[10px] font-light tracking-[0.18em] uppercase text-ink">{t.certified}</span>
            <span className="font-body text-[11px] font-light tracking-wide text-gray ml-auto">{o.authenticity}</span>
          </div>
          <div className="font-display font-bold text-[28px] tracking-[-0.01em] text-ink mb-2.5">{o.price}</div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/obra/${o.slug}?buy=1`); }}
            className="w-full font-body text-[12px] font-medium tracking-[0.22em] uppercase bg-ink text-white py-3.5 hover:opacity-90 transition-opacity mb-2.5"
          >
            {t.buy}
          </button>
          <Link
            to={`/obra/${o.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center font-body text-[12px] font-light tracking-[0.22em] uppercase border-[0.5px] border-ink py-3.5 hover:bg-ink hover:text-white transition-colors text-ink mb-2.5"
          >
            {o.glbUrl ? t.view3d : t.viewObra}
          </Link>
          <div className="flex items-center justify-between gap-3 font-body text-[11px] font-light tracking-wide text-gray flex-wrap">
            <span className="inline-flex items-center gap-1.5"><span>✓</span>{t.insured}</span>
            <span className="inline-flex items-center gap-1.5"><span>✓</span>{t.certificate}</span>
            <span className="inline-flex items-center gap-1.5"><span>✓</span>{t.returns}</span>
          </div>
        </div>

        {/* info mobile — purchase card (same position, updated content) */}
        <div
          className="hero-info-mobile text-ink"
          style={{ padding: "16px 20px 20px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "0.5px solid hsl(var(--border))" }}
        >
          <div className="font-body text-[10px] font-light tracking-[0.22em] uppercase text-gray" style={{ marginBottom: 6 }}>
            {o.artist}
          </div>
          <h1
            className="text-ink"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 26, lineHeight: 1.1, letterSpacing: "0.01em", margin: 0, marginBottom: 6 }}
          >
            {o.title}
          </h1>
          <div className="font-body text-[12px] font-light tracking-wide text-gray" style={{ marginBottom: 10 }}>
            {o.material} · {o.year}
          </div>
          <div className="flex items-center gap-2 border-[0.5px] border-border px-3 py-2" style={{ marginBottom: 10 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink shrink-0" aria-hidden>
              <path d="M10 13a5 5 0 007.07 0l3-3a5 5 0 00-7.07-7.07l-1 1" />
              <path d="M14 11a5 5 0 00-7.07 0l-3 3a5 5 0 007.07 7.07l1-1" />
            </svg>
            <span className="font-body text-[9px] font-light tracking-[0.18em] uppercase text-ink">{t.certified}</span>
            <span className="font-body text-[10px] font-light tracking-wide text-gray ml-auto">{o.authenticity}</span>
          </div>
          <div className="font-display font-bold tracking-[-0.01em] text-ink" style={{ fontSize: 24, marginBottom: 10 }}>{o.price}</div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/obra/${o.slug}?buy=1`); }}
            className="w-full font-body text-[12px] font-medium tracking-[0.22em] uppercase bg-ink text-white hover:opacity-90 transition-opacity"
            style={{ padding: "12px 0", marginBottom: 10 }}
          >
            {t.buy}
          </button>
          <Link
            to={`/obra/${o.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center font-body text-[12px] font-light tracking-[0.22em] uppercase border-[0.5px] border-ink text-ink hover:bg-ink hover:text-white transition-colors"
            style={{ padding: "12px 0", marginBottom: 10 }}
          >
            {o.glbUrl ? t.view3d : t.viewObra}
          </Link>
          <div className="flex items-center justify-between gap-2 font-body text-[11px] font-light tracking-wide text-gray flex-wrap">
            <span className="inline-flex items-center gap-1"><span>✓</span>{t.insured}</span>
            <span className="inline-flex items-center gap-1"><span>✓</span>{t.certificate}</span>
            <span className="inline-flex items-center gap-1"><span>✓</span>{t.returns}</span>
          </div>
        </div>

      </div>

    </section>
  );
};
