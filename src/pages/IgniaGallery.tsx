import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import studio from "@/assets/hero-bg-studio.jpg";
import obra2 from "@/assets/obra-2.jpg";
import obra4 from "@/assets/obra-4.jpg";
import obra5 from "@/assets/obra-5.jpg";

const IgniaGalleryPage = () => (
  <main className="pt-14">
    <Header />

    <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
      <img src={studio} alt="Sala de exposición de Ignia Gallery" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-12 max-w-[1280px] mx-auto">
        <div className="eyebrow text-white/80 mb-3">La galería</div>
        <h1 className="font-display font-bold text-white text-[clamp(40px,6vw,80px)] tracking-[-0.02em] leading-[1.02] max-w-[900px]">
          Ignia gallery
        </h1>
        <p className="font-body text-[16px] md:text-[18px] font-light text-white/85 max-w-[620px] mt-5">
          Una galería dedicada exclusivamente a la escultura contemporánea: bronce, mármol, acero, madera y cerámica.
        </p>
      </div>
    </section>

    <section className="bg-white px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-16 items-start max-w-[1280px] mx-auto">
        <div>
          <div className="eyebrow mb-4">Sobre Ignia</div>
          <h2 className="font-display font-bold text-[clamp(26px,3vw,40px)] tracking-[-0.02em] text-ink leading-[1.1] mb-6">
            Un espacio para la escultura, sin atajos.
          </h2>
          <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-5">
            Representamos a escultores que trabajan el volumen desde el oficio: figuración en bronce, abstracción
            metálica, talla en mármol y piedra, cerámica esmaltada y vidrio soplado.
          </p>
          <p className="font-body text-[16px] font-light text-gray leading-relaxed">
            Cada pieza llega a Ignia con su trazabilidad completa: taller, edición, materiales y proceso documentado.
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10">
          <Stat k="Escultores representados" v="42" />
          <Stat k="Obras catalogadas" v="843" />
          <Stat k="Talleres visitados / año" v="18" />
          <Stat k="Años de actividad" v="11" />
        </dl>
      </div>
    </section>

    <section className="bg-surface px-6 md:px-12 py-20">
      <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-10">
        Exposiciones en curso
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {expos.map(e => (
          <article key={e.titulo} className="group cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden bg-secondary mb-4">
              <img src={e.img} alt={e.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
            </div>
            <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-2">{e.fechas}</div>
            <h3 className="font-display font-bold text-[18px] text-ink leading-tight mb-1">{e.titulo}</h3>
            <div className="font-body text-[13px] text-gray">{e.escultor}</div>
          </article>
        ))}
      </div>
    </section>

    <section className="bg-white px-6 md:px-12 py-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow mb-3">Visítanos</div>
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink leading-tight mb-4">
            Calle del Bronce 14, Madrid
          </h2>
          <p className="font-body text-[15px] font-light text-gray leading-relaxed">
            Martes a sábado, 11:00 – 20:00. Cita previa para visitas guiadas y consultas de adquisición.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">Contacto</div>
          <p className="font-body text-[15px] font-light text-gray leading-relaxed">
            hola@igniagallery.com<br />+34 910 000 000
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

const expos = [
  { img: obra2, titulo: "Pliegue", escultor: "Alba Costa", fechas: "12 mar – 28 jun" },
  { img: obra4, titulo: "Raíz", escultor: "Sofía Méndez", fechas: "02 abr – 14 jul" },
  { img: obra5, titulo: "Origen", escultor: "Lucía Pardo", fechas: "20 abr – 30 ago" },
];

const Stat = ({ k, v }: { k: string; v: string }) => (
  <div className="border-t border-border pt-4">
    <dt className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line order-2">{k}</dt>
    <dd className="font-display font-bold text-[40px] text-ink leading-none mb-2">{v}</dd>
  </div>
);

export default IgniaGalleryPage;
