import { useEffect, useRef, useState } from "react";
import bg1 from "@/assets/hero-bg-1.jpg";
import bg2 from "@/assets/hero-bg-2.jpg";
import bg3 from "@/assets/hero-bg-3.jpg";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";

const heroes = [hero1, hero2, hero3];
const studios = [bg1, bg2, bg3];

interface SculptureViewerProps {
  obraIndex: number;
  bgMode: "studio" | "white" | "dark";
}

export const SculptureViewer = ({ obraIndex, bgMode }: SculptureViewerProps) => {
  const [angle, setAngle] = useState(0);
  const [scale, setScale] = useState(1);
  const drag = useRef({ active: false, x: 0, interacted: false });
  const angleRef = useRef(0);

  // reset on obra change
  useEffect(() => {
    drag.current.interacted = false;
    angleRef.current = 0;
    setAngle(0);
    setScale(1);
  }, [obraIndex]);

  // continuous smooth auto-rotation (hologram turntable) until user interacts
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!drag.current.active && !drag.current.interacted) {
        angleRef.current = (angleRef.current + dt * 25) % 360; // 25°/s ≈ 14.4s per turn
        setAngle(angleRef.current);
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
      angleRef.current += dx * 0.5;
      setAngle(angleRef.current);
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

  // Hologram-style 3D rotation: rotateY for spin, slight rotateX for axis tilt.
  // We compress horizontally based on |sin(angle)| to fake the silhouette
  // narrowing as it turns 90° — gives true volumetric feel from a flat PNG.
  const rad = (angle * Math.PI) / 180;
  const compress = 0.45 + 0.55 * Math.abs(Math.cos(rad)); // 0.45 at 90°, 1 at 0°
  const yaw = Math.sin(rad) * 28; // ±28° rotateY illusion
  const tilt = -3; // subtle axis tilt for hologram feel

  return (
    <div
      onPointerDown={onDown}
      onWheel={onWheel}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
      style={bg}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1800px" }}
      >
        <img
          src={heroes[obraIndex]}
          alt=""
          draggable={false}
          className="max-h-[88vh] max-w-[60vw] object-contain"
          style={{
            transform: `rotateX(${tilt}deg) rotateY(${yaw}deg) scale(${scale}) scaleX(${compress})`,
            transformOrigin: "center center",
            transition: "transform 60ms linear",
            filter:
              bgMode === "dark"
                ? "drop-shadow(0 50px 90px rgba(0,0,0,0.85))"
                : "drop-shadow(0 35px 70px rgba(0,0,0,0.28))",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        />
      </div>
    </div>
  );
};
