import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type EventRow = { artwork_id: string; event_type: string };

const cellStyle: React.CSSProperties = {
  padding: "12px 10px", fontFamily: "Manrope, sans-serif",
  fontSize: 14, color: "#121212", borderBottom: "1px solid #eee",
};
const thStyle: React.CSSProperties = {
  ...cellStyle, fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.12em", fontSize: 12, color: "#666",
  textAlign: "left", borderBottom: "1px solid #121212",
};
const btn: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 500,
  letterSpacing: "0.08em", textTransform: "uppercase",
  padding: "6px 12px", border: "1px solid #121212",
  background: "#fff", color: "#121212", cursor: "pointer",
};

type ArtworkStats = {
  artwork_id: string;
  view: number;
  ar_activated: number;
  ["3d_activated"]: number;
  inquiry: number;
};

export default function Obras() {
  const lang = useLang();
  const [stats, setStats] = useState<ArtworkStats[]>([]);

  const t = lang === "es" ? {
    title: "Obras pendientes de aprobación",
    empty: "No hay obras pendientes.",
    hint: "El registro de obras en base de datos se activará en el próximo paso. Por ahora se muestran los contadores de eventos por obra.",
    artwork: "Obra",
    views: "Vistas",
    ar: "AR",
    d3: "3D",
    inquiry: "Consultas",
    approve: "Aprobar",
    reject: "Rechazar",
  } : {
    title: "Artworks pending approval",
    empty: "No pending artworks.",
    hint: "Artwork registration in the database will land in the next step. For now the per-artwork event counters are shown.",
    artwork: "Artwork",
    views: "Views",
    ar: "AR",
    d3: "3D",
    inquiry: "Inquiries",
    approve: "Approve",
    reject: "Reject",
  };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("artwork_events").select("artwork_id, event_type");
      const rows = (data as EventRow[]) || [];
      const map = new Map<string, ArtworkStats>();
      rows.forEach((r) => {
        const cur = map.get(r.artwork_id) || {
          artwork_id: r.artwork_id, view: 0, ar_activated: 0, "3d_activated": 0, inquiry: 0,
        };
        if (r.event_type in cur) (cur as any)[r.event_type] += 1;
        map.set(r.artwork_id, cur);
      });
      setStats(Array.from(map.values()));
    })();
  }, []);

  return (
    <div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 12px",
      }}>{t.title}</h1>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#666", margin: "0 0 24px" }}>{t.hint}</p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.artwork}</th>
              <th style={thStyle}>{t.views}</th>
              <th style={thStyle}>{t.ar}</th>
              <th style={thStyle}>{t.d3}</th>
              <th style={thStyle}>{t.inquiry}</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {stats.length === 0 && (
              <tr><td style={cellStyle} colSpan={6}>{t.empty}</td></tr>
            )}
            {stats.map((s) => (
              <tr key={s.artwork_id}>
                <td style={cellStyle}>{s.artwork_id}</td>
                <td style={cellStyle}>{s.view}</td>
                <td style={cellStyle}>{s.ar_activated}</td>
                <td style={cellStyle}>{s["3d_activated"]}</td>
                <td style={cellStyle}>{s.inquiry}</td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={btn} disabled>{t.approve}</button>
                    <button style={btn} disabled>{t.reject}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
