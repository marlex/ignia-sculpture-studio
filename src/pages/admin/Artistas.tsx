import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Row = {
  id: string;
  email: string;
  founding_artist: boolean;
  created_at: string;
  role: string | null;
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

const btn: React.CSSProperties = {
  fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, fontWeight: 500,
  letterSpacing: "0.08em", textTransform: "uppercase",
  padding: "6px 12px", border: "1px solid #121212",
  background: "#fff", color: "#121212", cursor: "pointer",
};

export default function Artistas() {
  const lang = useLang();
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);
  const [workCounts, setWorkCounts] = useState<Record<string, number>>({});

  const t = lang === "es" ? {
    title: "Artistas",
    name: "Nombre / Email",
    founding: "Founding",
    date: "Alta",
    works: "Obras",
    actions: "Acciones",
    view: "Ver perfil",
    deactivate: "Desactivar",
    reactivate: "Reactivar",
    empty: "No hay artistas todavía.",
    yes: "Sí", no: "No",
  } : {
    title: "Artists",
    name: "Name / Email",
    founding: "Founding",
    date: "Joined",
    works: "Works",
    actions: "Actions",
    view: "View profile",
    deactivate: "Deactivate",
    reactivate: "Reactivate",
    empty: "No artists yet.",
    yes: "Yes", no: "No",
  };

  const load = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, email, founding_artist, created_at, role")
      .in("role", ["artist", "artist_disabled"])
      .order("created_at", { ascending: false });
    const list = (data as Row[]) || [];
    setRows(list);

    if (list.length > 0) {
      const { data: works } = await supabase
        .from("artworks")
        .select("artist_id")
        .in("artist_id", list.map((r) => r.id));
      const counts: Record<string, number> = {};
      (works || []).forEach((w: { artist_id: string }) => {
        counts[w.artist_id] = (counts[w.artist_id] || 0) + 1;
      });
      setWorkCounts(counts);
    } else {
      setWorkCounts({});
    }
  };

  useEffect(() => { load(); }, []);

  const toggleDeactivate = async (row: Row) => {
    setBusy(row.id);
    const nextRole = row.role === "artist_disabled" ? "artist" : "artist_disabled";
    await supabase.from("profiles").update({ role: nextRole }).eq("id", row.id);
    await load();
    setBusy(null);
  };

  return (
    <div>
      <h1 style={{
        fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 24px",
      }}>{t.title}</h1>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.name}</th>
              <th style={thStyle}>{t.founding}</th>
              <th style={thStyle}>{t.date}</th>
              <th style={thStyle}>{t.works}</th>
              <th style={thStyle}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td style={cellStyle} colSpan={5}>{t.empty}</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} style={{ opacity: r.role === "artist_disabled" ? 0.5 : 1 }}>
                <td style={cellStyle}>{r.email}</td>
                <td style={cellStyle}>{r.founding_artist ? t.yes : t.no}</td>
                <td style={cellStyle}>{new Date(r.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}</td>
                <td style={cellStyle}>{workCounts[r.id] || 0}</td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link to={`/admin/dashboard/artistas/${r.id}`} style={{ ...btn, textDecoration: "none", display: "inline-block" }}>{t.view}</Link>
                    <button style={btn} disabled={busy === r.id} onClick={() => toggleDeactivate(r)}>
                      {r.role === "artist_disabled" ? t.reactivate : t.deactivate}
                    </button>
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
