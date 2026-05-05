import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import bg1 from "@/assets/hero-bg-1.jpg";

const obras: Record<string, {
  nombre: string; artista: string; material: string; año: string;
  edicion: string; precio: string; img: string; descripcion: string;
}> = {
  "lirio-en-vuelo": {
    nombre: "Lirio en vuelo", artista: "Ana Ruiz", material: "Mármol de Carrara",
    año: "2024", edicion: "Edición única", precio: "€ 14.800", img: hero1,
    descripcion: "Talla directa en mármol blanco de Carrara. La pieza estudia la verticalidad y el peso aparente del vuelo, en una sola masa continua sin uniones.",
  },
  "ofrenda": {
    nombre: "Ofrenda", artista: "Helena Vázquez", material: "Bronce pulido a mano",
    año: "2025", edicion: "Edición única", precio: "€ 22.500", img: hero2,
    descripcion: "Bronce a la cera perdida, fundido en taller propio y pulido manualmente. La pátina se trabaja en frío para acentuar los planos verticales.",
  },
  "torsion-i": {
    nombre: "Torsión I", artista: "Camila Soler", material: "Alabastro blanco",
    año: "2025", edicion: "1 de 3", precio: "€ 11.600", img: hero3,
    descripcion: "Talla en alabastro translúcido. La pieza explora la torsión interna del bloque y aprovecha la luz natural para revelar las vetas.",
  },
};

const ObraDetalle = () => {
  const { slug = "" } = useParams();
  const o = obras[slug] ?? obras["lirio-en-vuelo"];

  return (
    <main className="pt-14 bg-white">
      <Header />

      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10">
          <div className="aspect-square bg-secondary overflow-hidden flex items-center justify-center" style={{ backgroundImage: `url(${bg1})`, backgroundSize: "cover" }}>
            <img src={o.img} alt={o.nombre} className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl" />
          </div>
          <div>
            <div className="eyebrow mb-3"><Link to="/coleccion" className="hover:text-ink">← Volver a la colección</Link></div>
            <h1 className="font-display font-bold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{o.nombre}</h1>
            <div className="font-body text-[15px] font-light text-gray mb-6">
              {o.artista} · {o.material} · {o.año} · {o.edicion}
            </div>
            <div className="font-display font-bold text-[26px] text-ink mb-8">{o.precio}</div>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-10">{o.descripcion}</p>

            {/* Autenticidad */}
            <div className="border border-border p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden className="text-ink">◆</span>
                <h2 className="font-display font-bold text-[18px] text-ink">Autenticidad verificada</h2>
              </div>
              <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-4">
                Cada obra de Ignia incluye un certificado de autenticidad emitido en blockchain.
                El registro contiene la firma del artista, la trazabilidad del taller donde se realizó,
                el número dentro de la edición y el historial completo de propiedad. Es público,
                verificable desde cualquier parte del mundo y viaja con la pieza en futuras reventas.
              </p>
              <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-body text-[13px]">
                <dt className="text-muted-line uppercase tracking-[0.12em]">Token ID</dt>
                <dd className="text-ink font-mono">0x{slug.slice(0, 6).padEnd(6, "a")}…f21c</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">Cadena</dt>
                <dd className="text-ink">Polygon</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">Firmado por</dt>
                <dd className="text-ink">{o.artista}</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">Edición</dt>
                <dd className="text-ink">{o.edicion}</dd>
              </dl>
              <a href="#" className="link-arrow inline-block mt-5">Ver certificado público →</a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-ink text-white font-body text-[14px] tracking-[0.14em] uppercase py-3.5 hover:bg-ink/90 transition-colors">Adquirir</button>
              <button className="border border-ink text-ink font-body text-[14px] tracking-[0.14em] uppercase py-3.5 hover:bg-secondary transition-colors">Hablar con un curador</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ObraDetalle;
