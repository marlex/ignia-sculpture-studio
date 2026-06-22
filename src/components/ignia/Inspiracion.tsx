import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import cristina from "@/assets/artist-cristina-iglesias-real.jpg";
import jaume from "@/assets/artist-jaume-plensa-real.jpg";
import barcelo from "@/assets/artist-miquel-barcelo-real.jpg";
import chillida from "@/assets/artist-eduardo-chillida-real.jpg";
import { artistSlug as slugify } from "@/lib/artistSlug";

const INSPIRATION = {
  es: [
    { foto: cristina, nombre: "Cristina Iglesias", esp: "Espacio, agua y bronce", obras: "Obra pública y museística" },
    { foto: jaume, nombre: "Jaume Plensa", esp: "Figura, palabra y escala", obras: "Instalaciones internacionales" },
    { foto: barcelo, nombre: "Miquel Barceló", esp: "Materia, barro y pigmento", obras: "Escultura y obra cerámica" },
    { foto: chillida, nombre: "Eduardo Chillida", esp: "Hierro, espacio y vacío", obras: "Esculturas monumentales en acero" },
  ],
  en: [
    { foto: cristina, nombre: "Cristina Iglesias", esp: "Space, water and bronze", obras: "Public and museum work" },
    { foto: jaume, nombre: "Jaume Plensa", esp: "Figure, word and scale", obras: "International installations" },
    { foto: barcelo, nombre: "Miquel Barceló", esp: "Matter, clay and pigment", obras: "Sculpture and ceramic work" },
    { foto: chillida, nombre: "Eduardo Chillida", esp: "Iron, space and void", obras: "Monumental steel sculptures" },
  ],
};

export const Inspiracion = () => {
  const lang = useLang();
  const inspiration = INSPIRATION[lang];
  const t = lang === "es"
    ? { view: "Ver artista →", inspiration: "Referentes que nos inspiran", inspirationKicker: "INSPIRACIÓN",
        inspirationLead: "Maestros contemporáneos cuya obra marca el camino que IGNIA quiere recorrer: una escultura que dialoga con el espacio, la materia y la memoria." }
    : { view: "View artist →", inspiration: "References that inspire us", inspirationKicker: "INSPIRATION",
        inspirationLead: "Contemporary masters whose work charts the path IGNIA wants to follow: sculpture in dialogue with space, matter and memory." };

  return (
    <section className="px-6 md:px-12 py-[80px] bg-ink text-white">
      <div className="max-w-3xl mb-14">
        <div className="font-body text-[12px] font-light text-white/50 uppercase tracking-[0.18em] mb-4">{t.inspirationKicker}</div>
        <h2 className="font-display font-medium text-[clamp(32px,4vw,52px)] tracking-[-0.02em] leading-[1.05] text-white mb-5">{t.inspiration}</h2>
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {inspiration.map((a) => (
          <article key={a.nombre} className="group grid grid-cols-1 md:grid-cols-[40%_60%] gap-5 items-start">
            <Link to={`/perfil/escultor/${slugify(a.nombre)}`} aria-label={a.nombre} className="block aspect-square overflow-hidden bg-white/5">
              <img src={a.foto} alt={a.nombre} loading="lazy" width={800} height={800} className="w-full h-full object-cover object-[center_25%] transition-transform duration-[700ms] group-hover:scale-[1.03]" />
            </Link>
            <div>
              <Link to={`/perfil/escultor/${slugify(a.nombre)}`} className="block hover:opacity-80 transition-opacity">
                <h3 className="font-display font-bold text-[28px] text-white leading-tight mb-1.5">{a.nombre}</h3>
                <div className="font-body text-[13px] font-light text-white/60 uppercase tracking-[0.14em] mb-3">
                  {a.esp} · {a.obras}
                </div>
                <span className="font-body text-[12px] font-light uppercase tracking-[0.18em] text-white inline-flex items-center gap-1.5 border-b border-white/40 pb-0.5">
                  {t.view}
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
