import { useLang } from "@/i18n/LanguageContext";

const ROWS = {
  es: [
    { n: "I", t: "La escultura merece un escaparate a su altura.", d: "Tridimensional, global, sin las barreras que el mercado del arte lleva décadas imponiendo." },
    { n: "II", t: "Ver es creer.", d: "Una obra de escultura no se entiende desde una foto plana. En Ignia se gira, se examina, se previsualizas en tu espacio antes de decidir." },
    { n: "III", t: "Cada obra, certificada para siempre.", d: "Un registro en blockchain que viaja con la pieza aunque cambie de manos. La autenticidad no depende de nadie: está en la cadena." },
    { n: "IV", t: "Las reglas del juego, visibles desde el principio.", d: "Comisiones fijas y publicadas. Criterios de selección abiertos. Datos reales para quien crea y para quien colecciona." },
    { n: "V", t: "El conocimiento que el mercado nunca compartió.", d: "Guía experta para coleccionistas. Visibilidad y representación real para artistas que merecen llegar más lejos." },
    { n: "VI", t: "Solo escultura. Siempre.", d: "No un marketplace genérico con una sección de escultura. Una plataforma construida entera y exclusivamente para este formato." },
  ],
  en: [
    { n: "I", t: "Sculpture deserves a stage worthy of it.", d: "Three-dimensional, global, free from the barriers the art market has imposed for decades." },
    { n: "II", t: "Seeing is believing.", d: "A sculpture cannot be understood from a flat photo. On Ignia you rotate it, examine it and preview it in your own space before deciding." },
    { n: "III", t: "Every work, certified forever.", d: "A blockchain record that travels with the piece even as it changes hands. Authenticity depends on no one: it lives on the chain." },
    { n: "IV", t: "The rules of the game, visible from day one.", d: "Fixed, published commissions. Open selection criteria. Real data for those who create and those who collect." },
    { n: "V", t: "The knowledge the market never shared.", d: "Expert guidance for collectors. Genuine visibility and representation for artists who deserve to go further." },
    { n: "VI", t: "Only sculpture. Always.", d: "Not a generic marketplace with a sculpture section. A platform built entirely and exclusively for this format." },
  ],
};

const TITLE = {
  es: "Seis principios que definen un mundo diferente para la escultura.",
  en: "Six principles that define a different world for sculpture.",
};

const CG = "'Cormorant Garamond', serif";
const MAN = "Manrope, sans-serif";

export const SeisPrincipios = () => {
  const lang = useLang();
  const rows = ROWS[lang];
  return (
    <section className="seis-principios w-full bg-[#fafaf7]">
      <style>{`
        .sp-wrap { max-width:1240px; margin:0 auto; padding:140px 40px 160px; }
        .sp-eyebrow { font-family:${MAN}; font-size:11px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase; color:#9a9485; margin:0 0 32px; }
        .sp-title { font-family:${CG}; font-weight:700; font-size:clamp(40px,5vw,64px); color:#111; line-height:1.05; letter-spacing:-0.02em; margin:0 0 120px; }
        .sp-title em { font-style:italic; font-weight:700; color:#8a8270; }
        .sp-grid { display:grid; grid-template-columns:repeat(2,1fr); column-gap:120px; row-gap:96px; }
        .sp-cell { display:grid; grid-template-columns:80px 1fr; column-gap:32px; align-items:start; }
        .sp-num { font-family:${CG}; font-weight:400; font-style:italic; font-size:56px; color:#c9c0ac; margin:0; line-height:1; letter-spacing:0; padding-top:4px; }
        .sp-body { min-width:0; }
        .sp-rt { font-family:${CG}; font-size:30px; font-weight:700; line-height:1.25; color:#111; margin:0 0 18px; letter-spacing:-0.01em; max-width:24ch; }
        .sp-desc { font-family:${MAN}; font-size:15px; font-weight:400; line-height:1.7; color:#5a5648; margin:0; max-width:42ch; }
        @media (max-width:900px) {
          .sp-wrap { padding:80px 24px 100px; }
          .sp-title { margin-bottom:72px; }
          .sp-grid { grid-template-columns:1fr; column-gap:0; row-gap:64px; }
          .sp-cell { grid-template-columns:56px 1fr; column-gap:20px; }
          .sp-num { font-size:42px; }
          .sp-rt { font-size:26px; }
        }
      `}</style>
      <div className="sp-wrap">
        <p className="sp-eyebrow">{lang === "es" ? "Manifiesto · Seis principios" : "Manifesto · Six principles"}</p>
        <h2 className="sp-title">{TITLE[lang]}</h2>
        <div className="sp-grid">
          {rows.map((r) => (
            <div key={r.n} className="sp-cell">
              <p className="sp-num">{r.n}</p>
              <div className="sp-body">
                <h3 className="sp-rt">{r.t}</h3>
                <p className="sp-desc">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
