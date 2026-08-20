import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { EDITORIAL_ARTICLES, getArticleBySlug } from "@/data/editorialArticles";
import { EDITORIAL_RELATIONS } from "@/data/editorialRelations";
import { WorksConversionBlock, ArtistsConversionBlock } from "@/components/ignia/ConversionBlocks";
import NotFound from "@/pages/NotFound";
import { Seo } from "@/components/Seo";

const SITE_BASE = "https://igniagallery.com";

const EditorialArticuloPage = () => {
  const { slug = "" } = useParams();
  const lang = useLang();
  const article = getArticleBySlug(slug);

  const t = lang === "es"
    ? {
        by: "Por",
        back: "← Volver a Comunidad",
        worksTitle: "Obras relacionadas",
        worksCta: "Ver toda la colección →",
        artistsTitle: "Conoce a los escultores",
        artistsCta: "Ver todos los escultores →",
        readMoreTitle: "Seguir leyendo",
        relatedList: "Listado de artículos relacionados",
      }
    : {
        by: "By",
        back: "← Back to Community",
        worksTitle: "Related works",
        worksCta: "See the full collection →",
        artistsTitle: "Meet the sculptors",
        artistsCta: "See all sculptors →",
        readMoreTitle: "Keep reading",
        relatedList: "Related articles list",
      };

  const content = article ? article[lang] : null;
  const plainText = content ? content.body.filter((b) => b.type === "p").map((b) => b.text).join(" ") : "";
  const description = plainText.slice(0, 150);
  const title = content ? `${content.titulo} · Ignia Gallery` : "";
  const url = `${SITE_BASE}/editorial/${slug}`;
  const image = article ? (article.img.startsWith("http") ? article.img : `${SITE_BASE}${article.img}`) : "";

  if (!article || !content) return <NotFound />;

  const relations = EDITORIAL_RELATIONS[slug] ?? { relatedWorks: [], relatedArticles: [], featuredArtists: [] };

  return (
    <main className="pt-14">
      <Seo title={title} description={description} path={`/editorial/${slug}`} image={image} type="article" />
      <Header />
      <article className="px-6 md:px-12 pt-16 pb-12 bg-white max-w-[820px] mx-auto">
        <div className="eyebrow mb-3">{content.seccion}</div>
        <h1 className="font-display font-semibold text-[clamp(32px,4.5vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-6">
          {content.titulo}
        </h1>
        <div className="font-body text-[14px] uppercase tracking-[0.14em] text-muted-line mb-8">
          {t.by} {article.autor} · <time dateTime={article.fecha}>{content.fechaLabel}</time>
        </div>
        <div className="aspect-[16/10] overflow-hidden bg-secondary mb-10">
          <img
            src={article.img}
            alt={content.titulo}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          {content.body.map((b, i) =>
            b.type === "h2" ? (
              <h2 key={i} className="font-display font-semibold text-[clamp(22px,2.6vw,30px)] tracking-[-0.02em] text-ink leading-tight mt-4">
                {b.text}
              </h2>
            ) : (
              <p key={i} className="font-body text-[17px] font-normal text-ink leading-relaxed">
                {b.text}
              </p>
            )
          )}
        </div>
        <div className="mt-14">
          <Link to="/editorial" className="link-arrow">{t.back}</Link>
        </div>
      </article>

      <section className="bg-surface px-6 md:px-12 py-16 md:py-20" aria-labelledby="editorial-related-title">
        <h2 id="editorial-related-title" className="font-display font-semibold text-[clamp(24px,2.8vw,34px)] tracking-[-0.02em] text-ink mb-8 max-w-[1280px] mx-auto">{t.readMoreTitle}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-[1280px] mx-auto" aria-label={t.relatedList}>
          {EDITORIAL_ARTICLES.filter((a) => a.slug !== slug).slice(0, 2).map((a) => {
            const c = a[lang];
            return (
              <li key={a.slug} className="h-full">
                <Link to={`/editorial/${a.slug}`} className="group flex flex-col h-full gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
                  <div className="flex flex-col flex-1">
                    <div className="font-body text-[14px] font-normal text-muted-line uppercase tracking-[0.14em] mb-2">{c.seccion}</div>
                    <h3 className="font-display font-semibold text-[clamp(22px,2.6vw,32px)] tracking-[-0.02em] text-ink mb-2 leading-tight">{c.titulo}</h3>
                    <p className="font-body text-[16px] font-normal text-gray mb-3 leading-snug">{c.extracto}</p>
                    <div className="font-body text-[16px] font-normal text-gray">{article.autor}</div>
                  </div>
                  <div className="w-full overflow-hidden bg-secondary aspect-[16/9]">
                    <img
                      src={a.img}
                      alt={c.titulo}
                      loading="lazy"
                      width={1600}
                      height={1000}
                      className="w-full h-full object-cover object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <WorksConversionBlock
        slugs={relations.relatedWorks}
        lang={lang}
        heading={t.worksTitle}
        cta={{ label: t.worksCta, to: "/coleccion" }}
      />

      <ArtistsConversionBlock
        names={relations.featuredArtists}
        lang={lang}
        heading={t.artistsTitle}
        cta={{ label: t.artistsCta, to: "/escultores" }}
      />

      <Footer />
    </main>
  );
};

export default EditorialArticuloPage;
