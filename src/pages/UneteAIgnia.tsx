import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

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
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  fontSize: 14,
  color: "#121212",
  marginBottom: 12,
};

export default function UneteAIgnia() {
  const lang = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es"
    ? {
        title: "Únete a Ignia",
        subtitle: "Solicita acceso. Revisamos cada solicitud personalmente y te contactamos en 48 horas.",
        fName: "Nombre completo",
        fEmail: "Email",
        fSocial: "Instagram o web",
        submit: "Solicitar acceso",
        sending: "Enviando…",
        haveAccount: "¿Ya tienes cuenta?",
        signin: "Inicia sesión",
        okTitle: "Solicitud recibida.",
        okMsg: "Revisamos cada solicitud personalmente y te contactamos en 48 horas.",
        errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
      }
    : {
        title: "Join Ignia",
        subtitle: "Request access. We review every application personally and reply within 48 hours.",
        fName: "Full name",
        fEmail: "Email",
        fSocial: "Instagram or website",
        submit: "Request access",
        sending: "Sending…",
        haveAccount: "Already have an account?",
        signin: "Sign in",
        okTitle: "Request received.",
        okMsg: "We review every request personally and will contact you within 48 hours.",
        errMsg: "There was an error sending. Please try again.",
      };

  useEffect(() => {
    const prev = document.title;
    document.title = lang === "es" ? "Únete a Ignia" : "Join Ignia";
    return () => { document.title = prev; };
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const { error: dbError } = await supabase
        .from("applications")
        .insert({ name, email, social: social || null, language: lang });
      if (dbError) throw dbError;
      // Send confirmation email in the visitor's language (best-effort)
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "application-received",
          recipientEmail: email,
          idempotencyKey: `application-received-${email.toLowerCase()}`,
          templateData: { name, lang },
        },
      }).catch(() => {});
      // Also notify via Formspree (best-effort, non-blocking)
      fetch("https://formspree.io/f/xgobbeyp", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ profile_type: "Solicitud de acceso", source: "unete-a-ignia", nombre: name, email, social }),
      }).catch(() => {});
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 56 }}>
        <section style={{ maxWidth: 560, margin: "0 auto", padding: "120px 24px 160px" }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
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

          {submitted ? (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.okTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6 }}>
                {t.okMsg}
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
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="social">{t.fSocial}</label>
                <input id="social" value={social} onChange={(e) => setSocial(e.target.value)} style={inputStyle} />
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

              <p style={{
                marginTop: 32,
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#666666",
                textAlign: "center",
              }}>
                {t.haveAccount}{" "}
                <Link to="/login" style={{ color: "#121212", textDecoration: "underline" }}>
                  {t.signin}
                </Link>
              </p>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
