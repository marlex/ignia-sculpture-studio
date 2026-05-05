import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { Sculpture3DModal } from "@/components/ignia/Sculpture3DModal";
import hero1 from "@/assets/hero-real-1.jpg";
import hero2 from "@/assets/hero-real-2.jpg";
import hero3 from "@/assets/hero-real-3.jpg";
import bg1 from "@/assets/hero-bg-1.jpg";
import { useLang } from "@/i18n/LanguageContext";

const OBRAS = {
  es: {
    "lirio-en-vuelo": { nombre: "Lirio en vuelo", artista: "Ana Ruiz", material: "Bronce a la cera perdida", año: "2024", edicion: "Edición única", precio: "€ 14.800", img: hero1, descripcion: "Bronce fundido a la cera perdida, pulido y patinado a mano en taller. La pieza estudia la verticalidad y el peso aparente del vuelo, en una sola masa continua sin uniones." },
    "ofrenda": { nombre: "Ofrenda", artista: "Helena Vázquez", material: "Bronce pulido a mano", año: "2025", edicion: "Edición única", precio: "€ 22.500", img: hero2, descripcion: "Bronce a la cera perdida, fundido en taller propio y pulido manualmente. La pátina se trabaja en frío para acentuar los planos verticales." },
    "torsion-i": { nombre: "Torsión I", artista: "Camila Soler", material: "Alabastro blanco", año: "2025", edicion: "1 de 3", precio: "€ 11.600", img: hero3, descripcion: "Talla en alabastro translúcido. La pieza explora la torsión interna del bloque y aprovecha la luz natural para revelar las vetas." },
  },
  en: {
    "lirio-en-vuelo": { nombre: "Lily in flight", artista: "Ana Ruiz", material: "Lost-wax bronze", año: "2024", edicion: "Unique edition", precio: "€ 14,800", img: hero1, descripcion: "Lost-wax bronze, hand-polished and patinated in studio. The piece studies verticality and the apparent weight of flight, in a single continuous mass without joins." },
    "ofrenda": { nombre: "Offering", artista: "Helena Vázquez", material: "Hand-polished bronze", año: "2025", edicion: "Unique edition", precio: "€ 22,500", img: hero2, descripcion: "Lost-wax bronze, cast in the artist's own studio and polished by hand. The patina is worked cold to emphasise the vertical planes." },
    "torsion-i": { nombre: "Torsion I", artista: "Camila Soler", material: "White alabaster", año: "2025", edicion: "1 of 3", precio: "€ 11,600", img: hero3, descripcion: "Carving in translucent alabaster. The piece explores the internal torsion of the block and uses natural light to reveal the veins." },
  },
};

const T = {
  es: {
    back: "← Volver a la colección",
    auth: "Autenticidad verificada",
    authP: "Cada obra de Ignia incluye un certificado de autenticidad emitido en blockchain. El registro contiene la firma del artista, la trazabilidad del taller donde se realizó, el número dentro de la edición y el historial completo de propiedad. Es público, verificable desde cualquier parte del mundo y viaja con la pieza en futuras reventas.",
    tokenId: "Token ID", chain: "Cadena", signed: "Firmado por", edition: "Edición",
    cert: "Ver certificado público →",
    buy: "Adquirir", talk: "Hablar con un curador", view3d: "Ver en 3D",
  },
  en: {
    back: "← Back to the collection",
    auth: "Verified authenticity",
    authP: "Every Ignia work includes a certificate of authenticity issued on blockchain. The record contains the artist's signature, full traceability of the studio where it was made, its number within the edition and the complete ownership history. It is public, verifiable from anywhere in the world and travels with the piece in future resales.",
    tokenId: "Token ID", chain: "Chain", signed: "Signed by", edition: "Edition",
    cert: "View public certificate →",
    buy: "Acquire", talk: "Talk to a curator", view3d: "View in 3D",
  },
};

const ObraDetalle = () => {
  const { slug = "" } = useParams();
  const lang = useLang();
  const obras = OBRAS[lang];
  const t = T[lang];
  const o = obras[slug as keyof typeof obras] ?? obras["lirio-en-vuelo"];
  const slugIdx = ["lirio-en-vuelo", "ofrenda", "torsion-i"].indexOf(slug) >= 0
    ? ["lirio-en-vuelo", "ofrenda", "torsion-i"].indexOf(slug)
    : 0;
  const [open3d, setOpen3d] = useState(false);

  return (
    <main className="pt-14 bg-white">
      <Header />

      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10">
          <div className="relative aspect-square bg-secondary overflow-hidden">
            <img src={o.img} alt={o.nombre} className="w-full h-full object-cover" />
            <button
              onClick={() => setOpen3d(true)}
              className="absolute bottom-4 right-4 font-body text-[12px] tracking-[0.16em] uppercase bg-white/95 backdrop-blur text-ink px-4 py-2.5 border-[0.5px] border-border hover:bg-ink hover:text-white transition-colors"
            >
              ◆ {t.view3d}
            </button>
          </div>
          <div>
            <div className="eyebrow mb-3"><Link to="/coleccion" className="hover:text-ink">{t.back}</Link></div>
            <h1 className="font-display font-bold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{o.nombre}</h1>
            <div className="font-body text-[15px] font-light text-gray mb-6">
              {o.artista} · {o.material} · {o.año} · {o.edicion}
            </div>
            <div className="font-display font-bold text-[26px] text-ink mb-8">{o.precio}</div>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-10">{o.descripcion}</p>

            <div className="border border-border p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden className="text-ink">◆</span>
                <h2 className="font-display font-bold text-[18px] text-ink">{t.auth}</h2>
              </div>
              <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-4">{t.authP}</p>
              <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-body text-[13px]">
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.tokenId}</dt>
                <dd className="text-ink font-mono">0x{slug.slice(0, 6).padEnd(6, "a")}…f21c</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.chain}</dt>
                <dd className="text-ink">Polygon</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.signed}</dt>
                <dd className="text-ink">{o.artista}</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.edition}</dt>
                <dd className="text-ink">{o.edicion}</dd>
              </dl>
              <a href="#" className="link-arrow inline-block mt-5">{t.cert}</a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-ink text-white font-body text-[14px] tracking-[0.14em] uppercase py-3.5 hover:bg-ink/90 transition-colors">{t.buy}</button>
              <button className="border border-ink text-ink font-body text-[14px] tracking-[0.14em] uppercase py-3.5 hover:bg-secondary transition-colors">{t.talk}</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ObraDetalle;
