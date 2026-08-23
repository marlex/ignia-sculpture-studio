import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import heroMacro from "@/assets/guidance-hero-macro.jpg";
import heroOpen from "@/assets/guidance-hero-open.jpg";

const OUTLINE_BTN_LIGHT: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  fontSize: 13,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  padding: "16px 32px",
  background: "transparent",
  color: "#FFFFFF",
  border: "1px solid #FFFFFF",
  borderRadius: 0,
  cursor: "pointer",
  transition: "opacity 250ms",
  display: "inline-block",
  textDecoration: "none",
};

const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "0.65"; };
const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "1"; };

export const GuidanceBanner = () => {
  const lang = useLang();
  const t = lang === "es" ? {
    title: "Guidance",
    subtitle: "Ignia le da a la escultura el lugar que se merece. Guidance pone esa excelencia al alcance de todos, curadores y advisors, cerca de escultores y coleccionistas.",
    cta: "Conocer Guidance",
  } : {
    title: "Guidance",
    subtitle: "Ignia gives sculpture the place it deserves. Guidance brings that excellence within reach for everyone, curators and advisors, close to sculptors and collectors.",
    cta: "Meet Guidance",
  };

  return (
    <section style={{ position: "relative", width: "100%", minHeight: 420, height: "60vh", overflow: "hidden", background: "#121212" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
          <img
            src={heroMacro}
            alt="Macro detail of sculpture texture"
            loading="lazy"
            width={1024}
            height={1536}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%)" }}
          />
        </div>
        <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
          <img
            src={heroOpen}
            alt="Open panoramic view of empty studio space"
            loading="lazy"
            width={1024}
            height={1536}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%)" }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: 1,
          background: "rgba(255,255,255,0.35)",
          transform: "translateX(-50%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.52)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: "#FFFFFF",
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          {t.title}
        </h2>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "#FFFFFF",
            fontSize: "clamp(15px, 1.6vw, 18px)",
            lineHeight: 1.7,
            maxWidth: 720,
            margin: "24px 0 0",
          }}
        >
          {t.subtitle}
        </p>
        <div style={{ marginTop: 36 }}>
          <Link to="/guidance" style={OUTLINE_BTN_LIGHT} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
};
