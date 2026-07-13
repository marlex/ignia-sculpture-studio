import { Header } from "@/components/ignia/Header";
import { Artistas } from "@/components/ignia/Artistas";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";

const EscultoresPage = () => {
  const lang = useLang();
  const t = lang === "es"
    ? { eyebrow: "Quiénes esculpen", h: "Escultores", sub: "Talleres de bronce, mármol y acero. Conversaciones con quienes dedican su vida al oficio del volumen." }
    : { eyebrow: "Who sculpts", h: "Sculptors", sub: "Bronze, marble and steel workshops. Conversations with those who devote their life to the craft of volume." };
  return (
    <main className="pt-14">
      <Header />
      <section className="px-6 md:px-12 pt-16 pb-4 bg-white">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">{t.h}</h1>
        <p className="font-body text-[16px] font-normal text-gray max-w-[640px] mt-4">{t.sub}</p>
      </section>
      <Artistas />
      <Footer />
    </main>
  );
};

export default EscultoresPage;
