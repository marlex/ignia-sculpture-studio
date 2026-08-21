import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

type AudienceKey = "sculptors" | "collectors" | "galleries" | "curators" | "advisors";

const AUDIENCES: Record<
  "es" | "en",
  { key: AudienceKey; t: string; s: string; to: string }[]
> = {
  es: [
    { key: "sculptors", t: "Escultores", s: "Tu obra, tratada con justicia.", to: "/join/escultores" },
    { key: "collectors", t: "Coleccionistas", s: "Escultura verificada, para siempre.", to: "/join/coleccionistas" },
    { key: "galleries", t: "Galerías", s: "Un canal más para su colección.", to: "/join/galerias" },
    { key: "curators", t: "Curadores", s: "Su criterio, sumado al nuestro.", to: "/join/curadores" },
    { key: "advisors", t: "Advisors", s: "Guíen el mercado con nosotros.", to: "/join/advisors" },
  ],
  en: [
    { key: "sculptors", t: "Sculptors", s: "Your work, treated fairly.", to: "/join/sculptors" },
    { key: "collectors", t: "Collectors", s: "Verified sculpture, forever.", to: "/join/collectors" },
    { key: "galleries", t: "Galleries", s: "One more channel for your collection.", to: "/join/galleries" },
    { key: "curators", t: "Curators", s: "Your criteria, added to ours.", to: "/join/curators" },
    { key: "advisors", t: "Advisors", s: "Guide the market with us.", to: "/join/advisors" },
  ],
};

export const CrossSellBlock = ({ exclude }: { exclude: AudienceKey[] }) => {
  const lang = useLang();
  const t = {
    es: { eyebrow: "¿Te interesa también?" },
    en: { eyebrow: "Interested in this too?" },
  };
  const items = AUDIENCES[lang].filter((a) => !exclude.includes(a.key));

  return (
    <section className="bg-[#121212] px-6 md:px-12 py-20">
      <div className="max-w-[1180px] mx-auto">
        <div
          className="mb-8"
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          {t[lang].eyebrow}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a) => (
            <Link
              key={a.key}
              to={a.to}
              className="block border border-white/20 bg-[#121212] p-6 text-white hover:bg-white hover:text-[#121212] transition-colors group"
              style={{ borderRadius: 0 }}
            >
              <h3
                className="mb-2 group-hover:text-[#121212] transition-colors"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: 20,
                  lineHeight: 1.2,
                }}
              >
                {a.t}
              </h3>
              <p
                className="font-body text-[15px] font-normal text-white/65 group-hover:text-[#666666] transition-colors"
                style={{ lineHeight: 1.6 }}
              >
                {a.s}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
