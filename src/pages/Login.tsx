import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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

export default function Login() {
  const lang = useLang();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const t = lang === "es" ? {
    title: "Iniciar sesión",
    subtitle: "Accede a tu cuenta de Ignia Gallery.",
    email: "Email",
    password: "Contraseña",
    remember: "Recuérdame",
    forgot: "¿Olvidaste tu contraseña?",
    submit: "Login",
    sending: "Entrando…",
    noAccount: "¿No tienes cuenta?",
    create: "Crear cuenta",
    invalid: "Email o contraseña incorrectos.",
    notActive: "Tu cuenta aún no está activa.",
  } : {
    title: "Sign in",
    subtitle: "Access your Ignia Gallery account.",
    email: "Email",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot your password?",
    submit: "Login",
    sending: "Signing in…",
    noAccount: "Don't have an account?",
    create: "Create account",
    invalid: "Invalid email or password.",
    notActive: "Your account is not active yet.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setInfo(null);
    try {
      const { data, error: signErr } = await supabase.auth.signInWithPassword({ email, password });
      if (signErr || !data.user) { setError(t.invalid); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();
      const role = profile?.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (!role) {
        setInfo(t.notActive);
      } else {
        navigate(redirect || "/");
      }
    } catch (err: any) {
      setError(err?.message || t.invalid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Seo title={"Log In | Ignia Gallery"} description={"Log in to your Ignia Gallery account to manage your works, collection and profile."} path="/login" noindex />
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

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle} htmlFor="email">{t.email}</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle} htmlFor="password">{t.password}</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 14, color: "#121212" }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "#121212", margin: 0 }}
                />
                {t.remember}
              </label>
              <Link to="/recuperar-password" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 14, color: "#121212", textDecoration: "underline" }}>
                {t.forgot}
              </Link>
            </div>

            {error && <p style={{ color: "#b00020", fontFamily: "Manrope, sans-serif", fontSize: 14, marginBottom: 16 }}>{error}</p>}
            {info && <p style={{ color: "#121212", fontFamily: "Manrope, sans-serif", fontSize: 14, marginBottom: 16 }}>{info}</p>}
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
              {t.noAccount}{" "}
              <Link to="/registro" style={{ color: "#121212", textDecoration: "underline" }}>
                {t.create}
              </Link>
            </p>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
