import { Link } from "react-router-dom";
import { WORKS } from "@/data/igniaWorks";
import { artistSlug } from "@/lib/artistSlug";
import type { Lang } from "@/i18n/LanguageContext";

type WorksProps = {
  slugs: string[];
  lang: Lang;
  heading: string;
  cta: { label: string; to: string };
};

export const WorksConversionBlock = ({ slugs, lang, heading, cta }: WorksProps) => {
  const items = slugs
    .map((s) => WORKS.find((w) => w.slug === s))
    .filter((w): w is (typeof WORKS)[number] => Boolean(w));

  return (
    <section className="bg-surface px-6 md:px-12 py-16 md:py-20" aria-labelledby="conv-works">
      <div className="flex items-end justify-between mb-8 max-w-[1280px] mx-auto">
        <h2 id="conv-works" className="font-display font-semibold text-[clamp(24px,2.8vw,34px)] tracking-[-0.02em] text-ink">{heading}</h2>
        <Link to={cta.to} className="link-arrow">{cta.label}</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {items.map((w) => {
          const c = w[lang];
          return (
            <Link key={w.slug} to={`/obra/${w.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
              <div className="aspect-[4/5] overflow-hidden bg-secondary mb-4">
                <img
                  src={w.image}
                  alt={c.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-display font-semibold text-[18px] text-ink leading-tight mb-1">{c.title}</h3>
              <div className="font-body text-[14px] text-gray">{c.artist} · {c.material}</div>
              <div className="font-body text-[14px] text-ink mt-1">{c.price}</div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

type ArtistsProps = {
  names: string[];
  lang: Lang;
  heading: string;
  cta: { label: string; to: string };
};

export const ArtistsConversionBlock = ({ names, lang, heading, cta }: ArtistsProps) => {
  // Pull one representative image per artist from WORKS catalogue
  const items = names.map((name) => {
    const work = WORKS.find((w) => w.es.artist === name || w.en.artist === name);
    return { name, image: work?.image, role: lang === "es" ? "Escultor·a" : "Sculptor" };
  });

  return (
    <section className="bg-white px-6 md:px-12 py-16 md:py-20" aria-labelledby="conv-artists">
      <div className="flex items-end justify-between mb-8 max-w-[1280px] mx-auto">
        <h2 id="conv-artists" className="font-display font-semibold text-[clamp(24px,2.8vw,34px)] tracking-[-0.02em] text-ink">{heading}</h2>
        <Link to={cta.to} className="link-arrow">{cta.label}</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1280px] mx-auto">
        {items.map((a) => (
          <Link key={a.name} to={`/perfil/escultor/${artistSlug(a.name)}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
            <div className="aspect-[4/3] overflow-hidden bg-secondary mb-4">
              {a.image ? (
                <img src={a.image} alt={a.name} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
              ) : null}
            </div>
            <h3 className="font-display font-semibold text-[18px] text-ink leading-tight mb-1">{a.name}</h3>
            <div className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">{a.role}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

type ArticlesProps<T extends { slug: string; img: string }> = {
  articles: (T & { titulo: string; seccion: string; autor: string })[];
  heading: string;
  basePath: string; // e.g. "/editorial" or "/aprende"
};

export const RelatedArticlesBlock = <T extends { slug: string; img: string }>({
  articles,
  heading,
  basePath,
}: ArticlesProps<T>) => {
  if (articles.length === 0) return null;
  return (
    <section className="bg-white px-6 md:px-12 py-16 md:py-20" aria-labelledby="conv-articles">
      <h2 id="conv-articles" className="font-display font-semibold text-[clamp(24px,2.8vw,34px)] tracking-[-0.02em] text-ink mb-8 max-w-[1280px] mx-auto">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-[1280px] mx-auto">
        {articles.map((a) => (
          <Link key={a.slug} to={`${basePath}/${a.slug}`} className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
            <div className="aspect-[16/10] overflow-hidden bg-secondary mb-4">
              <img src={a.img} alt={a.titulo} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
            </div>
            <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-2">{a.seccion}</div>
            <h3 className="font-display font-semibold text-[20px] text-ink leading-tight">{a.titulo}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
