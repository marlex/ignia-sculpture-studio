import { Header } from "@/components/ignia/Header";
import { Coleccion as ColeccionSection } from "@/components/ignia/Coleccion";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";

const ColeccionPage = () => {
  const lang = useLang();
  const t = lang === "es"
    ? { eyebrow: "Catálogo", h: "Colección", sub: "Esculturas seleccionadas en bronce, mármol, acero corten, madera, cerámica, alabastro y vidrio." }
    : { eyebrow: "Catalogue", h: "Collection", sub: "Selected sculptures in bronze, marble, corten steel, wood, ceramic, alabaster and glass." };
  return (
    <main className="pt-14">
      <Header />
      <section className="px-6 md:px-12 pt-16 pb-4 bg-white">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">{t.h}</h1>
        <p className="font-body text-[16px] font-normal text-gray max-w-[640px] mt-4">{t.sub}</p>
      </section>
      <ColeccionSection />
      <Footer />
    </main>
  );
};

export default ColeccionPage;
