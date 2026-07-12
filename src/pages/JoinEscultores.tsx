import { useEffect, useState } from "react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { useLang } from "@/i18n/LanguageContext";
import heroPiedra from "@/assets/hero-piedra.jpg.asset.json";
import heroMarmol from "@/assets/hero-marmol.jpg.asset.json";
import heroMetal from "@/assets/hero-metal.jpg.asset.json";

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
  color: "#111111",
  border: "1px solid #111111",
};

const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "0.65"; };
const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.opacity = "1"; };

const H2_STYLE: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 300,
  color: "#111111",
  fontSize: "clamp(32px, 4.2vw, 52px)",
  lineHeight: 1.1,
  letterSpacing: "0.005em",
  margin: 0,
};

const BODY_STYLE: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  color: "#333333",
  fontSize: 18,
  lineHeight: 1.65,
};

const JoinEscultores = () => {
  const lang = useLang();
  const [inviteOpen, setInviteOpen] = useState(false);

  // Embedded form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Sell Sculpture Online | Fair Commission for Sculptors — Ignia";
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    meta?.setAttribute(
      "content",
      "Join the only global gallery built exclusively for sculptors. Keep 82–88% of every sale — we handle logistics, insurance, and authentication.",
    );
    return () => {
      document.title = prevTitle;
      if (meta) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const t = lang === "es" ? {
    heroTitle: "Escultores, bienvenidos a casa.",
    heroSub: "Comisión justa. Sin cuotas. No pedimos exclusividad.",
    cta: "Solicitar acceso →",
    whyTitle: "Por qué Ignia",
    why1: "Pertenece a una gran comunidad de escultores.",
    why2: "Comisiones justas, las mismas para todos.",
    why3: "Tus obras, certificadas para siempre.",
    howTitle: "Cómo funciona",
    step1: "Solicitas acceso.",
    step2: "Revisamos tu obra. Mismos criterios para todos.",
    step3: "Publicas y vendes. Tú eliges tu plan.",
    modelTitle: "El modelo económico",
    planFree: "Plan gratuito",
    planPro: "Plan Pro (9,90€/mes)",
    modelFoot: "Tú decides. Nadie te asigna un nivel.",
    permTitle: "Tu huella, permanente",
    permBody: "Cada obra vendida queda registrada para siempre: autoría, materiales, origen. Verificable por cualquiera, en cualquier lugar.",
    careTitle: "Cómo cuidamos tu obra",
    careBody: "Recogida, embalaje, envío, seguro de puerta a puerta. Tú creas. Nosotros nos ocupamos del resto.",
    banner: "Muchos escultores lo pedían. Por ellos lo hacemos.",
    finalTitle: "Solicitudes abiertas.",
    fName: "Nombre completo",
    fEmail: "Email",
    fSocial: "Instagram o web",
    reply: "Respondemos en 48 horas.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Necesito obra vendida antes?", a: "No. Evaluamos calidad, no historial." },
      { q: "¿Puedo vender en otros sitios?", a: "Sí." },
      { q: "¿Tengo galería, puedo unirme?", a: "Sí, muchos artistas usan Ignia como canal adicional." },
      { q: "¿Qué pasa si no vendo?", a: "No pagas nada. La comisión solo se aplica sobre ventas." },
    ],
    okTitle: "Solicitud recibida.",
    okMsg: "Revisamos cada solicitud personalmente y te contactamos en 48 horas.",
    sending: "Enviando…",
    errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
  } : {
    heroTitle: "Sculptors, welcome home.",
    heroSub: "Fair commission. No fees. No exclusivity required.",
    cta: "Request access →",
    whyTitle: "Why Ignia",
    why1: "Belong to a great community of sculptors.",
    why2: "Fair commissions, the same for everyone.",
    why3: "Your works, certified forever.",
    howTitle: "How it works",
    step1: "You request access.",
    step2: "We review your work. Same criteria for everyone.",
    step3: "You publish and sell. You choose your plan.",
    modelTitle: "The economic model",
    planFree: "Free plan",
    planPro: "Pro plan (€9.90/month)",
    modelFoot: "You decide. Nobody assigns you a tier.",
    permTitle: "Your mark, permanent",
    permBody: "Every sold work is registered forever: authorship, materials, origin. Verifiable by anyone, anywhere.",
    careTitle: "How we care for your work",
    careBody: "Pickup, packing, shipping, door-to-door insurance. You create. We handle the rest.",
    banner: "Many sculptors asked for it. We do it for them.",
    finalTitle: "Applications open.",
    fName: "Full name",
    fEmail: "Email",
    fSocial: "Instagram or website",
    reply: "We reply within 48 hours.",
    faqTitle: "FAQ",
    faqs: [
      { q: "Do I need previous sales?", a: "No. We evaluate quality, not track record." },
      { q: "Can I sell on other platforms?", a: "Yes." },
      { q: "I have a gallery, can I join?", a: "Yes, many artists use Ignia as an additional channel." },
      { q: "What if I don't sell?", a: "You pay nothing. Commission only applies on sales." },
    ],
    okTitle: "Request received.",
    okMsg: "We review every request personally and will contact you within 48 hours.",
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
          profile_type: "Artista",
          source: "join-escultores-embedded",
          nombre: name, email, social,
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
    borderBottom: "1px solid #111111",
    outline: "none",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 500,
    color: "#111111",
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
    fontSize: 11,
    color: "#111111",
    marginBottom: 12,
  };

  return (
    <div style={{ background: "#FFFFFF" }}>
      <Header />

      {/* 1. HERO */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "calc(100vh - 56px)", background: "#222222" }}
      >
        <img
          src={heroPiedra.url}
          alt=""
          aria-hidden
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.5) 100%)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
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

      {/* 2. POR QUÉ IGNIA */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 64 }}>
          {[t.why1, t.why2, t.why3].map((line, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ ...BODY_STYLE, fontSize: 22, lineHeight: 1.5, margin: 0 }}>{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CÓMO FUNCIONA */}
      <section style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, textAlign: "center", marginBottom: 80 }}>{t.howTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 48 }}>
            {[["01", t.step1], ["02", t.step2], ["03", t.step3]].map(([n, s], i) => (
              <div key={i} style={{ textAlign: "left" }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: 96,
                  lineHeight: 1,
                  color: "rgba(17,17,17,0.15)",
                  marginBottom: 16,
                }}>{n}</div>
                <p style={{ ...BODY_STYLE, fontSize: 19, margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 80 }}>
            <button type="button" onClick={openModal} style={OUTLINE_BTN_DARK} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
              {t.cta}
            </button>
          </div>
        </div>
      </section>

      {/* 4. MODELO ECONÓMICO */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, textAlign: "center", marginBottom: 56 }}>{t.modelTitle}</h2>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "Manrope, sans-serif",
            color: "#111111",
          }}>
            <tbody>
              <tr style={{ borderTop: "1px solid #111111", borderBottom: "1px solid #111111" }}>
                <td style={{ padding: "24px 8px", fontWeight: 500, fontSize: 18 }}>{t.planFree}</td>
                <td style={{ padding: "24px 8px", fontWeight: 500, fontSize: 24, textAlign: "right" }}>18%</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #111111" }}>
                <td style={{ padding: "24px 8px", fontWeight: 500, fontSize: 18 }}>{t.planPro}</td>
                <td style={{ padding: "24px 8px", fontWeight: 500, fontSize: 24, textAlign: "right" }}>15%</td>
              </tr>
            </tbody>
          </table>
          <p style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "#666666",
            textAlign: "center",
            marginTop: 32,
          }}>{t.modelFoot}</p>
        </div>
      </section>

      {/* 5. HUELLA PERMANENTE */}
      <section style={{ padding: "120px 24px", background: "#FAFAFA" }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)",
          gap: 64,
          alignItems: "center",
        }} className="join-2col">
          <img
            src={heroMarmol.url}
            alt="sculpture with permanent blockchain certificate"
            loading="lazy"
            style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
          />
          <div>
            <h2 style={{ ...H2_STYLE, marginBottom: 24 }}>{t.permTitle}</h2>
            <p style={{ ...BODY_STYLE, margin: 0 }}>{t.permBody}</p>
          </div>
        </div>
      </section>

      {/* 6. CÓMO CUIDAMOS TU OBRA (reversed) */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)",
          gap: 64,
          alignItems: "center",
        }} className="join-2col-rev">
          <div>
            <h2 style={{ ...H2_STYLE, marginBottom: 24 }}>{t.careTitle}</h2>
            <p style={{ ...BODY_STYLE, margin: 0 }}>{t.careBody}</p>
          </div>
          <img
            src={heroMetal.url}
            alt="sculpture packaging by Ignia logistics partner"
            loading="lazy"
            style={{ width: "100%", height: "auto", aspectRatio: "4/5", objectFit: "cover", display: "block" }}
          />
        </div>
      </section>

      {/* 7. BANNER */}
      <section style={{ background: "#000000", padding: "120px 24px" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 300,
          color: "#FFFFFF",
          fontSize: "clamp(28px, 3.6vw, 44px)",
          lineHeight: 1.2,
          letterSpacing: "0.005em",
          textAlign: "center",
          maxWidth: 900,
          margin: "0 auto",
        }}>{t.banner}</p>
      </section>

      {/* 8. CTA FINAL + FORMULARIO */}
      <section style={{ padding: "120px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, textAlign: "center", marginBottom: 48 }}>{t.finalTitle}</h2>
          {submitted ? (
            <div style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                color: "#111111",
                fontSize: 24,
                marginBottom: 12,
              }}>{t.okTitle}</p>
              <p style={{ ...BODY_STYLE, fontSize: 16, color: "#666666" }}>{t.okMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleEmbeddedSubmit}>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="je-nombre">{t.fName}</label>
                <input id="je-nombre" name="nombre" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="je-email">{t.fEmail}</label>
                <input id="je-email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="je-social">{t.fSocial}</label>
                <input id="je-social" name="social" required value={social} onChange={(e) => setSocial(e.target.value)} style={inputStyle} />
              </div>
              {error && (
                <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#B00020", fontSize: 14, marginBottom: 16 }}>{error}</p>
              )}
              <div style={{ textAlign: "center" }}>
                <button type="submit" disabled={loading} style={{ ...OUTLINE_BTN_DARK, opacity: loading ? 0.5 : 1 }} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
                  {loading ? t.sending : t.cta}
                </button>
              </div>
              <p style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                color: "#666666",
                fontSize: 14,
                textAlign: "center",
                marginTop: 24,
              }}>{t.reply}</p>
            </form>
          )}
        </div>
      </section>

      {/* 9. FAQ */}
      <section style={{ padding: "120px 24px 160px", background: "#FAFAFA" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <h2 style={{ ...H2_STYLE, textAlign: "center", marginBottom: 56 }}>{t.faqTitle}</h2>
          <div style={{ borderTop: "1px solid #111111" }}>
            {t.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: "1px solid #111111" }}>
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
                      fontWeight: 500,
                      color: "#111111",
                      fontSize: 18,
                      borderRadius: 0,
                    }}
                  >
                    <span>{f.q}</span>
                    <span style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
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
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} defaultProfile="artist" />

      <style>{`
        @media (max-width: 768px) {
          .join-2col { grid-template-columns: 1fr !important; }
          .join-2col-rev { grid-template-columns: 1fr !important; }
          .join-2col-rev > div { order: 2; }
          .join-2col-rev > img { order: 1; }
        }
      `}</style>
    </div>
  );
};

export default JoinEscultores;
