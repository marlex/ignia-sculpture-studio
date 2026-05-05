import { Header } from "@/components/ignia/Header";
import { Aprende as AprendeSection } from "@/components/ignia/Aprende";
import { Footer } from "@/components/ignia/Footer";
import bronzePatina from "@/assets/aprende-bronce-patina.jpg";
import sculpturePhoto from "@/assets/aprende-fotografiar-volumen.jpg";
import limitedEdition from "@/assets/aprende-ediciones-limitadas.jpg";

const articulos = [
  {
    img: bronzePatina,
    tag: "Para coleccionistas",
    titulo: "Cómo leer la pátina de una pieza de bronce",
    tiempo: "8 min de lectura",
  },
  {
    img: sculpturePhoto,
    tag: "Para escultores",
    titulo: "Fotografiar escultura sin distorsionar el volumen",
    tiempo: "12 min de lectura",
  },
  {
    img: limitedEdition,
    tag: "Editorial",
    titulo: "Ediciones únicas vs ediciones limitadas en escultura",
    tiempo: "6 min de lectura",
  },
];

const AprendePage = () => (
  <main className="pt-14">
    <Header />
    <section className="px-6 md:px-12 pt-16 pb-4 bg-white">
      <div className="eyebrow mb-3">Conocimiento del oficio</div>
      <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">
        Ignia aprende
      </h1>
      <p className="font-body text-[16px] font-light text-gray max-w-[640px] mt-4">
        Guías para entender la escultura: materiales, procesos, conservación y mercado.
      </p>
    </section>
    <AprendeSection />
    <section className="bg-white px-6 md:px-12 py-20">
      <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-10">
        Más artículos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articulos.map(a => (
          <article key={a.titulo} className="group cursor-pointer">
            <div className="aspect-[16/10] overflow-hidden bg-secondary mb-4">
              <img src={a.img} alt={a.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
            </div>
            <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-2">{a.tag}</div>
            <h3 className="font-display font-bold text-[18px] text-ink leading-tight mb-2">{a.titulo}</h3>
            <div className="font-body text-[13px] text-gray">{a.tiempo}</div>
          </article>
        ))}
      </div>
    </section>
    <Footer />
  </main>
);

export default AprendePage;
