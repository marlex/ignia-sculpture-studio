import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Application = {
  id: string;
  name: string;
  email: string;
  social: string | null;
  status: string;
  created_at: string;
};

type Profile = {
  id: string;
  email: string;
  role: string | null;
  founding_artist: boolean;
};

const STATUSES = [
  { value: "pending", es: "Pendiente", en: "Pending" },
  { value: "in_review", es: "En revisión", en: "In review" },
  { value: "accepted", es: "Aceptado", en: "Accepted" },
  { value: "waitlist", es: "Lista de espera", en: "Waitlist" },
  { value: "rejected", es: "Rechazado", en: "Rejected" },
];

const FOUNDING_CAP = 30;

const cellStyle: React.CSSProperties = {
  padding: "12px 10px",
  fontFamily: "Manrope, sans-serif",
  fontSize: 14,
  fontWeight: 400,
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

export default function Solicitudes() {
  const lang = useLang();
  const [apps, setApps] = useState<Application[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [foundingByEmail, setFoundingByEmail] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pendingFounding, setPendingFounding] = useState<Record<string, boolean>>({});

  const t = lang === "es" ? {
    title: "Solicitudes",
    counter: "Artistas fundadores confirmados",
    remaining: "restantes",
    of: "de",
    name: "Nombre", email: "Email", social: "Instagram / Web", date: "Fecha",
    status: "Estado", founding: "Founding Artist",
    empty: "Sin solicitudes por el momento.",
    yes: "Sí", no: "No",
    inviteOk: "Invitación enviada por email.",
    inviteFail: "No se pudo enviar la invitación.",
  } : {
    title: "Applications",
    counter: "Confirmed founding artists",
    remaining: "remaining", of: "of",
    name: "Name", email: "Email", social: "Instagram / Web", date: "Date",
    status: "Status", founding: "Founding Artist",
    empty: "No applications yet.",
    yes: "Yes", no: "No",
    inviteOk: "Invitation sent by email.",
    inviteFail: "Could not send invitation.",
  };

  const loadData = async () => {
    const [{ data: appsData }, { data: profData }] = await Promise.all([
      supabase.from("applications").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, email, role, founding_artist"),
    ]);
    setApps((appsData as Application[]) || []);
    setProfiles((profData as Profile[]) || []);
    const map: Record<string, boolean> = {};
    (profData as Profile[] || []).forEach((p) => { map[p.email.toLowerCase()] = !!p.founding_artist; });
    setFoundingByEmail(map);
  };

  useEffect(() => {
    loadData();
    const channel = supabase
      .channel("admin-solicitudes")
      .on("postgres_changes", { event: "*", schema: "public", table: "applications" }, loadData)
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, loadData)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const confirmedFounding = useMemo(
    () => profiles.filter((p) => p.role === "artist" && p.founding_artist).length,
    [profiles],
  );
  const remaining = Math.max(0, FOUNDING_CAP - confirmedFounding);

  const foundingFor = (app: Application) => {
    const fromProfile = foundingByEmail[app.email.toLowerCase()];
    if (typeof fromProfile === "boolean") return fromProfile;
    return !!pendingFounding[app.id];
  };

  const handleStatusChange = async (app: Application, newStatus: string) => {
    setBusy(app.id); setMsg(null);
    try {
      const { error } = await supabase.from("applications").update({ status: newStatus }).eq("id", app.id);
      if (error) throw error;
      if (newStatus === "accepted") {
        const { data: session } = await supabase.auth.getSession();
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-approve-application`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.session?.access_token}`,
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
            body: JSON.stringify({ application_id: app.id, founding_artist: foundingFor(app) }),
          },
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || t.inviteFail);
        setMsg(t.inviteOk);
      }
      await loadData();
    } catch (err: any) {
      setMsg(err?.message || t.inviteFail);
    } finally {
      setBusy(null);
    }
  };

  const handleFoundingToggle = async (app: Application, next: boolean) => {
    setBusy(app.id); setMsg(null);
    try {
      const existing = profiles.find((p) => p.email.toLowerCase() === app.email.toLowerCase());
      if (existing) {
        const { error } = await supabase.from("profiles").update({ founding_artist: next }).eq("id", existing.id);
        if (error) throw error;
        await loadData();
      } else {
        setPendingFounding((prev) => ({ ...prev, [app.id]: next }));
      }
    } catch (err: any) {
      setMsg(err?.message || "Error");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 600, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)",
        lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 24px",
      }}>{t.title}</h1>

      <div style={{
        display: "inline-flex", alignItems: "baseline", gap: 16,
        padding: "16px 20px", border: "1px solid #121212",
        marginBottom: 32, fontFamily: "Manrope, sans-serif",
      }}>
        <span style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666", fontWeight: 500 }}>
          {t.counter}
        </span>
        <span style={{ fontSize: 22, fontWeight: 600, color: "#121212" }}>
          {confirmedFounding} <span style={{ color: "#666", fontWeight: 400 }}>{t.of} {FOUNDING_CAP}</span>
        </span>
        <span style={{ fontSize: 13, color: "#666" }}>· {remaining} {t.remaining}</span>
      </div>

      {msg && (
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "#121212", marginBottom: 16 }}>{msg}</p>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.name}</th>
              <th style={thStyle}>{t.email}</th>
              <th style={thStyle}>{t.social}</th>
              <th style={thStyle}>{t.date}</th>
              <th style={thStyle}>{t.status}</th>
              <th style={thStyle}>{t.founding}</th>
            </tr>
          </thead>
          <tbody>
            {apps.length === 0 && (
              <tr><td style={cellStyle} colSpan={6}>{t.empty}</td></tr>
            )}
            {apps.map((app) => {
              const founding = foundingFor(app);
              const disabled = busy === app.id;
              return (
                <tr key={app.id}>
                  <td style={cellStyle}>{app.name}</td>
                  <td style={cellStyle}>{app.email}</td>
                  <td style={cellStyle}>{app.social || "—"}</td>
                  <td style={cellStyle}>{new Date(app.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}</td>
                  <td style={cellStyle}>
                    <select
                      value={app.status}
                      disabled={disabled}
                      onChange={(e) => handleStatusChange(app, e.target.value)}
                      style={{
                        fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 400,
                        padding: "6px 10px", border: "1px solid #121212",
                        background: "#fff", color: "#121212", minWidth: 160,
                      }}
                    >
                      {STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>{lang === "es" ? s.es : s.en}</option>
                      ))}
                    </select>
                  </td>
                  <td style={cellStyle}>
                    <select
                      value={founding ? "yes" : "no"}
                      disabled={disabled}
                      onChange={(e) => handleFoundingToggle(app, e.target.value === "yes")}
                      style={{
                        fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 400,
                        padding: "6px 10px", border: "1px solid #121212",
                        background: "#fff", color: "#121212", minWidth: 90,
                      }}
                    >
                      <option value="no">{t.no}</option>
                      <option value="yes">{t.yes}</option>
                    </select>
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
