export const HeroBanner = ({ onInvite }: { onInvite: () => void; onCollection?: () => void }) => {
  return (
    <div
      style={{
        background: "#FFFFFF",
        minHeight: 96,
        padding: "40px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "0.5px solid #E5E5E5",
        borderBottom: "0.5px solid #E5E5E5",
        borderRadius: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(22px, 3vw, 44px)",
            color: "#111111",
            letterSpacing: "0.01em",
            lineHeight: 1.1,
          }}
        >
          La primera galería global de escultura.
        </span>
        <button
          onClick={onInvite}
          style={{
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
            whiteSpace: "nowrap",
          }}
        >
          Solicitar invitación
        </button>
      </div>
    </div>
  );
};
