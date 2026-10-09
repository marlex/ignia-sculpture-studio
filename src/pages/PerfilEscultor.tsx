import { Suspense, lazy, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Maximize2, X } from "lucide-react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import NotFound from "@/pages/NotFound";
import susana from "@/assets/artist-susana-solano-real.jpg";
import adaRetrato from "@/assets/ada-la-cadena-retrato-2.png";
import helenaPortrait from "@/assets/artist-helena-vazquez.jpg";
import luciaPortrait from "@/assets/artist-lucia-pardo-new.jpg";
import pabloPortrait from "@/assets/artist-pablo-reyes-new.jpg";
import tomasPortrait from "@/assets/artist-tomas-vigo.jpg";
import { useLang } from "@/i18n/LanguageContext";
import { getWorksForArtist } from "@/lib/artistMaterials";
import { Seo } from "@/components/Seo";
import { StickyIndex } from "@/components/ignia/sculptor-profile/StickyIndex";
import { ScaleDrawing } from "@/components/ignia/sculptor-profile/ScaleDrawing";

const GlbViewer = lazy(() => import("@/components/ignia/GlbViewer").then((m) => ({ default: m.GlbViewer })));

type Bio = {
  nombre: string;
  retrato?: string; // dedicated portrait photo; when absent, falls back to the artist's own work photo
  bioEs: string;
  bioEn: string;
  espEs: string;
  espEn: string;
};

export const BIOS: Record<string, Bio> = {
  "susana-solano": {
    nombre: "Susana Solano", retrato: susana,
    bioEs: "Barcelona, España. Metal, estructura y espacio. Aborda el metal como construcción física y mental.\n\nTrabaja el metal en frío, doblando y soldando chapa hasta encontrar el equilibrio exacto entre peso y vacío. Cada pieza nace de bocetos a mano que se transforman por completo durante el proceso de taller.",
    bioEn: "Barcelona, Spain. Metal, structure and space. Approaches metal as both physical and mental construction.\n\nShe works metal cold, bending and welding sheet until she finds the exact balance between weight and void. Each piece begins as a hand sketch that is completely transformed during the studio process.",
    espEs: "Metal, estructura y espacio", espEn: "Metal, structure and space",
  },
  "helena-vazquez": {
    nombre: "Helena Vázquez", retrato: helenaPortrait,
    bioEs: "Toledo, España. Bronce figurativo. Tres décadas trabajando la figura humana desde el oficio lento del taller.\n\nModela primero en barro antes de fundir en bronce, dejando visible la huella de los dedos en cada superficie. Su taller conserva el ritmo pausado de un oficio que no ha cambiado en siglos.",
    bioEn: "Toledo, Spain. Figurative bronze. Three decades working the human figure through the slow craft of the studio.\n\nShe models first in clay before casting in bronze, leaving the trace of her fingers visible on every surface. Her studio keeps the unhurried rhythm of a craft that has not changed in centuries.",
    espEs: "Bronce figurativo", espEn: "Figurative bronze",
  },
  "carmen-aldea": {
    nombre: "Carmen Aldea",
    bioEs: "Almería, España. Talla en mármol de Macael. Combina referencias clásicas y formas tríadicas que estructuran el espacio con un único bloque.\n\nSelecciona cada bloque de mármol directamente en cantera antes de tallarlo a mano, dejando que la veta natural de la piedra guíe la composición final de la pieza.",
    bioEn: "Almería, Spain. Macael marble carving. Combines classical references and triadic forms that structure space from a single block.\n\nShe selects every block of marble directly at the quarry before carving it by hand, letting the stone's natural vein guide the final composition of the piece.",
    espEs: "Mármol tallado", espEn: "Carved marble",
  },
  "marcos-iriarte": {
    nombre: "Marcos Iriarte",
    bioEs: "Bilbao, España. Bronce y cerámica esmaltada. Su obra explora la confluencia de volúmenes orgánicos con superficies cálidas.\n\nAlterna entre el bronce fundido y la cerámica esmaltada según lo que cada forma exige, buscando siempre el punto donde el volumen orgánico y la superficie cálida se encuentran.",
    bioEn: "Bilbao, Spain. Bronze and glazed ceramic. His work explores the confluence of organic volumes with warm surfaces.\n\nHe moves between cast bronze and glazed ceramic depending on what each form demands, always searching for the point where organic volume and warm surface meet.",
    espEs: "Bronce y cerámica", espEn: "Bronze and ceramic",
  },
  "alba-costa": {
    nombre: "Alba Costa",
    bioEs: "Valencia, España. Mármol y pliegue. Trabaja la piedra como tejido: pliegues, dobleces y tensiones que humanizan el bloque mineral.\n\nPasa semanas desbastando un solo bloque antes de que aparezca el primer pliegue. Trabaja sin ayudantes, convencida de que la piedra solo cede su forma a quien la talla con sus propias manos.",
    bioEn: "Valencia, Spain. Marble and fold. Treats stone like fabric: folds, creases and tensions that humanise the mineral block.\n\nShe spends weeks roughing out a single block before the first fold appears. She works without assistants, convinced that stone only yields its shape to those who carve it with their own hands.",
    espEs: "Mármol y pliegue", espEn: "Marble and fold",
  },
  "diego-lara": {
    nombre: "Diego Lara",
    bioEs: "Sevilla, España. Acero corten y vidrio rojo. Investiga la oxidación natural y la luz contenida como materiales escultóricos.\n\nDeja que el acero corten se oxide a la intemperie durante meses antes de intervenirlo, y funde el vidrio rojo en pequeñas series en un horno propio junto al taller.",
    bioEn: "Seville, Spain. Corten steel and red glass. Investigates natural oxidation and contained light as sculptural materials.\n\nHe lets the corten steel rust outdoors for months before working it, and casts the red glass in small batches in his own furnace next to the studio.",
    espEs: "Acero corten y vidrio", espEn: "Corten steel and glass",
  },
  "sofia-mendez": {
    nombre: "Sofía Méndez",
    bioEs: "Galicia, España. Piedra tallada y madera. Su obra parte de la raíz y el fragmento orgánico para construir piezas de presencia silenciosa.\n\nRecoge raíces y fragmentos de piedra en los bosques de Galicia antes de llevarlos al taller, respetando la forma original del material en cada pieza terminada.",
    bioEn: "Galicia, Spain. Carved stone and wood. Her work starts from root and organic fragment to build pieces of quiet presence.\n\nShe gathers roots and stone fragments from the forests of Galicia before bringing them to the studio, respecting the material's original form in every finished piece.",
    espEs: "Piedra y madera", espEn: "Stone and wood",
  },
  "ada-la-cadena": {
    nombre: "Ada La Cadena", retrato: adaRetrato,
    bioEs: "El Arte de lo Intangible\n\nAda La Cadena (España) es una artista multidisciplinaria cuya práctica se mueve entre la pintura y la escultura cerámica con una misma obsesión: hacer visible lo que no tiene forma. Sus obras nacen de un proceso subconsciente e intuitivo, sin bocetos previos, sin certezas, en el que la materia revela lo que la mente consciente no se atreve a nombrar.\n\nEn su cerámica, esa misma búsqueda se encarna en la arcilla. Cuerpos que son objetos, objetos que son rostros, superficies que son piel. La ornamentación no es decoración, es lenguaje. Los motivos florales que recorren sus piezas no embellecen: narran, ocultan, revelan.\n\nSu trabajo ha sido exhibido en galerías de prestigio y forma parte de colecciones privadas en varios países. Cada pieza es única e irrepetible, como lo es la emoción que la origina.",
    bioEn: "The Art of the Intangible\n\nAda La Cadena (Spain) is a multidisciplinary artist whose practice moves between painting and ceramic sculpture with a single obsession: to make visible what has no form. Her works are born from a subconscious, intuitive process, without prior sketches, without certainties, in which matter reveals what the conscious mind does not dare to name.\n\nIn her ceramics, that same search is embodied in clay. Bodies that are objects, objects that are faces, surfaces that are skin. Ornamentation is not decoration, it is language. The floral motifs that run across her pieces do not embellish: they narrate, conceal, reveal.\n\nHer work has been exhibited in prestigious galleries and is part of private collections in several countries. Each piece is unique and unrepeatable, as is the emotion that gives rise to it.",
    espEs: "Cerámica contemporánea", espEn: "Contemporary ceramic",
  },
  "lucia-pardo": {
    nombre: "Lucía Pardo", retrato: luciaPortrait,
    bioEs: "Oporto, Portugal. Cerámica esmaltada en series cortas. Su obra explora el origen del volumen a partir del torno y del esmalte mate.\n\nTrabaja en el torno en series cortas de no más de cinco piezas, aplicando el esmalte mate en varias capas finas hasta conseguir una superficie que retiene la luz sin reflejarla.",
    bioEn: "Porto, Portugal. Glazed ceramic in short series. Her work explores the origin of volume through the wheel and matt glaze.\n\nShe works at the wheel in short series of no more than five pieces, applying the matt glaze in several thin layers until the surface holds the light without reflecting it.",
    espEs: "Cerámica esmaltada", espEn: "Glazed ceramic",
  },
  "pablo-reyes": {
    nombre: "Pablo Reyes", retrato: pabloPortrait,
    bioEs: "Madrid, España. Bronce figurativo estilizado. Trabaja la figura alargada como eco humano: piezas verticales y silenciosas.\n\nEstira la figura humana hasta el límite de la proporción clásica, buscando una verticalidad silenciosa que recuerde más a una pausa que a un gesto.",
    bioEn: "Madrid, Spain. Stylised figurative bronze. Works the elongated figure as a human echo: vertical, quiet pieces.\n\nHe stretches the human figure to the edge of classical proportion, searching for a quiet verticality that recalls a pause more than a gesture.",
    espEs: "Bronce estilizado", espEn: "Stylised bronze",
  },
  "ines-ferrer": {
    nombre: "Inés Ferrer",
    bioEs: "Zaragoza, España. Alabastro tallado. Busca la quietud y la luz traslúcida en piezas pulidas a mano durante meses.\n\nPule cada pieza a mano durante semanas hasta que el alabastro deja pasar la luz sin perder su opacidad, un equilibrio que solo se consigue con paciencia y mucha arena fina.",
    bioEn: "Zaragoza, Spain. Carved alabaster. Pursues stillness and translucent light in pieces hand-polished over months.\n\nShe hand-polishes every piece for weeks until the alabaster lets light through without losing its opacity, a balance achieved only through patience and very fine sand.",
    espEs: "Alabastro y luz", espEn: "Alabaster and light",
  },
  "tomas-vigo": {
    nombre: "Tomás Vigo", retrato: tomasPortrait,
    bioEs: "Vigo, España. Vidrio soplado en horno propio. Su serie Efusión atrapa el vidrio incandescente en estructuras de hierro oxidado.\n\nSopla el vidrio en caliente directamente sobre estructuras de hierro ya oxidadas, dejando que el azar del enfriamiento decida la forma final de cada pieza.",
    bioEn: "Vigo, Spain. Glass blown in his own furnace. His Effusion series traps incandescent glass within oxidised iron structures.\n\nHe blows hot glass directly onto already-rusted iron structures, letting the chance of cooling decide the final shape of each piece.",
    espEs: "Vidrio soplado", espEn: "Blown glass",
  },
  "ana-ruiz": {
    nombre: "Ana Ruiz",
    bioEs: "Bilbao, España. Acero pulido en formas anulares. Investiga la circulación del aire y la mirada a través del círculo abierto.\n\nPule el acero a mano hasta conseguir un espejo imperfecto que distorsiona ligeramente el entorno, invitando a rodear la pieza para completar su forma circular.",
    bioEn: "Bilbao, Spain. Polished steel in annular forms. Investigates the flow of air and gaze through the open circle.\n\nShe hand-polishes the steel into an imperfect mirror that slightly distorts its surroundings, inviting the viewer to walk around the piece to complete its circular form.",
    espEs: "Acero pulido", espEn: "Polished steel",
  },
  "camila-soler": {
    nombre: "Camila Soler",
    bioEs: "Buenos Aires, Argentina. Bronce y latón en órbitas suspendidas. Combina astronomía y oficio metalúrgico en piezas de mediana escala.\n\nCombina el bronce y el latón en estructuras suspendidas que recuerdan órbitas planetarias, soldando cada pieza a mano en su taller de Buenos Aires.",
    bioEn: "Buenos Aires, Argentina. Bronze and brass in suspended orbits. Combines astronomy and metalwork in mid-scale pieces.\n\nShe combines bronze and brass in suspended structures that recall planetary orbits, hand-welding every piece in her Buenos Aires studio.",
    espEs: "Bronce y latón", espEn: "Bronze and brass",
  },
  "mateo-rivas": {
    nombre: "Mateo Rivas",
    bioEs: "Quito, Ecuador. Piedra verde tallada en formas mínimas. Su obra reduce el volumen a un mineral esencial, casi arquitectónico.\n\nTalla la piedra verde reduciendo la forma hasta su expresión más mínima, dejando que la superficie pulida revele las vetas naturales del mineral.",
    bioEn: "Quito, Ecuador. Green stone carved into minimal forms. His work reduces volume to an essential, almost architectural mineral.\n\nHe carves the green stone, reducing the form to its most minimal expression, letting the polished surface reveal the mineral's natural veins.",
    espEs: "Piedra mineral", espEn: "Mineral stone",
  },
};

// Artists whose first work photo is a portrait-oriented shot that would
// lose the piece itself in a full-bleed horizontal opener — these get
// the half-page variant instead. See the build report for how this was
// determined (same check used for the social-share image crops).
const HALF_PAGE_SLUGS = new Set(["marcos-iriarte", "alba-costa", "diego-lara", "ines-ferrer", "tomas-vigo"]);

// A location prefix like "Toledo, España." sits at the start of each bio.
const extractLocation = (bioText: string) => {
  const firstDot = bioText.indexOf(". ");
  return firstDot > 0 && firstDot < 60 ? bioText.slice(0, firstDot) : "";
};

// The declaration always comes from the artist's first paragraph, never an
// invented quote. Ada's bio opens with a real title (no ". " inside it), so
// that title is used as-is; everyone else's first paragraph is "City,
// Country. Technique. Statement." — the statement is what's left after
// dropping the first two clauses.
const getStatement = (bioText: string) => {
  const first = bioText.split(/\n\n+/)[0] ?? bioText;
  if (!first.includes(". ")) return first.trim();
  const sentences = first.split(". ").map((s) => s.trim()).filter(Boolean);
  return sentences.slice(2).join(". ") || sentences[sentences.length - 1] || first;
};

export default function PerfilEscultor() {
  const lang = useLang();
  const { slug = "helena-vazquez" } = useParams();
  const bio = BIOS[slug];
  const [roundMode, setRoundMode] = useState<"3d" | "photos">("3d");
  const [enquireStatus, setEnquireStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");
  const [enquireEmail, setEnquireEmail] = useState("");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const obras = bio ? getWorksForArtist(slug, bio.nombre) : [];

  if (!bio) return <NotFound />;

  const bioText = lang === "es" ? bio.bioEs : bio.bioEn;
  const location = extractLocation(bioText);
  const technique = lang === "es" ? bio.espEs : bio.espEn;
  const statement = getStatement(bioText);
  const bioSegments = bioText.split(/\n\n+/).filter(Boolean);
  const hasTitleParagraph = bioSegments.length > 1 && !bioSegments[0].includes(". ");
  const bioBody = hasTitleParagraph ? bioSegments.slice(1) : bioSegments;
  const bioParagraphs = bioBody.slice(0, 2);
  const firstName = bio.nombre.split(" ")[0];

  const openerWork = obras[0];
  const roundWork = obras.find((w) => w.glbUrl) ?? obras[0];
  const roundPhotos = roundWork ? [roundWork.image, ...(roundWork.extraImages ?? [])].slice(0, 3) : [];
  const useHalfPage = HALF_PAGE_SLUGS.has(slug) || !openerWork;

  const t = lang === "es"
    ? {
        works: "Obras", round: "En volumen", about: "Sobre", enquire: "Consultar",
        livesIn: "Vive y trabaja en", born: "Nació en", materials: "Materiales",
        enquireCta: (n: string) => `Consultar por la obra de ${n}`,
        enquireSub: "Escríbenos para conocer disponibilidad, precio y el proceso completo de la pieza.",
        enquireSending: "Enviando…", enquireSent: "Mensaje enviado. Te responderemos pronto.", enquireError: "Hubo un error. Inténtalo de nuevo.",
        enquireEmailPlaceholder: "Tu email", enquireEmailError: "Escribe un email válido para que podamos responderte.",
        closingQuestion: "¿Eres escultor?", closingCta: "Muestra tu obra en Ignia",
        price: "Precio", noWorks: "Sin obras publicadas todavía.",
        photos: "Fotografías", model3d: "Visor 3D", viewWork: "Ver obra",
      }
    : {
        works: "Works", round: "In the round", about: "About", enquire: "Enquire",
        livesIn: "Lives and works in", born: "Born", materials: "Materials",
        enquireCta: (n: string) => `Enquire about ${n}'s work`,
        enquireSub: "Write to us for availability, price and the full process behind the piece.",
        enquireSending: "Sending…", enquireSent: "Message sent. We'll get back to you soon.", enquireError: "Something went wrong. Please try again.",
        enquireEmailPlaceholder: "Your email", enquireEmailError: "Enter a valid email so we can reply to you.",
        closingQuestion: "Are you a sculptor?", closingCta: "Show your work at Ignia",
        price: "Price", noWorks: "No works published yet.",
        photos: "Photos", model3d: "3D viewer", viewWork: "View work",
      };

  const seoTitle = `${bio.nombre}, Sculptor · Ignia Institution`;
  const seoDescription = clean(bioText).slice(0, 155);
  const heroImage = bio.retrato ?? openerWork?.image;

  const handleEnquire = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquireEmail.trim())) {
      setEnquireStatus("invalid");
      return;
    }
    setEnquireStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xwlvbepd", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email: enquireEmail.trim(),
          subject: t.enquireCta(firstName),
          message: `New enquiry about ${bio.nombre}'s work on Ignia Institution.\n\nFrom: ${enquireEmail.trim()}\nProfile: ${window.location.origin}/perfil/escultor/${slug}`,
          _cc: "hello@marianabolivargarcia.com",
          _replyto: enquireEmail.trim(),
        }),
      });
      if (!res.ok) throw new Error("Formspree error");
      setEnquireStatus("sent");
    } catch {
      setEnquireStatus("error");
    }
  };

  return (
    <main className="bg-white">
      <Seo title={seoTitle} description={seoDescription} path={`/perfil/escultor/${slug}`} image={heroImage} />
      <Header theme={useHalfPage ? "light" : "dark"} />

      {/* 1. Opener */}
      {openerWork && !useHalfPage ? (
        <section className="relative w-full h-screen overflow-hidden" style={{ background: "#0a0a0a" }}>
          <img
            src={openerWork.image}
            alt={bio.nombre}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.2) 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-16 md:pb-20">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(56px, 9vw, 140px)",
                color: "#FFFFFF",
                lineHeight: 0.95,
                letterSpacing: "0.005em",
                margin: 0,
              }}
            >
              {bio.nombre}
            </h1>
            <p className="font-body" style={{ color: "rgba(255,255,255,0.88)", fontWeight: 400, fontSize: "clamp(15px,1.7vw,19px)", marginTop: 18 }}>
              {technique}{location && <> · {location}</>}
            </p>
          </div>
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none"
            style={{ writingMode: "vertical-rl" }}
          >
            <span className="font-body text-[12px] font-normal uppercase tracking-[0.14em]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {openerWork.es.title === openerWork.en.title ? openerWork.es.title : (lang === "es" ? openerWork.es.title : openerWork.en.title)}
              {openerWork.es.year ? ` · ${openerWork.es.year}` : ""}
            </span>
          </div>
        </section>
      ) : (
        <section className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "88vh" }}>
            <div className="flex flex-col justify-center px-6 md:px-16 py-24 order-2 md:order-1" style={{ background: "#f7f7f5" }}>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "clamp(44px, 6vw, 88px)",
                  color: "#121212",
                  lineHeight: 1,
                  letterSpacing: "0.005em",
                  margin: 0,
                }}
              >
                {bio.nombre}
              </h1>
              <p className="font-body text-gray" style={{ fontWeight: 400, fontSize: "clamp(15px,1.7vw,19px)", marginTop: 18 }}>
                {technique}{location && <> · {location}</>}
              </p>
            </div>
            <div className="relative bg-secondary order-1 md:order-2" style={{ minHeight: 360 }}>
              {openerWork && (
                <img
                  src={openerWork.image}
                  alt={bio.nombre}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1200}
                  height={1500}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* 2. Sticky index */}
      <StickyIndex
        items={[
          { id: "works", label: t.works },
          { id: "round", label: t.round },
          { id: "about", label: t.about },
          { id: "enquire", label: t.enquire },
        ]}
      />

      {/* 3. Statement */}
      <section className="px-6 md:px-12 py-28 md:py-36">
        <p
          className="max-w-[820px] mx-auto text-center"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 4.2vw, 52px)",
            lineHeight: 1.2,
            letterSpacing: "0.005em",
            color: "#121212",
          }}
        >
          {statement}
        </p>
      </section>

      {/* 4. In the round */}
      {roundWork && (
        <section id="round" className="px-6 md:px-12 py-20 md:py-28 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-10">{t.round}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div className="bg-white h-[488px] md:h-[520px]">
                {roundWork.glbUrl ? (
                  <Suspense fallback={<div className="w-full h-full bg-secondary" />}>
                    <GlbViewer url={roundWork.glbUrl} alt={roundWork.es.title} bgColor="#ffffff" minHeight="100%" cameraOrbit="0deg 75deg 60%" />
                  </Suspense>
                ) : roundPhotos.length > 1 ? (
                  <div className="grid h-full gap-2" style={{ gridTemplateColumns: `repeat(${roundPhotos.length}, 1fr)` }}>
                    {roundPhotos.map((src, i) => (
                      <div key={i} className="relative h-full overflow-hidden bg-secondary">
                        <img src={src} alt={`${roundWork.es.title} ${i + 1}`} loading="lazy" width={400} height={533} className="w-full h-full object-cover" />
                        <ExpandButton onClick={() => setLightbox({ src, alt: `${roundWork.es.title} ${i + 1}` })} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative h-full overflow-hidden bg-secondary">
                    <img src={roundPhotos[0]} alt={roundWork.es.title} loading="lazy" width={400} height={533} className="w-full h-full object-cover" />
                    <ExpandButton onClick={() => setLightbox({ src: roundPhotos[0], alt: roundWork.es.title })} />
                  </div>
                )}
              </div>
              <div className="pt-2">
                <h3 className="font-display font-semibold text-[28px] max-md:text-[25px] text-ink mb-1">
                  {lang === "es" ? roundWork.es.title : roundWork.en.title}
                </h3>
                <div className="font-body text-[12px] font-normal text-muted-line uppercase tracking-[0.14em] mb-2">
                  {(lang === "es" ? roundWork.es.year : roundWork.en.year)} · {(lang === "es" ? roundWork.es.material : roundWork.en.material)}
                </div>
                {(lang === "es" ? roundWork.es.price : roundWork.en.price) && (
                  <div className="font-body text-[16px] font-normal text-ink mb-6">
                    {lang === "es" ? roundWork.es.price : roundWork.en.price}
                  </div>
                )}
                <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-8 max-w-[480px]">
                  {excerpt(lang === "es" ? roundWork.es.description : roundWork.en.description, 220)}
                </p>

                {roundWork.scale ? (
                  <div className="mb-8">
                    <ScaleDrawing
                      heightCm={roundWork.scale.heightCm}
                      widthCm={roundWork.scale.widthCm}
                      depthCm={roundWork.scale.depthCm}
                      weightKg={roundWork.scale.weightKg}
                      lang={lang}
                    />
                  </div>
                ) : (
                  <p className="font-body text-[13px] text-muted-line mb-8">
                    {lang === "es" ? "Dimensiones no registradas todavía." : "Dimensions not recorded yet."}
                  </p>
                )}

                <Link to={`/obra/${roundWork.slug}`} className="link-arrow font-body text-[13px]">
                  {t.viewWork}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Works */}
      <section id="works" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-12">{t.works}</h2>

          {obras.length === 0 && <p className="font-body text-[14px] text-muted-line">{t.noWorks}</p>}

          {obras.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {obras.map((w, i) => {
                const isWide = obras.length % 2 === 1 && i === obras.length - 1;
                return (
                  <div key={w.slug} className={isWide ? "md:col-span-2" : ""}>
                    <WorkEntry work={w} lang={lang} t={t} wide={isWide} onExpand={(src, alt) => setLightbox({ src, alt })} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. About */}
      <section id="about" className="px-6 md:px-12 py-20 md:py-28 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-12">{t.about}</h2>
          <div className={bio.retrato ? "grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16" : "max-w-[720px] mx-auto text-center"}>
            {bio.retrato && (
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <img src={bio.retrato} alt={bio.nombre} loading="lazy" width={800} height={1000} className="w-full h-full object-cover" />
                <ExpandButton onClick={() => setLightbox({ src: bio.retrato!, alt: bio.nombre })} />
              </div>
            )}
            <div>
              <div className="font-body text-[16px] font-normal text-gray leading-relaxed space-y-4 mb-10">
                {bioParagraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <dl className="space-y-3 font-body text-[14px] font-normal">
                {location && (
                  <div className="flex gap-3">
                    <dt className="text-muted-line uppercase tracking-[0.14em] text-[12px] w-32 shrink-0 pt-0.5">{t.livesIn}</dt>
                    <dd className="text-ink">{location}</dd>
                  </div>
                )}
                {technique && (
                  <div className="flex gap-3">
                    <dt className="text-muted-line uppercase tracking-[0.14em] text-[12px] w-32 shrink-0 pt-0.5">{t.materials}</dt>
                    <dd className="text-ink">{technique}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Enquire */}
      <section id="enquire" className="grid grid-cols-1 md:grid-cols-2">
        {openerWork && (
          <div className="order-1 md:order-1" style={{ minHeight: 420 }}>
            <img
              src={openerWork.image}
              alt={lang === "es" ? openerWork.es.title : openerWork.en.title}
              loading="lazy"
              width={1200}
              height={1500}
              className="w-full h-full object-cover"
              style={{ minHeight: 420 }}
            />
          </div>
        )}
        <div
          className={`order-2 md:order-2 flex flex-col justify-center px-6 md:px-16 py-24 md:py-0 ${openerWork ? "" : "col-span-2"}`}
          style={{ background: "#121212" }}
        >
          <div className={openerWork ? "" : "max-w-[560px] mx-auto text-center"}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(32px, 3.6vw, 52px)",
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "0.005em",
                margin: 0,
              }}
            >
              {t.enquireCta(firstName)}
            </h2>
            <p className="font-body text-[15px] font-normal mt-5 mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t.enquireSub}
            </p>
            {enquireStatus === "sent" ? (
              <p className="font-body text-[14px]" style={{ color: "rgba(255,255,255,0.9)" }}>{t.enquireSent}</p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-fit">
                <input
                  type="email"
                  value={enquireEmail}
                  onChange={(e) => setEnquireEmail(e.target.value)}
                  placeholder={t.enquireEmailPlaceholder}
                  className="font-body text-[14px] font-normal px-5 py-4 bg-transparent border border-white/30 text-white placeholder:text-white/50 outline-none focus:border-white w-full sm:min-w-[220px] sm:w-auto"
                />
                <button
                  type="button"
                  onClick={handleEnquire}
                  disabled={enquireStatus === "sending"}
                  className="inline-flex items-center justify-center font-body text-[13px] font-medium uppercase tracking-[0.18em] text-ink bg-white px-10 py-5 hover:opacity-85 transition-opacity w-full sm:w-fit disabled:opacity-60"
                >
                  {enquireStatus === "sending" ? t.enquireSending : t.enquire}
                </button>
              </div>
            )}
            {enquireStatus === "invalid" && (
              <p className="font-body text-[13px] mt-3" style={{ color: "#ff8080" }}>{t.enquireEmailError}</p>
            )}
            {enquireStatus === "error" && (
              <p className="font-body text-[13px] mt-3" style={{ color: "#ff8080" }}>{t.enquireError}</p>
            )}
          </div>
        </div>
      </section>

      {/* 8. Closing */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center bg-surface border-t border-border">
        <Link to="/join/sculptors" className="group inline-flex flex-col items-center gap-2">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(18px, 2vw, 24px)",
              color: "#121212",
              letterSpacing: "0.005em",
            }}
          >
            {t.closingQuestion}
          </span>
          <span className="inline-flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                fontSize: "clamp(40px, 6vw, 72px)",
                color: "#121212",
                lineHeight: 1.05,
                letterSpacing: "0.005em",
              }}
            >
              {t.closingCta}
            </span>
            <span className="font-body text-[28px] text-ink transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </section>

      <Footer />

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity"
          >
            <X className="w-7 h-7" />
          </button>
          <img src={lightbox.src} alt={lightbox.alt} className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </main>
  );
}

const clean = (s: string) => (s || "").replace(/\s+/g, " ").trim();

const excerpt = (s: string, max: number) => {
  const c = clean(s);
  if (c.length <= max) return c;
  const cut = c.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
};

type WorkEntryProps = {
  work: ReturnType<typeof getWorksForArtist>[number];
  lang: "es" | "en";
  t: { price: string };
  wide?: boolean;
  onExpand: (src: string, alt: string) => void;
};

const WorkEntry = ({ work, lang, t, wide, onExpand }: WorkEntryProps) => {
  const c = work[lang];
  return (
    <article>
      <Link to={`/obra/${work.slug}`} className={`relative block overflow-hidden bg-secondary mb-5 ${wide ? "aspect-[4/5] md:aspect-[21/9]" : "aspect-[4/5]"}`}>
        <img src={work.image} alt={c.title} loading="lazy" width={1200} height={1500} className="w-full h-full object-cover" />
        <ExpandButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onExpand(work.image, c.title);
          }}
        />
      </Link>
      <div>
        <h3 className="font-display font-semibold text-[28px] max-md:text-[25px] text-ink mb-1">
          <Link to={`/obra/${work.slug}`} className="hover:underline underline-offset-4">{c.title}</Link>
        </h3>
        <div className="font-body text-[12px] font-normal text-muted-line uppercase tracking-[0.14em] mb-1">
          {c.year} · {c.material}
        </div>
        {c.dimensions && (
          <div className="font-body text-[12px] font-normal text-muted-line uppercase tracking-[0.14em] mb-1">{c.dimensions}</div>
        )}
        {c.price && <div className="font-body text-[16px] font-normal text-ink mt-2">{c.price}</div>}
      </div>
    </article>
  );
};

const ExpandButton = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="Expand image"
    className="absolute top-3 right-3 z-20 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity"
  >
    <Maximize2 className="w-4 h-4" />
  </button>
);
