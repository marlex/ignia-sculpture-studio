import { useEffect, useMemo, useRef, useState } from "react";
import bg1 from "@/assets/hero-bg-1.jpg";
import bg2 from "@/assets/hero-bg-2.jpg";
import bg3 from "@/assets/hero-bg-3.jpg";

// Turntable frames per obra (16 ángulos = 22.5° entre frames).
// Si no existe la secuencia, hacemos fallback al frame único hero-N.png con rotación CSS.
const frameModules = import.meta.glob("@/assets/hero-*-f*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
const fallback = [hero1, hero2, hero3];

function buildSequence(name: string): string[] {
  const entries = Object.entries(frameModules)
    .filter(([k]) => k.includes(`/${name}-f`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, v]) => v);
  return entries;
}

const sequences = [
  buildSequence("hero-1"),
  buildSequence("hero-2"),
  buildSequence("hero-3"),
];

const studios = [bg1, bg2, bg3];

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const seq = sequences[obraIndex];
  const hasTurntable = seq && seq.length > 1;
  const frameCount = hasTurntable ? seq.length : 1;

  // angle in degrees (continuous). For turntable we map to nearest frame.
  const [angle, setAngle] = useState(0);
  const [scale, setScale] = useState(1);
  const drag = useRef({ active: false, x: 0, interacted: false });

  // preload frames for snappier rotation
  useEffect(() => {
    if (!hasTurntable) return;
    seq.forEach(src => {
      const i = new Image();
      i.src = src;
    });
  }, [seq, hasTurntable]);

  useEffect(() => {
    drag.current.interacted = false;
    setAngle(0);
    setScale(1);
  }, [obraIndex]);

  // idle gentle rotation (auto turntable) until user interacts
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (!drag.current.active && !drag.current.interacted) {
        const t = (now - start) / 1000;
        setAngle((t * 30) % 360); // 30°/s -> full turn ~12s
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [obraIndex]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.x;
      drag.current.x = e.clientX;
      setAngle(a => {
        const next = a + dx * 0.6;
        return ((next % 360) + 360) % 360;
      });
    };
    const onUp = () => (drag.current.active = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    drag.current.active = true;
    drag.current.interacted = true;
    drag.current.x = e.clientX;
  };

  const onWheel = (e: React.WheelEvent) => {
    drag.current.interacted = true;
    setScale(s => Math.max(0.7, Math.min(1.6, s - e.deltaY * 0.001)));
  };

  const bg =
    bgMode === "white"
      ? { background: "#ffffff" }
      : bgMode === "dark"
      ? { background: "#0d0d0d" }
      : {
          backgroundImage: `url(${studios[obraIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  const currentFrame = useMemo(() => {
    if (!hasTurntable) return fallback[obraIndex];
    const idx = Math.round((angle / 360) * frameCount) % frameCount;
    return seq[idx];
  }, [angle, frameCount, hasTurntable, obraIndex, seq]);

  // for fallback (single image) we still apply a perspective rotateY illusion
  const fallbackTransform = !hasTurntable
    ? `perspective(1400px) rotateY(${Math.sin((angle * Math.PI) / 180) * 18}deg) scale(${scale})`
    : `scale(${scale})`;

  return (
    <div
      onPointerDown={onDown}
      onWheel={onWheel}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
      style={bg}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={currentFrame}
          alt=""
          draggable={false}
          className="max-h-[88vh] max-w-[60vw] object-contain"
          style={{
            transform: fallbackTransform,
            filter:
              bgMode === "dark"
                ? "drop-shadow(0 50px 90px rgba(0,0,0,0.85))"
                : "drop-shadow(0 35px 70px rgba(0,0,0,0.28))",
            willChange: "transform",
          }}
        />
      </div>
    </div>
  );
};
