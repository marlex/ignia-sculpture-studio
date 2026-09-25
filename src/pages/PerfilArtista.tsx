import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";
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

export default function PerfilArtista() {
  const lang = useLang();
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const [origin, setOrigin] = useState("");
  const [technique, setTechnique] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const t = lang === "es"
    ? {
        title: "Completa tu perfil de artista",
        subtitle: "Esta información aparece en tu perfil público, junto a tus obras.",
        fOrigin: "Origen (ciudad, país)",
        fTechnique: "Técnica o materiales principales",
        fBio: "Biografía corta",
        submit: "Guardar y continuar",
        sending: "Guardando…",
        savedTitle: "Perfil guardado.",
        savedMsg: "Ya puedes publicar tu primera obra.",
        goPublish: "Publicar una obra",
        errMsg: "Hubo un error al guardar. Inténtalo de nuevo.",
      }
    : {
        title: "Complete your artist profile",
        subtitle: "This shows on your public profile, next to your works.",
        fOrigin: "Origin (city, country)",
        fTechnique: "Main technique or materials",
        fBio: "Short biography",
        submit: "Save and continue",
        sending: "Saving…",
        savedTitle: "Profile saved.",
        savedMsg: "You can now publish your first work.",
        goPublish: "Publish a work",
        errMsg: "There was an error saving. Please try again.",
      };

  useEffect(() => {
    const prev = document.title;
    document.title = t.title;
    return () => { document.title = prev; };
  }, [lang]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/login?redirect=/perfil-artista"); return; }
    if (profile?.role !== "artist") { navigate("/dashboard"); return; }
    setOrigin(profile.origin ?? "");
    setTechnique(profile.technique ?? "");
    setBio(profile.bio ?? "");
  }, [authLoading, user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setLoading(true);
    try {
      const { error: updErr } = await supabase
        .from("profiles")
        .update({ origin, technique, bio })
        .eq("id", user.id);
      if (updErr) throw updErr;
      await refreshProfile();
      setSaved(true);
    } catch (err: any) {
      setError(err?.message || t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user || profile?.role !== "artist") return null;

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Seo title={"Artist Profile | Ignia Gallery"} description={"Complete your Ignia Gallery artist profile."} path="/perfil-artista" />
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

          {saved ? (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 24, marginBottom: 16 }}>
                {t.savedTitle}
              </h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                {t.savedMsg}
              </p>
              <button
                onClick={() => navigate("/publicar")}
                style={{
                  padding: "16px 32px",
                  background: "#121212",
                  color: "#FFFFFF",
                  border: "1px solid #121212",
                  fontFamily: "Manrope, sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {t.goPublish}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
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
