import { Link } from "react-router-dom";
import { getAprendeArticleBySlug } from "@/data/aprendeArticles";
import { useLang } from "@/i18n/LanguageContext";

const SLUGS = ["jaume-plensa", "cristina-iglesias"] as const;

export const SculptorsToKnow = () => {
  const lang = useLang();
  const articles = SLUGS.map((slug) => getAprendeArticleBySlug(slug)).filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (articles.length === 0) return null;

  const t = lang === "es"
    ? { kicker: "Desde Ignia Aprende", heading: "Escultores que debes conocer" }
    : { kicker: "From Ignia Learn", heading: "Sculptors to know" };

  return (
    <section className="px-6 md:px-12 py-16 md:py-20 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-3">{t.kicker}</div>
        <h2 className="font-display font-semibold text-[clamp(26px,3vw,38px)] tracking-[-0.02em] text-ink mb-10">{t.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {articles.map((a) => {
            const c = a[lang];
            return (
              <Link
                key={a.slug}
                to={`/aprende/${a.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
              >
                <div className="aspect-[16/10] overflow-hidden bg-secondary mb-4 relative">
                  <img
                    src={a.img}
                    alt={a.imageAlt ?? c.titulo}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]"
                  />
                  {a.imageCredit && (
                    <span
                      className="absolute bottom-2 right-2 max-w-[40%] truncate"
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontWeight: 500,
                        fontSize: 11,
                        color: "#FFFFFF",
                        background: "rgba(0,0,0,0.55)",
                        padding: "4px 8px",
                        borderRadius: 0,
                        boxShadow: "none",
                      }}
                    >
                      {a.imageCredit}
                    </span>
                  )}
                </div>
                <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-2">{c.tag}</div>
                <h3 className="font-display font-semibold text-[20px] text-ink leading-tight">{c.titulo}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
