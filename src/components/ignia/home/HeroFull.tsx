import { useLang } from "@/i18n/LanguageContext";
import hero01 from "@/assets/hero-01-hands.jpg.asset.json";
import hero02 from "@/assets/hero-02-marble.jpg.asset.json";
import hero03 from "@/assets/hero-03-metal.jpg.asset.json";
import hero04 from "@/assets/hero-04-bronze.jpg.asset.json";
import hero05 from "@/assets/hero-05-ceramic.jpg.asset.json";

const heroImages = [hero02.url, hero01.url, hero03.url, hero04.url, hero05.url];

export const HeroFull = () => {
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
          font-weight: 400;
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
        @keyframes hero-slide {
          0%      { opacity: 1; transform: scale(1.0); }
          14.545% { opacity: 1; transform: scale(1.05); }
          20%     { opacity: 0; transform: scale(1.05); }
          94.545% { opacity: 0; transform: scale(1.0); }
          100%    { opacity: 1; transform: scale(1.0); }
        }
        .hero-slide {
          opacity: 0;
          animation: hero-slide 27.5s ease-in-out infinite;
          will-change: opacity, transform;
        }

      `}</style>

      {/* Background slideshow — images are softened so the text reads clearly */}
      {heroImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          decoding="async"
          className="hero-slide absolute inset-0 w-full h-full object-cover z-0"
          style={{
            animationDelay: `${i * 5.5}s`,
            objectPosition: src === hero01.url ? "center bottom" : "center",
            opacity: 0.55,
          }}
        />
      ))}

      {/* Fixed overlay at 0.45 opacity — does not crossfade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "rgba(34,34,34,0.45)",
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
