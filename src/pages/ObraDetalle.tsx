import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { Sculpture3DModal } from "@/components/ignia/Sculpture3DModal";
import { SculptureViewer } from "@/components/ignia/SculptureViewer";
import { useLang } from "@/i18n/LanguageContext";
import { getWorkBySlug } from "@/data/igniaWorks";

const T = {
  es: {
    back: "← Volver a la colección",
    auth: "Autenticidad verificada",
    authP: "Cada obra de Ignia incluye un certificado de autenticidad emitido en blockchain. El registro contiene la firma del artista, la trazabilidad del taller donde se realizó, el número dentro de la edición y el historial completo de propiedad. Es público, verificable desde cualquier parte del mundo y viaja con la pieza en futuras reventas.",
    tokenId: "Token ID", chain: "Cadena", signed: "Firmado por", edition: "Edición",
    cert: "Ver certificado público →",
    buy: "Adquirir", talk: "Hablar con un curador", view3d: "Ampliar 3D", angles: "Ángulos", photo: "Foto", model: "Modelo 3D",
  },
  en: {
    back: "← Back to the collection",
    auth: "Verified authenticity",
    authP: "Every Ignia work includes a certificate of authenticity issued on blockchain. The record contains the artist's signature, full traceability of the studio where it was made, its number within the edition and the complete ownership history. It is public, verifiable from anywhere in the world and travels with the piece in future resales.",
    tokenId: "Token ID", chain: "Chain", signed: "Signed by", edition: "Edition",
    cert: "View public certificate →",
    buy: "Acquire", talk: "Talk to a curator", view3d: "Expand 3D", angles: "Angles", photo: "Photo", model: "3D model",
  },
};

const ANGLES = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI];

const ObraDetalle = () => {
  const { slug = "" } = useParams();
  const lang = useLang();
  const t = T[lang];
  const o = getWorkBySlug(slug, lang);
  const [open3d, setOpen3d] = useState(false);
  const [view, setView] = useState<"photo" | "3d">("3d");
  const [angle, setAngle] = useState(0);

  return (
    <main className="pt-14 bg-white">
      <Header />

      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10">
          <div>
            <div className="relative aspect-square bg-secondary overflow-hidden">
              {view === "photo" ? (
                <img src={o.image} alt={o.title} className="w-full h-full object-cover" />
              ) : (
                <SculptureViewer
                  obraIndex={o.index}
                  bgMode="studio"
                  titulo={o.title}
                  material={o.material}
                  viewAngle={angle}
                  photoSrc={o.image}
                  model={o.model}
                />
              )}
              <button
                onClick={() => setOpen3d(true)}
                className="absolute bottom-4 right-4 font-body text-[10px] font-light tracking-[0.2em] uppercase text-white bg-black/55 backdrop-blur px-3 py-1.5 hover:bg-black/75 transition-colors z-10"
              >
                {t.view3d} ↗
              </button>
              <div className="absolute top-4 left-4 flex gap-1 bg-white/85 backdrop-blur border-[0.5px] border-border z-10">
                {(["photo", "3d"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className="font-body text-[10px] uppercase tracking-[0.16em] px-2.5 py-1.5 transition-colors"
                    style={{
                      background: view === v ? "hsl(var(--black-pure))" : "transparent",
                      color: view === v ? "#fff" : "hsl(var(--gray))",
                    }}
                  >
                    {v === "photo" ? t.photo : t.model}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="font-body text-[10px] uppercase tracking-[0.18em] text-muted-line mr-2">{t.angles}</span>
              {ANGLES.map((a, i) => (
                <button
                  key={i}
                  onClick={() => { setView("3d"); setAngle(a); }}
                  aria-label={`${t.angles} ${i + 1}`}
                  className="w-12 h-12 border-[0.5px] flex items-center justify-center transition-colors"
                  style={{
                    borderColor: view === "3d" && angle === a ? "hsl(var(--black-pure))" : "hsl(var(--border))",
                    background: view === "3d" && angle === a ? "hsl(var(--secondary))" : "#fff",
                  }}
                >
                  <span aria-hidden className="relative block w-6 h-6 rounded-full border-[0.5px] border-ink/60">
                    <span className="absolute top-1/2 left-1/2 w-[1px] h-2.5 bg-ink" style={{ transform: `translate(-50%, -100%) rotate(${a}rad)` }} />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow mb-3"><Link to="/coleccion" className="hover:text-ink">{t.back}</Link></div>
            <h1 className="font-display font-bold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{o.title}</h1>
            <div className="font-body text-[15px] font-light text-gray mb-6">
              <Link to="/perfil/escultor" className="underline-offset-4 hover:underline">{o.artist}</Link> · {o.material} · {o.year} · {o.edition}
            </div>
            <div className="font-display font-bold text-[26px] text-ink mb-8">{o.price}</div>
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

      <Sculpture3DModal
        open={open3d}
        onClose={() => setOpen3d(false)}
        obraIndex={slugIdx}
        titulo={o.nombre}
        artista={o.artista}
        material={o.material}
      />

      <Footer />
    </main>
  );
};

export default ObraDetalle;
