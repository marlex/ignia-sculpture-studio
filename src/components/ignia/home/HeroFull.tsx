import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import heroMarmol from "@/assets/hero-marmol.jpg.asset.json";

const heroImage = heroMarmol.url;

export const HeroFull = () => {
  const lang = useLang();

  const t =
    lang === "es"
      ? {
          title: "Acércate. Reimagina la escultura.",
          subtitle:
            "Descubre, experimenta y colecciona escultura de artistas y galerías de todo el mundo. Explora cada obra en 3D, obtén su certificado de autenticidad y visualízala en tu propio espacio.",
          cta: "Explorar la Colección",
          link: "¿Nuevo aquí? Empieza con Guidance →",
          imgAlt: "Detalle editorial de escultura en blanco y negro",
        }
      : {
          title: "Come closer. Reimagine sculpture.",
          subtitle:
            "Discover, experience and collect sculpture from artists and galleries around the world. Explore each work in 3D, receive its certificate of authenticity, and see it in your own space.",
          cta: "Explore the Collection",
          link: "New here? Start with Guidance →",
          imgAlt: "Editorial black-and-white sculpture detail",
        };

  return (
    <section
      className="hero-full relative w-full overflow-hidden"
      style={{ height: "100vh", background: "#121212" }}
    >
      <style>{`
        @keyframes hf-rise {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hf-anim { opacity: 0; animation: hf-rise 1.2s cubic-bezier(0.16,1,0.3,1) forwards; }
        .hf-title { animation-delay: 0.1s; }
        .hf-subtitle { animation-delay: 0.4s; }
        .hf-cta { animation-delay: 0.7s; }
        .hf-link { animation-delay: 0.85s; }
        .hf-cta-btn:hover { opacity: 0.65 !important; }
        .hf-text-link:hover { opacity: 0.65 !important; }

        .hf-title-el {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 400;
          color: #FFFFFF;
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.05;
          letter-spacing: 0.005em;
          margin: 0;
        }
        .hf-subtitle-el {
          font-family: Manrope, sans-serif;
          font-weight: 400;
          color: rgba(255,255,255,0.88);
          font-size: clamp(15px, 1.7vw, 19px);
          line-height: 1.7;
          max-width: 720px;
          margin: 28px auto 0;
        }

        @media (max-width: 768px) {
          .hf-title-el { font-size: 56px; }
          .hf-subtitle-el { font-size: 16px; max-width: 92%; }
        }
      `}</style>

      {/* Background, single editorial black-and-white image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={t.imgAlt}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: "center",
            filter: "grayscale(100%)",
          }}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="hf-inner absolute inset-0 z-[2] flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: 56, paddingBottom: 24 }}
      >
        <h1 className="hf-title-el hf-anim hf-title">{t.title}</h1>
        <p className="hf-subtitle-el hf-anim hf-subtitle">{t.subtitle}</p>

        <div className="hf-anim hf-cta" style={{ marginTop: 36 }}>
          <Link
            to="/sculptures"
            className="hf-cta-btn inline-block"
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
              transition: "opacity 250ms",
              textDecoration: "none",
            }}
          >
            {t.cta}
          </Link>
        </div>

        <div className="hf-anim hf-link" style={{ marginTop: 20 }}>
          <Link
            to="/guidance"
            className="hf-text-link"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(255,255,255,0.88)",
              textDecoration: "none",
              transition: "opacity 250ms",
            }}
          >
            {t.link}
          </Link>
        </div>
      </div>
    </section>
  );
};
