import { Link } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import obra1 from "@/assets/obra-1.jpg";
import obra2 from "@/assets/obra-2.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra4 from "@/assets/obra-4.jpg";
import obra5 from "@/assets/obra-5.jpg";
import obra6 from "@/assets/obra-6.jpg";
import obra7 from "@/assets/obra-7.jpg";

export default function PerfilEscultor() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">Helena Vázquez</span>
          <button className="btn-primary !py-2 !px-5">Publicar obra ↗</button>
          <Link to="/" className="font-body text-[14px] font-light text-gray hover:text-ink">Salir</Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 max-w-[1280px] mx-auto">
        <div className="eyebrow mb-3">Perfil de escultor</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink mb-4 leading-[1.05]">
          Helena Vázquez
        </h1>
        <p className="font-body text-[16px] font-light text-gray max-w-[640px] mb-12">
          Bronce figurativo · Toledo, España. Tres décadas trabajando la figura humana desde el oficio lento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Stat label="Obras publicadas" value="24" />
          <Stat label="Coleccionistas" value="38" />
          <Stat label="Ediciones vendidas" value="61" />
        </div>

        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink">Mis obras</h2>
          <button className="btn-primary !py-2 !px-5">+ Nueva obra</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {obras.map(o => (
            <article key={o.titulo} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden bg-secondary mb-4">
                <img src={o.img} alt={o.titulo} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[700ms]" />
              </div>
              <h3 className="font-display font-bold text-[16px] text-ink mb-1">{o.titulo}</h3>
              <div className="font-body text-[13px] text-muted-line uppercase tracking-[0.14em]">{o.estado}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const obras = [
  { img: obra1, titulo: "Caída", estado: "Publicada" },
  { img: obra6, titulo: "Eco", estado: "Publicada" },
  { img: obra2, titulo: "Umbral", estado: "Borrador" },
  { img: obra3, titulo: "Vértice", estado: "Vendida" },
  { img: obra7, titulo: "Quietud", estado: "Publicada" },
  { img: obra4, titulo: "Resto", estado: "Borrador" },
];

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-border pt-5">
    <div className="font-display font-bold text-[40px] text-ink leading-none mb-2">{value}</div>
    <div className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line">{label}</div>
  </div>
);
