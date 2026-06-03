export const HeroBanner = ({ onInvite, onCollection }: { onInvite: () => void; onCollection: () => void }) => {
  return (
    <div
      style={{
        background: "#0a0a0a",
        height: 56,
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 17,
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.02em",
        }}
      >
        La primera galería global de escultura.
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <button
          onClick={onInvite}
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: 10,
            color: "#FFFFFF",
            background: "transparent",
            border: "none",
            borderBottom: "0.5px solid rgba(255,255,255,0.35)",
            paddingBottom: 2,
            borderRadius: 0,
            cursor: "pointer",
          }}
        >
          Solicitar invitación
        </button>
        <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
        <button
          onClick={onCollection}
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            fontSize: 10,
            color: "rgba(255,255,255,0.25)",
            background: "transparent",
            border: "none",
            borderRadius: 0,
            cursor: "pointer",
          }}
        >
          Ver la colección
        </button>
      </div>
    </div>
  );
};
