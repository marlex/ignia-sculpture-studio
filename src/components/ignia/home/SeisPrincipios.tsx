const ROWS = [
  { n: "I", t: "La escultura merece un escaparate a su altura.", d: "Tridimensional, global, sin las barreras que el mercado del arte lleva décadas imponiendo." },
  { n: "II", t: "Ver es creer.", d: "Una obra de escultura no se entiende desde una foto plana. En Ignia se gira, se examina, se previsualizas en tu espacio antes de decidir." },
  { n: "III", t: "Cada obra, certificada para siempre.", d: "Un registro en blockchain que viaja con la pieza aunque cambie de manos. La autenticidad no depende de nadie: está en la cadena." },
  { n: "IV", t: "Las reglas del juego, visibles desde el principio.", d: "Comisiones fijas y publicadas. Criterios de selección abiertos. Datos reales para quien crea y para quien colecciona." },
  { n: "V", t: "El conocimiento que el mercado nunca compartió.", d: "Guía experta para coleccionistas. Visibilidad y representación real para artistas que merecen llegar más lejos." },
  { n: "VI", t: "Solo escultura. Siempre.", d: "No un marketplace genérico con una sección de escultura. Una plataforma construida entera y exclusivamente para este formato." },
];

const CG = "'Cormorant Garamond', serif";
const MAN = "Manrope, sans-serif";

export const SeisPrincipios = () => {
  return (
    <section className="seis-principios w-full bg-white">
      <style>{`
        .sp-wrap { max-width:1280px; margin:0 auto; padding:0 40px; }
        .sp-header { display:flex; align-items:flex-end; gap:40px; padding:100px 0 80px; border-bottom:1px solid #e8e3db; }
        .sp-vi { font-family:${CG}; font-weight:300; font-size:180px; color:#d9d2c4; line-height:0.85; flex-shrink:0; letter-spacing:-0.02em; }
        .sp-title { font-family:${CG}; font-weight:300; font-size:clamp(32px,4.5vw,48px); color:#111; line-height:1.1; margin:0; letter-spacing:-0.02em; }
        .sp-grid { display:grid; grid-template-columns:1fr 1fr; }
        .sp-cell { padding:56px 60px; position:relative; }
        .sp-cell:nth-child(odd) { padding-left:0; border-right:1px solid #e8e3db; }
        .sp-cell:nth-child(even) { padding-right:0; }
        .sp-cell:nth-child(n+3) { border-top:1px solid #e8e3db; }
        .sp-num { font-family:${CG}; font-weight:300; font-size:23px; letter-spacing:0.15em; color:#b8b0a0; margin:0 0 28px; }
        .sp-rt { font-family:${CG}; font-size:22px; font-weight:400; line-height:1.3; color:#111; margin:0 0 20px; }
        .sp-desc { font-family:${MAN}; font-size:16px; font-weight:500; line-height:1.7; color:#777; margin:0; max-width:460px; }
        @media (max-width:768px) {
          .sp-wrap { padding:0 24px; }
          .sp-header { flex-direction:column; gap:24px; padding:60px 0 40px; }
          .sp-vi { display:none; }
          .sp-grid { grid-template-columns:1fr; }
          .sp-cell, .sp-cell:nth-child(odd), .sp-cell:nth-child(even) { padding:40px 0; border-right:none; }
          .sp-cell + .sp-cell { border-top:1px solid #e8e3db; }
        }
      `}</style>
      <div className="sp-wrap">
        <div className="sp-header">
          <div className="sp-vi" aria-hidden="true">VI</div>
          <h2 className="sp-title">Seis principios que definen un mundo diferente para la escultura.</h2>
        </div>
        <div className="sp-grid">
          {ROWS.map((r) => (
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
