import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type EventRow = {
  id: string;
  artwork_id: string;
  event_type: string;
  visitor_country: string | null;
  created_at: string;
};

const cellStyle: React.CSSProperties = {
  padding: "12px 10px", fontFamily: "Manrope, sans-serif",
  fontSize: 14, color: "#121212", borderBottom: "1px solid #eee",
};
const thStyle: React.CSSProperties = {
  ...cellStyle, fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.12em", fontSize: 12, color: "#666",
  textAlign: "left", borderBottom: "1px solid #121212",
};

export default function Metricas() {
  const lang = useLang();
  const [rows, setRows] = useState<EventRow[]>([]);
  const [selected, setSelected] = useState<string | "all">("all");

  const t = lang === "es" ? {
    title: "Métricas",
    hint: "Detalle agregado de eventos por obra.",
    filter: "Obra",
    all: "Todas",
    artwork: "Obra",
    views: "Vistas",
    ar: "AR",
    d3: "3D",
    favorited: "Favoritos",
    inquiry: "Consultas",
    countries: "Países",
    empty: "Aún no hay eventos registrados.",
  } : {
    title: "Metrics",
    hint: "Aggregated event detail per artwork.",
    filter: "Artwork",
    all: "All",
    artwork: "Artwork",
    views: "Views",
    ar: "AR",
    d3: "3D",
    favorited: "Favorited",
    inquiry: "Inquiries",
    countries: "Countries",
    empty: "No events recorded yet.",
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("artwork_events")
        .select("id, artwork_id, event_type, visitor_country, created_at")
        .order("created_at", { ascending: false })
        .limit(5000);
      setRows((data as EventRow[]) || []);
    })();
  }, []);

  const artworks = useMemo(
    () => Array.from(new Set(rows.map((r) => r.artwork_id))).sort(),
    [rows],
  );

  const grouped = useMemo(() => {
    const filtered = selected === "all" ? rows : rows.filter((r) => r.artwork_id === selected);
    const map = new Map<string, { views: number; ar: number; d3: number; fav: number; inq: number; countries: Set<string> }>();
    filtered.forEach((r) => {
      const cur = map.get(r.artwork_id) || { views: 0, ar: 0, d3: 0, fav: 0, inq: 0, countries: new Set<string>() };
      if (r.event_type === "view") cur.views++;
      if (r.event_type === "ar_activated") cur.ar++;
      if (r.event_type === "3d_activated") cur.d3++;
      if (r.event_type === "favorited") cur.fav++;
      if (r.event_type === "inquiry") cur.inq++;
      if (r.visitor_country) cur.countries.add(r.visitor_country);
      map.set(r.artwork_id, cur);
    });
    return Array.from(map.entries());
  }, [rows, selected]);

  return (
    <div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 12px",
      }}>{t.title}</h1>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#666", margin: "0 0 24px" }}>{t.hint}</p>

      <div style={{ marginBottom: 16, fontFamily: "Manrope, sans-serif", fontSize: 14 }}>
        <label style={{ marginRight: 8 }}>{t.filter}:</label>
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{ padding: "6px 10px", border: "1px solid #121212", background: "#fff", minWidth: 200 }}
        >
          <option value="all">{t.all}</option>
          {artworks.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.artwork}</th>
              <th style={thStyle}>{t.views}</th>
              <th style={thStyle}>{t.ar}</th>
              <th style={thStyle}>{t.d3}</th>
              <th style={thStyle}>{t.favorited}</th>
              <th style={thStyle}>{t.inquiry}</th>
              <th style={thStyle}>{t.countries}</th>
            </tr>
          </thead>
          <tbody>
            {grouped.length === 0 && (
              <tr><td style={cellStyle} colSpan={7}>{t.empty}</td></tr>
            )}
            {grouped.map(([id, s]) => (
              <tr key={id}>
                <td style={cellStyle}>{id}</td>
                <td style={cellStyle}>{s.views}</td>
                <td style={cellStyle}>{s.ar}</td>
                <td style={cellStyle}>{s.d3}</td>
                <td style={cellStyle}>{s.fav}</td>
                <td style={cellStyle}>{s.inq}</td>
                <td style={cellStyle}>{s.countries.size ? Array.from(s.countries).join(", ") : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
