import { Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { Seo } from "@/components/Seo";
import { useLang } from "@/i18n/LanguageContext";
import { getSculptorRoster, artistSlug } from "@/components/ignia/sculptors/roster";
import { SculptorsSlideshow } from "@/components/ignia/sculptors/SculptorsSlideshow";
import { SculptorsToKnow } from "@/components/ignia/sculptors/SculptorsToKnow";

const EscultoresPage = () => {
  const lang = useLang();
  const roster = getSculptorRoster(lang);

  const t = lang === "es"
    ? {
        kicker: "LOS ESCULTORES DE IGNIA",
        title: "Escultores",
        intro: "Los artistas que exponen su obra en Ignia. Conócelos a través de lo que hacen y cómo piensan.",
        indexKicker: "Escultores en Ignia",
        openName: "Tu nombre",
        openText: "Muestra tu obra en Ignia.",
        openCta: "Únete como escultor",
      }
    : {
        kicker: "THE SCULPTORS OF IGNIA",
        title: "Sculptors",
        intro: "The artists who show their work at Ignia. Meet them through what they make and how they think.",
        indexKicker: "Sculptors at Ignia",
        openName: "Your name",
        openText: "Show your work at Ignia.",
        openCta: "Join as a sculptor",
      };

  return (
    <main className="pt-40 bg-white">
      <Seo
        title={"Sculptors, Meet the Artists | Ignia Gallery"}
        description={"Discover established and emerging sculptors working in bronze, marble and steel, and explore the studios behind each original work."}
        path="/escultores"
      />
      <Header theme="light" />

      {/* A. Typographic opening */}
      <section className="px-6 md:px-12 pt-16 pb-20 md:pb-24 bg-white max-w-[820px]">
        <div className="eyebrow mb-4">{t.kicker}</div>
        <h1 className="font-display font-medium text-[clamp(40px,6vw,88px)] tracking-[-0.02em] text-ink leading-[1.02] mb-6">
          {t.title}
        </h1>
        <p className="font-body text-[18px] font-normal text-gray leading-relaxed max-w-[560px]">
          {t.intro}
        </p>
      </section>

      {/* B. Full-bleed slideshow */}
      <SculptorsSlideshow />

      {/* C. Sculptor index */}
      <section className="px-6 md:px-12 py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-8">{t.indexKicker}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-10 md:gap-y-16">
            {roster.map((a) => (
              <Link
                key={a.slug}
                to={`/perfil/escultor/${artistSlug(a.nombre)}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
              >
                <div className="aspect-[4/5] overflow-hidden bg-secondary mb-5">
                  <img
                    src={a.thumbnail}
                    alt={a.nombre}
                    loading="lazy"
                    width={640}
                    height={800}
                    className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <h2 className="font-display font-medium text-[clamp(24px,2.2vw,30px)] tracking-[-0.01em] text-ink leading-tight mb-1.5">
                  {a.nombre}
                </h2>
                <div className="font-body text-[12px] text-muted-line uppercase tracking-[0.12em]">
                  {a.technique}
                  {a.location && <> · {a.location}</>}
                </div>
              </Link>
            ))}

            {/* Open card: invite a new sculptor to join */}
            <Link
              to="/join/sculptors"
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
            >
              <div className="aspect-[4/5] border border-dashed border-border mb-5 flex items-center justify-center transition-colors duration-300 group-hover:border-ink">
                <span className="font-display text-[48px] text-muted-line leading-none transition-transform duration-300 group-hover:scale-110">+</span>
              </div>
              <h2 className="font-display font-medium text-[clamp(24px,2.2vw,30px)] tracking-[-0.01em] text-muted-line leading-tight mb-1.5">
                {t.openName}
              </h2>
              <div className="font-body text-[12px] text-gray uppercase tracking-[0.12em]">
                {t.openText} <span className="link-arrow normal-case tracking-normal">{t.openCta}</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* D. Sculptors to know */}
      <SculptorsToKnow />

      <Footer />
    </main>
  );
};

export default EscultoresPage;
