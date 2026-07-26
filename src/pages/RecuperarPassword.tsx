import { useState } from "react";
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

export default function RecuperarPassword() {
  const lang = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es" ? {
    title: "Recuperar contraseña",
    subtitle: "Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.",
    email: "Email",
    submit: "Enviar enlace",
    sending: "Enviando…",
    okTitle: "Revisa tu correo",
    okMsg: "Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.",
    back: "Volver a login",
    errMsg: "No se pudo enviar el enlace. Inténtalo de nuevo.",
  } : {
    title: "Reset password",
    subtitle: "Enter your email and we'll send you a link to reset your password.",
    email: "Email",
    submit: "Send link",
    sending: "Sending…",
    okTitle: "Check your email",
    okMsg: "If an account exists with that email, you'll receive a link to reset your password.",
    back: "Back to login",
    errMsg: "Could not send the link. Please try again.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    try {
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (err) throw err;
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
        <section style={{ maxWidth: 460, margin: "0 auto", padding: "80px 24px 120px" }}>
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

          {submitted ? (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.okTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                {t.okMsg}
              </p>
              <Link to="/login" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 14, color: "#121212", textDecoration: "underline" }}>
                {t.back}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="email">{t.email}</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <button
                type="submit"
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
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {t.submit}
              </button>

              <p style={{
                marginTop: 32,
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#666666",
                textAlign: "center",
              }}>
                <Link to="/login" style={{ color: "#121212", textDecoration: "underline" }}>
                  {t.back}
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
