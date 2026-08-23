import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { CrossSellBlock } from "@/components/ignia/CrossSellBlock";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import heroMacro from "@/assets/guidance-hero-macro.jpg";
import heroOpen from "@/assets/guidance-hero-open.jpg";

const OUTLINE_BTN_DARK: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  fontSize: 13,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  padding: "16px 32px",
  background: "transparent",
  color: "#121212",
  border: "1px solid #121212",
  borderRadius: 0,
  cursor: "pointer",
  transition: "opacity 250ms",
  display: "inline-block",
  textDecoration: "none",
};

const OUTLINE_BTN_LIGHT: React.CSSProperties = {
  ...OUTLINE_BTN_DARK,
  color: "#FFFFFF",
  border: "1px solid #FFFFFF",
};

const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "0.65"; };
const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "1"; };

const H2_STYLE: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 600,
  color: "#121212",
  fontSize: "clamp(28px, 3.4vw, 40px)",
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
  margin: 0,
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 400,
  color: "#121212",
  fontSize: 16,
  lineHeight: 1.7,
};

const Guidance = () => {
  const lang = useLang();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es" ? {
    title: "Guidance.",
    subtitle: "Ignia le da a la escultura el lugar que se merece. Guidance pone esa excelencia al alcance de todos: curadores y advisors, cerca de escultores y coleccionistas.",
    whyTitle: "Por qué existe Guidance",
    whyBody: "Comprar escultura pide un ojo entrenado: el material cambia el precio, la técnica cambia el valor, y la procedencia (quién la hizo, dónde ha estado) puede cambiarlo todo. Guidance pone esa misma lectura experta al alcance de cualquier escultor o coleccionista, con el rigor de una institución y la cercanía de un aliado.",
    curatorsTitle: "Curadores",
    curatorsBody: "Antes de vender, antes de comprar, antes de decidir si una pieza vale lo que pide: un curador de Ignia la mira con el mismo criterio que aplicaría en una institución, y te dice exactamente qué ve.",
    curatorsCta: "Explorar Curadores →",
    advisorsTitle: "Advisors",
    advisorsBody: "El mercado de la escultura premia a quien sabe leerlo: pocas piezas comparables, mucho peso en el ojo de quien lo conoce. Un advisor de Ignia te da esa lectura antes de comprometer tu dinero.",
    advisorsCta: "Explorar Advisors →",
    wallStatement: "Ojos expertos sobre tu obra.",
    howTitle: "Cómo funciona",
    steps: [
      { label: "Paso 1", desc: "Explora perfiles." },
      { label: "Paso 2", desc: "Reserva una sesión privada." },
      { label: "Paso 3", desc: "O únete al foro — gratis, siempre." },
    ],
    trustBody: "Curadores y advisors son aliados de Ignia. Los conocemos de cerca: su trayectoria, su forma de trabajar, el cuidado que ponen en cada pieza, y en ellos delegamos algo tan valioso como la confianza de nuestros artistas y coleccionistas.",
    openTitle: "Solicitudes abiertas",
    openBody: "Estamos construyendo nuestra primera red de curadores y advisors.",
    openCta: "Aplica ahora.",
    applyCurator: "Aplicar como Curador",
    applyAdvisor: "Aplicar como Advisor",
    emailTitle: "Sé el primero en saber cuándo lanza Guidance",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    emailSubmit: "Suscribirse →",
    emailOk: "Gracias. Te avisamos en cuanto esté listo.",
    sending: "Enviando…",
    errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
  } : {
    title: "Guidance.",
    subtitle: "Ignia gives sculpture the place it deserves. Guidance brings that excellence within everyone's reach: curators and advisors, close to sculptors and collectors.",
    whyTitle: "Why Guidance exists",
    whyBody: "Buying sculpture demands a trained eye: material changes the price, technique changes the value, and provenance (who made it, where it has been) can change everything. Guidance puts that same expert reading within reach of any sculptor or collector, with the rigor of an institution and the closeness of an ally.",
    curatorsTitle: "Curators",
    curatorsBody: "Before selling, before buying, before deciding if a piece is worth what it asks: an Ignia curator looks at it with the same criteria they would apply in an institution, and tells you exactly what they see.",
    curatorsCta: "Explore Curators →",
    advisorsTitle: "Advisors",
    advisorsBody: "The sculpture market rewards those who know how to read it: few comparable pieces, a lot of weight in the eye of those who know it. An Ignia advisor gives you that reading before you commit your money.",
    advisorsCta: "Explore Advisors →",
    wallStatement: "Expert eyes on your work.",
    howTitle: "How it works",
    steps: [
      { label: "Step 1", desc: "Browse profiles." },
      { label: "Step 2", desc: "Book a private session." },
      { label: "Step 3", desc: "Or join the forum — free, always." },
    ],
    trustBody: "Curators and advisors are Ignia allies. We know them closely: their trajectory, their way of working, the care they put into each piece, and in them we delegate something as valuable as the trust of our artists and collectors.",
    openTitle: "Applications open",
    openBody: "We're building our first roster of curators and advisors.",
    openCta: "Apply now.",
    applyCurator: "Apply as Curator",
    applyAdvisor: "Apply as Advisor",
    emailTitle: "Be the first to know when Guidance launches",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    emailSubmit: "Subscribe →",
    emailOk: "Thank you. We'll let you know as soon as it's ready.",
    sending: "Sending…",
    errMsg: "There was an error sending. Please try again.",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xgobbeyp", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_type: "Guidance subscriber",
          source: "guidance",
          email,
        }),
      });
      if (res.ok) setSubmitted(true);
      else { const j = await res.json().catch(() => ({})); setError(j.error || t.errMsg); }
    } catch { setError(t.errMsg); }
    finally { setLoading(false); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #121212",
    outline: "none",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 400,
    color: "#121212",
    fontSize: 16,
    padding: "0 0 8px",
    borderRadius: 0,
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    fontSize: 14,
    color: "#121212",
    marginBottom: 12,
  };

  return (
    <div style={{ background: "#FFFFFF" }}>
      <Seo
        title={lang === "es" ? "Guidance — Curadores y advisors para escultores y coleccionistas | Ignia Institution" : "Guidance — Curators and advisors for sculptors and collectors | Ignia Institution"}
        description={lang === "es" ? "Accede a curadores y art advisors de confianza en Ignia: sesiones privadas, foro abierto y sin exclusividad institucional." : "Access trusted curators and art advisors at Ignia: private sessions, open forum, no institutional exclusivity."}
        path="/guidance"
      />
      <Header />

      {/* 1. HERO DÍPTICO */}
      <section style={{ position: "relative", width: "100%", height: "calc(100vh - 56px)", minHeight: 560, overflow: "hidden", background: "#121212" }}>
        <div
          className="guidance-diptych"
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
              loading="eager"
              width={1024}
              height={1536}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%)" }}
            />
          </div>
          <div style={{ position: "relative", overflow: "hidden", height: "100%" }}>
            <img
              src={heroOpen}
              alt="Open panoramic view of empty studio space"
              loading="eager"
              width={1024}
              height={1536}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%)" }}
            />
          </div>
        </div>
        {/* Línea vertical central */}
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
        {/* Overlay oscuro sutil para legibilidad */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.28)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />
        {/* Texto centrado */}
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
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: "#FFFFFF",
              fontSize: "clamp(64px, 12vw, 160px)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {t.title}
          </h1>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              color: "rgba(255,255,255,0.88)",
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: 1.7,
              maxWidth: 600,
              margin: "28px 0 0",
            }}
          >
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* 1b. POR QUÉ EXISTE GUIDANCE */}
      <section style={{ padding: "120px 24px", background: "#f5f5f5" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 28 }}>{t.whyTitle}</h2>
          <p style={{ ...BODY_STYLE, margin: 0 }}>{t.whyBody}</p>
        </div>
      </section>

      {/* 2. DOS COLUMNAS: CURATORS / ADVISORS */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div
          className="guidance-paths"
          style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 32, lineHeight: 1.15, margin: 0 }}>
              {t.curatorsTitle}
            </h3>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.7, margin: "16px 0 0" }}>
              {t.curatorsBody}
            </p>
            <div style={{ marginTop: 32 }}>
              <Link to="/join/curadores" style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                {t.curatorsCta}
              </Link>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 32, lineHeight: 1.15, margin: 0 }}>
              {t.advisorsTitle}
            </h3>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.7, margin: "16px 0 0" }}>
              {t.advisorsBody}
            </p>
            <div style={{ marginTop: 32 }}>
              <Link to="/join/advisors" style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                {t.advisorsCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BLOQUE TIPOGRÁFICO A SANGRE */}
      <section
        style={{
          background: "#121212",
          width: "100%",
          overflow: "hidden",
          padding: "clamp(80px, 14vw, 160px) 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: "#FFFFFF",
            fontSize: "clamp(42px, 8.5vw, 118px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            margin: 0,
            textAlign: "center",
            padding: "0 24px",
            textWrap: "balance",
            overflowWrap: "break-word",
            maxWidth: "100%",
          }}
        >
          {t.wallStatement}
        </h2>
      </section>

      {/* 4. HOW IT WORKS — 3 PASOS */}
      <section style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 56, textAlign: "center" }}>{t.howTitle}</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Manrope, sans-serif", color: "#121212" }}>
            <tbody>
              {t.steps.map((step, i) => (
                <tr key={i} style={{ borderTop: "1px solid #121212", borderBottom: "1px solid #121212" }}>
                  <td style={{ padding: "24px 8px", fontWeight: 600, fontSize: 26, fontFamily: "'Cormorant Garamond', serif" }}>{step.label}</td>
                  <td style={{ padding: "24px 8px", fontWeight: 400, fontSize: 16, textAlign: "right" }}>{step.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4b. ALIADOS DE IGNIA */}
      <section style={{ padding: "0 24px 120px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p style={{ ...BODY_STYLE, margin: 0 }}>{t.trustBody}</p>
        </div>
      </section>

      {/* 5. APPLICATIONS OPEN — BLOQUE NEGRO */}
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
            fontWeight: 600,
            fontSize: "clamp(36px, 4.5vw, 56px)",
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          {t.openTitle}
        </h2>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: 17,
            color: "rgba(255,255,255,0.70)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: 0,
          }}
        >
          {t.openBody}
        </p>
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: 14,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.6,
            maxWidth: 560,
            margin: 0,
          }}
        >
          {t.openCta}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 16 }}>
          <Link to="/join/curadores" style={OUTLINE_BTN_LIGHT} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            {t.applyCurator}
          </Link>
          <Link to="/join/advisors" style={OUTLINE_BTN_LIGHT} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            {t.applyAdvisor}
          </Link>
        </div>
      </section>

      {/* CROSS-SELL */}
      <CrossSellBlock exclude={["curators", "advisors"]} />

      {/* 6. EMAIL FORM */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 48, textAlign: "center" }}>{t.emailTitle}</h2>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 24, marginBottom: 12 }}>
                {t.emailOk}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="guidance-email">{t.emailLabel}</label>
                <input
                  id="guidance-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  placeholder={t.emailPlaceholder}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
              {error && (
                <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#B00020", fontSize: 14, marginBottom: 16 }}>{error}</p>
              )}
              <div style={{ textAlign: "center" }}>
                <button type="submit" disabled={loading} style={{ ...OUTLINE_BTN_DARK, opacity: loading ? 0.5 : 1 }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                  {loading ? t.sending : t.emailSubmit}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .guidance-diptych { grid-template-columns: 1fr !important; grid-template-rows: 1fr 1fr !important; }
          .guidance-paths { grid-template-columns: 1fr !important; gap: 64px !important; }
        }
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Guidance;
