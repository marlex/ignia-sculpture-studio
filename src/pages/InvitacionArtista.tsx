import { useEffect, useState } from "react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Seo } from "@/components/Seo";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Manrope, sans-serif",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontSize: 14,
  color: "#121212",
  marginBottom: 12,
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

type Step = "form" | "check-email";

export default function InvitacionArtista() {
  const lang = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [origin, setOrigin] = useState("");
  const [technique, setTechnique] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("form");

  const t = lang === "es"
    ? {
        title: "Has sido invitado a Ignia",
        subtitle: "Completa tu registro como artista fundador. Un admin activará tu cuenta y podrás publicar tu primera obra.",
        fName: "Nombre completo",
        fEmail: "Email",
        fPassword: "Contraseña",
        contactTitle: "Contacto",
        fInstagram: "Instagram (opcional)",
        fWebsite: "Sitio web (opcional)",
        fPortfolio: "Portfolio (opcional)",
        fOrigin: "Origen (ciudad, país)",
        fTechnique: "Técnica o materiales principales",
        fBio: "Biografía corta",
        submit: "Completar registro",
        sending: "Enviando…",
        checkEmailTitle: "Revisa tu correo.",
        checkEmailMsg: "Confirma tu email y en breve activaremos tu cuenta. Te avisaremos cuando puedas publicar.",
        errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
        minPassword: "La contraseña debe tener al menos 8 caracteres.",
      }
    : {
        title: "You've been invited to Ignia",
        subtitle: "Complete your founding artist registration. An admin will activate your account and you'll be able to publish your first work.",
        fName: "Full name",
        fEmail: "Email",
        fPassword: "Password",
        contactTitle: "Contact",
        fInstagram: "Instagram (optional)",
        fWebsite: "Website (optional)",
        fPortfolio: "Portfolio (optional)",
        fOrigin: "Origin (city, country)",
        fTechnique: "Main technique or materials",
        fBio: "Short biography",
        submit: "Complete registration",
        sending: "Sending…",
        checkEmailTitle: "Check your email.",
        checkEmailMsg: "Confirm your email and we'll activate your account shortly. We'll let you know once you can publish.",
        errMsg: "There was an error sending. Please try again.",
        minPassword: "Password must be at least 8 characters.",
      };

  useEffect(() => {
    const prev = document.title;
    document.title = t.title;
    return () => { document.title = prev; };
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError(t.minPassword);
      return;
    }
    setLoading(true);
    try {
      const { error: signErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            requested_role: "artist",
            founding_artist: true,
            origin,
            technique,
            bio,
            instagram,
            website,
            portfolio_url: portfolioUrl,
          },
        },
      });
      if (signErr) throw signErr;
      setStep("check-email");
    } catch (err: any) {
      setError(err?.message || t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Seo title={"You're Invited | Ignia Gallery"} description={"Complete your Ignia Gallery artist registration."} path="/invitacion-artista" />
      <Header />
      <main style={{ flex: 1, paddingTop: 56 }}>
        <section style={{ maxWidth: 460, margin: "0 auto", padding: "120px 24px 160px" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              color: "#121212",
              fontSize: "clamp(32px, 4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}>{t.title}</h1>
            <p style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              color: "#666666",
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 48,
            }}>{t.subtitle}</p>
          </div>

          {step === "check-email" ? (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.checkEmailTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6 }}>
                {t.checkEmailMsg}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="name">{t.fName}</label>
                <input id="name" required value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="email">{t.fEmail}</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="password">{t.fPassword}</label>
                <input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="origin">{t.fOrigin}</label>
                <input id="origin" required value={origin} onChange={(e) => setOrigin(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="technique">{t.fTechnique}</label>
                <input id="technique" required value={technique} onChange={(e) => setTechnique(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="bio">{t.fBio}</label>
                <textarea id="bio" required rows={5} value={bio} onChange={(e) => setBio(e.target.value)} style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 500,
                color: "#121212",
                fontSize: 20,
                margin: "0 0 24px",
              }}>{t.contactTitle}</h2>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="instagram">{t.fInstagram}</label>
                <input id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="website">{t.fWebsite}</label>
                <input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="portfolio">{t.fPortfolio}</label>
                <input id="portfolio" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} style={inputStyle} />
              </div>

              {error && <p style={{ color: "#b00020", fontFamily: "Manrope, sans-serif", fontSize: 14, marginBottom: 16 }}>{error}</p>}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  background: "#121212",
                  color: "#FFFFFF",
                  border: "1px solid #121212",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: loading ? "default" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? t.sending : t.submit}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
