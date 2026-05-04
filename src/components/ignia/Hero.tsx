import { useEffect, useState } from "react";
import { SculptureViewer } from "./SculptureViewer";

const obras = [
  { nombre: "Ofrenda", artista: "Helena Vázquez", material: "Bronce pulido a mano", año: "2025", edicion: "Edición única", precio: "€ 22.500", slug: "ofrenda" },
  { nombre: "Lirio en vuelo", artista: "Ana Ruiz", material: "Mármol de Carrara", año: "2024", edicion: "Edición única", precio: "€ 14.800", slug: "lirio-en-vuelo" },
  { nombre: "Torsión I", artista: "Camila Soler", material: "Alabastro blanco", año: "2025", edicion: "1 de 3", precio: "€ 11.600", slug: "torsion-i" },
];

type BgMode = "studio" | "white" | "dark";

export const Hero = () => {
  const [actual, setActual] = useState(0);
  const [bg, setBg] = useState<BgMode>("studio");
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const o = obras[actual];
  const dark = bg === "dark";
  const fadeBase = bg === "white" ? "255,255,255" : bg === "dark" ? "17,17,17" : "248,248,246";
  const textColor = dark ? "#fff" : "hsl(var(--black-pure))";
  const grayColor = dark ? "#888" : "hsl(var(--gray))";

  const next = () => setActual((actual + 1) % 3);
  const prev = () => setActual((actual + 2) % 3);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-surface">
      <SculptureViewer obraIndex={actual} bgMode={bg} />

      {/* hint */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[14px] font-light tracking-[0.2em] uppercase z-[5] pointer-events-none whitespace-nowrap transition-opacity duration-[1200ms]"
        style={{ opacity: showHint ? 0.55 : 0, color: dark ? "#aaa" : "hsl(var(--gray))" }}
      >
        Arrastra para rotar · Scroll para zoom
      </div>

      {/* arrows */}
      <button onClick={prev} aria-label="Anterior" className="absolute top-1/2 -translate-y-1/2 left-6 md:left-12 z-20 w-10 h-10 flex items-center justify-center text-[15px] border-[0.5px] border-border backdrop-blur-md transition-colors hover:bg-white"
        style={{ background: "rgba(248,248,246,0.85)", color: "#111" }}>←</button>
      <button onClick={next} aria-label="Siguiente" className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20 w-10 h-10 flex items-center justify-center text-[15px] border-[0.5px] border-border backdrop-blur-md transition-colors hover:bg-white"
        style={{ background: "rgba(248,248,246,0.85)", color: "#111" }}>→</button>

      {/* fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[220px] pointer-events-none z-[2]"
        style={{ background: `linear-gradient(to top, rgba(${fadeBase},0.98) 0%, rgba(${fadeBase},0.85) 40%, transparent 100%)` }}
      />

      {/* bottom strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 pb-8 md:pb-9 flex flex-col md:flex-row items-stretch md:items-end gap-6 md:gap-12">
        {/* thumbs */}
        <div className="flex md:flex-col gap-2 shrink-0">
          {obras.map((ob, i) => (
            <button
              key={ob.slug}
              onClick={() => setActual(i)}
              aria-label={ob.nombre}
              className="cursor-pointer transition-opacity"
              style={{ opacity: i === actual ? 1 : 0.3 }}
            >
              <div
                className="w-12 h-16 border-[0.5px] border-border overflow-hidden flex items-center justify-center text-[14px] font-light uppercase tracking-widest"
                style={{
                  background: "#111",
                  color: "#fff",
                  borderBottom: i === actual ? "2px solid hsl(var(--verde))" : undefined,
                }}
              >
                0{i + 1}
              </div>
            </button>
          ))}
        </div>

        {/* info */}
        <div className="flex-1" style={{ color: textColor }}>
          <div className="font-body text-[14px] font-light tracking-[0.2em] uppercase mb-1.5" style={{ color: grayColor }}>
            0{actual + 1} — 03
          </div>
          <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em] mb-3" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: textColor }}>
            {o.nombre}
          </h1>
          <div className="flex items-center gap-2 flex-wrap mb-3.5 font-body text-[14px] font-light tracking-wide" style={{ color: grayColor }}>
            <span>{o.artista}</span>
            <span style={{ color: dark ? "#333" : "hsl(var(--border))" }}>·</span>
            <span>{o.material}</span>
            <span style={{ color: dark ? "#333" : "hsl(var(--border))" }}>·</span>
            <span>{o.año}</span>
            <span style={{ color: dark ? "#333" : "hsl(var(--border))" }}>·</span>
            <span>{o.edicion}</span>
          </div>
          <div className="flex items-baseline gap-7">
            <span className="font-display font-bold text-[22px] tracking-[-0.01em]" style={{ color: textColor }}>{o.precio}</span>
            <a href={`/obra/${o.slug}`} className="font-body text-[13px] font-light tracking-[0.14em] uppercase border-b-[0.5px] pb-px hover:opacity-50 transition-opacity"
              style={{ color: textColor, borderColor: textColor }}>
              Ver obra completa →
            </a>
          </div>
        </div>

        {/* bg controls */}
        <div className="shrink-0 text-right">
          <div className="font-body text-[14px] font-light tracking-[0.14em] uppercase text-muted-line mb-1.5">Fondo</div>
          <div className="flex md:flex-col gap-[3px] items-end">
            {(["studio", "white", "dark"] as BgMode[]).map(m => (
              <button
                key={m}
                onClick={() => setBg(m)}
                className="font-body text-[14px] font-light tracking-[0.1em] uppercase border-[0.5px] px-2.5 py-1 backdrop-blur transition-all"
                style={{
                  color: bg === m ? "hsl(var(--black-pure))" : "hsl(var(--gray))",
                  borderColor: bg === m ? "hsl(var(--black-pure))" : "hsl(var(--border))",
                  background: "rgba(248,248,246,0.88)",
                }}
              >
                {m === "studio" ? "Estudio" : m === "white" ? "Blanco" : "Negro"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
