import { useLang } from "@/i18n/LanguageContext";

const FAIRS = [
  "Art Basel",
  "Frieze",
  "ARCO Madrid",
  "TEFAF",
  "The Armory Show",
  "Art Madrid",
  "Zona Maco",
  "ArtRio",
  "Frieze London",
  "Art Dubai",
  "Art Basel Paris",
  "Frieze New York",
];

export const Ticker = () => {
  const lang = useLang();
  const presentIn = lang === "es" ? "Presentes en" : "Present in";

  const row = (
    <div className="flex items-center shrink-0 ticker-row">
      {FAIRS.map((f, i) => (
        <span key={i} className="flex items-center">
          <span
            className="ticker-item"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              color: "#111111",
              fontSize: 31,
              whiteSpace: "nowrap",
            }}
          >
            {f}
          </span>
          <span style={{ color: "#999999", padding: "0 32px" }}>·</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="ticker-section" style={{ background: "#f5f5f5", padding: "72px 0" }}>
      <div className="flex items-center" style={{ width: "100%" }}>
        {/* Static title */}
        <div
          className="flex items-center"
          style={{ paddingLeft: 24, paddingRight: 24, flexShrink: 0 }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 21,
              color: "rgba(17, 17, 17, 0.45)",
              whiteSpace: "nowrap",
            }}
          >
            {presentIn}
          </span>
        </div>
        {/* Divider line */}
        <div
          style={{
            width: 1,
            height: 14,
            background: "rgba(153, 153, 153, 0.4)",
            flexShrink: 0,
          }}
        />
        {/* Gap between divider and marquee */}
        <div style={{ width: 24, flexShrink: 0 }} />
        {/* Marquee */}
        <div className="overflow-hidden ticker-wrap" style={{ flex: 1 }}>
          <div className="flex ticker-track" style={{ whiteSpace: "nowrap" }}>
            {row}
            {row}
          </div>
        </div>
      </div>
      <style>{`
        .ticker-track { animation: tickermove 45s linear infinite; width: max-content; }
        .ticker-wrap:hover .ticker-track { animation-play-state: paused; }
        @keyframes tickermove { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @media (max-width: 768px) {
          .ticker-section { padding: 32px 0 !important; }
          .ticker-item { font-size: 25px !important; }
        }
      `}</style>
    </section>
  );
};
