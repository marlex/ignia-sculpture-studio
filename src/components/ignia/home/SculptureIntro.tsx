import { useLang } from "@/i18n/LanguageContext";

export const SculptureIntro = () => {
  const lang = useLang();
  const t = lang === "es"
    ? {
        title: "El mundo de la escultura, de cerca.",
        body: "La primera galería global dedicada exclusivamente a la escultura. Compra, vende y descubre obras de gran valor, con visualización 3D, certificados de autenticidad en blockchain y comisiones justas.",
        cta: "Únete a Ignia",
      }
    : {
        title: "The sculpture world, up close.",
        body: "The first global sculpture gallery dedicated exclusively to sculpture. Buy, sell and discover high-value works, with 3D visualization, blockchain authenticity certificates and fair commissions.",
        cta: "Join Ignia",
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
            fontWeight: 400,
            fontSize: 56,
            color: "rgba(255,255,255,0.88)",
            lineHeight: 1.1,
            letterSpacing: "0.01em",
            fontStyle: "normal",
            textTransform: "none",
            margin: 0,
          }}
        >
          {t.title}
        </h2>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "rgba(255,255,255,0.8)",
            fontSize: 16,
            lineHeight: 1.55,
            marginTop: 24,
            marginBottom: 0,
            maxWidth: 820,
            marginInline: "auto",
          }}
        >
          {t.body}
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
              fontWeight: 400,
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
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
};
