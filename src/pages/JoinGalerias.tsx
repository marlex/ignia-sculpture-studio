import { useState } from "react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import heroGalerias from "@/assets/hero-galerias.jpg";

const OUTLINE_BTN: React.CSSProperties = {
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
  display: "inline-block",
};

const OUTLINE_BTN_DARK: React.CSSProperties = {
  ...OUTLINE_BTN,
  color: "#121212",
  border: "1px solid #121212",
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

const JoinGalerias = () => {
  const lang = useLang();

  const [gallery, setGallery] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [volume, setVolume] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const t = lang === "es" ? {
    heroTitle: "Galerías, un canal más para su colección.",
    heroSub: "Presencia global. Cero exclusividad. Términos a su medida.",
    cta: "Hablemos →",
    why1: { title: "Su criterio, nuestro escaparate.", text: "Sus artistas se presentan con el mismo estándar curatorial que el resto de Ignia." },
    why2: { title: "Sin exclusividad.", text: "Vender en Ignia no les impide vender donde ya venden." },
    why3: { title: "Certificación incluida.", text: "Cada obra que listan queda respaldada con certificado blockchain, sin gestión extra de su parte." },
    howTitle: "Cómo funciona",
    steps: [
      { label: "Paso 1", desc: "Iniciamos la conversación." },
      { label: "Paso 2", desc: "Revisamos su catálogo — mismos criterios para todos." },
      { label: "Paso 3", desc: "Sus obras se publican con presentación de nivel museo." },
      { label: "Paso 4", desc: "Gestionamos venta, cobro y logística; ustedes reciben su parte." },
    ],
    quote: "Cada relación con una galería es distinta. Hablemos y encontremos los términos correctos para ambos.",
    quoteSub: "Sin comisión fija publicada. Negociamos volumen, alcance y tipo de obra caso por caso.",
    banner: "Más ojos para su colección. En el lugar correcto.",
    finalTitle: "Hablemos",
    fName: "Nombre de la galería",
    fEmail: "Email",
    fSocial: "Web o Instagram",
    fVolume: "¿Cuántos artistas/obras representan aproximadamente?",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Necesitamos representar en exclusiva a nuestros artistas en Ignia?", a: "No, no pedimos exclusividad." },
      { q: "¿Cómo se fija el precio de las obras?", a: "Igual que con escultores individuales: lo cura Ignia junto a la galería." },
      { q: "¿Cómo se define la comisión?", a: "Se negocia según volumen y tipo de colección, no hay una tarifa única publicada." },
      { q: "¿Quién gestiona el envío?", a: "Ignia coordina la logística especializada." },
      { q: "¿Podemos listar solo parte de nuestro catálogo?", a: "Sí, ustedes eligen qué obras enviar." },
    ],
    okTitle: "Mensaje recibido.",
    okMsg: "Revisamos cada solicitud personalmente y les contactamos en 48 horas.",
    sending: "Enviando…",
    errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
  } : {
    heroTitle: "Galleries, one more channel for your collection.",
    heroSub: "Global presence. Zero exclusivity. Terms tailored to you.",
    cta: "Let's talk →",
    why1: { title: "Your criteria, our showcase.", text: "Your artists are presented with the same curatorial standard as the rest of Ignia." },
    why2: { title: "No exclusivity.", text: "Selling on Ignia doesn't stop you from selling where you already sell." },
    why3: { title: "Certification included.", text: "Every work you list is backed by a blockchain certificate, with no extra work on your side." },
    howTitle: "How it works",
    steps: [
      { label: "Step 1", desc: "We start the conversation." },
      { label: "Step 2", desc: "We review your catalogue — same criteria for everyone." },
      { label: "Step 3", desc: "Your works are published with museum-level presentation." },
      { label: "Step 4", desc: "We handle the sale, payment and logistics; you receive your share." },
    ],
    quote: "Every gallery relationship is different. Let's talk and find the right terms for both of us.",
    quoteSub: "No fixed published commission. We negotiate volume, reach and type of work case by case.",
    banner: "More eyes on your collection. In the right place.",
    finalTitle: "Let's talk",
    fName: "Gallery name",
    fEmail: "Email",
    fSocial: "Website or Instagram",
    fVolume: "Approximately how many artists/works do you represent?",
    faqTitle: "FAQ",
    faqs: [
      { q: "Do we need to represent our artists exclusively on Ignia?", a: "No, we don't ask for exclusivity." },
      { q: "How is the price of the works set?", a: "Same as with individual sculptors: curated by Ignia together with the gallery." },
      { q: "How is the commission defined?", a: "It's negotiated based on volume and type of collection; there is no single published rate." },
      { q: "Who handles shipping?", a: "Ignia coordinates specialised logistics." },
      { q: "Can we list only part of our catalogue?", a: "Yes, you choose which works to send." },
    ],
    okTitle: "Message received.",
    okMsg: "We review every request personally and will contact you within 48 hours.",
    sending: "Sending…",
    errMsg: "There was an error sending. Please try again.",
  };

  const scrollToForm = () => {
    document.getElementById("galerias-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xgobbeyp", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_type: "Galería",
          source: "join-galerias",
          nombre: gallery, email, social, volumen: volume,
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
        title={"Galleries — Sell Sculpture with Ignia Institution"}
        description={"Add Ignia as an extra sales channel for your gallery: no exclusivity, museum-level presentation, blockchain certification and specialised logistics."}
        path="/join/galerias"
      />
      <Header />

      {/* 1. HERO ASIMÉTRICO */}
      <section
        className="gal-hero"
        style={{
          display: "grid",
          gridTemplateColumns: "60% 40%",
          minHeight: "calc(100vh - 56px)",
          background: "#FFFFFF",
        }}
      >
        <div
          className="gal-hero-copy"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "clamp(80px, 12vw, 180px) clamp(24px, 6vw, 112px) clamp(64px, 9vw, 140px)",
          }}
        >
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            color: "#121212",
            fontSize: "clamp(44px, 6.4vw, 96px)",
            lineHeight: 1.02,
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
            margin: "32px 0 0",
            maxWidth: 460,
          }}>{t.heroSub}</p>
          <div style={{ marginTop: 40 }}>
            <button type="button" onClick={scrollToForm} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {t.cta}
            </button>
          </div>
        </div>
        <div style={{ background: "#0a0a0a", position: "relative", minHeight: 420 }}>
          <img
            src={heroGalerias}
            alt="Sculpture lit against a dark background"
            width={768}
            height={1280}
            loading="eager"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
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

      {/* 3. CÓMO FUNCIONA */}
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
          <div style={{ textAlign: "center", marginTop: 72 }}>
            <button type="button" onClick={scrollToForm} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {t.cta}
            </button>
          </div>
        </div>
      </section>

      {/* 4. BLOQUE TIPOGRÁFICO A PANTALLA COMPLETA */}
      <section
        style={{
          background: "#FFFFFF",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(80px, 10vw, 160px) 24px",
        }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          color: "#121212",
          fontSize: "clamp(38px, 6vw, 86px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          margin: 0,
          maxWidth: 1100,
        }}>{t.quote}</p>
        <p style={{
          fontFamily: "Manrope, sans-serif",
          fontWeight: 400,
          color: "#666666",
          fontSize: 15,
          lineHeight: 1.7,
          margin: "40px 0 0",
          maxWidth: 620,
        }}>{t.quoteSub}</p>
        <div style={{ marginTop: 40 }}>
          <button type="button" onClick={scrollToForm} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            {t.cta}
          </button>
        </div>
      </section>

      {/* 5. BANNER NEGRO */}
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
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontSize: "clamp(36px, 4.5vw, 56px)",
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1.1,
          letterSpacing: "0.01em",
          margin: 0,
          maxWidth: 900,
        }}>{t.banner}</h2>
      </section>

      {/* 6. FORMULARIO */}
      <section id="galerias-form" style={{ padding: "120px 24px", background: "#FFFFFF", scrollMarginTop: 56 }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 48, textAlign: "center" }}>{t.finalTitle}</h2>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 24, marginBottom: 12 }}>{t.okTitle}</p>
              <p style={{ ...BODY_STYLE, fontSize: 16, color: "#666666" }}>{t.okMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jg-nombre">{t.fName}</label>
                <input id="jg-nombre" name="nombre" required value={gallery} onChange={(e) => setGallery(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jg-email">{t.fEmail}</label>
                <input id="jg-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jg-social">{t.fSocial}</label>
                <input id="jg-social" name="social" required value={social} onChange={(e) => setSocial(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="jg-volumen">{t.fVolume}</label>
                <input id="jg-volumen" name="volumen" value={volume} onChange={(e) => setVolume(e.target.value)} style={inputStyle} />
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

      {/* 7. FAQ */}
      <section style={{ padding: "120px 24px 160px", background: "#FAFAFA" }}>
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
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      fontSize: 28,
                      lineHeight: 1,
                      transition: "transform 250ms",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    }}>+</span>
                  </button>
                  {isOpen && (
                    <p style={{ ...BODY_STYLE, fontSize: 17, color: "#444444", margin: 0, padding: "0 0 24px" }}>{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .why-col:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 10%;
          right: -32px;
          width: 1px;
          height: 80%;
          background-color: #e5e5e5;
        }
        @media (max-width: 900px) {
          .gal-hero { grid-template-columns: 1fr !important; min-height: 0 !important; }
        }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .why-col:not(:last-child)::after { display: none; }
        }
      `}</style>
    </div>
  );
};

export default JoinGalerias;
