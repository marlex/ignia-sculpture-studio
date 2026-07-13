import { useEffect, useRef } from "react";
import { useFadeUp } from "@/hooks/useFadeUp";

const ITEMS: { value: string; label: string; animate?: number; prefix?: string; suffix?: string }[] = [
  { value: "$7.9B", label: "Mercado global de escultura en 2024", animate: 7.9, prefix: "$", suffix: "B" },
  { value: "15–18%", label: "La comisión más baja del mercado" },
  { value: "82–85%", label: "Lo que se queda el artista en cada venta" },
  { value: "0", label: "Barreras de entrada. Sin galería requerida.", animate: 0 },
];

const AnimNum = ({ raw }: { raw: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // parse leading number in raw
    const m = raw.match(/([\d.,]+)/);
    if (!m) { el.textContent = raw; return; }
    const numStr = m[1].replace(",", ".");
    const target = parseFloat(numStr);
    if (isNaN(target)) { el.textContent = raw; return; }
    const before = raw.slice(0, m.index!);
    const after = raw.slice(m.index! + m[1].length);
    el.textContent = before + "0" + after;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = target * eased;
          const txt = Number.isInteger(target) ? String(Math.round(v)) : v.toFixed(1);
          el.textContent = before + txt + after;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [raw]);
  return <span ref={ref}>{raw}</span>;
};

export const Stats = () => {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 24px" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4">
        {ITEMS.map((it, i) => (
          <div key={i} style={{ padding: "24px 28px", borderLeft: i === 0 ? "none" : "1px solid #E5E5E5" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: "clamp(40px,5vw,64px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
              <AnimNum raw={it.value} />
            </div>
            <div style={{ marginTop: 16, fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.5 }}>
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
