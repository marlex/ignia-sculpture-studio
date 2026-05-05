import { useState } from "react";
import bronzePatina from "@/assets/aprende-bronce-patina.jpg";
import sculpturePhoto from "@/assets/aprende-fotografiar-volumen.jpg";
import limitedEdition from "@/assets/aprende-ediciones-limitadas.jpg";

const posts = [
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

export const Aprende = () => {
  const [i, setI] = useState(0);
  const p = posts[i];
  const goPrev = () => setI((current) => (current === 0 ? posts.length - 1 : current - 1));
  const goNext = () => setI((current) => (current === posts.length - 1 ? 0 : current + 1));

  return (
    <section className="bg-surface px-6 md:px-12 py-24" aria-labelledby="ignia-aprende-title">
      <div className="flex items-end justify-between mb-10">
        <h2 id="ignia-aprende-title" className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">Ignia aprende</h2>
        <a href="#" className="link-arrow">Ver más →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center" role="group" aria-roledescription="carrusel" aria-label="Artículos de Ignia aprende" aria-live="polite">
        <div className="aspect-[16/9] overflow-hidden bg-secondary">
          <img src={p.img} alt={p.titulo} loading="lazy" width={1600} height={896} className="w-full h-full object-cover object-center" />
        </div>
        <div>
          <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{p.tag}</div>
          <h3 className="font-display font-bold text-[26px] tracking-[-0.02em] text-ink mb-3 leading-tight">{p.titulo}</h3>
          <div className="font-body text-[14px] font-light text-gray">{p.tiempo}</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-6 mt-10">
        <div className="flex gap-3" role="tablist" aria-label="Seleccionar artículo">
          {posts.map((post, idx) => (
            <button
              key={post.titulo}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Ver artículo: ${post.titulo}`}
              aria-current={i === idx ? "true" : undefined}
              className={`h-3 w-3 rounded-full border border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 ${i === idx ? "bg-ink" : "bg-surface"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={goPrev} aria-label="Artículo anterior" className="h-10 w-10 border border-border text-ink hover:border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">←</button>
          <button type="button" onClick={goNext} aria-label="Artículo siguiente" className="h-10 w-10 border border-border text-ink hover:border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink">→</button>
        </div>
      </div>
    </section>
  );
};
