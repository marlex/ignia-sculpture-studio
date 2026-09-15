import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { SectionSeparator } from "@/components/ignia/home/SectionSeparator";
import cristina from "@/assets/artist-cristina-iglesias-real.jpg";
import jaume from "@/assets/artist-jaume-plensa-real.jpg";
import barcelo from "@/assets/artist-miquel-barcelo-real.jpg";
import chillida from "@/assets/artist-eduardo-chillida-real.jpg";
import ulmukAsset from "@/assets/ada-la-cadena-taller.png.asset.json";
import helenaPortrait from "@/assets/artist-helena-vazquez-new.png.asset.json";
import luciaPortraitAsset from "@/assets/artist-lucia-pardo-new.jpg.asset.json";
const luciaPortrait = luciaPortraitAsset.url;
import pabloPortraitAsset from "@/assets/artist-pablo-reyes-new.jpg.asset.json";
const pabloPortrait = pabloPortraitAsset.url;
import tomasPortrait from "@/assets/artist-tomas-vigo.jpg";

const ulmuk = ulmukAsset.url;
const helena = helenaPortrait.url;


const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

const IGNIA_ARTISTS = {
  es: {
    featured: {
      foto: helena,
      nombre: "Helena Vázquez",
      esp: "Bronce, figura y materia",
      obras: "Estudio de la figura en bronce",
      titular: "“El bronce guarda el silencio del cuerpo.”",
      extracto:
        "Helena Vázquez modela la figura humana en bronce patinado con una economía de gestos que potencia su presencia. Sus piezas dialogan con el espacio a través del silencio, de la tensión entre la piel del metal y la memoria del cuerpo.",
      tiempo: "10 min de lectura",
    },
    secundarios: [
      { foto: ulmuk, nombre: "Ada La Cadena", esp: "Cerámica, figura y ornamento", extracto: "Jarrones antropomorfos donde el ornamento florece sobre el rostro, llevando la cerámica mediterránea a un territorio íntimo y contemporáneo." },
      { foto: luciaPortrait, nombre: "Lucía Pardo", esp: "Cerámica esmaltada y origen", extracto: "Formas primarias en cerámica esmaltada que evocan el gesto fundacional del barro." },
      { foto: pabloPortrait, nombre: "Pablo Reyes", esp: "Bronce y figura esbelta", extracto: "Bronces de figura alargada que exploran la verticalidad y el eco del cuerpo en el espacio." },
      { foto: tomasPortrait, nombre: "Tomás Vigo", esp: "Vidrio soplado y luz", extracto: "Piezas de vidrio soplado donde la luz atraviesa la materia y construye volumen." },
    ],
  },
  en: {
    featured: {
      foto: helena,
      nombre: "Helena Vázquez",
      esp: "Bronze, figure and matter",
      obras: "Study of the bronze figure",
      titular: "“Bronze keeps the silence of the body.”",
      extracto:
        "Helena Vázquez models the human figure in patinated bronze with an economy of gesture that heightens its presence. Her pieces dialogue with space through silence, through the tension between the skin of metal and the memory of the body.",
      tiempo: "10 min read",
    },
    secundarios: [
      { foto: ulmuk, nombre: "Ada La Cadena", esp: "Ceramic, figure and ornament", extracto: "Anthropomorphic vases where ornament blossoms across the face, bringing Mediterranean ceramics into intimate, contemporary territory." },
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

interface ArtistasProps {
  showHeader?: boolean;
}

export const Artistas = ({ showHeader = false }: ArtistasProps) => {
  const lang = useLang();
  const { featured, secundarios } = IGNIA_ARTISTS[lang];
  const inspiration = INSPIRATION[lang];
  const t = lang === "es"
    ? { label: "Escultores", all: "Ver todos →", view: "Ver artista →",
        inspiration: "Referentes que nos inspiran",
        inspirationKicker: "INSPIRACIÓN",
        inspirationLead: "Maestros contemporáneos cuya obra marca el camino que IGNIA quiere recorrer: una escultura que dialoga con el espacio, la materia y la memoria.",
        closing: "Sculptors, your work stays yours. Keep showing and selling wherever else you already do." }
    : { label: "Sculptors", all: "View all →", view: "View artist →",
        inspiration: "References that inspire us",
        inspirationKicker: "INSPIRATION",
        inspirationLead: "Contemporary masters whose work charts the path IGNIA wants to follow: sculpture in dialogue with space, matter and memory.",
        closing: "Sculptors, your work stays yours. Keep showing and selling wherever else you already do." };


  return (
    <>
      <section className="px-6 md:px-12 py-[60px]" style={{ background: "#f5f5f5" }}>
        {showHeader && (
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink">{t.label}</h2>
            <Link to="/escultores" className="link-arrow">{t.all}</Link>
          </div>
        )}

        <article className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center mb-16">
          <Link to={`/perfil/escultor/${slugify(featured.nombre)}`} aria-label={featured.nombre} className="block aspect-square md:aspect-[16/9] overflow-hidden bg-secondary group">
            <img src={featured.foto} alt={featured.nombre} loading="lazy" width={1600} height={900} className="w-full h-full object-cover object-center" />
          </Link>
          <div>
            <Link to={`/perfil/escultor/${slugify(featured.nombre)}`} className="block group">
              <h3 className="font-display text-[28px] max-md:text-[25px] font-semibold text-ink mb-4 leading-tight">{featured.nombre}</h3>
              <h4 className="font-display font-semibold text-[28px] tracking-[-0.02em] text-ink mb-5 leading-[1.15] group-hover:opacity-70 transition-opacity">
                {featured.titular}
              </h4>
              <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-6">{featured.extracto}</p>
              <div className="font-body text-[13px] font-normal text-muted-line uppercase tracking-[0.14em] mb-6">
                {featured.esp} · {featured.obras}
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
                  <Link to={`/perfil/escultor/${slugify(a.nombre)}`} className="block hover:opacity-65 transition-opacity">
                    <h3 className="font-display font-semibold text-[28px] max-md:text-[25px] text-ink mb-1.5 leading-tight">{a.nombre}</h3>
                    <div className="font-body text-[13px] font-normal text-muted-line uppercase tracking-[0.14em] mb-3">{a.esp}</div>
                    <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-3">{a.extracto}</p>
                    <span className="link-arrow text-[12px]">{t.view}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <p className="font-body text-[16px] font-normal text-gray leading-relaxed mt-12 max-w-[720px]">
          {t.closing}
        </p>

        {showHeader && (
          <div className="md:hidden mt-8 flex justify-end">
            <Link to="/escultores" className="link-arrow">{t.all}</Link>
          </div>
        )}
      </section>

    </>

  );
};
