export const FollowIgnia = () => {
  return (
    <section
      style={{
        background: "#0a0a0a",
        padding: "100px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 32,
      }}
    >
      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        FOLLOW IGNIA
      </span>

      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: 56,
          color: "rgba(255,255,255,0.88)",
          lineHeight: 1.1,
          letterSpacing: "0.01em",
          fontStyle: "normal",
          textTransform: "none",
          margin: 0,
        }}
      >
        The sculpture world, up close.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://www.instagram.com/igniagallery/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#fff",
            color: "#111111",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.13em",
            fontSize: 10,
            padding: "10px 24px",
            borderRadius: 0,
            border: "none",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          @ igniagallery
        </a>
        <a
          href="https://www.linkedin.com/company/igniagallery"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "transparent",
            border: "0.5px solid rgba(255,255,255,0.35)",
            color: "rgba(255,255,255,0.7)",
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.13em",
            fontSize: 10,
            padding: "10px 24px",
            borderRadius: 0,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          LinkedIn · Ignia Gallery
        </a>
      </div>

      <div
        style={{
          width: 40,
          height: 0.5,
          background: "rgba(255,255,255,0.12)",
          marginTop: 8,
        }}
      />

      <span
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: 11,
          color: "rgba(255,255,255,0.2)",
          letterSpacing: "0.04em",
        }}
      >
        igniagallery.com
      </span>
    </section>
  );
};
