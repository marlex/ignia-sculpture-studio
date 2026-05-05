import obra1 from "@/assets/obra-1.jpg";
import obra2 from "@/assets/obra-2.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra4 from "@/assets/obra-4.jpg";
import obra5 from "@/assets/obra-5.jpg";
import obra6 from "@/assets/obra-6.jpg";
import obra7 from "@/assets/obra-7.jpg";
import obra8 from "@/assets/obra-8.jpg";

const obras = [
  { img: obra1, material: "Bronce", titulo: "Confluencia", artista: "Marcos Iriarte", precio: "€ 8.400" },
  { img: obra2, material: "Mármol", titulo: "Pliegue III", artista: "Alba Costa", precio: "€ 12.200" },
  { img: obra3, material: "Acero corten", titulo: "Vértigo", artista: "Diego Lara", precio: "€ 6.700" },
  { img: obra4, material: "Madera de roble", titulo: "Raíz", artista: "Sofía Méndez", precio: "€ 3.900" },
  { img: obra5, material: "Cerámica esmaltada", titulo: "Origen", artista: "Lucía Pardo", precio: "€ 1.200" },
  { img: obra6, material: "Bronce", titulo: "Eco", artista: "Pablo Reyes", precio: "€ 9.600" },
  { img: obra7, material: "Alabastro", titulo: "Quietud", artista: "Inés Ferrer", precio: "€ 5.300" },
  { img: obra8, material: "Vidrio soplado", titulo: "Luz interior", artista: "Tomás Vigo", precio: "€ 4.150" },
];

export const Coleccion = () => (
  <section className="bg-surface px-6 md:px-12 py-24">
    <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
      <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">Descubre todas las colecciones</h2>
      <a href="#" className="link-arrow">Ver las 843 obras →</a>
    </div>
    <p className="font-body text-[14px] font-light text-gray mb-8">843 obras · Actualizado semanalmente</p>

    <div className="flex flex-wrap gap-3 mb-10">
      <input type="search" placeholder="Buscar artista, obra, material…" className="w-60 border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors" />
      {["Material", "Precio", "Técnica"].map(s => (
        <select key={s} className="border-[0.5px] border-border bg-white font-body text-[14px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors">
          <option>{s}</option>
        </select>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
      {obras.map((o, i) => (
        <article key={i} className="bg-white group cursor-pointer">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <img src={o.img} alt={o.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-body text-[14px] font-light tracking-[0.16em] uppercase text-white">Ver en 3D</span>
            </div>
          </div>
          <div className="p-5">
            <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-1.5">{o.material}</div>
            <h3 className="font-display font-bold text-[17px] text-ink mb-1">{o.titulo}</h3>
            <div className="font-body text-[14px] font-light text-gray mb-3">{o.artista}</div>
            <div className="flex items-center gap-1.5 mb-3 font-body text-[12px] font-light text-muted-line uppercase tracking-[0.14em]">
              <span aria-hidden>◆</span>
              <span>Autenticidad verificada en blockchain</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t-[0.5px] border-border">
              <span className="font-body text-[14px] font-normal text-ink">{o.precio}</span>
              <span className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.12em]">Disponible · 3D</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);
