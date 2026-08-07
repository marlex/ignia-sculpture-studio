import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import studio from "@/assets/hero-bg-studio.jpg";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";

const T = {
  es: {
    eyebrow: "La historia",
    h: <>Encender lo que nadie<br />podía ver todavía.</>,
    cite: "“Behind every great piece of art is an unseen mountain of sacrifice, discipline, and commitment.”",
    
    nameH: <>Ignia viene del latín <em>ignis</em>, fuego.</>,
    nameP: <>En la retórica latina, <em>ignis</em> era también lo que aviva o enciende una pasión. Ignia Gallery nace exactamente de eso: encender algo que ya existía pero que nadie podía ver todavía. Un talento escultórico enorme, disperso por el mundo, sin el escaparate que merece.</>,
    pillEy: "Lo que defendemos",
    pillH: "Una plataforma dedicada exclusivamente a la escultura.",
    pilares: [
      { titulo: "Ver la pieza, no su fotografía.", cuerpo: "La escultura es tridimensional por definición. En Ignia se gira, se acerca y se entiende antes de comprar." },
      { titulo: "Autenticidad que viaja con la obra.", cuerpo: "Cada pieza lleva un certificado de autenticidad en blockchain verificable, que la acompaña aunque cambie de manos." },
      { titulo: "Justo con quien crea.", cuerpo: "Hasta el 88% de cada venta vuelve al artista. Y los datos de su audiencia, también." },
      { titulo: "El arte se ama más cuando se entiende.", cuerpo: "Ignia Aprende es nuestro portal educativo abierto: historia, técnicas, materiales y entrevistas. Gratuito para instituciones educativas." },
    ],
    forSculptor: "Para el escultor",
    sculptorList: [
      "— Su propio espacio, con niveles de visibilidad según su trayectoria.",
      "— Datos reales sobre quién se interesa por su obra y desde dónde.",
      "— Herramientas para contar su historia y construir comunidad.",
      "— Digitalización 3D gratuita, desde su propio taller.",
      "— Hasta el 88% de cada venta.",
    ],
    forCollector: "Para el coleccionista",
    collectorList: [
      "— Ver cada escultura en 3D antes de comprarla.",
      "— Ficha técnica completa: materiales, técnica, origen y significado.",
      "— Certificado de autenticidad en blockchain que viaja con la obra.",
      "— Envío con partners especializados en arte, asegurado puerta a puerta.",
      "— Trazabilidad garantizada también en una eventual reventa.",
    ],
    visitEy: "Visítanos",
    visitH: "Calle del Bronce 14, Madrid",
    visitP: "Martes a sábado, 11:00 – 20:00. Cita previa para visitas guiadas y consultas de adquisición.",
    contactEy: "Contacto",
  },
  en: {
    eyebrow: "The story",
    h: <>Igniting what no one<br />could yet see.</>,
    cite: "“Behind every great piece of art is an unseen mountain of sacrifice, discipline, and commitment.”",
    
    nameH: <>Ignia comes from the Latin <em>ignis</em>, fire.</>,
    nameP: <>In Latin rhetoric, <em>ignis</em> was also that which kindles a passion. Ignia Gallery was born exactly from that: igniting something that already existed but no one could yet see. An enormous sculptural talent, scattered around the world, without the showcase it deserves.</>,
    pillEy: "What we stand for",
    pillH: "A platform devoted exclusively to sculpture.",
    pilares: [
      { titulo: "See the piece, not its photograph.", cuerpo: "Sculpture is three-dimensional by definition. On Ignia you rotate, zoom in, and understand it before buying." },
      { titulo: "Authenticity that travels with the work.", cuerpo: "Every piece carries a verifiable blockchain certificate of authenticity that follows it even when it changes hands." },
      { titulo: "Fair to those who create.", cuerpo: "Up to 88% of every sale goes back to the artist. And so does their audience data." },
      { titulo: "Art is loved more when understood.", cuerpo: "Ignia Learn is our open educational portal: history, techniques, materials and interviews. Free for educational institutions." },
    ],
    forSculptor: "For the sculptor",
    sculptorList: [
      "— Their own space, with visibility levels based on career stage.",
      "— Real data on who is interested in their work and from where.",
      "— Tools to tell their story and build community.",
      "— Free 3D digitisation, from their own studio.",
      "— Up to 88% of each sale.",
    ],
    forCollector: "For the collector",
    collectorList: [
      "— View every sculpture in 3D before buying.",
      "— Full data sheet: materials, technique, origin and meaning.",
      "— Blockchain authenticity certificate that travels with the work.",
      "— Shipping with art-specialised partners, insured door to door.",
      "— Guaranteed traceability for any future resale.",
    ],
    visitEy: "Visit us",
    visitH: "Calle del Bronce 14, Madrid",
    visitP: "Tuesday to Saturday, 11:00 – 20:00. By appointment for guided visits and acquisition consultations.",
    contactEy: "Contact",
  },
};

const IgniaGalleryPage = () => {
  const lang = useLang();
  const t = T[lang];
  return (
    <main className="pt-14">
      <Seo title={"About Ignia Gallery — The Home of Sculpture"} description={"The story behind Ignia Gallery: a platform built exclusively for sculpture, with 3D viewing, blockchain authenticity and fair commissions for artists."} path="/ignia-gallery" />
      <Header />

      <section className="relative h-[58vh] min-h-[400px] overflow-hidden">
        <img src={studio} alt="Ignia Gallery studio" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-12 max-w-[1280px] mx-auto">
          <div className="eyebrow text-white/80 mb-3">{t.eyebrow}</div>
          <h1 className="font-display font-semibold text-white text-[clamp(40px,6vw,76px)] tracking-[-0.02em] leading-[1.02] max-w-[900px]">{t.h}</h1>
          <p className="font-body text-[16px] md:text-[18px] font-normal text-white/85 max-w-[640px] mt-5 italic">{t.cite}</p>
        </div>
      </section>

      <section className="bg-white px-6 md:px-12 py-20">
        <div className="max-w-[860px] mx-auto">
          <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] text-ink leading-[1.1] mb-6">{t.nameH}</h2>
          <p className="font-body text-[17px] font-normal text-gray leading-relaxed mb-5">{t.nameP}</p>
        </div>
      </section>


      <section className="px-6 md:px-12 py-20" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-[1080px] mx-auto">
          <div className="eyebrow mb-4">{t.pillEy}</div>
          <h2 className="font-display font-semibold text-[clamp(26px,3vw,40px)] tracking-[-0.02em] text-ink leading-[1.1] mb-10">{t.pillH}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {t.pilares.map(p => (
              <div key={p.titulo} className="border-t border-border pt-5">
                <h3 className="font-display font-semibold text-[20px] text-ink mb-2">{p.titulo}</h3>
                <p className="font-body text-[16px] font-normal text-gray leading-relaxed">{p.cuerpo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 md:px-12 py-20">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow mb-3">{t.forSculptor}</div>
            <ul className="space-y-3 font-body text-[16px] font-normal text-gray leading-relaxed">
              {t.sculptorList.map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
          <div>
            <div className="eyebrow mb-3">{t.forCollector}</div>
            <ul className="space-y-3 font-body text-[16px] font-normal text-gray leading-relaxed">
              {t.collectorList.map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 md:px-12 py-20">
        <div className="max-w-[1080px] mx-auto">
          <div className="eyebrow mb-3">{t.contactEy}</div>
          <ul className="font-body text-[16px] font-normal text-gray leading-relaxed space-y-1">
            <li>
              Instagram:{" "}
              <a href="https://www.instagram.com/igniagallery/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-65 transition-opacity">
                @igniagallery
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/company/ignia-gallery/about/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-65 transition-opacity">
                Ignia Gallery
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IgniaGalleryPage;
