export const HeroBanner = (_props: { onInvite?: () => void; onCollection?: () => void }) => {
  return (
    <div
      style={{
        background: "#000000",
        minHeight: 96,
        padding: "60px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(22px, 3vw, 44px)",
          color: "#FFFFFF",
          letterSpacing: "0.01em",
          lineHeight: 1.1,
          textAlign: "center",
        }}
      >
        Ignia es la primera galería global de escultura.
      </span>
    </div>
  );
};
