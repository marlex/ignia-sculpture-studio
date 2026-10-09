import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WORKS } from "@/data/igniaWorks";
import { useLang } from "@/i18n/LanguageContext";

// Real work photos only, from roster artists — picked for visual variety.
const SLIDE_WORK_SLUGS = ["vinculo", "efusion", "quietud-alabastro", "mujer-y-nino", "nervadura"] as const;

const SLIDE_COPY = [
  {
    es: { phrase: "Un lugar solo para la escultura.", support: "Tu obra, mostrada con el espacio y la atención que la escultura exige." },
    en: { phrase: "A place only for sculpture.", support: "Your work, shown with the space and attention sculpture asks for." },
  },
  {
    es: { phrase: "Vista en todos sus ángulos.", support: "Cada pieza en 3D y a escala real en el espacio del coleccionista." },
    en: { phrase: "Seen in the round.", support: "Every piece in 3D and at real scale in the collector's own space." },
  },
  {
    es: { phrase: "Certificada y transportada con cuidado.", support: "Un certificado de autenticidad para cada obra. Recogida, embalaje y transporte a cargo de socios logísticos especializados." },
    en: { phrase: "Certified and carried with care.", support: "A certificate of authenticity for every work. Collection, packing and transport by specialised logistics partners." },
  },
  {
    es: { phrase: "Tu obra sigue siendo tuya.", support: "Sigue exponiendo y vendiendo donde ya lo haces." },
    en: { phrase: "Your work stays yours.", support: "Keep showing and selling wherever you already do." },
  },
  {
    es: { phrase: "Lo preparamos todo por ti.", support: "Elige tres obras y envíanos sus fotografías. Nuestro equipo construye tu página y te la muestra antes de publicarla." },
    en: { phrase: "We prepare everything for you.", support: "Choose three works and send us their photographs. Our team builds your page and shows it to you before it goes live." },
  },
] as const;

const SLIDE_DURATION_MS = 6000;

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

export const SculptorsSlideshow = () => {
  const lang = useLang();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = SLIDE_WORK_SLUGS.length;

  const images = SLIDE_WORK_SLUGS.map((slug) => WORKS.find((w) => w.slug === slug)?.image).filter((x): x is string => Boolean(x));

  const next = () => setActive((a) => (a + 1) % count);
  const prev = () => setActive((a) => (a - 1 + count) % count);

  const t = lang === "es"
    ? { cta: "Únete como escultor", prev: "Diapositiva anterior", next: "Siguiente diapositiva" }
    : { cta: "Join as a sculptor", prev: "Previous slide", next: "Next slide" };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden outline-none"
      style={{ height: "min(78vh, 720px)", background: "#0a0a0a" }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        @keyframes sc-kb { 0% { transform: scale(1); } 100% { transform: scale(1.12); } }
        @keyframes sc-progress { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
        .sc-slide-img { animation: sc-kb ${SLIDE_DURATION_MS + 700}ms linear forwards; }
        @media (prefers-reduced-motion: reduce) { .sc-slide-img { animation: none !important; } }
        .sc-arrow:hover { opacity: 1 !important; }
      `}</style>

      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, transition: "opacity 700ms ease-in-out" }}
          aria-hidden={i !== active}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="sc-slide-img w-full h-full object-cover"
              style={{ animationPlayState: i === active && !reducedMotion && !paused ? "running" : "paused" }}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.35) 100%)" }}
          />
        </div>
      ))}

      {/* Counter + progress (fixed across all slides) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 z-10 flex items-center gap-4">
        <span className="font-body text-[13px] tracking-[0.14em] text-white/90">
          {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="w-[120px] h-[1px] bg-white/25 overflow-hidden">
          <div
            key={active}
            className="h-full bg-white origin-left"
            style={
              reducedMotion
                ? { transform: "scaleX(0)" }
                : {
                    animation: `sc-progress ${SLIDE_DURATION_MS}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }
            }
            onAnimationEnd={() => { if (!reducedMotion && !paused) next(); }}
          />
        </div>
      </div>

      <Link
        to="/join/sculptors"
        className="absolute top-6 right-6 md:top-10 md:right-12 z-10 font-body text-[12px] font-medium uppercase tracking-[0.2em] text-white border border-white px-6 py-3 hover:bg-white hover:text-ink transition-colors"
      >
        {t.cta}
      </Link>

      <button
        type="button"
        onClick={prev}
        aria-label={t.prev}
        className="sc-arrow absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white opacity-60 transition-opacity"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label={t.next}
        className="sc-arrow absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white opacity-60 transition-opacity"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-12 pb-16 md:pb-20 max-w-[820px]">
        {SLIDE_COPY.map((slide, i) => (
          <div
            key={i}
            style={{ display: i === active ? "block" : "none" }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                color: "#FFFFFF",
                fontSize: "clamp(32px, 5vw, 64px)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {slide[lang].phrase}
            </h2>
            <p
              className="font-body"
              style={{
                fontWeight: 400,
                color: "rgba(255,255,255,0.8)",
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: 1.6,
                marginTop: 16,
                maxWidth: 560,
              }}
            >
              {slide[lang].support}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
