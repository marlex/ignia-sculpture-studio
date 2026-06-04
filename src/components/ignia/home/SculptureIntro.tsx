import { useLang } from "@/i18n/LanguageContext";

export const SculptureIntro = () => {
  const lang = useLang();
  const t = lang === "es"
    ? {
        title: "El mundo de la escultura, de cerca.",
        body: "El primer global sculpture gallery dedicada exclusivamente a la escultura. Compra, vende y descubre obras de gran valor, con visualización 3D, certificados de autenticidad en blockchain y comisiones justas.",
        cta: "Solicitar invitación",
      }
    : {
        title: "The sculpture world, up close.",
        body: "The first global sculpture gallery dedicated exclusively to sculpture. Buy, sell and discover high-value works, with 3D visualization, blockchain authenticity certificates and fair commissions.",
        cta: "Request invitation",
      };
  return (

    <section
      style={{
        background: "#0A0A0A",
        padding: "clamp(64px, 9vw, 120px) clamp(24px, 6vw, 80px)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2
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
          El mundo de la escultura, de cerca.
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            fontSize: "clamp(18px, 1.8vw, 24px)",
            lineHeight: 1.45,
            marginTop: 24,
            marginBottom: 0,
            maxWidth: 820,
            marginInline: "auto",
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
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))}
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              background: "#FFFFFF",
              color: "#0A0A0A",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              display: "inline-block",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Solicitar invitación
          </button>
        </div>
      </div>
    </section>
  );
};
