import { useState } from "react";
import bronzePatina from "@/assets/aprende-bronce-patina.jpg";
import sculpturePhoto from "@/assets/aprende-fotografiar-volumen.jpg";
import limitedEdition from "@/assets/aprende-ediciones-limitadas.jpg";
import { useLang } from "@/i18n/LanguageContext";

const POSTS = {
  es: [
    { img: bronzePatina, tag: "Para coleccionistas", titulo: "Cómo leer la pátina de una pieza de bronce", tiempo: "8 min de lectura" },
    { img: sculpturePhoto, tag: "Para escultores", titulo: "Fotografiar escultura sin distorsionar el volumen", tiempo: "12 min de lectura" },
    { img: limitedEdition, tag: "Editorial", titulo: "Ediciones únicas vs ediciones limitadas en escultura", tiempo: "6 min de lectura" },
  ],
  en: [
    { img: bronzePatina, tag: "For collectors", titulo: "How to read the patina of a bronze piece", tiempo: "8 min read" },
    { img: sculpturePhoto, tag: "For sculptors", titulo: "Photographing sculpture without distorting volume", tiempo: "12 min read" },
    { img: limitedEdition, tag: "Editorial", titulo: "Unique vs limited editions in sculpture", tiempo: "6 min read" },
  ],
};

export const Aprende = () => {
  const lang = useLang();
  const posts = POSTS[lang];
  const [i, setI] = useState(0);
  const p = posts[i];
  const goPrev = () => setI((c) => (c === 0 ? posts.length - 1 : c - 1));
  const goNext = () => setI((c) => (c === posts.length - 1 ? 0 : c + 1));
  const t = lang === "es" ? {
    title: "Ignia aprende", more: "Ver más →", carousel: "Artículos de Ignia aprende",
    controls: "Controles del carrusel", prev: "Artículo anterior", next: "Artículo siguiente",
    item: (n: number, title: string) => `Ver artículo ${n}: ${title}`,
  } : {
    title: "Ignia learn", more: "See more →", carousel: "Ignia learn articles",
    controls: "Carousel controls", prev: "Previous article", next: "Next article",
    item: (n: number, title: string) => `View article ${n}: ${title}`,
  };

  return (
    <section className="bg-surface px-6 md:px-12 py-24" aria-labelledby="ignia-aprende-title">
      <div className="flex items-end justify-between mb-10">
        <h2 id="ignia-aprende-title" className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.title}</h2>
        <a href="#" className="link-arrow">{t.more}</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center" role="group" aria-roledescription="carousel" aria-label={t.carousel} aria-live="polite">
        <div className="aspect-[16/9] overflow-hidden bg-secondary">
          <img src={p.img} alt={p.titulo} loading="lazy" width={1600} height={896} className="w-full h-full object-cover object-center" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{p.tag}</div>
          <h3 className="font-display font-bold text-[26px] tracking-[-0.02em] text-ink mb-3 leading-tight">{p.titulo}</h3>
          <div className="font-body text-[14px] font-light text-gray">{p.tiempo}</div>
          <div className="flex items-center justify-between gap-5 pt-4" aria-label={t.controls}>
            <div className="flex items-center gap-4">
              {posts.map((post, idx) => (
                <button key={post.titulo} type="button" onClick={() => setI(idx)} aria-label={t.item(idx + 1, post.titulo)} aria-current={i === idx ? "true" : undefined} className="group flex h-9 w-9 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
                  <span className={`h-3.5 w-3.5 rounded-full border border-ink transition-all ${i === idx ? "bg-ink scale-110" : "bg-surface group-hover:bg-border"}`} />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={goPrev} aria-label={t.prev} className="h-11 w-11 border border-ink text-ink hover:bg-ink hover:text-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">←</button>
              <button type="button" onClick={goNext} aria-label={t.next} className="h-11 w-11 border border-ink text-ink hover:bg-ink hover:text-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
