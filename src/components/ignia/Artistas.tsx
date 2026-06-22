import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import cristina from "@/assets/artist-cristina-iglesias-real.jpg";
import jaume from "@/assets/artist-jaume-plensa-real.jpg";
import barcelo from "@/assets/artist-miquel-barcelo-real.jpg";
import chillida from "@/assets/artist-eduardo-chillida-real.jpg";
import ulmukAsset from "@/assets/ada-la-cadena-taller.png.asset.json";
import helenaPortrait from "@/assets/artist-helena-vazquez.jpg";
import luciaPortrait from "@/assets/artist-lucia-pardo.jpg";
import pabloPortrait from "@/assets/artist-pablo-reyes.jpg";
import tomasPortrait from "@/assets/artist-tomas-vigo.jpg";

const ulmuk = ulmukAsset.url;


const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

const IGNIA_ARTISTS = {
  es: {
    featured: {
      foto: ulmuk,
      nombre: "Ada La Cadena",
      esp: "Cerámica, figura y ornamento",
      obras: "Obra cerámica esmaltada",
      titular: "“La arcilla deja de ser materia para convertirse en memoria.”",
      extracto:
        "Ada La Cadena modela jarrones antropomorfos donde el ornamento florece sobre el rostro. Su obra dialoga con la talavera, el azulejo y la mayólica, llevando la cerámica mediterránea a un territorio íntimo y contemporáneo.",
      tiempo: "12 min de lectura",
    },
    secundarios: [
      { foto: helenaPortrait, nombre: "Helena Vázquez", esp: "Bronce, figura y materia", extracto: "Estudio de la figura humana en bronce patinado, con piezas que combinan presencia y silencio." },
      { foto: luciaPortrait, nombre: "Lucía Pardo", esp: "Cerámica esmaltada y origen", extracto: "Formas primarias en cerámica esmaltada que evocan el gesto fundacional del barro." },
      { foto: pabloPortrait, nombre: "Pablo Reyes", esp: "Bronce y figura esbelta", extracto: "Bronces de figura alargada que exploran la verticalidad y el eco del cuerpo en el espacio." },
      { foto: tomasPortrait, nombre: "Tomás Vigo", esp: "Vidrio soplado y luz", extracto: "Piezas de vidrio soplado donde la luz atraviesa la materia y construye volumen." },
    ],
  },
  en: {
    featured: {
      foto: ulmuk,
      nombre: "Ada La Cadena",
      esp: "Ceramic, figure and ornament",
      obras: "Glazed ceramic work",
      titular: "“Clay ceases to be matter and becomes memory.”",
      extracto:
        "Ada La Cadena models anthropomorphic vases where ornament blossoms across the face. Her work dialogues with Talavera, azulejo and maiolica, bringing Mediterranean ceramics into intimate, contemporary territory.",
      tiempo: "12 min read",
    },
    secundarios: [
      { foto: helenaPortrait, nombre: "Helena Vázquez", esp: "Bronze, figure and matter", extracto: "A study of the human figure in patinated bronze, with pieces that combine presence and silence." },
      { foto: luciaPortrait, nombre: "Lucía Pardo", esp: "Glazed ceramic and origin", extracto: "Primary forms in glazed ceramic that evoke the founding gesture of clay." },
      { foto: pabloPortrait, nombre: "Pablo Reyes", esp: "Bronze and slender figure", extracto: "Elongated bronze figures that explore verticality and the echo of the body in space." },
      { foto: tomasPortrait, nombre: "Tomás Vigo", esp: "Blown glass and light", extracto: "Blown-glass pieces where light passes through matter and builds volume." },
    ],
  },
} as const;

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

export const Artistas = () => {
  const lang = useLang();
  const { featured, secundarios } = IGNIA_ARTISTS[lang];
  const inspiration = INSPIRATION[lang];
  const t = lang === "es"
    ? { label: "ESCULTORES EN IGNIA", all: "Ver todos →", view: "Ver artista →", inspiration: "Referentes" }
    : { label: "SCULPTORS ON IGNIA", all: "View all →", view: "View artist →", inspiration: "Referentes" };

  return (
    <>
      <section className="px-6 md:px-12 py-[60px]" style={{ background: "#f5f5f5" }}>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="font-body text-[12px] font-light text-muted-line uppercase tracking-[0.18em]">{t.label}</h2>
          <a href="#" className="link-arrow">{t.all}</a>
        </div>

        <article className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center mb-16">
          <Link to={`/perfil/escultor/${slugify(featured.nombre)}`} aria-label={featured.nombre} className="block aspect-square md:aspect-[16/9] overflow-hidden bg-secondary group">
            <img src={featured.foto} alt={featured.nombre} loading="lazy" width={1600} height={900} className="w-full h-full object-cover object-center scale-x-[-1]" />
          </Link>
          <div>
            <Link to={`/perfil/escultor/${slugify(featured.nombre)}`} className="block group">
              <div className="font-display text-[28px] font-bold text-ink mb-4 leading-tight">{featured.nombre}</div>
              <h3 className="font-display font-bold text-[28px] tracking-[-0.02em] text-ink mb-5 leading-[1.15] group-hover:opacity-70 transition-opacity">
                {featured.titular}
              </h3>
              <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-6">{featured.extracto}</p>
              <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-6">
                {featured.esp} · {featured.obras} · {featured.tiempo}
              </div>
              <span className="link-arrow">{t.view}</span>
            </Link>
          </div>
        </article>

        <div className="border-t border-border pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {secundarios.map((a) => (
              <article key={a.nombre} className="group grid grid-cols-1 md:grid-cols-[40%_60%] gap-5 items-start">
                <Link to={`/perfil/escultor/${slugify(a.nombre)}`} aria-label={a.nombre} className="block aspect-square overflow-hidden bg-secondary">
                  <img src={a.foto} alt={a.nombre} loading="lazy" width={800} height={800} className="w-full h-full object-cover object-center transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </Link>
                <div>
                  <Link to={`/perfil/escultor/${slugify(a.nombre)}`} className="block hover:opacity-80 transition-opacity">
                    <h4 className="font-display font-bold text-[28px] text-ink mb-1.5 leading-tight">{a.nombre}</h4>
                    <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{a.esp}</div>
                    <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-3">{a.extracto}</p>
                    <span className="link-arrow text-[12px]">{t.view}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-[60px] bg-ink text-white">
        <div className="mb-10">
          <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-white">{t.inspiration}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {inspiration.map((a) => (
            <article
              key={a.nombre}
              className="grid grid-cols-[96px_1fr] md:grid-cols-[120px_1fr] gap-5 items-center py-6"
            >
              <Link to={`/perfil/escultor/${slugify(a.nombre)}`} aria-label={a.nombre} className="block aspect-square overflow-hidden bg-white/5">
                <img src={a.foto} alt={a.nombre} loading="lazy" width={240} height={240} className="w-full h-full object-cover object-[center_35%]" />
              </Link>
              <div>
                <Link to={`/perfil/escultor/${slugify(a.nombre)}`} className="block hover:opacity-80 transition-opacity">
                  <h3 className="font-display font-bold text-[22px] md:text-[24px] text-white leading-tight mb-1.5">{a.nombre}</h3>
                  <div className="font-body text-[11px] font-light text-white/60 uppercase tracking-[0.16em] mb-3">
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
    </>
  );
};
