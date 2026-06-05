const ROWS = [
  { n: "I", t: "La escultura merece un escaparate a su altura.", d: "Tridimensional, global, sin las barreras que el mercado del arte lleva décadas imponiendo." },
  { n: "II", t: "Ver es creer.", d: "Una obra de escultura no se entiende desde una foto plana. En Ignia se gira, se examina, se previsualizas en tu espacio antes de decidir." },
  { n: "III", t: "Cada obra, certificada para siempre.", d: "Un registro en blockchain que viaja con la pieza aunque cambie de manos. La autenticidad no depende de nadie: está en la cadena." },
  { n: "IV", t: "Las reglas del juego, visibles desde el principio.", d: "Comisiones fijas y publicadas. Criterios de selección abiertos. Datos reales para quien crea y para quien colecciona." },
  { n: "V", t: "El conocimiento que el mercado nunca compartió.", d: "Guía experta para coleccionistas. Visibilidad y representación real para artistas que merecen llegar más lejos." },
  { n: "VI", t: "Solo escultura. Siempre.", d: "No un marketplace genérico con una sección de escultura. Una plataforma construida entera y exclusivamente para este formato." },
];

const DM = "'DM Serif Display', serif";
const CG = "'Cormorant Garamond', serif";

export const SeisPrincipios = () => {
  return (
    <section className="seis-principios w-full">
      <style>{`
        .sp-header { background:#fff; padding:100px 80px; display:flex; justify-content:space-between; align-items:center; gap:40px; border-bottom:0.5px solid #e0dbd3; }
        .sp-title { font-family:${DM}; font-style:italic; font-size:clamp(40px,4.5vw,58px); color:#111; line-height:1.1; max-width:600px; margin:0; font-weight:400; }
        .sp-title em { font-style:italic; color:#999; }
        .sp-vi { font-family:${DM}; font-size:200px; color:#e8e3db; line-height:0.85; font-style:normal; }
        .sp-row { display:grid; grid-template-columns:1fr 1fr; min-height:140px; }
        .sp-row.white { background:#fff; }
        .sp-row.black { background:#111; }
        .sp-left { padding:44px 60px 44px 80px; display:flex; align-items:center; gap:28px; }
        .sp-right { padding:44px 80px 44px 60px; display:flex; align-items:center; }
        .sp-row.white .sp-left { border-right:0.5px solid #e0dbd3; }
        .sp-row.black .sp-left { border-right:0.5px solid #222; }
        .sp-num { font-family:${DM}; font-size:110px; line-height:0.85; font-weight:400; }
        .sp-row.white .sp-num { color:#ddd8cf; }
        .sp-row.black .sp-num { color:#2a2a2a; }
        .sp-rt { font-family:${DM}; font-size:clamp(22px,1.8vw,24px); font-weight:400; line-height:1.25; margin:0; }
        .sp-row.white .sp-rt { color:#111; }
        .sp-row.black .sp-rt { color:#f0ebe0; }
        .sp-desc { font-family:${CG}; font-size:18px; font-weight:500; line-height:1.75; max-width:440px; margin:0; }
        .sp-row.white .sp-desc { color:#555; }
        .sp-row.black .sp-desc { color:#aaa; }
        @media (max-width:768px) {
          .sp-header { flex-direction:column; align-items:flex-start; padding:60px 24px; gap:24px; }
          .sp-vi { display:none; }
          .sp-row { grid-template-columns:1fr; min-height:0; }
          .sp-left, .sp-right { padding:36px 24px; }
          .sp-row.white .sp-left, .sp-row.black .sp-left { border-right:none; }
          .sp-num { font-size:72px; }
        }
      `}</style>
      <div className="sp-header">
        <h2 className="sp-title">Seis principios que definen un mundo <em>diferente</em> para la escultura.</h2>
        <div className="sp-vi" aria-hidden="true">VI</div>
      </div>
      {ROWS.map((r, i) => (
        <div key={r.n} className={`sp-row ${i % 2 === 0 ? "white" : "black"}`}>
          <div className="sp-left">
            <span className="sp-num">{r.n}</span>
            <h3 className="sp-rt">{r.t}</h3>
          </div>
          <div className="sp-right">
            <p className="sp-desc">{r.d}</p>
          </div>
        </div>
      ))}
    </section>
  );
};
