import { Header } from "@/components/ignia/Header";
import { Coleccion as ColeccionSection } from "@/components/ignia/Coleccion";
import { Footer } from "@/components/ignia/Footer";

const ColeccionPage = () => (
  <main className="pt-14">
    <Header />
    <section className="px-6 md:px-12 pt-16 pb-4 bg-white">
      <div className="eyebrow mb-3">Catálogo</div>
      <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">
        Colección
      </h1>
      <p className="font-body text-[16px] font-light text-gray max-w-[640px] mt-4">
        Esculturas seleccionadas en bronce, mármol, acero corten, madera, cerámica, alabastro y vidrio.
      </p>
    </section>
    <ColeccionSection />
    <Footer />
  </main>
);

export default ColeccionPage;
