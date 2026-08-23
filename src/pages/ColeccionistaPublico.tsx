import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import patriziaAsset from "@/assets/collector-patrizia.webp.asset.json";
import joannouAsset from "@/assets/collector-joannou.webp.asset.json";
import warburgAsset from "@/assets/collector-warburg.jpg.asset.json";

type Bio = {
  nombre: string;
  ubicacion: string;
  foco: string;
  foto: string;
  eyebrow: string;
  bio: string[];
  highlights: { label: string; value: string }[];
  cita: string;
  citaRef: string;
  fuente: { label: string; url: string }[];
};

const DATA: Record<string, { es: Bio; en: Bio }> = {
  "patrizia-sandretto-re-rebaudengo": {
    es: {
      nombre: "Patrizia Sandretto Re Rebaudengo",
      ubicacion: "Turín, Italia",
      foco: "Escultura contemporánea · Instalación · Fotografía",
      foto: patriziaAsset.url,
      eyebrow: "Coleccionista · Mecenas",
      bio: [
        "Patrizia Sandretto Re Rebaudengo (Turín, 1958) empezó a coleccionar arte contemporáneo a comienzos de los noventa, en un momento en el que Italia apenas miraba a la generación emergente internacional. En 1995 fundó la Fondazione Sandretto Re Rebaudengo, primero en Guarene d'Alba y desde 2002 en su sede de Turín, diseñada por Claudio Silvestrin.",
        "Su colección reúne más de 1.500 obras y ha sido pionera en visibilizar escultura, instalación y fotografía de artistas como Maurizio Cattelan, Anish Kapoor, Doug Aitken, Tony Cragg, Adrián Villar Rojas, Sarah Lucas o Damien Hirst. La fundación funciona como espacio expositivo, programa de residencias y plataforma educativa.",
        "Sandretto ha sido patrona del New Museum de Nueva York, del Tate International Council y de la Serpentine Gallery, y es una voz constante en la defensa de los escultores emergentes y de las prácticas instalativas de gran escala.",
      ],
      highlights: [
        { label: "Obras", value: "1.500+" },
        { label: "Fundación", value: "Desde 1995" },
        { label: "Sedes", value: "Turín · Madrid" },
      ],
      cita: "Coleccionar no es acumular: es asumir la responsabilidad de acompañar a un artista en el tiempo.",
      citaRef: "Patrizia Sandretto Re Rebaudengo",
      fuente: [
        { label: "Fondazione Sandretto Re Rebaudengo", url: "https://fsrr.org/en/" },
      ],
    },
    en: {
      nombre: "Patrizia Sandretto Re Rebaudengo",
      ubicacion: "Turin, Italy",
      foco: "Contemporary sculpture · Installation · Photography",
      foto: patriziaAsset.url,
      eyebrow: "Collector · Patron",
      bio: [
        "Patrizia Sandretto Re Rebaudengo (Turin, 1958) started collecting contemporary art in the early nineties, at a time when Italy was barely looking at the emerging international generation. In 1995 she founded the Fondazione Sandretto Re Rebaudengo, first in Guarene d'Alba and since 2002 in its Turin headquarters, designed by Claudio Silvestrin.",
        "Her collection includes more than 1,500 works and has been pioneering in giving visibility to sculpture, installation and photography by artists such as Maurizio Cattelan, Anish Kapoor, Doug Aitken, Tony Cragg, Adrián Villar Rojas, Sarah Lucas and Damien Hirst. The foundation operates as an exhibition space, residency programme and educational platform.",
        "Sandretto has been a trustee of the New Museum in New York, the Tate International Council and the Serpentine Gallery, and remains an outspoken voice in defence of emerging sculptors and large-scale installation practices.",
      ],
      highlights: [
        { label: "Works", value: "1,500+" },
        { label: "Foundation", value: "Since 1995" },
        { label: "Venues", value: "Turin · Madrid" },
      ],
      cita: "Collecting is not accumulating: it is taking responsibility for walking alongside an artist over time.",
      citaRef: "Patrizia Sandretto Re Rebaudengo",
      fuente: [
        { label: "Fondazione Sandretto Re Rebaudengo", url: "https://fsrr.org/en/" },
      ],
    },
  },
  "dakis-joannou": {
    es: {
      nombre: "Dakis Joannou",
      ubicacion: "Atenas, Grecia",
      foco: "Escultura · Instalación · Contemporáneo",
      foto: joannouAsset.url,
      eyebrow: "Coleccionista · Fundador DESTE",
      bio: [
        "Dakis Joannou (Nicosia, 1939) es uno de los coleccionistas más influyentes del arte contemporáneo desde finales de los ochenta. En 1983 fundó la DESTE Foundation for Contemporary Art, con sede en Atenas, dedicada a la investigación y exhibición de prácticas emergentes.",
        "Su colección reúne más de 1.500 obras y se ha convertido en referencia internacional por su compromiso temprano con artistas como Jeff Koons, Maurizio Cattelan, Urs Fischer, Paweł Althamer, Kara Walker o Tino Sehgal. Joannou descubrió a Koons en 1985 con One Ball Total Equilibrium Tank, una pieza que marcó un cambio de mirada sobre la escultura objetual.",
        "Cada verano, DESTE organiza en el antiguo matadero de la isla de Hidra un proyecto de escultura site-specific que se ha convertido en una cita imprescindible del calendario artístico europeo.",
      ],
      highlights: [
        { label: "Obras", value: "1.500+" },
        { label: "DESTE", value: "Desde 1983" },
        { label: "Project Space", value: "Hidra" },
      ],
      cita: "No colecciono para llenar paredes: colecciono para sostener ideas que aún no se entienden.",
      citaRef: "Dakis Joannou",
      fuente: [
        { label: "DESTE Foundation", url: "https://deste.gr/" },
      ],
    },
    en: {
      nombre: "Dakis Joannou",
      ubicacion: "Athens, Greece",
      foco: "Sculpture · Installation · Contemporary",
      foto: joannouAsset.url,
      eyebrow: "Collector · Founder of DESTE",
      bio: [
        "Dakis Joannou (Nicosia, 1939) has been one of the most influential contemporary art collectors since the late eighties. In 1983 he founded the DESTE Foundation for Contemporary Art, based in Athens, devoted to the research and exhibition of emerging practices.",
        "His collection comprises more than 1,500 works and has become an international reference for its early commitment to artists such as Jeff Koons, Maurizio Cattelan, Urs Fischer, Paweł Althamer, Kara Walker and Tino Sehgal. Joannou discovered Koons in 1985 with One Ball Total Equilibrium Tank, a piece that shifted how object-based sculpture was understood.",
        "Each summer, DESTE stages a site-specific sculpture project in the former slaughterhouse on the island of Hydra, now a fixture of the European art calendar.",
      ],
      highlights: [
        { label: "Works", value: "1,500+" },
        { label: "DESTE", value: "Since 1983" },
        { label: "Project Space", value: "Hydra" },
      ],
      cita: "I don't collect to fill walls: I collect to support ideas that are not yet understood.",
      citaRef: "Dakis Joannou",
      fuente: [
        { label: "DESTE Foundation", url: "https://deste.gr/" },
      ],
    },
  },
  "mei-allan-warburg": {
    es: {
      nombre: "Mei & Allan Warburg",
      ubicacion: "Sonoma, California",
      foco: "Escultura exterior · Site-specific · Gran formato",
      foto: warburgAsset.url,
      eyebrow: "Coleccionistas · Donum Estate",
      bio: [
        "Mei y Allan Warburg son los fundadores de Donum Estate, una finca de 200 acres en el condado de Sonoma que combina viñedo de Pinot Noir y Chardonnay con una de las colecciones de escultura al aire libre más ambiciosas del mundo.",
        "Su programa reúne más de 60 obras monumentales de artistas como Ai Weiwei, Louise Bourgeois, Yayoi Kusama, Olafur Eliasson, Doug Aitken, Tracey Emin, Jeppe Hein, Subodh Gupta o Anselm Kiefer. Cada pieza se instala en diálogo con el paisaje, la luz y el ciclo agrícola del viñedo.",
        "Para los Warburg coleccionar es un acto de hospitalidad: la finca es accesible mediante visita reservada y la colección se entiende como un proyecto vivo en el que escultores, paisaje y vinificación se cruzan.",
      ],
      highlights: [
        { label: "Obras", value: "60+" },
        { label: "Superficie", value: "200 acres" },
        { label: "Sede", value: "Sonoma, CA" },
      ],
      cita: "La escultura al aire libre obliga a coleccionar con humildad: el paisaje siempre es el primer co-autor.",
      citaRef: "Mei & Allan Warburg",
      fuente: [
        { label: "The Donum Estate", url: "https://thedonumestate.com/" },
      ],
    },
    en: {
      nombre: "Mei & Allan Warburg",
      ubicacion: "Sonoma, California",
      foco: "Outdoor sculpture · Site-specific · Large scale",
      foto: warburgAsset.url,
      eyebrow: "Collectors · Donum Estate",
      bio: [
        "Mei and Allan Warburg are the founders of Donum Estate, a 200-acre property in Sonoma County that combines Pinot Noir and Chardonnay vineyards with one of the most ambitious outdoor sculpture collections in the world.",
        "Their programme brings together more than 60 monumental works by artists such as Ai Weiwei, Louise Bourgeois, Yayoi Kusama, Olafur Eliasson, Doug Aitken, Tracey Emin, Jeppe Hein, Subodh Gupta and Anselm Kiefer. Each piece is installed in dialogue with the landscape, the light and the vineyard's agricultural cycle.",
        "For the Warburgs, collecting is an act of hospitality: the estate is open by reservation and the collection is treated as a living project in which sculptors, landscape and winemaking meet.",
      ],
      highlights: [
        { label: "Works", value: "60+" },
        { label: "Land", value: "200 acres" },
        { label: "Home", value: "Sonoma, CA" },
      ],
      cita: "Outdoor sculpture forces you to collect with humility: the landscape is always the first co-author.",
      citaRef: "Mei & Allan Warburg",
      fuente: [
        { label: "The Donum Estate", url: "https://thedonumestate.com/" },
      ],
    },
  },
};

export default function ColeccionistaPublico() {
  const { slug } = useParams();
  const lang = useLang();
  const entry = slug && DATA[slug];

  if (!entry) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <section className="px-6 md:px-12 py-24 max-w-[1280px] mx-auto">
          <h1 className="font-display font-medium text-3xl text-ink mb-4">
            {lang === "es" ? "Coleccionista no encontrado" : "Collector not found"}
          </h1>
          <Link to="/" className="link-arrow">{lang === "es" ? "Volver al inicio →" : "Back to home →"}</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const c = entry[lang];
  const t = lang === "es"
    ? { back: "← Coleccionistas", bio: "Biografía", quote: "En sus palabras", source: "Fuentes" }
    : { back: "← Collectors", bio: "Biography", quote: "In their words", source: "Sources" };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="px-6 md:px-12 pt-12 pb-8 max-w-[1280px] mx-auto">
        <Link to="/" className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line hover:opacity-65 transition-opacity">
          {t.back}
        </Link>
      </section>

      <section className="px-6 md:px-12 pb-16 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-10 md:gap-16 items-start">
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img src={c.foto} alt={c.nombre} loading="eager" className="w-full h-full object-cover object-[center_25%]" />
          </div>
          <div>
            <div className="eyebrow mb-3">{c.eyebrow}</div>
            <h1 className="font-display font-medium text-[clamp(32px,4.4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-4">
              {c.nombre}
            </h1>
            <div className="font-body text-[13px] font-normal text-muted-line uppercase tracking-[0.14em] mb-8">
              {c.ubicacion} · {c.foco}
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-border pt-6 mb-10">
              {c.highlights.map((h) => (
                <div key={h.label}>
                  <div className="font-display font-semibold text-[24px] text-ink leading-none mb-2">{h.value}</div>
                  <div className="font-body text-[11px] uppercase tracking-[0.16em] text-muted-line">{h.label}</div>
                </div>
              ))}
            </div>

            <h2 className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-4">{t.bio}</h2>
            <div className="space-y-4 mb-10">
              {c.bio.map((p, i) => (
                <p key={i} className="font-body text-[16px] font-normal text-gray leading-relaxed">{p}</p>
              ))}
            </div>

            <blockquote className="border-l-2 border-ink pl-5 mb-10">
              <p className="font-display text-[20px] italic text-ink leading-snug mb-2">"{c.cita}"</p>
              <footer className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line">, {c.citaRef}</footer>
            </blockquote>

            <div>
              <h3 className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-3">{t.source}</h3>
              <ul className="space-y-1">
                {c.fuente.map((f) => (
                  <li key={f.url}>
                    <a href={f.url} target="_blank" rel="noreferrer" className="link-arrow text-[13px]">{f.label} →</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
