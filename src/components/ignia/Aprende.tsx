import { useState } from "react";

const posts = [
  { img: "https://images.unsplash.com/photo-1578321272125-4e4c4c3643c5?w=1200&q=80", tag: "Para coleccionistas", titulo: "Cómo leer la pátina de una pieza de bronce", tiempo: "8 min de lectura" },
  { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", tag: "Para artistas", titulo: "Fotografiar escultura sin distorsionar el volumen", tiempo: "12 min de lectura" },
  { img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&q=80", tag: "Editorial", titulo: "Ediciones únicas vs ediciones limitadas: qué cambia", tiempo: "6 min de lectura" },
];

export const Aprende = () => {
  const [i, setI] = useState(0);
  const p = posts[i];
  return (
    <section className="bg-surface px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">Ignia Aprende</h2>
        <a href="#" className="link-arrow">Ver más →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center">
        <div className="aspect-[16/9] overflow-hidden bg-secondary">
          <img src={p.img} alt={p.titulo} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{p.tag}</div>
          <h3 className="font-display font-bold text-[26px] tracking-[-0.02em] text-ink mb-3 leading-tight">{p.titulo}</h3>
          <div className="font-body text-[14px] font-light text-gray">{p.tiempo}</div>
        </div>
      </div>
      <div className="flex gap-2 mt-10">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="w-6 h-px transition-colors"
            style={{ background: i === idx ? "hsl(var(--black-pure))" : "hsl(var(--border))" }}
          />
        ))}
      </div>
    </section>
  );
};
