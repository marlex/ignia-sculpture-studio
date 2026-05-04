const obras = [
  { img: "https://images.unsplash.com/photo-1554188248-986adbb73be4?w=800&q=80", material: "Bronce", titulo: "Confluencia", artista: "Marcos Iriarte", precio: "€ 8.400" },
  { img: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80", material: "Mármol", titulo: "Pliegue III", artista: "Alba Costa", precio: "€ 12.200" },
  { img: "https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?w=800&q=80", material: "Acero corten", titulo: "Vértigo", artista: "Diego Lara", precio: "€ 6.700" },
  { img: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=80", material: "Madera de roble", titulo: "Raíz", artista: "Sofía Méndez", precio: "€ 3.900" },
  { img: "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=800&q=80", material: "Cerámica esmaltada", titulo: "Origen", artista: "Lucía Pardo", precio: "€ 1.200" },
  { img: "https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80", material: "Bronce", titulo: "Eco", artista: "Pablo Reyes", precio: "€ 9.600" },
  { img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80", material: "Alabastro", titulo: "Quietud", artista: "Inés Ferrer", precio: "€ 5.300" },
  { img: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80", material: "Vidrio soplado", titulo: "Luz interior", artista: "Tomás Vigo", precio: "€ 4.150" },
];

export const Coleccion = () => (
  <section className="bg-surface px-6 md:px-12 py-24">
    <div className="flex items-end justify-between mb-2 flex-wrap gap-4">
      <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">Descubre todas las colecciones</h2>
      <a href="#" className="link-arrow">Ver las 843 obras →</a>
    </div>
    <p className="font-body text-[12px] font-light text-gray mb-8">843 obras · Actualizado semanalmente</p>

    <div className="flex flex-wrap gap-3 mb-10">
      <input type="search" placeholder="Buscar artista, obra, material…" className="w-60 border-[0.5px] border-border bg-white font-body text-[11px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors" />
      {["Material", "Precio", "Técnica"].map(s => (
        <select key={s} className="border-[0.5px] border-border bg-white font-body text-[11px] font-light px-3.5 py-2.5 outline-none focus:border-ink transition-colors">
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
              <span className="font-body text-[9px] font-light tracking-[0.16em] uppercase text-white">Ver en 3D</span>
            </div>
          </div>
          <div className="p-5">
            <div className="font-body text-[9px] font-light text-muted-line uppercase tracking-[0.14em] mb-1.5">{o.material}</div>
            <h3 className="font-display font-bold text-[17px] text-ink mb-1">{o.titulo}</h3>
            <div className="font-body text-[12px] font-light text-gray mb-3">{o.artista}</div>
            <div className="flex items-center justify-between pt-3 border-t-[0.5px] border-border">
              <span className="font-body text-[14px] font-normal text-ink">{o.precio}</span>
              <span className="font-body text-[9px] font-light text-muted-line uppercase tracking-[0.12em]">Disponible · 3D</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);
