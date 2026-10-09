import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import heroGalerias from "@/assets/hero-galerias.jpg";

export const GalleriesBanner = () => {
  const lang = useLang();
  const t = lang === "es" ? {
    eyebrow: "PARA GALERÍAS",
    title: "Galerías, un canal más para su colección.",
    cta: "Asociarse con Ignia",
    why1: { title: "Su criterio, nuestro escaparate.", text: "Mismo estándar curatorial que el resto de Ignia." },
    why2: { title: "Certificación incluida.", text: "Certificado blockchain en cada obra, sin gestión extra." },
  } : {
    eyebrow: "FOR GALLERIES",
    title: "Galleries, one more channel for your collection.",
    cta: "Partner with Ignia",
    why1: { title: "Your criteria, our showcase.", text: "Same curatorial standard as the rest of Ignia." },
    why2: { title: "Certification included.", text: "A blockchain certificate on every work, no extra work." },
  };

  return (
    <section className="bg-white">
      <div
        className="grid grid-cols-1 lg:grid-cols-[55%_45%]"
        style={{ minHeight: "60vh" }}
      >
        <div
          className="flex flex-col justify-center px-6 md:px-12"
          style={{ paddingTop: "clamp(64px, 8vw, 140px)", paddingBottom: "clamp(48px, 6vw, 100px)" }}
        >
          <div
            className="uppercase tracking-[0.14em] text-[12px] font-body text-gray mb-4"
          >
            {t.eyebrow}
          </div>
          <h2
            className="font-display text-ink"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 820,
            }}
          >
            {t.title}
          </h2>
          <div className="mt-6">
            <Link
              to="/galleries"
              className="inline-flex items-center justify-center text-[13px] font-medium uppercase tracking-[0.18em] text-white bg-[#121212] border border-[#121212] px-8 py-4 hover:opacity-85 transition-opacity"
            >
              {t.cta}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-[720px]">
            {[t.why1, t.why2].map((item, i) => (
              <div key={i} className="text-left">
                <h3
                  className="text-[#121212]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: 26,
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#121212]/80 font-body mt-3"
                  style={{ fontSize: 16, lineHeight: 1.7 }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-0 bg-[#0a0a0a]">
          <img
            src={heroGalerias}
            alt="Sculpture lit against a dark background"
            width={768}
            height={1280}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
