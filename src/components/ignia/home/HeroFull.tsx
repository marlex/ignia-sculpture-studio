import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import heroPiedra from "@/assets/hero-piedra.jpg.asset.json";
import heroManos from "@/assets/hero-manos.jpg.asset.json";
import heroMetal from "@/assets/hero-metal.jpg.asset.json";
import heroMarmol from "@/assets/hero-marmol.jpg.asset.json";

const heroImages = [heroPiedra.url, heroManos.url, heroMetal.url, heroMarmol.url];
const SLIDE_MS = 5500;

export const HeroFull = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % heroImages.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const lang = useLang();
  const t = lang === "es"
    ? {
        title: "El mundo de la escultura, de cerca.",
        body: "La primera galería global dedicada exclusivamente a la escultura. Compra, vende y descubre obras de gran valor, con visualización 3D, certificados de autenticidad en blockchain y comisiones justas.",
        cta: "Descubre La Colección",
      }
    : {
        title: "The sculpture world, up close.",
        body: "The first global sculpture gallery dedicated exclusively to sculpture. Buy, sell and discover high-value works, with 3D visualization, blockchain authenticity certificates and fair commissions.",
        cta: "Discover The Collection",
      };

  return (
    <section
      className="hero-full relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 56px)", background: "#222222" }}
    >
      <style>{`
        @keyframes hf-rise {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hf-anim { opacity: 0; animation: hf-rise 1.2s cubic-bezier(0.16,1,0.3,1) forwards; }
        .hf-title { animation-delay: 0.1s; }
        .hf-body { animation-delay: 0.4s; }
        .hf-cta { animation-delay: 0.7s; }
        .hf-cta-btn:hover { opacity: 0.65 !important; }

        .hf-title-el {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 500;
          color: #FFFFFF;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: 0.005em;
          margin: 0;
        }
        .hf-body-el {
          font-family: Manrope, sans-serif;
          font-weight: 500;
          color: #FFFFFF;
          font-size: 19px;
          line-height: 1.6;
          max-width: 1040px;
          margin: 28px auto 0;
        }

        @media (max-width: 768px) {
          .hf-title-el { font-size: 56px; }
          .hf-body-el { font-size: 17px; max-width: 92%; }
        }
        @keyframes hf-kenburns {
          from { transform: scale(1.0); }
          to   { transform: scale(1.06); }
        }
        .hero-slide {
          transition: opacity 1600ms ease-in-out;
          will-change: opacity;
        }
        .hero-slide-inner {
          width: 100%;
          height: 100%;
          animation: hf-kenburns 12s ease-out both;
        }

      `}</style>

      {/* Background slideshow — crossfade driven by React state (no CSS drift) */}
      {heroImages.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className="hero-slide absolute inset-0 z-0"
          style={{ opacity: i === active ? 0.55 : 0 }}
        >
          <img
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            className="hero-slide-inner absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: src === heroManos.url ? "center bottom" : "center",
              filter: i % 2 === 1 ? "grayscale(100%)" : "none",
            }}
          />
        </div>
      ))}


      {/* Fixed overlay — lighter to let images breathe while keeping text readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.52) 60%, rgba(0,0,0,0.46) 100%)",
        }}
      />

      {/* Content — vertically centered */}
      <div
        className="hf-inner absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="hf-title-el hf-anim hf-title">{t.title}</h1>
        <p className="hf-body-el hf-anim hf-body">{t.body}</p>
        <div className="hf-anim hf-cta" style={{ marginTop: 32 }}>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("ignia:scroll-to-collection"))}
            className="hf-cta-btn"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              borderRadius: 0,
              cursor: "pointer",
              transition: "opacity 250ms",
            }}
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
