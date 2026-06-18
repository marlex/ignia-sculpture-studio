import bronzePatina from "@/assets/aprende-bronce-patina.jpg";
import sculpturePhoto from "@/assets/aprende-fotografiar-volumen.jpg";
import limitedEdition from "@/assets/aprende-ediciones-limitadas.jpg";
import { useLang } from "@/i18n/LanguageContext";

const POSTS = {
  es: [
    { img: bronzePatina, tag: "Para coleccionistas", titulo: "Cómo leer la pátina de una pieza de bronce", entradilla: "Una guía visual para entender la historia y la técnica detrás del color del bronce.", tiempo: "8 min de lectura" },
    { img: sculpturePhoto, tag: "Para escultores", titulo: "Fotografiar escultura sin distorsionar el volumen", entradilla: "Técnicas de luz y ángulo que capturan la profundidad real de una pieza.", tiempo: "12 min de lectura" },
    { img: limitedEdition, tag: "Editorial", titulo: "Ediciones únicas vs ediciones limitadas en escultura", entradilla: "Qué diferencia una obra original de una reproducción numerada y por qué importa.", tiempo: "6 min de lectura" },
  ],
  en: [
    { img: bronzePatina, tag: "For collectors", titulo: "How to read the patina of a bronze piece", entradilla: "A visual guide to understanding the history and technique behind bronze color.", tiempo: "8 min read" },
    { img: sculpturePhoto, tag: "For sculptors", titulo: "Photographing sculpture without distorting volume", entradilla: "Light and angle techniques that capture the true depth of a piece.", tiempo: "12 min read" },
    { img: limitedEdition, tag: "Editorial", titulo: "Unique vs limited editions in sculpture", entradilla: "What sets an original work apart from a numbered reproduction and why it matters.", tiempo: "6 min read" },
  ],
};

export const Aprende = () => {
  const lang = useLang();
  const posts = POSTS[lang];
  const t = lang === "es"
    ? { title: "Ignia aprende", more: "Ver todos →", list: "Listado de artículos de Ignia aprende" }
    : { title: "Ignia learn", more: "See all →", list: "Ignia learn article list" };

  return (
    <section className="bg-surface px-6 md:px-12 py-16 md:py-20" aria-labelledby="ignia-aprende-title">
      <div className="flex items-end justify-between mb-8">
        <h2 id="ignia-aprende-title" className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.title}</h2>
        <a href="/aprende" className="link-arrow">{t.more}</a>
      </div>
      <ul className="flex flex-col gap-12 md:gap-14" aria-label={t.list}>
        {posts.map((p) => (
          <li key={p.titulo}>
            <a href="/aprende" className="group flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-stretch focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4">
              <div className="md:w-[38%] flex flex-col justify-center md:justify-end order-2 md:order-1">
                <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-2">{p.tag}</div>
                <h3 className="font-display font-bold text-[clamp(22px,2.6vw,32px)] tracking-[-0.02em] text-ink mb-2 leading-tight">{p.titulo}</h3>
                <p className="font-body text-[15px] font-light text-gray mb-3 leading-snug">{p.entradilla}</p>
                <div className="font-body text-[16px] font-light text-gray">{p.tiempo}</div>
              </div>
              <div className="md:w-[62%] overflow-hidden bg-secondary order-1 md:order-2 aspect-[21/9]">
                <img
                  src={p.img}
                  alt={p.titulo}
                  loading="lazy"
                  width={1600}
                  height={1000}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
