import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import { Sculpture3DModal } from "@/components/ignia/Sculpture3DModal";
import arco from "@/assets/perfil-escultura-arco.jpg";
import memoria from "@/assets/perfil-escultura-memoria.jpg";
import nexo from "@/assets/perfil-escultura-nexo.jpg";
import latido from "@/assets/perfil-escultura-latido.jpg";
import orbita from "@/assets/perfil-escultura-orbita.jpg";
import mineral from "@/assets/perfil-escultura-mineral.jpg";
import respiro from "@/assets/perfil-escultura-respiro.jpg";
import { useLang } from "@/i18n/LanguageContext";

const SLUGS = ["lirio-en-vuelo", "ofrenda", "torsion-i"];

export default function PerfilColeccionista() {
  const lang = useLang();
  const [open3d, setOpen3d] = useState<{ idx: number; titulo: string; artista: string } | null>(null);
  const t = lang === "es" ? {
    exit: "Salir", view3d: "Ver en 3D", viewObra: "Ver escultura",
    eyebrow: "Perfil de coleccionista",
    sub: "Intereses: figurativo, gran formato. Presupuesto 5.000 € – 25.000 €.",
    stats: [["Obras en colección", "7"], ["Guardadas", "23"], ["Escultores seguidos", "12"]],
    mine: "Mi colección", reco: "Recomendado para ti",
    coleccion: [
      { img: arco, titulo: "Arco", artista: "Helena Vázquez" },
      { img: memoria, titulo: "Memoria", artista: "Marcos Iriarte" },
      { img: nexo, titulo: "Nexo", artista: "Ana Ruiz" },
    ],
    recomendados: [
      { img: latido, titulo: "Latido", artista: "Diego Lara" },
      { img: orbita, titulo: "Órbita", artista: "Camila Soler" },
      { img: mineral, titulo: "Mineral", artista: "Mateo Rivas" },
      { img: respiro, titulo: "Respiro", artista: "Helena Vázquez" },
    ],
  } : {
    exit: "Sign out", view3d: "View in 3D", viewObra: "View sculpture",
    eyebrow: "Collector profile",
    sub: "Interests: figurative, large format. Budget €5,000 – €25,000.",
    stats: [["Works in collection", "7"], ["Saved", "23"], ["Sculptors followed", "12"]],
    mine: "My collection", reco: "Recommended for you",
    coleccion: [
      { img: arco, titulo: "Arch", artista: "Helena Vázquez" },
      { img: memoria, titulo: "Memory", artista: "Marcos Iriarte" },
      { img: nexo, titulo: "Nexus", artista: "Ana Ruiz" },
    ],
    recomendados: [
      { img: latido, titulo: "Heartbeat", artista: "Diego Lara" },
      { img: orbita, titulo: "Orbit", artista: "Camila Soler" },
      { img: mineral, titulo: "Mineral", artista: "Mateo Rivas" },
      { img: respiro, titulo: "Breath", artista: "Helena Vázquez" },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">María García</span>
          <Link to="/" className="font-body text-[14px] font-light text-gray hover:text-ink">{t.exit}</Link>
        </div>
      </header>

      <section className="px-6 md:px-12 py-16 max-w-[1280px] mx-auto">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink mb-4 leading-[1.05]">María García</h1>
        <p className="font-body text-[16px] font-light text-gray max-w-[640px] mb-12">{t.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {t.stats.map(([l, v]) => <Stat key={l} label={l} value={v} />)}
        </div>

        <div className="mb-16">
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-8">{t.mine}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {t.coleccion.map((o, i) => (
              <article key={o.titulo} className="group">
                <Link to={`/obra/${SLUGS[i % SLUGS.length]}`} className="block relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
                  <img src={o.img} alt={o.titulo} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </Link>
                <h3 className="font-display font-bold text-[16px] text-ink mb-1">{o.titulo}</h3>
                <div className="font-body text-[13px] text-muted-line uppercase tracking-[0.14em] mb-3">{o.artista}</div>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/obra/${SLUGS[i % SLUGS.length]}`}
                    className="font-body text-[12px] font-normal text-ink uppercase tracking-[0.12em] border-b-[0.5px] border-ink pb-px hover:opacity-60 transition-opacity"
                  >
                    {t.viewObra} →
                  </Link>
                  <button
                    onClick={() => setOpen3d({ idx: i, titulo: o.titulo, artista: o.artista })}
                    className="font-body text-[11px] font-light text-muted-line uppercase tracking-[0.12em] hover:text-ink transition-colors"
                  >
                    {t.view3d}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-[clamp(22px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-8">{t.reco}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {t.recomendados.map((o, i) => (
              <article key={o.titulo} className="group">
                <div className="relative aspect-square overflow-hidden bg-secondary mb-3">
                  <img src={o.img} alt={o.titulo} loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                  <button
                    onClick={() => setOpen3d({ idx: i + 3, titulo: o.titulo, artista: o.artista })}
                    aria-label={`${t.view3d} — ${o.titulo}`}
                    className="absolute bottom-2 right-2 font-body text-[10px] font-light tracking-[0.18em] uppercase text-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                  >
                    <span aria-hidden className="inline-block w-1 h-1 rounded-full bg-white/80" />
                    {t.view3d}
                  </button>
                </div>
                <h3 className="font-display font-bold text-[14px] text-ink">{o.titulo}</h3>
                <div className="font-body text-[12px] text-muted-line uppercase tracking-[0.14em]">{o.artista}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {open3d && (
        <Sculpture3DModal
          open={!!open3d}
          onClose={() => setOpen3d(null)}
          obraIndex={open3d.idx}
          titulo={open3d.titulo}
          artista={open3d.artista}
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
