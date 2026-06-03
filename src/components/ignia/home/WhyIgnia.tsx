import { useFadeUp } from "@/hooks/useFadeUp";

const BLOCKS = [
  { n: "01", t: "Ve la obra desde todos los ángulos", d: "Visor 3D interactivo en cada pieza. Gira, examina, entiende la escala real antes de comprar. Sin fotos planas." },
  { n: "02", t: "Prueba de propiedad permanente", d: "Certificado blockchain vía Verisart en cada venta. El historial de propiedad viaja con la pieza para siempre, incluso en reventas futuras." },
  { n: "03", t: "Un modelo económico justo por diseño", d: "Los artistas se quedan con el 82–85% de cada venta. Sin exclusividad. Sin letra pequeña. Las comisiones más bajas del mercado, publicadas desde el primer día." },
];

export const WhyIgnia = () => {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section style={{ background: "#111111", padding: "100px 24px" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#FFFFFF", fontSize: "clamp(32px,4.5vw,48px)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 72, maxWidth: 780 }}>
          Construida para la escultura. Solo para eso.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <div key={b.n} style={{ padding: "0 40px", borderLeft: i === 0 ? "none" : "1px solid #333333" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#FFFFFF", opacity: 0.15, fontSize: 80, lineHeight: 1, marginBottom: 24 }}>
                {b.n}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#FFFFFF", fontSize: 22, lineHeight: 1.25, marginBottom: 16 }}>
                {b.t}
              </h3>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.7 }}>
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
