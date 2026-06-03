const FAIRS = [
  "Art Basel", "Frieze", "ARCO Madrid", "TEFAF", "The Armory Show",
  "Art Madrid", "Zona Maco", "ArtRio", "Frieze London", "Art Dubai",
  "Art Basel Paris", "Frieze New York",
];

export const Ticker = () => {
  const row = (
    <div className="flex items-center shrink-0" style={{ paddingRight: 64 }}>
      {FAIRS.map((f, i) => (
        <span key={i} className="flex items-center">
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: 26 }}>{f}</span>
          <span style={{ color: "#999999", padding: "0 32px" }}>·</span>
        </span>
      ))}
    </div>
  );
  return (
    <section style={{ background: "#FFFFFF", padding: "72px 0" }}>
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
