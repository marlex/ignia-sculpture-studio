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
import { useLang } from "@/i18n/LanguageContext";


type ArtistData = {
  nombre: string;
  retrato: string;
  bioEs: string;
  bioEn: string;
  espEs: string;
  espEn: string;
  obras: { slug: string; img: string; anyo?: number; titulo: { es: string; en: string }; estado: { es: string; en: string }; tiene3D: boolean }[];
};

const ARTISTAS: Record<string, ArtistData> = {
  "cristina-iglesias": {
    nombre: "Cristina Iglesias",
    retrato: cristina,
    bioEs: "San Sebastián, España. Espacio, agua y bronce. Su obra une arquitectura íntima y celosías que invitan a mirar desde dentro.",
    bioEn: "San Sebastián, Spain. Space, water and bronze. Her work joins intimate architecture and lattices that invite you to look from within.",
    espEs: "Bronce, agua y celosía", espEn: "Bronze, water and lattice",
    obras: [
      { slug: "caida", img: caida, anyo: 2023, titulo: { es: "Caída", en: "Fall" }, estado: { es: "Publicada", en: "Published" }, tiene3D: true },
      { slug: "eco-ondas", img: eco, anyo: 2022, titulo: { es: "Eco", en: "Echo" }, estado: { es: "Publicada", en: "Published" }, tiene3D: false },
      { slug: "umbral", img: umbral, anyo: 2021, titulo: { es: "Umbral", en: "Threshold" }, estado: { es: "Vendida", en: "Sold" }, tiene3D: true },
    ],
  },
  "jaume-plensa": {
    nombre: "Jaume Plensa",
    retrato: jaume,
    bioEs: "Barcelona, España. Figura, palabra y escala. Su obra une presencia humana, silencio y escritura en piezas monumentales.",
    bioEn: "Barcelona, Spain. Figure, word and scale. His work brings together human presence, silence and writing in monumental pieces.",
    espEs: "Figura, palabra y escala", espEn: "Figure, word and scale",
    obras: [
      { slug: "vertice", img: vertice, anyo: 2024, titulo: { es: "Vértice", en: "Vertex" }, estado: { es: "Publicada", en: "Published" }, tiene3D: true },
      { slug: "quietud", img: quietud, anyo: 2023, titulo: { es: "Quietud", en: "Stillness" }, estado: { es: "Publicada", en: "Published" }, tiene3D: false },
      { slug: "resto", img: resto, anyo: 2022, titulo: { es: "Resto", en: "Remnant" }, estado: { es: "Borrador", en: "Draft" }, tiene3D: false },
    ],
  },
  "susana-solano": {
    nombre: "Susana Solano",
    retrato: susana,
    bioEs: "Barcelona, España. Metal, estructura y espacio. Aborda el metal como construcción física y mental.",
    bioEn: "Barcelona, Spain. Metal, structure and space. Approaches metal as both physical and mental construction.",
    espEs: "Metal, estructura y espacio", espEn: "Metal, structure and space",
    obras: [
      { slug: "caida", img: caida, anyo: 2023, titulo: { es: "Caída", en: "Fall" }, estado: { es: "Publicada", en: "Published" }, tiene3D: true },
      { slug: "vertice", img: vertice, anyo: 2022, titulo: { es: "Vértice", en: "Vertex" }, estado: { es: "Vendida", en: "Sold" }, tiene3D: false },
      { slug: "umbral", img: umbral, anyo: 2021, titulo: { es: "Umbral", en: "Threshold" }, estado: { es: "Borrador", en: "Draft" }, tiene3D: false },
    ],
  },
  "helena-vazquez": {
    nombre: "Helena Vázquez",
    retrato: caida,
    bioEs: "Toledo, España. Bronce figurativo. Tres décadas trabajando la figura humana desde el oficio lento.",
    bioEn: "Toledo, Spain. Figurative bronze. Three decades working the human figure through slow craft.",
    espEs: "Bronce figurativo", espEn: "Figurative bronze",
    obras: [
      { slug: "caida", img: caida, anyo: 2024, titulo: { es: "Caída", en: "Fall" }, estado: { es: "Publicada", en: "Published" }, tiene3D: true },
      { slug: "eco-ondas", img: eco, anyo: 2023, titulo: { es: "Eco", en: "Echo" }, estado: { es: "Publicada", en: "Published" }, tiene3D: false },
      { slug: "umbral", img: umbral, anyo: 2022, titulo: { es: "Umbral", en: "Threshold" }, estado: { es: "Borrador", en: "Draft" }, tiene3D: false },
      { slug: "vertice", img: vertice, anyo: 2022, titulo: { es: "Vértice", en: "Vertex" }, estado: { es: "Vendida", en: "Sold" }, tiene3D: true },
      { slug: "quietud", img: quietud, anyo: 2021, titulo: { es: "Quietud", en: "Stillness" }, estado: { es: "Publicada", en: "Published" }, tiene3D: true },
      { slug: "resto", img: resto, anyo: 2020, titulo: { es: "Resto", en: "Remnant" }, estado: { es: "Borrador", en: "Draft" }, tiene3D: false },
    ],
  },
};

export default function PerfilEscultor() {
  const lang = useLang();
  const { slug = "helena-vazquez" } = useParams();
  const artist = ARTISTAS[slug] ?? ARTISTAS["helena-vazquez"];
  const t = lang === "es"
    ? { publish: "Publicar obra ↗", exit: "Salir", viewObra: "Ver escultura",
        eyebrow: "Perfil de escultor",
        stats: [["Obras publicadas", "24"], ["Coleccionistas", "38"], ["Ediciones vendidas", "61"]],
        mine: "Mis obras" }
    : { publish: "Submit work ↗", exit: "Sign out", viewObra: "View sculpture",
        eyebrow: "Sculptor profile",
        stats: [["Published works", "24"], ["Collectors", "38"], ["Editions sold", "61"]],
        mine: "My works" };

  const bio = lang === "es" ? artist.bioEs : artist.bioEn;
  const esp = lang === "es" ? artist.espEs : artist.espEn;


  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">{artist.nombre}</span>
          <button className="btn-primary !py-2 !px-5">{t.publish}</button>
          <Link to="/" className="font-body text-[14px] font-light text-gray hover:text-ink">{t.exit}</Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start mb-12">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img src={artist.retrato} alt={artist.nombre} className="w-full h-full object-cover object-[center_30%]" />
          </div>
          <div>
            <div className="eyebrow mb-3">{t.eyebrow}</div>
            <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink mb-2 leading-[1.05]">{artist.nombre}</h1>
            <div className="font-body text-[14px] uppercase tracking-[0.14em] text-muted-line mb-5">{esp}</div>
            <p className="font-body text-[16px] font-light text-gray max-w-[640px] mb-10">{bio}</p>
            <div className="grid grid-cols-3 gap-6">
              {t.stats.map(([l, v]) => <Stat key={l} label={l} value={v} />)}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink">{t.mine}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {artist.obras.map((o, i) => {
            const titulo = o.titulo[lang];
            return (
              <article key={titulo} className="group">
                <Link to={`/obra/${o.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
                  <img src={o.img} alt={titulo} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </Link>
                <h3 className="font-display font-bold text-[16px] text-ink mb-1">{titulo}</h3>
                <div className="font-body text-[13px] text-muted-line uppercase tracking-[0.14em] mb-3">{o.estado[lang]}</div>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/obra/${o.slug}`}
                    className="font-body text-[12px] font-normal text-ink uppercase tracking-[0.12em] border-b-[0.5px] border-ink pb-px hover:opacity-60 transition-opacity"
                  >
                    {t.viewObra} →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
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
