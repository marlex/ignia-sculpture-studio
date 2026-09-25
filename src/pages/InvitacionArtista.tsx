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

export default function InvitacionArtista() {
  const lang = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const t = lang === "es"
    ? {
        title: "Has sido invitado a Ignia",
        subtitle: "Completa tu registro para que activemos tu cuenta de artista fundador.",
        fName: "Nombre completo",
        fEmail: "Email",
        fSocial: "Instagram, web o portfolio",
        submit: "Completar registro",
        sending: "Enviando…",
        okTitle: "Registro recibido.",
        okMsg: "En breve activaremos tu cuenta y recibirás un email para crear tu contraseña.",
        errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
      }
    : {
        title: "You've been invited to Ignia",
        subtitle: "Complete your registration so we can activate your founding artist account.",
        fName: "Full name",
        fEmail: "Email",
        fSocial: "Instagram, website or portfolio",
        submit: "Complete registration",
        sending: "Sending…",
        okTitle: "Registration received.",
        okMsg: "We'll activate your account shortly and email you to set up your password.",
        errMsg: "There was an error sending. Please try again.",
      };

  useEffect(() => {
    const prev = document.title;
    document.title = t.title;
    return () => { document.title = prev; };
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: rpcErr } = await supabase.rpc("submit_application", {
        p_name: name,
        p_email: email,
        p_social: social || null,
        p_language: lang,
      });
      if (rpcErr) throw rpcErr;
      setSubmitted(true);
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

          {submitted ? (
            <div style={{ textAlign: "center" }}>
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
                <input id="social" required value={social} onChange={(e) => setSocial(e.target.value)} style={inputStyle} />
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
