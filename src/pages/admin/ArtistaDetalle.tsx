import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Profile = {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  founding_artist: boolean;
  created_at: string;
  origin: string | null;
  technique: string | null;
  bio: string | null;
  instagram: string | null;
  website: string | null;
  portfolio_url: string | null;
  lang: string | null;
};

type Artwork = {
  id: string;
  title: string;
  status: string;
  price: number | null;
  image_url: string | null;
  model_status: string;
  created_at: string;
};

type EmailLog = {
  id: string;
  template_name: string;
  status: string;
  created_at: string;
};

const cellStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontFamily: "Hanken Grotesk, sans-serif",
  fontSize: 14, color: "#121212",
  borderBottom: "1px solid #eee",
};
const thStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.12em", fontSize: 12, color: "#666",
  textAlign: "left", borderBottom: "1px solid #121212",
};

export default function ArtistaDetalle() {
  const { id } = useParams();
  const lang = useLang();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [emailLog, setEmailLog] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState<string | null>(null);

  const t = lang === "es" ? {
    back: "← Volver a Artistas",
    notFound: "Artista no encontrado.",
    founding: "Artista fundador",
    joined: "Alta",
    origin: "Origen", technique: "Técnica", bio: "Biografía",
    instagram: "Instagram", website: "Sitio web", portfolio: "Portfolio",
    noValue: "—",
    worksTitle: "Obras",
    noWorks: "Sin obras todavía.",
    title: "Título", status: "Estado", price: "Precio", model: "3D",
    resendTitle: "Reenviar email de bienvenida",
    resendHint: "Útil si el artista recibió el email en el idioma equivocado o no le llegó.",
    resendEs: "Reenviar en español",
    resendEn: "Reenviar en inglés",
    resendOk: "Email reenviado.",
    resendFail: "No se pudo reenviar el email.",
    logTitle: "Historial de envíos",
    logEmpty: "Sin envíos registrados todavía.",
    logStatus: { pending: "En cola", sent: "Enviado", failed: "Falló", suppressed: "Suprimido", bounced: "Rebotado", complained: "Marcado como spam", dlq: "Falló (reintentos agotados)" } as Record<string, string>,
  } : {
    back: "← Back to Artists",
    notFound: "Artist not found.",
    founding: "Founding artist",
    joined: "Joined",
    origin: "Origin", technique: "Technique", bio: "Biography",
    instagram: "Instagram", website: "Website", portfolio: "Portfolio",
    noValue: "—",
    worksTitle: "Works",
    noWorks: "No works yet.",
    title: "Title", status: "Status", price: "Price", model: "3D",
    resendTitle: "Resend welcome email",
    resendHint: "Useful if the artist got the email in the wrong language, or never received it.",
    resendEs: "Resend in Spanish",
    resendEn: "Resend in English",
    resendOk: "Email resent.",
    resendFail: "Could not resend the email.",
    logTitle: "Send history",
    logEmpty: "No sends recorded yet.",
    logStatus: { pending: "Queued", sent: "Sent", failed: "Failed", suppressed: "Suppressed", bounced: "Bounced", complained: "Marked as spam", dlq: "Failed (retries exhausted)" } as Record<string, string>,
  };

  const loadProfile = async () => {
    if (!id) return;
    const [{ data: prof }, { data: arts }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, email, name, role, founding_artist, created_at, origin, technique, bio, instagram, website, portfolio_url, lang")
        .eq("id", id)
        .maybeSingle(),
      supabase
        .from("artworks")
        .select("id, title, status, price, image_url, model_status, created_at")
        .eq("artist_id", id)
        .order("created_at", { ascending: false }),
    ]);
    setProfile((prof as Profile) || null);
    setArtworks((arts as Artwork[]) || []);
    if (prof?.email) {
      const { data: logs } = await supabase
        .from("email_send_log")
        .select("id, template_name, status, created_at")
        .eq("recipient_email", prof.email)
        .order("created_at", { ascending: false })
        .limit(20);
      setEmailLog((logs as EmailLog[]) || []);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadProfile();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const resendWelcome = async (emailLang: "es" | "en") => {
    if (!profile) return;
    setResending(true); setResendMsg(null);
    try {
      const { error: langErr } = await supabase.from("profiles").update({ lang: emailLang }).eq("id", profile.id);
      if (langErr) throw langErr;
      const { error: sendErr } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "founding-artist-welcome",
          recipientEmail: profile.email,
          templateData: { name: profile.name || "", lang: emailLang },
        },
      });
      if (sendErr) throw sendErr;
      await loadProfile();
      setResendMsg(t.resendOk);
    } catch {
      setResendMsg(t.resendFail);
    } finally {
      setResending(false);
    }
  };

  if (loading) return null;

  if (!profile) {
    return (
      <div>
        <Link to="/admin/dashboard/artistas" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212" }}>{t.back}</Link>
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", marginTop: 20 }}>{t.notFound}</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/dashboard/artistas" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", display: "inline-block", marginBottom: 24 }}>
        {t.back}
      </Link>

      <h1 style={{
        fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 4px",
      }}>{profile.name || profile.email}</h1>
      <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#666", margin: "0 0 24px" }}>
        {profile.email}
        {profile.founding_artist && <span> · {t.founding}</span>}
        {" · "}{t.joined} {new Date(profile.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}
      </p>

      <div style={{ display: "grid", gap: 20, maxWidth: 640, marginBottom: 48 }}>
        <Field label={t.origin} value={profile.origin} noValue={t.noValue} />
        <Field label={t.technique} value={profile.technique} noValue={t.noValue} />
        <Field label={t.instagram} value={profile.instagram} noValue={t.noValue} />
        <Field label={t.website} value={profile.website} noValue={t.noValue} />
        <Field label={t.portfolio} value={profile.portfolio_url} noValue={t.noValue} />
        <Field label={t.bio} value={profile.bio} noValue={t.noValue} multiline />
      </div>

      <div style={{ border: "1px solid #E5E5E5", padding: "20px 24px", marginBottom: 48, maxWidth: 480 }}>
        <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 18, margin: "0 0 6px" }}>
          {t.resendTitle}
        </h2>
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, color: "#666", margin: "0 0 16px", lineHeight: 1.5 }}>
          {t.resendHint}
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            disabled={resending}
            onClick={() => resendWelcome("es")}
            style={{
              fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "10px 16px", border: "1px solid #121212",
              background: profile.lang === "es" ? "#121212" : "#fff",
              color: profile.lang === "es" ? "#fff" : "#121212",
              cursor: resending ? "default" : "pointer", opacity: resending ? 0.6 : 1,
            }}
          >
            {t.resendEs}
          </button>
          <button
            type="button"
            disabled={resending}
            onClick={() => resendWelcome("en")}
            style={{
              fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "10px 16px", border: "1px solid #121212",
              background: profile.lang === "en" ? "#121212" : "#fff",
              color: profile.lang === "en" ? "#fff" : "#121212",
              cursor: resending ? "default" : "pointer", opacity: resending ? 0.6 : 1,
            }}
          >
            {t.resendEn}
          </button>
        </div>
        {resendMsg && (
          <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, color: "#121212", marginTop: 12, marginBottom: 0 }}>
            {resendMsg}
          </p>
        )}

        <div style={{ borderTop: "1px solid #E5E5E5", marginTop: 20, paddingTop: 16 }}>
          <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#666", marginBottom: 10 }}>
            {t.logTitle}
          </div>
          {emailLog.length === 0 ? (
            <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, color: "#666", margin: 0 }}>
              {t.logEmpty}
            </p>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              {emailLog.map((e) => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13 }}>
                  <span style={{ color: "#121212" }}>{e.template_name}</span>
                  <span style={{ color: "#666", whiteSpace: "nowrap" }}>
                    {t.logStatus[e.status] || e.status} · {new Date(e.created_at).toLocaleString(lang === "es" ? "es-ES" : "en-US", { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 24, margin: "0 0 16px" }}>
        {t.worksTitle}
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.title}</th>
              <th style={thStyle}>{t.status}</th>
              <th style={thStyle}>{t.price}</th>
              <th style={thStyle}>{t.model}</th>
            </tr>
          </thead>
          <tbody>
            {artworks.length === 0 && (
              <tr><td style={cellStyle} colSpan={4}>{t.noWorks}</td></tr>
            )}
            {artworks.map((a) => (
              <tr key={a.id}>
                <td style={cellStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {a.image_url && <img src={a.image_url} alt="" style={{ width: 36, height: 36, objectFit: "cover" }} />}
                    <span>{a.title}</span>
                  </div>
                </td>
                <td style={cellStyle}>{a.status}</td>
                <td style={cellStyle}>{a.price != null ? `€${a.price}` : t.noValue}</td>
                <td style={cellStyle}>{a.model_status === "ready" ? "✓" : a.model_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Field({ label, value, noValue, multiline }: { label: string; value?: string | null; noValue: string; multiline?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#666", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", whiteSpace: multiline ? "pre-wrap" : "normal", lineHeight: 1.55 }}>
        {value || noValue}
      </div>
    </div>
  );
}
