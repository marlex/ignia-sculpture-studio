const FAIRS = [
  "Art Basel", "Frieze", "ARCO Madrid", "TEFAF", "The Armory Show",
  "Art Madrid", "Zona Maco", "ArtRio", "Frieze London", "Art Dubai",
  "Art Basel Paris", "Frieze New York",
];

export const Ticker = () => {
  const row = (
    <div className="flex items-center shrink-0" style={{ paddingRight: 48 }}>
      {FAIRS.map((f, i) => (
        <span key={i} className="flex items-center">
          <span style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 700, color: "#111111", fontSize: 18 }}>{f}</span>
          {i < FAIRS.length - 1 && <span style={{ color: "#666666", padding: "0 24px" }}>·</span>}
          {i === FAIRS.length - 1 && <span style={{ color: "#666666", padding: "0 24px" }}>·</span>}
        </span>
      ))}
    </div>
  );
  return (
    <section style={{ background: "#FFFFFF", padding: "24px 0", borderTop: "1px solid #E5E5E5", borderBottom: "1px solid #E5E5E5" }}>
      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "#666666", textAlign: "center", marginBottom: 16 }}>
        El mundo de la escultura se mueve aquí
      </div>
      <div className="overflow-hidden ticker-wrap">
        <div className="flex ticker-track">
          {row}{row}
        </div>
      </div>
      <style>{`
        .ticker-track { animation: tickermove 45s linear infinite; width: max-content; }
        .ticker-wrap:hover .ticker-track { animation-play-state: paused; }
        @keyframes tickermove { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </section>
  );
};
