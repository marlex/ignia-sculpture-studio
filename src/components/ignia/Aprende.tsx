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
  const t = lang === "es"
    ? { title: "Ignia aprende", more: "Ver todos →", list: "Listado de artículos de Ignia aprende" }
    : { title: "Ignia learn", more: "See all →", list: "Ignia learn article list" };

  return (
    <section className="bg-surface px-6 md:px-12 py-24" aria-labelledby="ignia-aprende-title">
      <div className="flex items-end justify-between mb-10">
        <h2 id="ignia-aprende-title" className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.title}</h2>
        <a href="/aprende" className="link-arrow">{t.more}</a>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" aria-label={t.list}>
        {posts.map((p) => (
          <li key={p.titulo}>
            <a href="/aprende" className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
              <div className="aspect-[16/10] overflow-hidden bg-secondary mb-5">
                <img
                  src={p.img}
                  alt={p.titulo}
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{p.tag}</div>
              <h3 className="font-display font-bold text-[22px] tracking-[-0.02em] text-ink mb-3 leading-tight">{p.titulo}</h3>
              <div className="font-body text-[16px] font-light text-gray">{p.tiempo}</div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
