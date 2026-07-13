const ITEMS = [
  "Art Basel", "Frieze", "Arco Madrid", "TEFAF", "The Armory Show",
  "Art Madrid", "Zona Maco", "ArtRio", "Frieze London", "Art Dubai",
  "Art Basel Paris", "Frieze New York",
];

export const LogosTicker = () => {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div style={{ background: "#FFFFFF", borderBottom: "0.5px solid #E5E5E5", padding: "16px 0", borderRadius: 0 }}>
      <style>{`
        @keyframes ignia-logos-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ignia-logos-track { display: inline-flex; animation: ignia-logos-scroll 30s linear infinite; }
        .ignia-logos-wrap:hover .ignia-logos-track { animation-play-state: paused; }
      `}</style>
      <div
        style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          fontSize: 10,
          color: "#999999",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        El mundo de la escultura
      </div>
      <div className="ignia-logos-wrap" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <div className="ignia-logos-track">
          {row.map((it, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 600,
                  color: "#BBBBBB",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0 28px",
                }}
              >
                {it}
              </span>
              <span style={{ color: "#DDDDDD" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
