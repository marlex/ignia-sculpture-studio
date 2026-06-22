interface SectionSeparatorProps {
  title: string;
  subtitle: string;
}

export const SectionSeparator = ({ title, subtitle }: SectionSeparatorProps) => {
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
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.6)",
          margin: 0,
          maxWidth: 640,
        }}
      >
        {subtitle}
      </p>
    </section>
  );
};
