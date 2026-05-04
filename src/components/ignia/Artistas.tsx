import { useState } from "react";

const data = {
  Establecidos: [
    { foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80", nombre: "Helena Vázquez", esp: "Bronce figurativo", obras: "24 obras" },
    { foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", nombre: "Marcos Iriarte", esp: "Abstracción metálica", obras: "18 obras" },
    { foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80", nombre: "Ana Ruiz", esp: "Mármol y piedra", obras: "31 obras" },
  ],
  Emergentes: [
    { foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80", nombre: "Diego Lara", esp: "Acero contemporáneo", obras: "12 obras" },
    { foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80", nombre: "Camila Soler", esp: "Alabastro orgánico", obras: "9 obras" },
    { foto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80", nombre: "Mateo Rivas", esp: "Madera tallada", obras: "7 obras" },
  ],
};

type Tab = keyof typeof data;

export const Artistas = () => {
  const [tab, setTab] = useState<Tab>("Establecidos");
  return (
    <section className="bg-white px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">Artistas en Ignia</h2>
        <div className="flex gap-7">
          {(Object.keys(data) as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="font-body text-[14px] font-light tracking-[0.08em] pb-1.5 transition-colors"
              style={{
                color: tab === t ? "hsl(var(--black-pure))" : "hsl(var(--gray))",
                borderBottom: tab === t ? "1.5px solid hsl(var(--black-pure))" : "1.5px solid transparent",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data[tab].map(a => (
          <article key={a.nombre} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden mb-5 bg-secondary">
              <img src={a.foto} alt={a.nombre} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[700ms]" />
            </div>
            <h3 className="font-display font-bold text-[16px] text-ink mb-1">{a.nombre}</h3>
            <div className="font-body text-[14px] font-light text-gray mb-1.5">{a.esp}</div>
            <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em]">{a.obras}</div>
          </article>
        ))}
      </div>
    </section>
  );
};
