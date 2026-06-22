import { Link, useParams } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import caida from "@/assets/perfil-escultura-caida.jpg";
import eco from "@/assets/perfil-escultura-eco.jpg";
import umbral from "@/assets/perfil-escultura-umbral.jpg";
import vertice from "@/assets/perfil-escultura-vertice.jpg";
import quietud from "@/assets/perfil-escultura-quietud.jpg";
import resto from "@/assets/perfil-escultura-resto.jpg";
import cristina from "@/assets/artist-cristina-iglesias-real.jpg";
import jaume from "@/assets/artist-jaume-plensa-real.jpg";
import susana from "@/assets/artist-susana-solano-real.jpg";
import barcelo from "@/assets/artist-miquel-barcelo-real.jpg";
import chillida from "@/assets/artist-eduardo-chillida-real.jpg";
import adaRetratoAsset from "@/assets/ada-la-cadena-retrato-2.png.asset.json";
import { useLang } from "@/i18n/LanguageContext";
import { WORKS } from "@/data/igniaWorks";
import { artistSlug } from "@/lib/artistSlug";

type Bio = {
  nombre: string;
  retrato: string;
  bioEs: string;
  bioEn: string;
  espEs: string;
  espEn: string;
};

const BIOS: Record<string, Bio> = {
  "cristina-iglesias": {
    nombre: "Cristina Iglesias", retrato: cristina,
    bioEs: "San Sebastián, España. Espacio, agua y bronce. Su obra une arquitectura íntima y celosías que invitan a mirar desde dentro.",
    bioEn: "San Sebastián, Spain. Space, water and bronze. Her work joins intimate architecture and lattices that invite you to look from within.",
    espEs: "Bronce, agua y celosía", espEn: "Bronze, water and lattice",
  },
  "jaume-plensa": {
    nombre: "Jaume Plensa", retrato: jaume,
    bioEs: "Barcelona, España. Figura, palabra y escala. Une presencia humana, silencio y escritura en piezas monumentales.",
    bioEn: "Barcelona, Spain. Figure, word and scale. Brings together human presence, silence and writing in monumental pieces.",
    espEs: "Figura, palabra y escala", espEn: "Figure, word and scale",
  },
  "susana-solano": {
    nombre: "Susana Solano", retrato: susana,
    bioEs: "Barcelona, España. Metal, estructura y espacio. Aborda el metal como construcción física y mental.",
    bioEn: "Barcelona, Spain. Metal, structure and space. Approaches metal as both physical and mental construction.",
    espEs: "Metal, estructura y espacio", espEn: "Metal, structure and space",
  },
  "helena-vazquez": {
    nombre: "Helena Vázquez", retrato: caida,
    bioEs: "Toledo, España. Bronce figurativo. Tres décadas trabajando la figura humana desde el oficio lento del taller.",
    bioEn: "Toledo, Spain. Figurative bronze. Three decades working the human figure through the slow craft of the studio.",
    espEs: "Bronce figurativo", espEn: "Figurative bronze",
  },
  "carmen-aldea": {
    nombre: "Carmen Aldea", retrato: umbral,
    bioEs: "Almería, España. Talla en mármol de Macael. Combina referencias clásicas y formas tríadicas que estructuran el espacio con un único bloque.",
    bioEn: "Almería, Spain. Macael marble carving. Combines classical references and triadic forms that structure space from a single block.",
    espEs: "Mármol tallado", espEn: "Carved marble",
  },
  "marcos-iriarte": {
    nombre: "Marcos Iriarte", retrato: barcelo,
    bioEs: "Bilbao, España. Bronce y cerámica esmaltada. Su obra explora la confluencia de volúmenes orgánicos con superficies cálidas.",
    bioEn: "Bilbao, Spain. Bronze and glazed ceramic. His work explores the confluence of organic volumes with warm surfaces.",
    espEs: "Bronce y cerámica", espEn: "Bronze and ceramic",
  },
  "alba-costa": {
    nombre: "Alba Costa", retrato: vertice,
    bioEs: "Valencia, España. Mármol y pliegue. Trabaja la piedra como tejido: pliegues, dobleces y tensiones que humanizan el bloque mineral.",
    bioEn: "Valencia, Spain. Marble and fold. Treats stone like fabric: folds, creases and tensions that humanise the mineral block.",
    espEs: "Mármol y pliegue", espEn: "Marble and fold",
  },
  "diego-lara": {
    nombre: "Diego Lara", retrato: eco,
    bioEs: "Sevilla, España. Acero corten y vidrio rojo. Investiga la oxidación natural y la luz contenida como materiales escultóricos.",
    bioEn: "Seville, Spain. Corten steel and red glass. Investigates natural oxidation and contained light as sculptural materials.",
    espEs: "Acero corten y vidrio", espEn: "Corten steel and glass",
  },
  "sofia-mendez": {
    nombre: "Sofía Méndez", retrato: resto,
    bioEs: "Galicia, España. Piedra tallada y madera. Su obra parte de la raíz y el fragmento orgánico para construir piezas de presencia silenciosa.",
    bioEn: "Galicia, Spain. Carved stone and wood. Her work starts from root and organic fragment to build pieces of quiet presence.",
    espEs: "Piedra y madera", espEn: "Stone and wood",
  },
  "ada-la-cadena": {
    nombre: "Ada La Cadena", retrato: adaRetratoAsset.url,
    bioEs: "El Arte de lo Intangible\n\nAda La Cadena (España) es una artista multidisciplinaria cuya práctica se mueve entre la pintura y la escultura cerámica con una misma obsesión: hacer visible lo que no tiene forma. Sus obras nacen de un proceso subconsciente e intuitivo, sin bocetos previos, sin certezas, en el que la materia revela lo que la mente consciente no se atreve a nombrar.\n\nEn su cerámica, esa misma búsqueda se encarna en la arcilla. Cuerpos que son objetos, objetos que son rostros, superficies que son piel. La ornamentación no es decoración, es lenguaje. Los motivos florales que recorren sus piezas no embellecen: narran, ocultan, revelan.\n\nSu trabajo ha sido exhibido en galerías de prestigio y forma parte de colecciones privadas en varios países. Cada pieza es única e irrepetible, como lo es la emoción que la origina.",
    bioEn: "The Art of the Intangible\n\nAda La Cadena (Spain) is a multidisciplinary artist whose practice moves between painting and ceramic sculpture with a single obsession: to make visible what has no form. Her works are born from a subconscious, intuitive process — without prior sketches, without certainties — in which matter reveals what the conscious mind does not dare to name.\n\nIn her ceramics, that same search is embodied in clay. Bodies that are objects, objects that are faces, surfaces that are skin. Ornamentation is not decoration, it is language. The floral motifs that run across her pieces do not embellish: they narrate, conceal, reveal.\n\nHer work has been exhibited in prestigious galleries and is part of private collections in several countries. Each piece is unique and unrepeatable, as is the emotion that gives rise to it.",
    espEs: "Cerámica contemporánea", espEn: "Contemporary ceramic",
  },
  "lucia-pardo": {
    nombre: "Lucía Pardo", retrato: quietud,
    bioEs: "Oporto, Portugal. Cerámica esmaltada en series cortas. Su obra explora el origen del volumen a partir del torno y del esmalte mate.",
    bioEn: "Porto, Portugal. Glazed ceramic in short series. Her work explores the origin of volume through the wheel and matt glaze.",
    espEs: "Cerámica esmaltada", espEn: "Glazed ceramic",
  },
  "pablo-reyes": {
    nombre: "Pablo Reyes", retrato: eco,
    bioEs: "Madrid, España. Bronce figurativo estilizado. Trabaja la figura alargada como eco humano: piezas verticales y silenciosas.",
    bioEn: "Madrid, Spain. Stylised figurative bronze. Works the elongated figure as a human echo: vertical, quiet pieces.",
    espEs: "Bronce estilizado", espEn: "Stylised bronze",
  },
  "ines-ferrer": {
    nombre: "Inés Ferrer", retrato: quietud,
    bioEs: "Zaragoza, España. Alabastro tallado. Busca la quietud y la luz traslúcida en piezas pulidas a mano durante meses.",
    bioEn: "Zaragoza, Spain. Carved alabaster. Pursues stillness and translucent light in pieces hand-polished over months.",
    espEs: "Alabastro y luz", espEn: "Alabaster and light",
  },
  "tomas-vigo": {
    nombre: "Tomás Vigo", retrato: eco,
    bioEs: "Vigo, España. Vidrio soplado en horno propio. Su serie Luz interior atrapa el color ámbar como núcleo cálido dentro del volumen.",
    bioEn: "Vigo, Spain. Glass blown in his own furnace. His Inner light series captures amber colour as a warm core within the volume.",
    espEs: "Vidrio soplado", espEn: "Blown glass",
  },
  "ana-ruiz": {
    nombre: "Ana Ruiz", retrato: vertice,
    bioEs: "Bilbao, España. Acero pulido en formas anulares. Investiga la circulación del aire y la mirada a través del círculo abierto.",
    bioEn: "Bilbao, Spain. Polished steel in annular forms. Investigates the flow of air and gaze through the open circle.",
    espEs: "Acero pulido", espEn: "Polished steel",
  },
  "camila-soler": {
    nombre: "Camila Soler", retrato: chillida,
    bioEs: "Buenos Aires, Argentina. Bronce y latón en órbitas suspendidas. Combina astronomía y oficio metalúrgico en piezas de mediana escala.",
    bioEn: "Buenos Aires, Argentina. Bronze and brass in suspended orbits. Combines astronomy and metalwork in mid-scale pieces.",
    espEs: "Bronce y latón", espEn: "Bronze and brass",
  },
  "mateo-rivas": {
    nombre: "Mateo Rivas", retrato: vertice,
    bioEs: "Quito, Ecuador. Piedra verde tallada en formas mínimas. Su obra reduce el volumen a un mineral esencial, casi arquitectónico.",
    bioEn: "Quito, Ecuador. Green stone carved into minimal forms. His work reduces volume to an essential, almost architectural mineral.",
    espEs: "Piedra mineral", espEn: "Mineral stone",
  },
};

const DEFAULT_BIO = (nombre: string): Bio => ({
  nombre, retrato: caida,
  bioEs: `${nombre} forma parte de la selección Ignia. Perfil en preparación.`,
  bioEn: `${nombre} is part of the Ignia selection. Profile in preparation.`,
  espEs: "Escultura contemporánea", espEn: "Contemporary sculpture",
});

export default function PerfilEscultor() {
  const lang = useLang();
  const { slug = "helena-vazquez" } = useParams();
  const bio = BIOS[slug] ?? DEFAULT_BIO(slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));

  const obras = WORKS
    .filter((w) => artistSlug(w.es.artist) === slug || artistSlug(w.en.artist) === slug)
    .map((w) => ({
      slug: w.slug,
      img: w.image,
      titulo: { es: w.es.title, en: w.en.title },
      anyo: w.es.year ? Number(w.es.year) : undefined,
      estado: { es: "Publicada", en: "Published" },
      tiene3D: !!w.glbUrl,
    }));

  const t = lang === "es"
    ? { publish: "Publicar obra ↗", exit: "Salir", viewObra: "Ver escultura",
        eyebrow: "Perfil de escultor",
        stats: [["Obras publicadas", String(obras.length || 0)], ["Coleccionistas", "—"], ["Ediciones vendidas", "—"]],
        mine: "Obras en Ignia" }
    : { publish: "Submit work ↗", exit: "Sign out", viewObra: "View sculpture",
        eyebrow: "Sculptor profile",
        stats: [["Published works", String(obras.length || 0)], ["Collectors", "—"], ["Editions sold", "—"]],
        mine: "Works on Ignia" };

  const bioText = lang === "es" ? bio.bioEs : bio.bioEn;
  const esp = lang === "es" ? bio.espEs : bio.espEn;

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">{bio.nombre}</span>
          <button className="btn-primary !py-2 !px-5">{t.publish}</button>
          <Link to="/coleccion" className="font-body text-[14px] font-light text-gray hover:text-ink">{t.exit}</Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start mb-12">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img src={bio.retrato} alt={bio.nombre} className="w-full h-full object-cover object-[center_30%]" />
          </div>
          <div>
            <div className="eyebrow mb-3">{t.eyebrow}</div>
            <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink mb-2 leading-[1.05]">{bio.nombre}</h1>
            <div className="font-body text-[14px] uppercase tracking-[0.14em] text-muted-line mb-5">{esp}</div>
            <div className="font-body text-[16px] font-light text-gray max-w-[640px] mb-10 space-y-4">
              {bioText.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="grid grid-cols-3 gap-6">
              {t.stats.map(([l, v]) => <Stat key={l} label={l} value={v} />)}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink">{t.mine}</h2>
        </div>

        {obras.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {obras.map((o) => {
              const titulo = o.titulo[lang];
              return (
                <article key={o.slug} className="group">
                  <Link to={`/obra/${o.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
                    <img src={o.img} alt={titulo} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                  </Link>
                  <h3 className="font-display font-bold text-[16px] text-ink mb-0.5">
                    {titulo} {o.anyo && <span className="text-muted-line font-normal">· {o.anyo}</span>}
                  </h3>
                  <div className="font-body text-[11px] text-muted-line uppercase tracking-[0.14em] mb-3">{o.estado[lang]}</div>
                  {o.tiene3D && (
                    <span className="inline-block px-2 py-1 font-body text-[10px] uppercase tracking-[0.16em] font-medium" style={{ backgroundColor: "#CCFF00", color: "#000" }}>3D activo</span>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <p className="font-body text-[14px] font-light text-muted-line">
            {lang === "es" ? "Sin obras publicadas todavía." : "No works published yet."}
          </p>
        )}
      </section>
    </main>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-border pt-5">
    <div className="font-display font-bold text-[clamp(24px,3vw,40px)] text-ink leading-none mb-2">{value}</div>
    <div className="font-body text-[11px] uppercase tracking-[0.16em] text-muted-line">{label}</div>
  </div>
);
