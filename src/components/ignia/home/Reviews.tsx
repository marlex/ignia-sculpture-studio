import { useFadeUp } from "@/hooks/useFadeUp";
import { useLang } from "@/i18n/LanguageContext";

const CITAS = {
  es: [
    { q: "Por primera vez pude mostrarle a un coleccionista la escultura en su propio espacio antes de enviársela. Eso cambió completamente cómo vendo.", n: "Elena V.", r: "Escultora, Madrid" },
    { q: "Las galerías se quedan con el 50% y no comparten ningún dato. Ignia se queda con el 15% y me da todo: quién vio mi obra, desde dónde y cuándo.", n: "Sofía R.", r: "Escultora, Buenos Aires" },
  ],
  en: [
    { q: "For the first time I could show a collector the sculpture in their own space before shipping it. That completely changed how I sell.", n: "Elena V.", r: "Sculptor, Madrid" },
    { q: "Galleries take 50% and share no data. Ignia takes 15% and gives me everything: who saw my work, from where and when.", n: "Sofía R.", r: "Sculptor, Buenos Aires" },
  ],
};

const CITAS_COLECCIONISTAS = {
  es: [
    { q: "Comprar escultura siempre fue un acto de fe: fotos en JPEG y medidas en un email. Ver la pieza a escala real en mi salón antes de decidir es otra liga.", n: "Carlos M.", r: "Coleccionista, Barcelona" },
    { q: "Lo que más valoro es la trazabilidad: ficha del artista, procedencia, certificado y conversación directa sin intermediarios. Por fin se compra arte como debería comprarse.", n: "Andrea L.", r: "Coleccionista privada, Ciudad de México" },
  ],
  en: [
    { q: "Buying sculpture was always an act of faith: JPEG photos and measurements in an email. Seeing the piece at real scale in my living room before deciding is another league.", n: "Carlos M.", r: "Collector, Barcelona" },
    { q: "What I value most is traceability: artist file, provenance, certificate and a direct conversation with no middlemen. Art finally bought the way it should be.", n: "Andrea L.", r: "Private collector, Mexico City" },
  ],
};

const Block = ({ title, citas }: { title: string; citas: { q: string; n: string; r: string }[] }) => {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <div ref={ref}>
      <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-8">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {citas.map((c, i) => (
          <figure key={i} style={{ position: "relative", paddingLeft: 4 }}>
            <div aria-hidden style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 72, lineHeight: 0.6, marginBottom: 24, opacity: 0.25 }}>
              &ldquo;
            </div>
            <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: "clamp(22px,2vw,30px)", lineHeight: 1.45, letterSpacing: "-0.005em", margin: 0 }}>
              {c.q}
            </blockquote>

            <div style={{ height: 1, background: "#121212", opacity: 0.12, width: 48, margin: "40px 0 20px" }} />
            <figcaption>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600, color: "#121212", fontSize: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.n}</div>
              <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, marginTop: 6, letterSpacing: "0.02em" }}>{c.r}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export const Reviews = () => {
  const lang = useLang();
  const title = lang === "es" ? "Lo que dicen sobre Ignia" : "What they say about Ignia";
  return (
    <section className="reviews-section bg-white px-6 md:px-12 py-[60px]">
      <Block title={title} citas={CITAS[lang]} />
    </section>
  );
};
