import { useLang } from "@/i18n/LanguageContext";
import { APRENDE_ARTICLES } from "@/data/aprendeArticles";

interface AprendeProps {
  showHeader?: boolean;
}

export const Aprende = ({ showHeader = true }: AprendeProps) => {
  const lang = useLang();
  const t = lang === "es"
    ? { title: "Ignia aprende", more: "Ver todos →", list: "Listado de artículos de Ignia aprende" }
    : { title: "Ignia learn", more: "See all →", list: "Ignia learn article list" };

  return (
    <section className="bg-surface px-6 md:px-12 py-16 md:py-20" aria-labelledby={showHeader ? "ignia-aprende-title" : undefined}>
      {showHeader && (
        <div className="flex items-end justify-between mb-8">
          <h2 id="ignia-aprende-title" className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.title}</h2>
          <a href="/aprende" className="link-arrow">{t.more}</a>
        </div>
      )}
      <ul className="flex flex-col gap-12 md:gap-14" aria-label={t.list}>
        {APRENDE_ARTICLES.map((a) => {
          const c = a[lang];
          return (
            <li key={a.slug}>
              <a href={`/aprende/${a.slug}`} className="group flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-stretch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
                <div className="md:w-[38%] flex flex-col justify-center md:justify-end order-2 md:order-1">
                  <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-2">{c.tag}</div>
                  <h3 className="font-display font-bold text-[clamp(22px,2.6vw,32px)] tracking-[-0.02em] text-ink mb-2 leading-tight">{c.titulo}</h3>
                  <p className="font-body text-[16px] font-light text-gray mb-3 leading-snug">{c.extracto}</p>
                  <div className="font-body text-[16px] font-light text-gray">{c.tiempo}</div>
                </div>
                <div className="md:w-[62%] overflow-hidden bg-secondary aspect-[21/9] order-1 md:order-2">
                  <img
                    src={a.img}
                    alt={c.titulo}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
