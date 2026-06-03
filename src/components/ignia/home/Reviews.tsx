import { useFadeUp } from "@/hooks/useFadeUp";

const CITAS = [
  { q: "Por primera vez pude mostrarle a un coleccionista la escultura en su propio espacio antes de enviársela. Eso cambió completamente cómo vendo.", n: "Elena V.", r: "Escultora, Madrid" },
  { q: "Las galerías se quedan con el 50% y no comparten ningún dato. Ignia se queda con el 15% y me da todo: quién vio mi obra, desde dónde y cuándo.", n: "Sofía R.", r: "Escultora, Buenos Aires" },
];

export const Reviews = () => {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section style={{ background: "#FFFFFF", padding: "120px 24px" }}>
      <div ref={ref} className="max-w-[1180px] mx-auto">
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: "clamp(30px,4vw,44px)", lineHeight: 1.1, marginBottom: 72, letterSpacing: "-0.02em" }}>
          Lo que dicen sobre Ignia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {CITAS.map((c, i) => (
            <figure key={i} style={{ position: "relative", paddingLeft: 4 }}>
              <div aria-hidden style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: 72, lineHeight: 0.6, marginBottom: 24, opacity: 0.25 }}>
                &ldquo;
              </div>
              <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: "italic", color: "#111111", fontSize: "clamp(20px,1.6vw,24px)", lineHeight: 1.55, letterSpacing: "-0.005em", margin: 0 }}>
                {c.q}
              </blockquote>
              <div style={{ height: 1, background: "#111111", opacity: 0.12, width: 48, margin: "40px 0 20px" }} />
              <figcaption>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, color: "#111111", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.n}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 13, marginTop: 6, letterSpacing: "0.02em" }}>{c.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
