import { useLang } from "@/i18n/LanguageContext";
import heroSculptureAsset from "@/assets/hero-sculpture-gallery.webp.asset.json";

const bgUrl = heroSculptureAsset.url;

export const HeroFull = () => {
  const lang = useLang();
  const t = lang === "es"
    ? {
        title: "El mundo de la escultura, de cerca.",
        body: "La primera galería global dedicada exclusivamente a la escultura. Compra, vende y descubre obras de gran valor, con visualización 3D, certificados de autenticidad en blockchain y comisiones justas.",
        cta: "Únete a Ignia",
      }
    : {
        title: "The sculpture world, up close.",
        body: "The first global sculpture gallery dedicated exclusively to sculpture. Buy, sell and discover high-value works, with 3D visualization, blockchain authenticity certificates and fair commissions.",
        cta: "Join Ignia",
      };

  return (
    <section
      className="hero-full relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 56px)", background: "#0A0A0A" }}
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
        .hf-cta-btn:hover { background: #F2F2F2 !important; }

        .hf-title-el {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
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
          max-width: 820px;
          margin: 28px auto 0;
        }

        @media (max-width: 768px) {
          .hf-title-el { font-size: 56px; }
          .hf-body-el { font-size: 17px; max-width: 92%; }
        }

      `}</style>

      {/* Background image */}
      <img
        src={bgUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Floor-fade overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,0.85) 100%)",
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
            onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))}
            className="hf-cta-btn"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "#FFFFFF",
              color: "#111111",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              transition: "background-color 250ms",
            }}
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
