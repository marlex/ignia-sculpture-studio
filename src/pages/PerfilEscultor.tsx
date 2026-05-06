import { useState } from "react";
import { Link } from "react-router-dom";
const SLUGS = ["lirio-en-vuelo", "ofrenda", "torsion-i"];
import { Logo } from "@/components/ignia/Logo";
import { Sculpture3DModal } from "@/components/ignia/Sculpture3DModal";
import caida from "@/assets/perfil-escultura-caida.jpg";
import eco from "@/assets/perfil-escultura-eco.jpg";
import umbral from "@/assets/perfil-escultura-umbral.jpg";
import vertice from "@/assets/perfil-escultura-vertice.jpg";
import quietud from "@/assets/perfil-escultura-quietud.jpg";
import resto from "@/assets/perfil-escultura-resto.jpg";
import { useLang } from "@/i18n/LanguageContext";

export default function PerfilEscultor() {
  const lang = useLang();
  const [open3d, setOpen3d] = useState<number | null>(null);
  const t = lang === "es" ? {
    publish: "Publicar obra ↗", exit: "Salir", view3d: "Ver en 3D", viewObra: "Ver escultura",
    eyebrow: "Perfil de escultor",
    sub: "Bronce figurativo · Toledo, España. Tres décadas trabajando la figura humana desde el oficio lento.",
    stats: [["Obras publicadas", "24"], ["Coleccionistas", "38"], ["Ediciones vendidas", "61"]],
    mine: "Mis obras", new: "+ Nueva obra",
    obras: [
      { img: caida, titulo: "Caída", estado: "Publicada" },
      { img: eco, titulo: "Eco", estado: "Publicada" },
      { img: umbral, titulo: "Umbral", estado: "Borrador" },
      { img: vertice, titulo: "Vértice", estado: "Vendida" },
      { img: quietud, titulo: "Quietud", estado: "Publicada" },
      { img: resto, titulo: "Resto", estado: "Borrador" },
    ],
  } : {
    publish: "Submit work ↗", exit: "Sign out", view3d: "View in 3D", viewObra: "View sculpture",
    eyebrow: "Sculptor profile",
    sub: "Figurative bronze · Toledo, Spain. Three decades working the human figure through slow craft.",
    stats: [["Published works", "24"], ["Collectors", "38"], ["Editions sold", "61"]],
    mine: "My works", new: "+ New work",
    obras: [
      { img: caida, titulo: "Fall", estado: "Published" },
      { img: eco, titulo: "Echo", estado: "Published" },
      { img: umbral, titulo: "Threshold", estado: "Draft" },
      { img: vertice, titulo: "Vertex", estado: "Sold" },
      { img: quietud, titulo: "Stillness", estado: "Published" },
      { img: resto, titulo: "Remnant", estado: "Draft" },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">Helena Vázquez</span>
          <button className="btn-primary !py-2 !px-5">{t.publish}</button>
          <Link to="/" className="font-body text-[14px] font-light text-gray hover:text-ink">{t.exit}</Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 max-w-[1280px] mx-auto">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink mb-4 leading-[1.05]">Helena Vázquez</h1>
        <p className="font-body text-[16px] font-light text-gray max-w-[640px] mb-12">{t.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {t.stats.map(([l, v]) => <Stat key={l} label={l} value={v} />)}
        </div>

        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink">{t.mine}</h2>
          <button className="btn-primary !py-2 !px-5">{t.new}</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {t.obras.map((o, i) => (
            <article key={o.titulo} className="group">
              <Link to={`/obra/${SLUGS[i % SLUGS.length]}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
                <img src={o.img} alt={o.titulo} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
              </Link>
              <h3 className="font-display font-bold text-[16px] text-ink mb-1">{o.titulo}</h3>
              <div className="font-body text-[13px] text-muted-line uppercase tracking-[0.14em] mb-3">{o.estado}</div>
              <div className="flex items-center gap-4">
                <Link
                  to={`/obra/${SLUGS[i % SLUGS.length]}`}
                  className="font-body text-[12px] font-normal text-ink uppercase tracking-[0.12em] border-b-[0.5px] border-ink pb-px hover:opacity-60 transition-opacity"
                >
                  {t.viewObra} →
                </Link>
                <button
                  onClick={() => setOpen3d(i)}
                  className="font-body text-[11px] font-light text-muted-line uppercase tracking-[0.12em] hover:text-ink transition-colors"
                >
                  {t.view3d}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {open3d !== null && (
        <Sculpture3DModal
          open={open3d !== null}
          onClose={() => setOpen3d(null)}
          obraIndex={open3d}
          titulo={t.obras[open3d].titulo}
          artista="Helena Vázquez"
          material={lang === "es" ? "Bronce" : "Bronze"}
        />
      )}
    </main>
  );
}

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="border-t border-border pt-5">
    <div className="font-display font-bold text-[40px] text-ink leading-none mb-2">{value}</div>
    <div className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line">{label}</div>
  </div>
);
