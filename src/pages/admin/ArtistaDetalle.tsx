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
  const [loading, setLoading] = useState(true);

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
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const [{ data: prof }, { data: arts }] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, email, name, role, founding_artist, created_at, origin, technique, bio, instagram, website, portfolio_url")
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
      setLoading(false);
    })();
  }, [id]);

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
