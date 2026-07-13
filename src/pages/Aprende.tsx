import { Header } from "@/components/ignia/Header";
import { Aprende as AprendeSection } from "@/components/ignia/Aprende";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";

const AprendePage = () => {
  const lang = useLang();
  const t = lang === "es"
    ? { eyebrow: "Conocimiento del oficio", h: "Ignia aprende", sub: "Guías para entender la escultura: materiales, procesos, conservación y mercado." }
    : { eyebrow: "Craft knowledge", h: "Ignia learn", sub: "Guides to understand sculpture: materials, processes, conservation and market." };

  return (
    <main className="pt-14">
      <Header />
      <section className="px-6 md:px-12 pt-16 pb-4 bg-white">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-semibold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">{t.h}</h1>
        <p className="font-body text-[16px] font-normal text-gray max-w-[640px] mt-4">{t.sub}</p>
      </section>
      <AprendeSection showHeader={false} />
      <Footer />
    </main>
  );
};

export default AprendePage;
