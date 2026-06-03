export const HeroBanner = ({ onInvite, onCollection }: { onInvite: () => void; onCollection: () => void }) => {
  const btnStyle: React.CSSProperties = {
    background: "#111111",
    color: "#FFFFFF",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.13em",
    fontSize: 10,
    padding: "8px 18px",
    border: "none",
    borderRadius: 0,
    cursor: "pointer",
    boxShadow: "none",
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        height: 64,
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "0.5px solid #E5E5E5",
        borderBottom: "0.5px solid #E5E5E5",
        borderRadius: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 17,
          color: "#111111",
          letterSpacing: "0.02em",
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
