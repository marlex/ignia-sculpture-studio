import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import studio from "@/assets/hero-bg-studio.jpg";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const T = {
  es: {
    eyebrow: "La historia",
    h: <>Encender lo que nadie<br />podía ver todavía.</>,
    cite: "“Behind every great piece of sculpture is an unseen mountain of sacrifice, discipline, and commitment.”",
    behindEy: "BEHIND IGNIA",
    behindH: "Un equipo que cree en la escultura tanto como ustedes.",
    behindP:
      "Somos escultores, diseñadores, curadores, coleccionistas, advisors y desarrolladores, un equipo multidisciplinar, que trabaja la escultura desde dentro y desde fuera del taller. Queremos darle a esta disciplina el lugar que merece: la misma calidad curatorial de cualquier galería de referencia, con la apertura global que le faltaba para ser vista.",
    offerEy: "QUÉ TE OFRECEMOS",
    offerH: "Todo lo que la escultura necesitaba, en un solo lugar.",
    offers: [
      "Visualización 3D — gírala, acércate, entiéndela antes de comprar.",
      "Certificado blockchain — autenticidad verificable, para siempre.",
      "Precio justo, fijado por criterio experto.",
      "Alcance global — coleccionistas en todo el mundo, desde el día uno.",
      "Hasta el 85% de cada venta, para el escultor.",
      "Logística especializada, puerta a puerta.",
      "Realidad aumentada — visualízala en tu propio espacio, desde el móvil.",
    ],
    bannerH: "Del latín ignis, fuego.",
    bannerP: "Lo que enciende lo que nadie veía todavía.",
    audEy: "Un lugar para cada perspectiva",
    aud: [
      { t: "Escultores", s: "Tu obra, tratada con justicia.", to: "/join/escultores" },
      { t: "Coleccionistas", s: "Escultura verificada, para siempre.", to: "/join/coleccionistas" },
      { t: "Galerías", s: "Un canal más para su colección.", to: "/join/galerias" },
      { t: "Curadores", s: "Su criterio, sumado al nuestro.", to: "/join/curadores" },
      { t: "Advisors", s: "Guíen el mercado con nosotros.", to: "/join/advisors" },
    ],
    blackH:
      "Sculptors, welcome home. Collectors, discover more. Wherever you stand in the world of sculpture — this is where you begin.",
    join: "Únete a Ignia →",
    contactEy: "Contacto",
  },
  en: {
    eyebrow: "The story",
    h: <>Igniting what no one<br />could yet see.</>,
    cite: "“Behind every great piece of sculpture is an unseen mountain of sacrifice, discipline, and commitment.”",
    behindEy: "BEHIND IGNIA",
    behindH: "A team that believes in sculpture as much as you do.",
    behindP:
      "We are sculptors, designers, curators, collectors, advisors and developers — a multidisciplinary team that works with sculpture from inside and outside the studio. We want to give this discipline the place it deserves: the curatorial quality of any leading gallery, with the global openness it was missing to be seen.",
    offerEy: "WHAT WE OFFER",
    offerH: "Everything sculpture needed, in one place.",
    offers: [
      "3D viewing — rotate it, zoom in, understand it before buying.",
      "Blockchain certificate — verifiable authenticity, forever.",
      "Fair pricing, set by expert criteria.",
      "Global reach — collectors worldwide, from day one.",
      "Up to 85% of every sale, for the sculptor.",
      "Specialised logistics, door to door.",
      "Augmented reality — see it in your own space, from your phone.",
    ],
    bannerH: "From the Latin ignis, fire.",
    bannerP: "What ignites what no one could yet see.",
    audEy: "A place for every perspective",
    aud: [
      { t: "Sculptors", s: "Your work, treated fairly.", to: "/join/sculptors" },
      { t: "Collectors", s: "Verified sculpture, forever.", to: "/join/collectors" },
      { t: "Galleries", s: "One more channel for your collection.", to: "/join/galleries" },
      { t: "Curators", s: "Your criteria, added to ours.", to: "/join/curators" },
      { t: "Advisors", s: "Guide the market with us.", to: "/join/advisors" },
    ],
    blackH:
      "Sculptors, welcome home. Collectors, discover more. Wherever you stand in the world of sculpture — this is where you begin.",
    join: "Join Ignia →",
    contactEy: "Contact",
  },
};

const openInvite = () => window.dispatchEvent(new Event("ignia:open-invite"));

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

const S = { stroke: "#121212", strokeWidth: 1.25, fill: "none" as const };

const Icon3D = () => (
  <svg viewBox="0 0 48 48" className="ab-ico ab-ico-spin" width="40" height="40" aria-hidden>
    <ellipse cx="24" cy="36" rx="13" ry="4" {...S} />
    <path d="M24 8 L34 30 H14 Z" {...S} />
    <path d="M24 8 L24 30" {...S} strokeDasharray="3 3" />
  </svg>
);
const IconSeal = () => (
  <svg viewBox="0 0 48 48" className="ab-ico" width="40" height="40" aria-hidden>
    <circle cx="24" cy="20" r="11" {...S} />
    <path className="ab-check" d="M18 20 l4 4 l8 -8" {...S} strokeWidth={1.6} />
    <path d="M18 31 l-2 9 l8 -4 l8 4 l-2 -9" {...S} />
  </svg>
);
const IconScale = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden className="ab-ico">
    <path d="M24 10 v28 M14 38 h20" {...S} />
    <g className="ab-scale">
      <path d="M8 16 h32" {...S} />
      <path d="M8 16 l-4 8 h8 z" {...S} />
      <path d="M40 16 l-4 8 h8 z" {...S} />
    </g>
  </svg>
);
const IconGlobe = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden className="ab-ico">
    <circle cx="24" cy="24" r="15" {...S} />
    <ellipse cx="24" cy="24" rx="7" ry="15" {...S} />
    <path d="M9 24 h30" {...S} />
    <circle className="ab-dot ab-d1" cx="17" cy="17" r="2" fill="#121212" />
    <circle className="ab-dot ab-d2" cx="31" cy="21" r="2" fill="#121212" />
    <circle className="ab-dot ab-d3" cx="22" cy="32" r="2" fill="#121212" />
  </svg>
);
const IconCounter = ({ run }: { run: boolean }) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1500);
      setN(Math.round(85 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);
  return (
    <div
      className="ab-ico"
      style={{
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 24,
        color: "#121212",
        border: "1px solid #121212",
      }}
    >
      {n}%
    </div>
  );
};
const IconBox = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden className="ab-ico">
    <path d="M5 26 v10 h10 v-10 z" {...S} />
    <path d="M5 26 l5 -4 h10 l-5 4" {...S} />
    <path className="ab-route" d="M16 31 C 26 31, 28 14, 38 16" {...S} strokeDasharray="3 3" />
    <path d="M38 8 a5 5 0 0 1 5 5 c0 4 -5 9 -5 9 s-5 -5 -5 -9 a5 5 0 0 1 5 -5 z" {...S} />
  </svg>
);
const IconAR = () => (
  <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden className="ab-ico">
    <rect x="14" y="6" width="20" height="36" {...S} />
    <path className="ab-ar" d="M24 18 L29 32 H19 Z" {...S} />
    <path d="M18 12 h12" {...S} />
  </svg>
);

const AboutPage = () => {
  const lang = useLang();
  const t = T[lang];
  const offers = useInView<HTMLDivElement>();
  const aud = useInView<HTMLDivElement>();

  const icons = [Icon3D, IconSeal, IconScale, IconGlobe, null, IconBox, IconAR];

  return (
    <main className="pt-14">
      <Seo
        title={"About Ignia — The Digital Institution for Sculpture"}
        description={
          "The team, the story and everything Ignia offers sculpture: 3D viewing, blockchain authenticity, fair pricing, global reach and specialised logistics."
        }
        path="/ignia-gallery"
      />
      <Header />

      <style>{`
        .ab-card { opacity:0; transform: translateY(24px); transition: opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1); }
        .ab-in .ab-card { opacity:1; transform: translateY(0); }
        .ab-ico-spin { animation: ab-spin 2s ease-in-out 1 both; transform-origin: 50% 50%; }
        @keyframes ab-spin { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
        .ab-in .ab-check { stroke-dasharray: 20; stroke-dashoffset: 20; animation: ab-draw 1.2s ease-out 0.3s forwards; }
        @keyframes ab-draw { to { stroke-dashoffset: 0; } }
        .ab-in .ab-scale { animation: ab-tilt 1.8s ease-in-out both; transform-origin: 24px 16px; }
        @keyframes ab-tilt { 0%{transform:rotate(-10deg)} 40%{transform:rotate(8deg)} 70%{transform:rotate(-3deg)} 100%{transform:rotate(0)} }
        .ab-in .ab-dot { opacity:0; animation: ab-pop 0.6s ease-out forwards; }
        .ab-in .ab-d1 { animation-delay: .2s } .ab-in .ab-d2 { animation-delay: .7s } .ab-in .ab-d3 { animation-delay: 1.2s }
        @keyframes ab-pop { from { opacity:0; transform: scale(0.2); } to { opacity:1; transform: scale(1); } }
        .ab-in .ab-route { stroke-dasharray: 3 3; animation: ab-move 1.6s linear both; }
        @keyframes ab-move { from { stroke-dashoffset: 40 } to { stroke-dashoffset: 0 } }
        .ab-in .ab-ar { opacity:0; animation: ab-fadein 1.6s ease-out .4s forwards; }
        @keyframes ab-fadein { from { opacity:0; transform: translateY(4px);} to { opacity:1; transform:none } }
        @media (prefers-reduced-motion: reduce) { .ab-card, .ab-ico, .ab-ico * { animation: none !important; transition: none !important; opacity:1 !important; transform:none !important; } }
      `}</style>

      {/* Hero */}
      <section className="relative h-[58vh] min-h-[400px] overflow-hidden">
        <img src={studio} alt="Ignia studio" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-12 max-w-[1280px] mx-auto">
          <div className="eyebrow text-white/80 mb-3">{t.eyebrow}</div>
          <h1 className="font-display font-semibold text-white text-[clamp(40px,6vw,76px)] tracking-[-0.02em] leading-[1.02] max-w-[900px]">{t.h}</h1>
          <p className="font-body text-[16px] md:text-[18px] font-normal text-white/85 max-w-[640px] mt-5 italic">{t.cite}</p>
        </div>
      </section>

      {/* Behind Ignia */}
      <section className="bg-white px-6 md:px-12 py-20">
        <div className="max-w-[860px] mx-auto">
          <div className="eyebrow mb-4">{t.behindEy}</div>
          <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] text-ink leading-[1.1] mb-6">{t.behindH}</h2>
          <p className="font-body text-[17px] font-normal text-gray leading-relaxed">{t.behindP}</p>
        </div>
      </section>

      {/* Qué te ofrecemos */}
      <section className="px-6 md:px-12 py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-[1180px] mx-auto">
          <div className="eyebrow mb-4">{t.offerEy}</div>
          <h2 className="font-display font-semibold text-[clamp(26px,3vw,40px)] tracking-[-0.02em] text-ink leading-[1.1] mb-12">{t.offerH}</h2>
          <div
            ref={offers.ref}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 ${offers.seen ? "ab-in" : ""}`}
          >
            {t.offers.map((line, i) => {
              const IconCmp = icons[i];
              return (
                <div key={line} className="ab-card" style={{ transitionDelay: `${i * 110}ms` }}>
                  <div className="mb-4" style={{ height: 40 }}>
                    {IconCmp ? <IconCmp /> : <IconCounter run={offers.seen} />}
                  </div>
                  <p className="font-body text-[16px] font-normal leading-relaxed" style={{ color: "#121212" }}>{line}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-white px-6 md:px-12 py-24 text-center">
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px,3vw,38px)",
            color: "#121212",
            margin: 0,
          }}
        >
          {t.bannerH}
        </p>
        <p className="font-body text-[15px] font-normal text-gray mt-4">{t.bannerP}</p>
      </section>

      {/* Un lugar para cada perspectiva */}
      <section className="bg-surface px-6 md:px-12 py-20">
        <div className="max-w-[1180px] mx-auto">
          <div className="eyebrow mb-8">{t.audEy}</div>
          <div ref={aud.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${aud.seen ? "ab-in" : ""}`}>
            {t.aud.map((a, i) => (
              <Link
                key={a.t}
                to={a.to}
                className="ab-card block border border-border bg-white p-7 hover:bg-[#121212] hover:text-white transition-colors group"
                style={{ transitionDelay: `${i * 90}ms`, borderRadius: 0 }}
              >
                <h3 className="font-display font-semibold text-[22px] mb-2">{a.t}</h3>
                <p className="font-body text-[15px] font-normal text-gray group-hover:text-white/70">{a.s}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Black block */}
      <section className="px-6 md:px-12 py-24" style={{ background: "#121212" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "clamp(28px,3.6vw,46px)",
              lineHeight: 1.12,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            {t.blackH}
          </h2>
          <button
            type="button"
            onClick={openInvite}
            className="mt-10"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              borderRadius: 0,
              cursor: "pointer",
            }}
          >
            {t.join}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
