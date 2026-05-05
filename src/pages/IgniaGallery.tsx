import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import studio from "@/assets/hero-bg-studio.jpg";

const IgniaGalleryPage = () => (
  <main className="pt-14">
    <Header />

    <section className="relative h-[58vh] min-h-[400px] overflow-hidden">
      <img src={studio} alt="Taller donde nace Ignia Gallery" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-12 max-w-[1280px] mx-auto">
        <div className="eyebrow text-white/80 mb-3">La historia</div>
        <h1 className="font-display font-bold text-white text-[clamp(40px,6vw,76px)] tracking-[-0.02em] leading-[1.02] max-w-[900px]">
          Encender lo que nadie<br />podía ver todavía.
        </h1>
        <p className="font-body text-[16px] md:text-[18px] font-light text-white/85 max-w-[640px] mt-5 italic">
          “Behind every great piece of art is an unseen mountain of sacrifice, discipline, and commitment.”
        </p>
      </div>
    </section>

    {/* Manifiesto / nombre */}
    <section className="bg-white px-6 md:px-12 py-20">
      <div className="max-w-[860px] mx-auto">
        <div className="eyebrow mb-4">El nombre</div>
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,44px)] tracking-[-0.02em] text-ink leading-[1.1] mb-6">
          Ignia viene del latín <em>ignis</em>, fuego.
        </h2>
        <p className="font-body text-[17px] font-light text-gray leading-relaxed mb-5">
          En la retórica latina, <em>ignis</em> era también lo que aviva o enciende una pasión. Ignia Gallery
          nace exactamente de eso: encender algo que ya existía pero que nadie podía ver todavía. Un talento
          escultórico enorme, disperso por el mundo, sin el escaparate que merece.
        </p>
      </div>
    </section>

    {/* Fundadoras */}
    <section className="bg-surface px-6 md:px-12 py-20">
      <div className="max-w-[1080px] mx-auto">
        <div className="eyebrow mb-4">Quiénes están detrás</div>
        <h2 className="font-display font-bold text-[clamp(26px,3vw,40px)] tracking-[-0.02em] text-ink leading-[1.1] mb-10">
          Artistas plásticas y diseñadoras de producto.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12">
          <div>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-5">
              Antes de los títulos, antes del producto digital, antes del project management,
              ya había pintura. Más tarde llegó la escultura, y con ella la consciencia física
              de lo que significa crear algo tridimensional con las manos.
            </p>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed">
              Ignia nace de esa doble mirada: la de quien ha estado dentro del taller con las
              manos llenas de barro y bronce, y la de quien lleva más de una década diseñando
              productos digitales que la gente ama usar.
            </p>
          </div>
          <div>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-5">
              Cuando empezamos a buscar dónde mostrar y vender escultura, lo que encontramos
              fue decepcionante. No por falta de oferta, sino porque ninguna experiencia estaba
              pensada para una obra que cambia con la luz, el ángulo y la distancia.
            </p>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed">
              Una foto frontal nunca le hará justicia a una pieza tridimensional. Esa frustración,
              muy personal, es la que dio origen a todo lo que somos hoy.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Lo que defendemos */}
    <section className="bg-white px-6 md:px-12 py-20">
      <div className="max-w-[1080px] mx-auto">
        <div className="eyebrow mb-4">Lo que defendemos</div>
        <h2 className="font-display font-bold text-[clamp(26px,3vw,40px)] tracking-[-0.02em] text-ink leading-[1.1] mb-10">
          Una plataforma dedicada exclusivamente a la escultura.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {pilares.map(p => (
            <div key={p.titulo} className="border-t border-border pt-5">
              <h3 className="font-display font-bold text-[20px] text-ink mb-2">{p.titulo}</h3>
              <p className="font-body text-[15px] font-light text-gray leading-relaxed">{p.cuerpo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Para quién */}
    <section className="bg-surface px-6 md:px-12 py-20">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow mb-3">Para el escultor</div>
          <ul className="space-y-3 font-body text-[15px] font-light text-gray leading-relaxed">
            <li>— Su propio espacio, con niveles de visibilidad según su trayectoria.</li>
            <li>— Datos reales sobre quién se interesa por su obra y desde dónde.</li>
            <li>— Herramientas para contar su historia y construir comunidad.</li>
            <li>— Digitalización 3D gratuita, desde su propio taller.</li>
            <li>— Hasta el 88% de cada venta.</li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Para el coleccionista</div>
          <ul className="space-y-3 font-body text-[15px] font-light text-gray leading-relaxed">
            <li>— Ver cada escultura en 3D antes de comprarla.</li>
            <li>— Ficha técnica completa: materiales, técnica, origen y significado.</li>
            <li>— Certificado de autenticidad en blockchain que viaja con la obra.</li>
            <li>— Envío con partners especializados en arte, asegurado puerta a puerta.</li>
            <li>— Trazabilidad garantizada también en una eventual reventa.</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Visítanos */}
    <section className="bg-white px-6 md:px-12 py-20">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow mb-3">Visítanos</div>
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink leading-tight mb-4">
            Calle del Bronce 14, Madrid
          </h2>
          <p className="font-body text-[15px] font-light text-gray leading-relaxed">
            Martes a sábado, 11:00 – 20:00. Cita previa para visitas guiadas y consultas de adquisición.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">Contacto</div>
          <p className="font-body text-[15px] font-light text-gray leading-relaxed">
            hola@igniagallery.com<br />+34 910 000 000
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);

const pilares = [
  {
    titulo: "Ver la pieza, no su fotografía.",
    cuerpo: "La escultura es tridimensional por definición. En Ignia se gira, se acerca y se entiende antes de comprar.",
  },
  {
    titulo: "Autenticidad que viaja con la obra.",
    cuerpo: "Cada pieza lleva un certificado de autenticidad en blockchain verificable, que la acompaña aunque cambie de manos.",
  },
  {
    titulo: "Justo con quien crea.",
    cuerpo: "Hasta el 88% de cada venta vuelve al artista. Y los datos de su audiencia, también.",
  },
  {
    titulo: "El arte se ama más cuando se entiende.",
    cuerpo: "Ignia Aprende es nuestro portal educativo abierto: historia, técnicas, materiales y entrevistas. Gratuito para instituciones educativas.",
  },
];

export default IgniaGalleryPage;
