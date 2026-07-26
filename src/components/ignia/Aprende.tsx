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
        <div className="flex items-center justify-between mb-8">
          <h2 id="ignia-aprende-title" className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink">{t.title}</h2>
          <a href="/aprende" className="link-arrow max-md:hidden">{t.more}</a>
        </div>
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10" aria-label={t.list}>
        {APRENDE_ARTICLES.map((a) => {
          const c = a[lang];
          return (
            <li key={a.slug}>
              <a href={`/aprende/${a.slug}`} className="group flex flex-col h-full gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
                <div className="flex flex-col flex-1">
                  <div className="font-body text-[14px] font-normal text-muted-line uppercase tracking-[0.14em] mb-2">{c.tag}</div>
                  <h3 className="font-display font-semibold text-[clamp(22px,2.6vw,32px)] max-md:text-[25px] tracking-[-0.02em] text-ink mb-2 leading-tight">{c.titulo}</h3>
                  <p className="font-body text-[16px] font-normal text-gray mb-3 leading-snug">{c.extracto}</p>
                  <div className="font-body text-[16px] font-normal text-gray">{c.tiempo}</div>
                </div>
                <div className="w-full overflow-hidden bg-secondary aspect-[16/9]">
                  <img
                    src={a.img}
                    alt={c.titulo}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className={`w-full h-full object-cover ${a.imgPosition ?? "object-bottom"} transition-transform duration-500 group-hover:scale-[1.03]`}
                  />
                </div>
              </a>
            </li>
          );
        })}
      </ul>
      {showHeader && (
        <div className="md:hidden mt-8">
          <a href="/aprende" className="link-arrow">{t.more}</a>
        </div>
      )}
    </section>
  );
};
