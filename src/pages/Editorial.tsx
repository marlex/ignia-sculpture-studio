import { Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { EDITORIAL_ARTICLES } from "@/data/editorialArticles";
import { Seo } from "@/components/Seo";

const EditorialPage = () => {
  const lang = useLang();
  const t = lang === "es"
    ? { eyebrow: "Ensayos y entrevistas", h: "Comunidad", sub: "Textos sobre escultura, oficio y mercado, escritos para coleccionistas y artistas.", by: "Por" }
    : { eyebrow: "Essays & interviews", h: "Community", sub: "Essays, reports and interviews on sculpture, the craft and its market, written for collectors and artists alike.", by: "By" };

  return (
    <main className="pt-14">
      <Seo title={"Community — Essays & Interviews on Sculpture | Ignia Gallery"} description={"Essays, reports and interviews on sculpture, the craft and its market, written for collectors and artists alike."} path="/editorial" />
      <Header />
      <section className="px-6 md:px-12 pt-16 pb-12 bg-white">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-semibold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">{t.h}</h1>
        <p className="font-body text-[16px] font-normal text-gray max-w-[640px] mt-4">{t.sub}</p>
      </section>

      <section className="bg-surface px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {EDITORIAL_ARTICLES.map(a => {
            const c = a[lang];
            return (
              <article key={a.slug} className="group">
                <Link to={`/editorial/${a.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
                  <div className="aspect-[16/10] overflow-hidden bg-secondary mb-5">
                    <img src={a.img} alt={c.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                  </div>
                  <div className="font-body text-[14px] font-normal text-muted-line uppercase tracking-[0.14em] mb-2">{c.seccion}</div>
                  <h2 className="font-display font-semibold text-[clamp(22px,2.6vw,32px)] max-md:text-[25px] tracking-[-0.02em] text-ink mb-2 leading-tight">{c.titulo}</h2>
                  <p className="font-body text-[16px] font-normal text-gray mb-3 leading-snug">{c.extracto}</p>
                  <div className="font-body text-[16px] font-normal text-gray">{t.by} {a.autor}</div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default EditorialPage;
