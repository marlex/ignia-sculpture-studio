import { useEffect, useRef, useState } from "react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import bg1 from "@/assets/hero-bg-1.jpg";
import bg2 from "@/assets/hero-bg-2.jpg";
import bg3 from "@/assets/hero-bg-3.jpg";

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

const heroes = [hero2, hero1, hero3];
const studios = [bg2, bg1, bg3];

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState(0);
  const [scale, setScale] = useState(1);
  const drag = useRef<{ active: boolean; x: number; interacted: boolean }>({ active: false, x: 0, interacted: false });

  // auto-rotation when idle
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!drag.current.active && !drag.current.interacted) {
        setRot(r => {
          const next = r + dt * 0.012;
          return next > 360 ? next - 360 : next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.x;
      drag.current.x = e.clientX;
      setRot(r => r + dx * 0.4);
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
      : { backgroundImage: `url(${studios[obraIndex]})`, backgroundSize: "cover", backgroundPosition: "center" };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onWheel={onWheel}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
      style={bg}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={heroes[obraIndex]}
          alt=""
          draggable={false}
          className="max-h-[88vh] max-w-[60vw] object-contain transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1200px) rotateY(${rot}deg) scale(${scale})`,
            filter: bgMode === "dark" ? "drop-shadow(0 40px 80px rgba(0,0,0,0.8))" : "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
          }}
        />
      </div>
    </div>
  );
};
