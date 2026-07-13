interface SectionSeparatorProps {
  title: string;
  subtitle: string;
  cta?: string;
}

export const SectionSeparator = ({ title, subtitle, cta }: SectionSeparatorProps) => {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "180px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 32,
        minHeight: "60vh",
      }}
    >
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "clamp(36px, 4.5vw, 56px)",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1.1,
          letterSpacing: "0.01em",
          margin: 0,
          maxWidth: 900,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 500,
          fontSize: 19,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.6)",
          margin: 0,
          maxWidth: 640,
        }}
      >
        {subtitle}
      </p>
      {cta && (
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))}
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "16px 32px",
            background: "transparent",
            color: "#FFFFFF",
            border: "1px solid #FFFFFF",
            borderRadius: 0,
            cursor: "pointer",
transition: "opacity 250ms",
            marginTop: 8,
          }}
onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}

        >
          {cta}
        </button>
      )}
    </section>
  );
};
