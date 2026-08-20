import { useState } from "react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import imgMarmol from "@/assets/curador-marmol.jpg";
import imgBronce from "@/assets/curador-bronce.jpg";
import imgTalla from "@/assets/curador-talla.jpg";
import imgCeramica from "@/assets/curador-ceramica.jpg";
import imgPiedra from "@/assets/curador-piedra.jpg";
import imgAcero from "@/assets/curador-acero.jpg";

const OUTLINE_BTN_DARK: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 600,
  fontSize: 12,
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

const JoinCuradores = () => {
  const lang = useLang();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [credentials, setCredentials] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const t = lang === "es" ? {
    heroTitle: "Curadores, sumen su criterio a Ignia.",
    heroSub: "Sesiones privadas de pago. Foro abierto. Ustedes deciden su disponibilidad.",
    cta: "Aplicar como curador/a →",
    why1: { title: "Acceso directo a escultores.", text: "Sin intermediarios institucionales." },
    why2: { title: "Agenda flexible.", text: "Ustedes definen su disponibilidad y tarifa por sesión." },
    why3: { title: "Sin exclusividad ni cuota fija.", text: "Cobran por sesión realizada, Ignia se lleva una comisión." },
    criteriaBack: "CRITERIO",
    criteriaTitle: "Su ojo, sumado al nuestro.",
    criteriaBody: "Cada escultor que solicita una sesión busca una mirada que no tiene en su taller. Esa mirada son ustedes.",
    applyTitle: "Aplicar como curador/a",
    fName: "Nombre completo",
    fEmail: "Email",
    fCredentials: "Especialidad / credenciales curatoriales",
    fPortfolio: "Portfolio o LinkedIn",
    fMessage: "Mensaje breve",
    fMessagePlaceholder: "¿Por qué quieres sumarte?",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Cómo cobro por mis sesiones?", a: "Ignia gestiona el pago; ustedes reciben su parte tras cada sesión." },
      { q: "¿Cuánto se lleva Ignia?", a: "20-25% de comisión por sesión, según volumen." },
      { q: "¿Es exclusivo?", a: "No, pueden seguir con su actividad habitual." },
      { q: "¿Hay costo por aplicar?", a: "Ninguno." },
    ],
    okTitle: "Solicitud recibida.",
    okMsg: "Revisamos cada solicitud personalmente y te contactamos en 48 horas.",
    sending: "Enviando…",
    errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
  } : {
    heroTitle: "Curators, add your eye to Ignia.",
    heroSub: "Paid private sessions. Open forum. You decide your availability.",
    cta: "Apply as curator →",
    why1: { title: "Direct access to sculptors.", text: "No institutional intermediaries." },
    why2: { title: "Flexible schedule.", text: "You define your availability and fee per session." },
    why3: { title: "No exclusivity or fixed fee.", text: "You earn per completed session; Ignia takes a commission." },
    criteriaBack: "CRITERIA",
    criteriaTitle: "Your eye, added to ours.",
    criteriaBody: "Every sculptor who requests a session is looking for a perspective they don't have in their studio. That perspective is you.",
    applyTitle: "Apply as curator",
    fName: "Full name",
    fEmail: "Email",
    fCredentials: "Specialty / curatorial credentials",
    fPortfolio: "Portfolio or LinkedIn",
    fMessage: "Brief message",
    fMessagePlaceholder: "Why do you want to join?",
    faqTitle: "FAQ",
    faqs: [
      { q: "How do I get paid for sessions?", a: "Ignia manages payment; you receive your share after each session." },
      { q: "What commission does Ignia take?", a: "20-25% per session, depending on volume." },
      { q: "Is it exclusive?", a: "No, you can continue with your usual activity." },
      { q: "Is there a cost to apply?", a: "None." },
    ],
    okTitle: "Request received.",
    okMsg: "We review every request personally and will contact you within 48 hours.",
    sending: "Sending…",
    errMsg: "There was an error sending. Please try again.",
  };

  const scrollToForm = () => {
    document.getElementById("curador-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xgobbeyp", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_type: "Curador",
          source: "join-curadores",
          nombre: name, email, credenciales: credentials, portfolio, mensaje: message,
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

  const heroImages = [
    { src: imgMarmol, alt: lang === "es" ? "Textura de mármol" : "Marble texture" },
    { src: imgBronce, alt: lang === "es" ? "Pátina de bronce" : "Bronze patina" },
    { src: imgTalla, alt: lang === "es" ? "Marca de talla" : "Chisel mark" },
    { src: imgCeramica, alt: lang === "es" ? "Superficie de cerámica" : "Ceramic surface" },
    { src: imgPiedra, alt: lang === "es" ? "Textura de piedra" : "Stone texture" },
    { src: imgAcero, alt: lang === "es" ? "Detalle de acero" : "Steel detail" },
  ];

  return (
    <div style={{ background: "#FFFFFF" }}>
      <Seo
        title={lang === "es" ? "Curadores — Aplica a Ignia Institution" : "Curators — Apply to Ignia Institution"}
        description={lang === "es" ? "Únete como curador a Ignia: sesiones privadas con escultores, agenda flexible y pago por sesión realizada." : "Join Ignia as a curator: private sessions with sculptors, flexible schedule and pay per completed session."}
        path="/join/curadores"
      />
      <Header />

      {/* 1. HERO HOJA DE CONTACTOS */}
      <section style={{ background: "#FFFFFF", paddingTop: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 0,
            width: "100%",
          }}
        >
          {heroImages.map((img, i) => (
            <div key={i} style={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 2 ? "eager" : "lazy"}
                width={1024}
                height={1024}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(100%)" }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "clamp(64px, 10vw, 120px) 24px",
          }}
        >
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            color: "#121212",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
            maxWidth: 900,
          }}>{t.heroTitle}</h1>
          <p style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "#666666",
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 520,
            margin: "28px 0 0",
          }}>{t.heroSub}</p>
          <div style={{ marginTop: 40 }}>
            <button type="button" onClick={scrollToForm} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {t.cta}
            </button>
          </div>
        </div>
      </section>

      {/* 2. FRANJA DE 3 VALORES */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div className="why-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 64 }}>
          {[t.why1, t.why2, t.why3].map((item, i) => (
            <div key={i} className="why-col" style={{ position: "relative", textAlign: "center" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 26, lineHeight: 1.2, margin: 0, textAlign: "center" }}>
                {item.title}
              </h3>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#121212", fontSize: 16, lineHeight: 1.7, textAlign: "center", margin: "12px 0 0" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BLOQUE TIPOGRAFÍA EN CAPAS */}
      <section
        style={{
          background: "#FFFFFF",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "clamp(80px, 10vw, 160px) 24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              color: "#121212",
              fontSize: "clamp(120px, 22vw, 340px)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              opacity: 0.06,
              whiteSpace: "nowrap",
            }}
          >
            {t.criteriaBack}
          </span>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 780 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            color: "#121212",
            fontSize: "clamp(38px, 6vw, 86px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>{t.criteriaTitle}</p>
          <p style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "#666666",
            fontSize: 15,
            lineHeight: 1.7,
            margin: "32px 0 0",
          }}>{t.criteriaBody}</p>
        </div>
      </section>

      {/* 4. FORMULARIO */}
      <section id="curador-form" style={{ padding: "120px 24px", background: "#FAFAFA", scrollMarginTop: 56 }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 48, textAlign: "center" }}>{t.applyTitle}</h2>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 24, marginBottom: 12 }}>{t.okTitle}</p>
              <p style={{ ...BODY_STYLE, fontSize: 16, color: "#666666" }}>{t.okMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jc-nombre">{t.fName}</label>
                <input id="jc-nombre" name="nombre" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jc-email">{t.fEmail}</label>
                <input id="jc-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jc-credenciales">{t.fCredentials}</label>
                <input id="jc-credenciales" name="credenciales" required value={credentials} onChange={(e) => setCredentials(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jc-portfolio">{t.fPortfolio}</label>
                <input id="jc-portfolio" name="portfolio" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="jc-mensaje">{t.fMessage}</label>
                <textarea
                  id="jc-mensaje"
                  name="mensaje"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.fMessagePlaceholder}
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                />
              </div>
              {error && (
                <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#B00020", fontSize: 14, marginBottom: 16 }}>{error}</p>
              )}
              <div style={{ textAlign: "center" }}>
                <button type="submit" disabled={loading} style={{ ...OUTLINE_BTN_DARK, opacity: loading ? 0.5 : 1 }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                  {loading ? t.sending : t.cta}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. FAQ */}
      <section style={{ padding: "120px 24px 160px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 56, textAlign: "center" }}>{t.faqTitle}</h2>
          <div style={{ width: "100%", borderTop: "1px solid #121212" }}>
            {t.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ width: "100%", borderBottom: "1px solid #121212" }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      padding: "24px 0",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 16,
                      fontFamily: "Manrope, sans-serif",
                      fontWeight: 400,
                      color: "#121212",
                      fontSize: 18,
                      borderRadius: 0,
                    }}
                  >
                    <span>{f.q}</span>
                    <span style={{ fontSize: 24, fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666" }}>{isOpen ? "−" : "+"}</span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height 300ms ease",
                    }}
                  >
                    <p style={{ ...BODY_STYLE, fontSize: 16, color: "#666666", margin: 0, padding: "0 0 24px" }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinCuradores;
