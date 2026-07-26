import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const h1Style: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 600,
  color: "#121212",
  fontSize: "clamp(28px, 3.4vw, 40px)",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  margin: "0 0 24px",
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #eee",
  padding: "20px",
  fontFamily: "Manrope, sans-serif",
};

const kpiLabel: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#666",
  fontWeight: 500,
};

const kpiValue: React.CSSProperties = {
  fontSize: 32,
  fontWeight: 600,
  color: "#121212",
  fontFamily: "'Cormorant Garamond', serif",
  marginTop: 6,
};

export default function Overview() {
  const lang = useLang();
  const [stats, setStats] = useState({ totalArtists: 0, womenPct: 0, countries: 0, artworks: 0 });

  const t = lang === "es" ? {
    title: "Métricas de impacto",
    totalArtists: "Artistas totales",
    women: "% mujeres",
    countries: "Países representados",
    artworks: "Obras publicadas",
    exportCsv: "Exportar CSV",
    subtitle: "Vista general de la comunidad Ignia.",
  } : {
    title: "Impact metrics",
    totalArtists: "Total artists",
    women: "% women",
    countries: "Countries represented",
    artworks: "Published artworks",
    exportCsv: "Export CSV",
    subtitle: "Overview of the Ignia community.",
  };

  useEffect(() => {
    (async () => {
      const { data: artists } = await supabase.from("profiles").select("id, gender").eq("role", "artist");
      const total = artists?.length ?? 0;
      const women = artists?.filter((a: any) => a.gender === "female").length ?? 0;
      setStats({
        totalArtists: total,
        womenPct: total ? Math.round((women / total) * 100) : 0,
        countries: 0,
        artworks: 0,
      });
    })();
  }, []);

  const exportCsv = async () => {
    const { data } = await supabase.from("profiles").select("id, email, role, founding_artist, gender, created_at").eq("role", "artist");
    const rows = data || [];
    const header = ["id","email","role","founding_artist","gender","created_at"];
    const csv = [header.join(","), ...rows.map((r: any) => header.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "ignia-artists.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const items = [
    { label: t.totalArtists, value: stats.totalArtists },
    { label: t.women, value: `${stats.womenPct}%` },
    { label: t.countries, value: stats.countries },
    { label: t.artworks, value: stats.artworks },
  ];

  return (
    <div>
      <h1 style={h1Style}>{t.title}</h1>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "#666", margin: "0 0 24px" }}>{t.subtitle}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
        {items.map((k) => (
          <div key={k.label} style={cardStyle}>
            <div style={kpiLabel}>{k.label}</div>
            <div style={kpiValue}>{k.value}</div>
          </div>
        ))}
      </div>

      <button
        onClick={exportCsv}
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "12px 20px",
          background: "#121212",
          color: "#fff",
          border: "1px solid #121212",
          cursor: "pointer",
        }}
      >
        {t.exportCsv}
      </button>
    </div>
  );
}
