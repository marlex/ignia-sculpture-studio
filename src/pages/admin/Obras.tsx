import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Status = "pendiente" | "aprobada" | "rechazada";

type Artwork = {
  id: string;
  artist_id: string;
  title: string;
  price: number | null;
  year: number | null;
  status: Status;
  created_at: string;
  image_url: string | null;
};

type Profile = {
  id: string;
  email: string;
  role: string;
  founding_artist: boolean;
};

type Filter = "todas" | Status;

const cellStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontFamily: "Manrope, sans-serif",
  fontSize: 14,
  color: "#121212",
  borderBottom: "1px solid #eee",
  verticalAlign: "middle",
};
const thStyle: React.CSSProperties = {
  ...cellStyle,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: 12,
  color: "#666",
  textAlign: "left",
  borderBottom: "1px solid #121212",
};
const tabBtn = (active: boolean): React.CSSProperties => ({
  fontFamily: "Manrope, sans-serif",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "8px 14px",
  border: "1px solid #121212",
  background: active ? "#121212" : "#fff",
  color: active ? "#fff" : "#121212",
  cursor: "pointer",
});
const badge = (s: Status): React.CSSProperties => {
  const map: Record<Status, { bg: string; color: string }> = {
    pendiente: { bg: "#FFF4D6", color: "#8A6D00" },
    aprobada: { bg: "#E4F3E4", color: "#1F6B2A" },
    rechazada: { bg: "#EEE", color: "#666" },
  };
  return {
    display: "inline-block",
    padding: "4px 10px",
    fontFamily: "Manrope, sans-serif",
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: map[s].bg,
    color: map[s].color,
    borderRadius: 2,
  };
};

export default function Obras() {
  const lang = useLang();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [filter, setFilter] = useState<Filter>("todas");
  const [loading, setLoading] = useState(true);

  const t = lang === "es"
    ? {
        title: "Obras",
        subtitle: "Todas las obras de artistas fundadores y aprobados. Las pendientes aparecen primero.",
        empty: "No hay obras que coincidan con este filtro.",
        artwork: "Obra",
        artist: "Artista",
        year: "Año",
        price: "Precio",
        status: "Estado",
        actions: "",
        tabs: { todas: "Todas", pendiente: "Pendientes", aprobada: "Aprobadas", rechazada: "Rechazadas" },
        approve: "Aprobar",
        reject: "Rechazar",
        pending_label: "Pendientes de aprobación",
      }
    : {
        title: "Artworks",
        subtitle: "All artworks by founding and approved artists. Pending ones appear first.",
        empty: "No artworks match this filter.",
        artwork: "Artwork",
        artist: "Artist",
        year: "Year",
        price: "Price",
        status: "Status",
        actions: "",
        tabs: { todas: "All", pendiente: "Pending", aprobada: "Approved", rechazada: "Rejected" },
        approve: "Approve",
        reject: "Reject",
        pending_label: "Pending approval",
      };

  const load = async () => {
    setLoading(true);
    const { data: profs } = await supabase
      .from("profiles")
      .select("id, email, role, founding_artist")
      .eq("role", "artist");
    const profList = (profs as Profile[]) || [];
    const eligible = profList.filter((p) => p.founding_artist === true);
    const map: Record<string, Profile> = {};
    profList.forEach((p) => (map[p.id] = p));
    setProfiles(map);

    const ids = eligible.map((p) => p.id);
    if (ids.length === 0) {
      setArtworks([]);
      setLoading(false);
      return;
    }
    const { data: arts } = await supabase
      .from("artworks")
      .select("id, artist_id, title, price, year, status, created_at, image_url")
      .in("artist_id", ids)
      .order("created_at", { ascending: false });
    setArtworks((arts as Artwork[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const list = filter === "todas" ? artworks : artworks.filter((a) => a.status === filter);
    // Sort: pending first, then by created_at desc
    return [...list].sort((a, b) => {
      if (a.status === "pendiente" && b.status !== "pendiente") return -1;
      if (a.status !== "pendiente" && b.status === "pendiente") return 1;
      return b.created_at.localeCompare(a.created_at);
    });
  }, [artworks, filter]);

  const pendingCount = artworks.filter((a) => a.status === "pendiente").length;

  const updateStatus = async (id: string, status: Status) => {
    await supabase.from("artworks").update({ status }).eq("id", id);
    load();
  };

  return (
    <div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 8px",
      }}>{t.title}</h1>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#666", margin: "0 0 20px" }}>
        {t.subtitle}
      </p>

      {pendingCount > 0 && (
        <div style={{
          display: "inline-block",
          padding: "6px 12px",
          background: "#FFF4D6",
          color: "#8A6D00",
          fontFamily: "Manrope, sans-serif",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 20,
          borderRadius: 2,
        }}>
          {pendingCount} {t.pending_label}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {(["todas", "pendiente", "aprobada", "rechazada"] as Filter[]).map((f) => (
          <button key={f} style={tabBtn(filter === f)} onClick={() => setFilter(f)}>
            {t.tabs[f]}
          </button>
        ))}
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.artwork}</th>
              <th style={thStyle}>{t.artist}</th>
              <th style={thStyle}>{t.year}</th>
              <th style={thStyle}>{t.price}</th>
              <th style={thStyle}>{t.status}</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {!loading && filtered.length === 0 && (
              <tr><td style={cellStyle} colSpan={6}>{t.empty}</td></tr>
            )}
            {filtered.map((a) => {
              const artist = profiles[a.artist_id];
              return (
                <tr key={a.id}>
                  <td style={cellStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {a.image_url && (
                        <img src={a.image_url} alt="" style={{ width: 40, height: 40, objectFit: "cover" }} />
                      )}
                      <span>{a.title}</span>
                    </div>
                  </td>
                  <td style={cellStyle}>{artist?.email || ","}</td>
                  <td style={cellStyle}>{a.year ?? ","}</td>
                  <td style={cellStyle}>{a.price != null ? `€${a.price}` : ","}</td>
                  <td style={cellStyle}><span style={badge(a.status)}>{t.tabs[a.status]}</span></td>
                  <td style={cellStyle}>
                    {a.status === "pendiente" && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          style={{ ...tabBtn(false), padding: "6px 12px" }}
                          onClick={() => updateStatus(a.id, "aprobada")}
                        >{t.approve}</button>
                        <button
                          style={{ ...tabBtn(false), padding: "6px 12px" }}
                          onClick={() => updateStatus(a.id, "rechazada")}
                        >{t.reject}</button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
