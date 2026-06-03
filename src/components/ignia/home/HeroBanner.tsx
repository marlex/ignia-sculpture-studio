export const HeroBanner = ({ onInvite, onCollection }: { onInvite: () => void; onCollection: () => void }) => {
  const btnStyle: React.CSSProperties = {
    background: "#111111",
    color: "#FFFFFF",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.13em",
    fontSize: 11,
    padding: "10px 20px",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        height: 64,
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #E0E0E0",
        borderBottom: "1px solid #E0E0E0",
        borderRadius: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 18,
          color: "#111111",
          letterSpacing: "0.01em",
          lineHeight: 1,
        }}
      >
        La primera galería global de escultura.
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onInvite} style={btnStyle}>Solicitar invitación</button>
        <button onClick={onCollection} style={btnStyle}>Ver la colección</button>
      </div>
    </div>
  );
};
