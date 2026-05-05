import { Link } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import arco from "@/assets/perfil-escultura-arco.jpg";
import memoria from "@/assets/perfil-escultura-memoria.jpg";
import nexo from "@/assets/perfil-escultura-nexo.jpg";
import latido from "@/assets/perfil-escultura-latido.jpg";
import orbita from "@/assets/perfil-escultura-orbita.jpg";
import mineral from "@/assets/perfil-escultura-mineral.jpg";
import respiro from "@/assets/perfil-escultura-respiro.jpg";

export default function PerfilColeccionista() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">María García</span>
          <Link to="/" className="font-body text-[14px] font-light text-gray hover:text-ink">Salir</Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 max-w-[1280px] mx-auto">
        <div className="eyebrow mb-3">Perfil de coleccionista</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink mb-4 leading-[1.05]">
          María García
        </h1>
        <p className="font-body text-[16px] font-light text-gray max-w-[640px] mb-12">
          Intereses: figurativo, gran formato. Presupuesto 5.000 € – 25.000 €.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Stat label="Obras en colección" value="7" />
          <Stat label="Guardadas" value="23" />
          <Stat label="Escultores seguidos" value="12" />
        </div>

        <div className="mb-16">
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-8">Mi colección</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {coleccion.map(o => (
              <article key={o.titulo} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden bg-secondary mb-4">
                  <img src={o.img} alt={o.titulo} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </div>
                <h3 className="font-display font-bold text-[16px] text-ink mb-1">{o.titulo}</h3>
                <div className="font-body text-[13px] text-muted-line uppercase tracking-[0.14em]">{o.artista}</div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-8">Recomendado para ti</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {recomendados.map(o => (
              <article key={o.titulo} className="group cursor-pointer">
                <div className="aspect-square overflow-hidden bg-secondary mb-3">
                  <img src={o.img} alt={o.titulo} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </div>
                <h3 className="font-display font-bold text-[14px] text-ink">{o.titulo}</h3>
                <div className="font-body text-[12px] text-muted-line uppercase tracking-[0.14em]">{o.artista}</div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const coleccion = [
  { img: arco, titulo: "Arco", artista: "Helena Vázquez" },
  { img: memoria, titulo: "Memoria", artista: "Marcos Iriarte" },
  { img: nexo, titulo: "Nexo", artista: "Ana Ruiz" },
];

const recomendados = [
  { img: latido, titulo: "Latido", artista: "Diego Lara" },
  { img: orbita, titulo: "Órbita", artista: "Camila Soler" },
  { img: mineral, titulo: "Mineral", artista: "Mateo Rivas" },
  { img: respiro, titulo: "Respiro", artista: "Helena Vázquez" },
];

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-border pt-5">
    <div className="font-display font-bold text-[40px] text-ink leading-none mb-2">{value}</div>
    <div className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line">{label}</div>
  </div>
);
