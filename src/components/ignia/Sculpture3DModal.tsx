import { useEffect, useState } from "react";
import { SculptureViewer } from "./SculptureViewer";
import { useLang } from "@/i18n/LanguageContext";

interface Props {
  open: boolean;
  onClose: () => void;
  obraIndex: number;
  titulo: string;
  artista: string;
  material: string;
}

type BgMode = "studio" | "white" | "dark";

export const Sculpture3DModal = ({ open, onClose, obraIndex, titulo, artista, material }: Props) => {
  const lang = useLang();
  const [bg, setBg] = useState<BgMode>("studio");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const t = lang === "es"
    ? { close: "Cerrar", hint: "Arrastra para rotar · Scroll para zoom", bg: "Fondo", studio: "Estudio", white: "Blanco", dark: "Sombra" }
    : { close: "Close", hint: "Drag to rotate · Scroll to zoom", bg: "Background", studio: "Studio", white: "White", dark: "Shadow" };

  return (
    <div role="dialog" aria-modal="true" aria-label={`${titulo} — 3D`} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-10 h-14 border-b border-white/10 text-white">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-bold text-[16px]">{titulo}</span>
          <span className="font-body text-[12px] font-light uppercase tracking-[0.14em] text-white/55">{artista} · {material}</span>
        </div>
        <button onClick={onClose} aria-label={t.close} className="font-body text-[13px] uppercase tracking-[0.14em] text-white/80 hover:text-white">
          {t.close} ✕
        </button>
      </header>
      <div className="relative flex-1">
        <SculptureViewer obraIndex={obraIndex % 3} bgMode={bg} />
        <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 z-10 text-[12px]">
          {(["studio", "white", "dark"] as BgMode[]).map(m => (
            <button
              key={m}
              onClick={() => setBg(m)}
              className="font-body uppercase tracking-[0.12em] border-[0.5px] px-3 py-1.5 backdrop-blur"
              style={{
                color: bg === m ? "#000" : "#fff",
                background: bg === m ? "#fff" : "rgba(255,255,255,0.08)",
                borderColor: bg === m ? "#fff" : "rgba(255,255,255,0.3)",
              }}
            >
              {m === "studio" ? t.studio : m === "white" ? t.white : t.dark}
            </button>
          ))}
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/55 font-body text-[11px] uppercase tracking-[0.18em] pointer-events-none">
          {t.hint}
        </div>
      </div>
    </div>
  );
};
