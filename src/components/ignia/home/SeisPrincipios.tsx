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
    <section className="seis-principios w-full bg-white">
      <style>{`
        .sp-wrap { max-width:1280px; margin:0 auto; padding:0 40px; }
        .sp-header { display:flex; align-items:flex-end; gap:40px; padding:100px 0 80px; border-bottom:1px solid #e8e3db; }
        .sp-vi { font-family:${CG}; font-weight:700; font-size:180px; color:#d9d2c4; line-height:0.78; flex-shrink:0; letter-spacing:-0.02em; margin-bottom:-0.08em; }
        .sp-title { font-family:${CG}; font-weight:700; font-size:clamp(32px,4.5vw,48px); color:#111; line-height:1.1; margin:0; letter-spacing:-0.02em; }
        .sp-grid { display:grid; grid-template-columns:2fr 3fr; column-gap:200px; row-gap:120px; }
        .sp-cell { padding:0; position:relative; }
        .sp-num { font-family:${CG}; font-weight:700; font-size:48px; letter-spacing:0.08em; color:#d9d2c4; margin:0 0 18px; line-height:1; }
        .sp-rt { font-family:${CG}; font-size:28px; font-weight:700; line-height:1.3; color:#111; margin:0 0 12px; }
        .sp-rt--featured { font-size:32px; }
        .sp-desc { font-family:${MAN}; font-size:16px; font-weight:500; line-height:1.6; color:#777; margin:0; max-width:460px; }
        @media (max-width:768px) {
          .sp-wrap { padding:0 24px; }
          .sp-header { flex-direction:column; gap:24px; padding:60px 0 40px; }
          .sp-vi { display:none; }
          .sp-grid { grid-template-columns:1fr; column-gap:0; row-gap:100px; }
          .sp-cell { padding:0; }
          .sp-rt { font-size:26px; }
          .sp-rt--featured { font-size:28px; }
        }
      `}</style>
      <div className="sp-wrap">
        <div className="sp-header">
          <div className="sp-vi" aria-hidden="true">VI</div>
          <h2 className="sp-title">{TITLE[lang]}</h2>
        </div>
        <div className="sp-grid">
          {rows.map((r) => (
            <div key={r.n} className="sp-cell">
              <p className="sp-num">{r.n}</p>
              <h3 className="sp-rt">{r.t}</h3>
              <p className="sp-desc">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
