import { Link } from "react-router-dom";

export const SculptureIntro = () => {
  return (
    <section
      style={{
        background: "#FFFFFF",
        padding: "clamp(64px, 9vw, 120px) clamp(24px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            color: "#111111",
            fontSize: "clamp(36px, 5.4vw, 64px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          El mundo de la escultura, de cerca.
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: "rgba(17,17,17,0.8)",
            fontSize: "clamp(18px, 1.8vw, 24px)",
            lineHeight: 1.45,
            marginTop: 24,
            marginBottom: 0,
            maxWidth: 820,
          }}
        >
          El primer marketplace global dedicado exclusivamente a la escultura. Compra, vende y descubre obras contemporáneas — con visualización 3D, certificados de autenticidad en blockchain y comisiones desde el 12%.
        </p>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Link
            to="/coleccion"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "#FFFFFF",
              color: "#0A0A0A",
              border: "1px solid #FFFFFF",
              borderRadius: 0,
              textDecoration: "none",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Explorar la colección
          </Link>
          <Link
            to="/escultores"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "transparent",
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              borderRadius: 0,
              textDecoration: "none",
              display: "inline-block",
              transition: "background-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FFFFFF";
              e.currentTarget.style.color = "#0A0A0A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#FFFFFF";
            }}
          >
            Unirme como artista
          </Link>
        </div>
      </div>
    </section>
  );
};
