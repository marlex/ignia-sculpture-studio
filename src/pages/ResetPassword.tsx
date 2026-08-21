import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function ResetPassword() {
  const lang = useLang();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const t = lang === "es" ? {
    title: "Nueva contraseña",
    subtitle: "Introduce tu nueva contraseña para completar el proceso.",
    password: "Nueva contraseña",
    confirm: "Confirmar contraseña",
    submit: "Guardar contraseña",
    sending: "Guardando…",
    okTitle: "Contraseña actualizada",
    okMsg: "Ya puedes iniciar sesión con tu nueva contraseña.",
    goLogin: "Ir a login",
    invalidLink: "Este enlace no es válido o ha caducado.",
    mismatch: "Las contraseñas no coinciden.",
    short: "La contraseña debe tener al menos 6 caracteres.",
  } : {
    title: "New password",
    subtitle: "Enter your new password to complete the reset.",
    password: "New password",
    confirm: "Confirm password",
    submit: "Save password",
    sending: "Saving…",
    okTitle: "Password updated",
    okMsg: "You can now sign in with your new password.",
    goLogin: "Go to login",
    invalidLink: "This link is invalid or has expired.",
    mismatch: "Passwords do not match.",
    short: "Password must be at least 6 characters.",
  };

  // Supabase sends the recovery token via URL hash; the client parses it
  // automatically and fires PASSWORD_RECOVERY. We treat that as "ready".
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    // If the user reloads with a session already restored, allow it too.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    // Detect invalid link (no recovery hash and no session after a tick).
    const timer = setTimeout(() => {
      const hash = window.location.hash || "";
      if (!hash.includes("type=recovery") && !hash.includes("access_token")) {
        supabase.auth.getSession().then(({ data }) => {
          if (!data.session) setError(t.invalidLink);
        });
      }
    }, 800);
    return () => { sub.subscription.unsubscribe(); clearTimeout(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) { setError(t.short); return; }
    if (password !== confirm) { setError(t.mismatch); return; }
    setLoading(true); setError(null);
    try {
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setDone(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError(err?.message || t.invalidLink);
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

          {done ? (
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.okTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                {t.okMsg}
              </p>
              <Link to="/login" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 14, color: "#121212", textDecoration: "underline" }}>
                {t.goLogin}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle} htmlFor="password">{t.password}</label>
                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 40 }}>
                <label style={labelStyle} htmlFor="confirm">{t.confirm}</label>
                <input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} style={inputStyle} />
              </div>
              {error && <p style={{ color: "#b00020", fontFamily: "Manrope, sans-serif", fontSize: 14, marginBottom: 16 }}>{error}</p>}
              <button
                type="submit"
                disabled={loading || (!ready && !error)}
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
                  opacity: loading || (!ready && !error) ? 0.6 : 1,
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
