import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { Sculpture3DModal } from "@/components/ignia/Sculpture3DModal";
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

const ObraDetalle = () => {
  const { slug = "" } = useParams();
  const lang = useLang();
  const t = T[lang];
  const o = getWorkBySlug(slug, lang);
  const [open3d, setOpen3d] = useState(false);

  return (
    <main className="pt-14 bg-white">
      <Header />

      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10">
          <div>
            <button
              type="button"
              onClick={() => setOpen3d(true)}
              aria-label={t.view3d}
              className="relative aspect-square w-full bg-secondary overflow-hidden block cursor-zoom-in group"
            >
              <img src={o.image} alt={o.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
              <span className="absolute bottom-4 right-4 font-body text-[10px] font-light tracking-[0.2em] uppercase text-white bg-black/55 backdrop-blur px-3 py-1.5 group-hover:bg-black/80 transition-colors">
                {t.view3d} ↗
              </span>
            </button>
          <div>
            <div className="eyebrow mb-3"><Link to="/coleccion" className="hover:text-ink">{t.back}</Link></div>
            <h1 className="font-display font-bold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{o.title}</h1>
            <div className="font-body text-[15px] font-light text-gray mb-6">
              <Link to="/perfil/escultor" className="underline-offset-4 hover:underline">{o.artist}</Link> · {o.material} · {o.year} · {o.edition}
            </div>
            <div className="font-display font-bold text-[26px] text-ink mb-8">{o.price}</div>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-10">{o.description}</p>

            <div className="border border-border p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden className="text-ink">◆</span>
                <h2 className="font-display font-bold text-[18px] text-ink">{t.auth}</h2>
              </div>
              <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-4">{t.authP}</p>
              <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-body text-[13px]">
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.tokenId}</dt>
                <dd className="text-ink font-mono">{o.authenticity}</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.chain}</dt>
                <dd className="text-ink">Polygon</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.signed}</dt>
                <dd className="text-ink">{o.artist}</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.edition}</dt>
                <dd className="text-ink">{o.edition}</dd>
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
        obraIndex={o.index}
        titulo={o.title}
        artista={o.artist}
        material={o.material}
        photoSrc={o.image}
        model={o.model}
      />

      <Footer />
    </main>
  );
};

export default ObraDetalle;
