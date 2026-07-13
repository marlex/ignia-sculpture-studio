import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { EDITORIAL_ARTICLES, getArticleBySlug } from "@/data/editorialArticles";
import { EDITORIAL_RELATIONS } from "@/data/editorialRelations";
import { WorksConversionBlock, RelatedArticlesBlock } from "@/components/ignia/ConversionBlocks";
import NotFound from "@/pages/NotFound";

const SITE_BASE = "https://igniagallery.com";

const upsertMeta = (key: "name" | "property", value: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

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
        readMoreTitle: "Seguir leyendo",
      }
    : {
        by: "By",
        back: "← Back to Community",
        worksTitle: "Related works",
        worksCta: "See the full collection →",
        readMoreTitle: "Keep reading",
      };

  const content = article ? article[lang] : null;
  const plainText = content ? content.body.filter((b) => b.type === "p").map((b) => b.text).join(" ") : "";
  const description = plainText.slice(0, 150);
  const title = content ? `${content.titulo} · Ignia Gallery` : "";
  const url = `${SITE_BASE}/editorial/${slug}`;
  const image = article ? (article.img.startsWith("http") ? article.img : `${SITE_BASE}${article.img}`) : "";

  useEffect(() => {
    if (!content) return;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", "article");
  }, [title, description, image, url, content]);

  if (!article || !content) return <NotFound />;

  const relations = EDITORIAL_RELATIONS[slug] ?? { relatedWorks: [], relatedArticles: [] };

  const relatedArticles = relations.relatedArticles
    .map((s) => EDITORIAL_ARTICLES.find((a) => a.slug === s))
    .filter((a): a is (typeof EDITORIAL_ARTICLES)[number] => Boolean(a))
    .map((a) => ({
      slug: a.slug,
      img: a.img,
      titulo: a[lang].titulo,
      seccion: a[lang].seccion,
      autor: a.autor,
    }));

  return (
    <main className="pt-14">
      <Header />
      <article className="px-6 md:px-12 pt-16 pb-12 bg-white max-w-[820px] mx-auto">
        <div className="eyebrow mb-3">{content.seccion}</div>
        <h1 className="font-display font-bold text-[clamp(32px,4.5vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-6">
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
              <h2 key={i} className="font-display font-bold text-[clamp(22px,2.6vw,30px)] tracking-[-0.02em] text-ink leading-tight mt-4">
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

      {relations.relatedWorks.length > 0 && (
        <WorksConversionBlock
          slugs={relations.relatedWorks}
          lang={lang}
          heading={t.worksTitle}
          cta={{ label: t.worksCta, to: "/coleccion" }}
        />
      )}

      <RelatedArticlesBlock
        articles={relatedArticles}
        heading={t.readMoreTitle}
        basePath="/editorial"
      />

      <Footer />
    </main>
  );
};

export default EditorialArticuloPage;
