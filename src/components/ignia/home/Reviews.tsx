import { useFadeUp } from "@/hooks/useFadeUp";

const CITAS = [
  { q: "Por primera vez pude mostrarle a un coleccionista la escultura en su propio espacio antes de enviársela. Eso cambió completamente cómo vendo.", n: "Elena V.", r: "Escultora, Madrid" },
  { q: "Entré a Ignia Aprende sin intención de comprar. Salí con dos piezas que quería tener.", n: "Roberto M.", r: "Interiorista, Barcelona" },
  { q: "Las galerías se quedan con el 50% y no comparten ningún dato. Ignia se queda con el 15% y me da todo: quién vio mi obra, desde dónde y cuándo.", n: "Sofía R.", r: "Escultora, Buenos Aires" },
];

export const Reviews = () => {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section style={{ background: "#F5F5F5", padding: "100px 24px" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto">
        <h2 style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 700, color: "#111111", fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.1, marginBottom: 56, letterSpacing: "-0.02em" }}>
          Lo que dicen sobre Ignia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CITAS.map((c, i) => (
            <article key={i} style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", padding: 40, position: "relative" }}>
              <div aria-hidden style={{ position: "absolute", top: 16, left: 24, fontFamily: "Urbanist, sans-serif", fontWeight: 700, color: "#111111", opacity: 0.08, fontSize: 64, lineHeight: 1 }}>
                "
              </div>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontStyle: "italic", color: "#111111", fontSize: 17, lineHeight: 1.8, position: "relative" }}>
                {c.q}
              </p>
              <div style={{ height: 1, background: "#E5E5E5", margin: "32px 0 24px" }} />
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, color: "#111111", fontSize: 14 }}>{c.n}</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#666666", fontSize: 13, marginTop: 4 }}>{c.r}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
