import { Header } from "@/components/ignia/Header";
import { Artistas } from "@/components/ignia/Artistas";
import { Footer } from "@/components/ignia/Footer";

const EscultoresPage = () => (
  <main className="pt-14">
    <Header />
    <section className="px-6 md:px-12 pt-16 pb-4 bg-white">
      <div className="eyebrow mb-3">Quiénes esculpen</div>
      <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">
        Escultores
      </h1>
      <p className="font-body text-[16px] font-light text-gray max-w-[640px] mt-4">
        Talleres de bronce, mármol y acero. Conversaciones con quienes dedican su vida al oficio del volumen.
      </p>
    </section>
    <Artistas />
    <Footer />
  </main>
);

export default EscultoresPage;
