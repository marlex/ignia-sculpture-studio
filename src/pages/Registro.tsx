import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Seo } from "@/components/Seo";

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

type RequestedRole = "artist" | "collector";
type Step = "form" | "check-email" | "pending";

export default function Registro() {
  const lang = useLang();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requestedRole, setRequestedRole] = useState<RequestedRole>("artist");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es"
    ? {
        title: "Crear cuenta",
        subtitle: "Regístrate en Ignia Gallery. Un administrador confirmará tu cuenta antes de que puedas publicar.",
        fName: "Nombre completo",
        fEmail: "Email",
        fPassword: "Contraseña",
        fRole: "Quiero unirme como",
        roleArtist: "Escultor / artista",
        roleCollector: "Coleccionista",
        submit: "Crear cuenta",
        sending: "Creando cuenta…",
        haveAccount: "¿Ya tienes cuenta?",
        signin: "Inicia sesión",
        checkEmailTitle: "Revisa tu correo.",
        checkEmailMsg: "Te enviamos un enlace para confirmar tu email. Después de confirmarlo, un administrador revisará tu cuenta antes de activarla.",
        pendingTitle: "Cuenta creada.",
        pendingMsg: "Un administrador revisará tu cuenta y la activará en breve. Te avisaremos por email.",
        errMsg: "Hubo un error al crear la cuenta. Inténtalo de nuevo.",
        minPassword: "La contraseña debe tener al menos 8 caracteres.",
      }
    : {
        title: "Create account",
        subtitle: "Sign up for Ignia Gallery. An admin will confirm your account before you can publish.",
        fName: "Full name",
        fEmail: "Email",
        fPassword: "Password",
        fRole: "I want to join as",
        roleArtist: "Sculptor / artist",
        roleCollector: "Collector",
        submit: "Create account",
        sending: "Creating account…",
        haveAccount: "Already have an account?",
        signin: "Sign in",
        checkEmailTitle: "Check your email.",
        checkEmailMsg: "We sent you a link to confirm your email. Once confirmed, an admin will review your account before activating it.",
        pendingTitle: "Account created.",
        pendingMsg: "An admin will review your account and activate it shortly. We'll email you.",
        errMsg: "There was an error creating your account. Please try again.",
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
      const { data, error: signErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, requested_role: requestedRole } },
      });
      if (signErr) throw signErr;
      setStep(data.session ? "pending" : "check-email");
    } catch (err: any) {
      setError(err?.message || t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Seo title={"Create Account | Ignia Gallery"} description={"Create your Ignia Gallery account as a sculptor or collector."} path="/registro" />
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

          {step === "check-email" && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.checkEmailTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6 }}>
                {t.checkEmailMsg}
              </p>
            </div>
          )}

          {step === "pending" && (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.pendingTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6 }}>
                {t.pendingMsg}
              </p>
            </div>
          )}

          {step === "form" && (
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
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle}>{t.fRole}</label>
                <div style={{ display: "flex", gap: 24 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "Manrope, sans-serif", fontSize: 15, color: "#121212" }}>
                    <input
                      type="radio"
                      name="requestedRole"
                      checked={requestedRole === "artist"}
                      onChange={() => setRequestedRole("artist")}
                      style={{ accentColor: "#121212" }}
                    />
                    {t.roleArtist}
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "Manrope, sans-serif", fontSize: 15, color: "#121212" }}>
                    <input
                      type="radio"
                      name="requestedRole"
                      checked={requestedRole === "collector"}
                      onChange={() => setRequestedRole("collector")}
                      style={{ accentColor: "#121212" }}
                    />
                    {t.roleCollector}
                  </label>
                </div>
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
