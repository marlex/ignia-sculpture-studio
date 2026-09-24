import { useEffect, useState } from "react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";

import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import heroGallery from "@/assets/hero-sculpture-gallery.webp";
import heroMarmol from "@/assets/hero-marmol.jpg";
import heroMetal from "@/assets/hero-metal.jpg";

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

const JoinColeccionistas = () => {
  const lang = useLang();
  const [inviteOpen, setInviteOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const open = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      if (detail?.source === "header") return; // header always opens the global profiles modal
      setInviteOpen(true);
    };
    window.addEventListener("ignia:open-invite", open);
    return () => window.removeEventListener("ignia:open-invite", open);
  }, []);

  const t = lang === "es" ? {
    heroTitle: "Coleccionar escultura, con total confianza.",
    heroSub: "Selección curada. Precio justo. Certificada para siempre.",
    cta: "Únete como Coleccionista →",
    why1: { title: "Una selección, no un mercado abierto.", text: "Cada obra pasa por criterio curatorial antes de publicarse." },
    why2: { title: "Precio justo, fijado por Ignia.", text: "Sin regateo. El precio que ves es el precio." },
    why3: { title: "Certificada para siempre.", text: "Respaldo blockchain que protege tu compra en cada reventa." },
    howTitle: "Cómo funciona",
    steps: [
      { label: "Paso 1", desc: "Explora el catálogo curado." },
      { label: "Paso 2", desc: "Visualízala en 3D, en tu espacio." },
      { label: "Paso 3", desc: "Compra con certificado de autenticidad incluido." },
      { label: "Paso 4", desc: "Recíbela con logística especializada, puerta a puerta." },
    ],
    modelTitle: "Nuestro compromiso contigo",
    blockOne: "Antes de comprar",
    blockTwo: "Después de comprar",
    blockOneBullets: ["Selección curada", "Precio fijo y justo", "Visualización 3D"],
    blockTwoBullets: ["Certificado blockchain para siempre", "Valor de reventa verificable", "Logística asegurada puerta a puerta"],
    permTitle: "Tu certificado, para siempre.",
    permBody: "Cada compra queda registrada: autoría, materiales, origen. Verificable por cualquiera, en cualquier lugar.",
    careTitle: "Cómo cuidamos tu compra.",
    careBody: "Embalaje especializado, seguro puerta a puerta. Tú coleccionas. Nosotros nos ocupamos del resto.",
    banner: "También es el lugar para coleccionarla.",
    finalTitle: "Únete a Ignia",
    fName: "Nombre completo",
    fEmail: "Email",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Cómo sé que la obra es auténtica?", a: "Certificado blockchain verificable, para siempre." },
      { q: "¿Puedo ver la obra antes de comprar?", a: "Sí, con visualización 3D en tu espacio." },
      { q: "¿Quién fija el precio?", a: "Ignia, no el escultor, precio curado y consistente." },
      { q: "¿Cómo llega la obra a mi casa?", a: "Logística especializada, seguro puerta a puerta." },
    ],
    okTitle: "Bienvenido a Ignia.",
    okMsg: "Te hemos registrado. Pronto recibirás noticias nuestras.",
    sending: "Enviando…",
    errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
  } : {
    heroTitle: "Collecting sculpture, with total confidence.",
    heroSub: "Curated selection. Fair price. Certified forever.",
    cta: "Join as a Collector →",
    why1: { title: "A selection, not an open market.", text: "Every work passes curatorial criteria before being published." },
    why2: { title: "Fair price, set by Ignia.", text: "No haggling. The price you see is the price." },
    why3: { title: "Certified forever.", text: "Blockchain backing that protects your purchase on every resale." },
    howTitle: "How it works",
    steps: [
      { label: "Step 1", desc: "Explore the curated catalogue." },
      { label: "Step 2", desc: "Visualize it in 3D, in your space." },
      { label: "Step 3", desc: "Buy with a certificate of authenticity included." },
      { label: "Step 4", desc: "Receive it with specialized door-to-door logistics." },
    ],
    modelTitle: "Our commitment to you",
    blockOne: "Before you buy",
    blockTwo: "After you buy",
    blockOneBullets: ["Curated selection", "Fixed and fair price", "3D visualization"],
    blockTwoBullets: ["Blockchain certificate forever", "Verifiable resale value", "Insured door-to-door logistics"],
    permTitle: "Your certificate, forever.",
    permBody: "Every purchase is registered: authorship, materials, origin. Verifiable by anyone, anywhere.",
    careTitle: "How we care for your purchase.",
    careBody: "Specialized packing, door-to-door insurance. You collect. We handle the rest.",
    banner: "It's also the place to collect it.",
    finalTitle: "Join Ignia",
    fName: "Full name",
    fEmail: "Email",
    faqTitle: "FAQ",
    faqs: [
      { q: "How do I know the work is authentic?", a: "Verifiable blockchain certificate, forever." },
      { q: "Can I see the work before buying?", a: "Yes, with 3D visualization in your space." },
      { q: "Who sets the price?", a: "Ignia, not the sculptor, curated and consistent pricing." },
      { q: "How does the work reach my home?", a: "Specialized logistics, insured door to door." },
    ],
    okTitle: "Welcome to Ignia.",
    okMsg: "You're registered. You'll hear from us soon.",
    sending: "Sending…",
    errMsg: "There was an error sending. Please try again.",
  };

  const openModal = () => setInviteOpen(true);

  const handleEmbeddedSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xgobbeyp", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          profile_type: "Coleccionista",
          source: "join-coleccionistas-embedded",
          nombre: name, email,
        }),
      });
      if (res.ok) { setSubmitted(true); }
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
      <Seo title={"Buy Original Sculpture, Curated & Certified | Ignia"} description={"Collect original sculpture with confidence: curated selection, fair fixed pricing, 3D viewing and a blockchain certificate of authenticity, insured door to door."} path="/join/coleccionistas" />
      <Header />

      {/* 1. HERO */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "calc(100vh - 56px)", background: "#222222" }}
      >
        <img
          src={heroGallery}
          alt=""
          aria-hidden
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.40) 60%, rgba(0,0,0,0.55) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            color: "#FFFFFF",
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "0.005em",
            margin: 0,
          }}>{t.heroTitle}</h1>
          <p style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "#FFFFFF",
            fontSize: 19,
            lineHeight: 1.6,
            maxWidth: 720,
            margin: "28px auto 0",
          }}>{t.heroSub}</p>
          <div style={{ marginTop: 32 }}>
            <button type="button" onClick={openModal} style={OUTLINE_BTN} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
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

      {/* 3. CÓMO FUNCIONA */}
      <section style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 56, textAlign: "center" }}>{t.howTitle}</h2>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Manrope, sans-serif",
            color: "#121212",
          }}>
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
            <button type="button" onClick={openModal} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {t.cta}
            </button>
          </div>
        </div>
      </section>

      {/* 4. NUESTRO COMPROMISO CONTIGO */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 56, textAlign: "center" }}>{t.modelTitle}</h2>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Manrope, sans-serif",
            color: "#121212",
          }}>
            <tbody>
              {[
                { title: t.blockOne, bullets: t.blockOneBullets },
                { title: t.blockTwo, bullets: t.blockTwoBullets },
              ].map((block, bi) => (
                <tr key={bi} style={{ borderTop: "1px solid #121212", borderBottom: "1px solid #121212" }}>
                  <td style={{ padding: "24px 8px", verticalAlign: "top" }}>
                    <ul style={{ margin: 0, paddingLeft: 18, listStyle: "none" }}>
                      {block.bullets.map((bullet, i) => (
                        <li key={i} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 16, color: "#121212", lineHeight: 1.7, marginBottom: 4, position: "relative" }}>
                          <span style={{ position: "absolute", left: -16, top: 9, width: 4, height: 4, borderRadius: "50%", background: "#121212" }} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ padding: "24px 8px", fontWeight: 600, fontSize: 26, fontFamily: "'Cormorant Garamond', serif", verticalAlign: "bottom", textAlign: "right" }}>{block.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: 72 }}>
            <button type="button" onClick={openModal} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {t.cta}
            </button>
          </div>
        </div>
      </section>

      {/* 5. CERTIFICADO, imagen a sangre */}
      <section style={{ background: "#FAFAFA" }}>
        <div
          className="join-bleed"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            alignItems: "stretch",
          }}
        >
          <img
            src={heroMarmol}
            alt="sculpture with permanent blockchain certificate"
            loading="lazy"
            style={{ width: "100%", height: "100%", minHeight: 480, objectFit: "cover", display: "block" }}
          />
          <div style={{ display: "flex", alignItems: "center", padding: "clamp(64px, 8vw, 120px) clamp(24px, 5vw, 88px)" }}>
            <div style={{ maxWidth: 520 }}>
              <h2 style={{ ...H2_STYLE, marginBottom: 24 }}>{t.permTitle}</h2>
              <p style={{ ...BODY_STYLE, margin: 0 }}>{t.permBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CÓMO CUIDAMOS TU COMPRA, imagen a sangre (invertido) */}
      <section style={{ background: "#FFFFFF" }}>
        <div
          className="join-bleed join-bleed-rev"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            alignItems: "stretch",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", padding: "clamp(64px, 8vw, 120px) clamp(24px, 5vw, 88px)" }}>
            <div style={{ maxWidth: 520, marginLeft: "auto" }}>
              <h2 style={{ ...H2_STYLE, marginBottom: 24 }}>{t.careTitle}</h2>
              <p style={{ ...BODY_STYLE, margin: 0 }}>{t.careBody}</p>
            </div>
          </div>
          <img
            src={heroMetal}
            alt="sculpture packaging by Ignia logistics partner"
            loading="lazy"
            style={{ width: "100%", height: "100%", minHeight: 480, objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* 7. BANNER */}
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
            fontWeight: 400,
            fontSize: "clamp(36px, 4.5vw, 56px)",
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.1,
            letterSpacing: "0.01em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          {t.banner}
        </h2>
      </section>

      {/* 8. REGISTRO */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, marginBottom: 48, textAlign: "center" }}>{t.finalTitle}</h2>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                color: "#121212",
                fontSize: 24,
                marginBottom: 12,
              }}>{t.okTitle}</p>
              <p style={{ ...BODY_STYLE, fontSize: 16, color: "#666666" }}>{t.okMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleEmbeddedSubmit}>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="jc-nombre">{t.fName}</label>
                <input id="jc-nombre" name="nombre" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="jc-email">{t.fEmail}</label>
                <input id="jc-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
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

      {/* 9. FAQ */}
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
                    <p style={{
                      ...BODY_STYLE,
                      fontSize: 17,
                      color: "#444444",
                      margin: 0,
                      padding: "0 0 24px",
                    }}>{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      {inviteOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 300ms ease both" }}
          onClick={() => setInviteOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#FFFFFF", maxWidth: 560, width: "100%", padding: 48, borderRadius: 0, position: "relative", maxHeight: "92vh", overflowY: "auto", animation: "modalIn 300ms cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <button
              onClick={() => setInviteOpen(false)}
              aria-label="Close"
              style={{ position: "absolute", top: 12, right: 16, background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 32, lineHeight: 1, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
            >×</button>
            <h2 style={{ ...H2_STYLE, marginBottom: 32, textAlign: "center" }}>{t.finalTitle}</h2>
            {submitted ? (
              <div style={{ textAlign: "center" }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  color: "#121212",
                  fontSize: 24,
                  marginBottom: 12,
                }}>{t.okTitle}</p>
                <p style={{ ...BODY_STYLE, fontSize: 16, color: "#666666" }}>{t.okMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleEmbeddedSubmit}>
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle} htmlFor="jc-modal-nombre">{t.fName}</label>
                  <input id="jc-modal-nombre" name="nombre" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: 40 }}>
                  <label style={labelStyle} htmlFor="jc-modal-email">{t.fEmail}</label>
                  <input id="jc-modal-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
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
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .why-col:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 10%;
          right: -32px;
          width: 1px;
          height: 80%;
          background-color: #e5e5e5;
        }
        @media (max-width: 768px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .why-col:not(:last-child)::after { display: none; }
          .join-bleed { grid-template-columns: 1fr !important; }
          .join-bleed-rev > div { order: 2; }
          .join-bleed-rev > img { order: 1; }
        }
      `}</style>
    </div>
  );
};

export default JoinColeccionistas;
