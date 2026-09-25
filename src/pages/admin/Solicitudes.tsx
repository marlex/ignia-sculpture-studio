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
  language?: string | null;
  estado_final?: boolean;
  estado_confirmado_en?: string | null;
};

type Profile = {
  id: string;
  email: string;
  name?: string | null;
  role: string | null;
  founding_artist: boolean;
  requested_role?: string | null;
  created_at?: string;
};

const STATUSES = [
  { value: "pending", es: "Pendiente", en: "Pending" },
  { value: "in_review", es: "En revisión", en: "In review" },
  { value: "accepted", es: "Aceptado", en: "Accepted" },
  { value: "waitlist", es: "Lista de espera", en: "Waitlist" },
  { value: "rejected", es: "Rechazado", en: "Rejected" },
];

const FINAL_STATUSES = new Set(["accepted", "waitlist", "rejected"]);
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

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 10px",
  fontFamily: "Manrope, sans-serif",
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  background: "#f2f2f2",
  color: "#121212",
  border: "1px solid #e0e0e0",
};

const smallBtn: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif",
  fontSize: 12,
  fontWeight: 500,
  padding: "6px 10px",
  border: "1px solid #121212",
  background: "#fff",
  color: "#121212",
  cursor: "pointer",
  marginLeft: 8,
};

type PendingConfirm = { app: Application; newStatus: string } | null;

export default function Solicitudes() {
  const lang = useLang();
  const [apps, setApps] = useState<Application[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [foundingByEmail, setFoundingByEmail] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [pendingFounding, setPendingFounding] = useState<Record<string, boolean>>({});
  const [confirm, setConfirm] = useState<PendingConfirm>(null);
  const [reopenApp, setReopenApp] = useState<Application | null>(null);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteSocial, setInviteSocial] = useState("");
  const [inviteBusy, setInviteBusy] = useState(false);

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
    confirmTitle: "Confirmar decisión",
    confirmBody: (n: string, s: string, e: string) => `¿Confirmas que quieres marcar la solicitud de ${n} como ${s}? Se enviará un email automático a ${e} y esta decisión quedará bloqueada.`,
    cancel: "Cancelar",
    confirmSend: "Confirmar y enviar",
    reopen: "Reabrir",
    reopenTitle: "Reabrir solicitud",
    reopenBody: "Esto permitirá volver a cambiar el estado y podría enviar un nuevo email. ¿Continuar?",
    continue: "Continuar",
    locked: "Bloqueado",
    pendingUsersTitle: "Usuarios pendientes",
    pendingUsersSubtitle: "Se registraron directamente desde /registro y esperan que un admin confirme su cuenta.",
    pendingUsersEmpty: "No hay usuarios pendientes de aprobación.",
    requestedRole: "Quiere ser",
    approveAsArtist: "Aprobar como artista",
    approveAsCollector: "Aprobar como coleccionista",
    approved: "Usuario aprobado.",
    inviteDirectTitle: "Invitar directamente",
    inviteDirectSubtitle: "Para artistas que ya contactaste tú misma. Se les invita como artista fundador sin pasar por la revisión pública.",
    inviteDirectName: "Nombre",
    inviteDirectEmail: "Email",
    inviteDirectSocial: "Instagram / Web (opcional)",
    inviteDirectSubmit: "Enviar invitación",
    inviteDirectSending: "Enviando…",
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
    confirmTitle: "Confirm decision",
    confirmBody: (n: string, s: string, e: string) => `Do you confirm marking ${n}'s application as ${s}? An automatic email will be sent to ${e} and this decision will be locked.`,
    cancel: "Cancel",
    confirmSend: "Confirm and send",
    reopen: "Reopen",
    reopenTitle: "Reopen application",
    reopenBody: "This will allow the status to change again and may send a new email. Continue?",
    continue: "Continue",
    locked: "Locked",
    pendingUsersTitle: "Pending users",
    pendingUsersSubtitle: "Signed up directly from /registro and are waiting for an admin to confirm their account.",
    pendingUsersEmpty: "No users pending approval.",
    requestedRole: "Wants to be",
    approveAsArtist: "Approve as artist",
    approveAsCollector: "Approve as collector",
    approved: "User approved.",
    inviteDirectTitle: "Invite directly",
    inviteDirectSubtitle: "For artists you already contacted yourself. They're invited straight in as a founding artist, skipping public review.",
    inviteDirectName: "Name",
    inviteDirectEmail: "Email",
    inviteDirectSocial: "Instagram / Website (optional)",
    inviteDirectSubmit: "Send invitation",
    inviteDirectSending: "Sending…",
  };

  const statusLabel = (v: string) => {
    const s = STATUSES.find((x) => x.value === v);
    return s ? (lang === "es" ? s.es : s.en) : v;
  };

  const loadData = async () => {
    const [{ data: appsData }, { data: profData }] = await Promise.all([
      supabase.from("applications").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("id, email, name, role, founding_artist, requested_role, created_at"),
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

  const logEmailFailure = async (app: Application, emailType: string, message: string) => {
    try {
      await supabase.from("email_logs").insert({
        application_id: app.id,
        email_type: emailType,
        status: "failed",
        error_message: message.slice(0, 2000),
      });
    } catch (e) {
      console.warn("Could not log email failure:", e);
    }
  };

  const onStatusSelect = (app: Application, newStatus: string) => {
    if (app.estado_final) return;
    if (newStatus === app.status) return;
    if (FINAL_STATUSES.has(newStatus)) {
      setConfirm({ app, newStatus });
      return;
    }
    // pending / in_review, apply immediately, no email
    applyNonFinalStatus(app, newStatus);
  };

  const applyNonFinalStatus = async (app: Application, newStatus: string) => {
    setBusy(app.id); setMsg(null);
    try {
      const { error } = await supabase.from("applications").update({ status: newStatus }).eq("id", app.id);
      if (error) throw error;
      await loadData();
    } catch (err: any) {
      setMsg(err?.message || "Error");
    } finally {
      setBusy(null);
    }
  };

  const executeConfirmed = async () => {
    if (!confirm) return;
    const { app, newStatus } = confirm;
    setBusy(app.id); setMsg(null);
    try {
      // 1. Save status + lock
      const { error: updErr } = await supabase
        .from("applications")
        .update({
          status: newStatus,
          estado_final: true,
          estado_confirmado_en: new Date().toISOString(),
        })
        .eq("id", app.id);
      if (updErr) throw updErr;

      // 2. Send corresponding email
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
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          const errMsg = json?.error || `admin-approve-application HTTP ${res.status}`;
          await logEmailFailure(app, "confirmacion", errMsg);
          throw new Error(errMsg);
        }
        setMsg(t.inviteOk);
      } else {
        const emailType = newStatus === "waitlist" ? "lista_espera" : "rechazado";
        const { data, error } = await supabase.functions.invoke("send-application-email", {
          body: { application_id: app.id, email_type: emailType },
        });
        if (error) {
          const errMsg = error.message || "send-application-email failed";
          await logEmailFailure(app, emailType, errMsg);
          throw new Error(errMsg);
        }
        if (data && (data as any).ok === false) {
          const errMsg = (data as any).error || "send-application-email returned ok=false";
          await logEmailFailure(app, emailType, errMsg);
          throw new Error(errMsg);
        }
      }

      setConfirm(null);
      await loadData();
    } catch (err: any) {
      setMsg(err?.message || t.inviteFail);
    } finally {
      setBusy(null);
    }
  };

  const executeReopen = async () => {
    if (!reopenApp) return;
    setBusy(reopenApp.id); setMsg(null);
    try {
      const { error } = await supabase
        .from("applications")
        .update({ estado_final: false, estado_confirmado_en: null })
        .eq("id", reopenApp.id);
      if (error) throw error;
      setReopenApp(null);
      await loadData();
    } catch (err: any) {
      setMsg(err?.message || "Error");
    } finally {
      setBusy(null);
    }
  };

  const inviteDirectly = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInviteBusy(true); setMsg(null);
    try {
      const { data: inserted, error: insErr } = await supabase
        .from("applications")
        .insert({
          name: inviteName,
          email: inviteEmail,
          social: inviteSocial || null,
          status: "accepted",
          estado_final: true,
          estado_confirmado_en: new Date().toISOString(),
        })
        .select("id")
        .single();
      if (insErr) throw insErr;

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
          body: JSON.stringify({ application_id: inserted.id, founding_artist: true }),
        },
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errMsg = json?.error || `admin-approve-application HTTP ${res.status}`;
        await logEmailFailure({ id: inserted.id } as Application, "confirmacion", errMsg);
        throw new Error(errMsg);
      }

      setInviteName(""); setInviteEmail(""); setInviteSocial("");
      setMsg(t.inviteOk);
      await loadData();
    } catch (err: any) {
      setMsg(err?.message || t.inviteFail);
    } finally {
      setInviteBusy(false);
    }
  };

  const pendingUsers = useMemo(
    () => profiles.filter((p) => !p.role),
    [profiles],
  );

  const approveUser = async (profileId: string, role: "artist" | "collector") => {
    setBusy(profileId); setMsg(null);
    try {
      const { error } = await supabase.from("profiles").update({ role }).eq("id", profileId);
      if (error) throw error;
      if (role === "artist") {
        const approvedProfile = profiles.find((p) => p.id === profileId);
        if (approvedProfile) {
          supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "founding-artist-welcome",
              recipientEmail: approvedProfile.email,
              templateData: { name: approvedProfile.name || "", lang },
            },
          }).catch(() => {});
        }
      }
      setMsg(t.approved);
      await loadData();
    } catch (err: any) {
      setMsg(err?.message || "Error");
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
        fontWeight: 500, color: "#121212",
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

      <div style={{ border: "1px solid #121212", padding: "24px 24px 20px", marginBottom: 40, maxWidth: 560 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "#121212", fontSize: 22, margin: "0 0 6px" }}>
          {t.inviteDirectTitle}
        </h2>
        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#666", margin: "0 0 20px", lineHeight: 1.5 }}>
          {t.inviteDirectSubtitle}
        </p>
        <form onSubmit={inviteDirectly} style={{ display: "grid", gap: 16 }}>
          <input
            required
            placeholder={t.inviteDirectName}
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, padding: "10px 12px", border: "1px solid #ccc" }}
          />
          <input
            required
            type="email"
            placeholder={t.inviteDirectEmail}
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, padding: "10px 12px", border: "1px solid #ccc" }}
          />
          <input
            placeholder={t.inviteDirectSocial}
            value={inviteSocial}
            onChange={(e) => setInviteSocial(e.target.value)}
            style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, padding: "10px 12px", border: "1px solid #ccc" }}
          />
          <button type="submit" disabled={inviteBusy} style={{ ...btnPrimary, justifySelf: "start" }}>
            {inviteBusy ? t.inviteDirectSending : t.inviteDirectSubmit}
          </button>
        </form>
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
              const isFinal = !!app.estado_final;
              return (
                <tr key={app.id}>
                  <td style={cellStyle}>{app.name}</td>
                  <td style={cellStyle}>{app.email}</td>
                  <td style={cellStyle}>{app.social || ","}</td>
                  <td style={cellStyle}>{new Date(app.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}</td>
                  <td style={cellStyle}>
                    {isFinal ? (
                      <>
                        <span style={badgeStyle}>{statusLabel(app.status)}</span>
                        <button
                          type="button"
                          disabled={disabled}
                          onClick={() => setReopenApp(app)}
                          style={smallBtn}
                        >
                          {t.reopen}
                        </button>
                      </>
                    ) : (
                      <select
                        value={app.status}
                        disabled={disabled}
                        onChange={(e) => onStatusSelect(app, e.target.value)}
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
                    )}
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

      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500, color: "#121212",
        fontSize: "clamp(22px, 2.6vw, 28px)",
        lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "56px 0 8px",
      }}>{t.pendingUsersTitle}</h2>
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "#666", marginBottom: 24 }}>
        {t.pendingUsersSubtitle}
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.name}</th>
              <th style={thStyle}>{t.email}</th>
              <th style={thStyle}>{t.requestedRole}</th>
              <th style={thStyle}>{t.date}</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.length === 0 && (
              <tr><td style={cellStyle} colSpan={5}>{t.pendingUsersEmpty}</td></tr>
            )}
            {pendingUsers.map((p) => {
              const disabled = busy === p.id;
              return (
                <tr key={p.id}>
                  <td style={cellStyle}>{p.name || "—"}</td>
                  <td style={cellStyle}>{p.email}</td>
                  <td style={cellStyle}>{p.requested_role || "—"}</td>
                  <td style={cellStyle}>{p.created_at ? new Date(p.created_at).toLocaleDateString(lang === "es" ? "es-ES" : "en-US") : "—"}</td>
                  <td style={cellStyle}>
                    <button type="button" disabled={disabled} onClick={() => approveUser(p.id, "artist")} style={smallBtn}>
                      {t.approveAsArtist}
                    </button>
                    <button type="button" disabled={disabled} onClick={() => approveUser(p.id, "collector")} style={smallBtn}>
                      {t.approveAsCollector}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {confirm && (
        <Modal onClose={() => !busy && setConfirm(null)}>
          <h2 style={modalTitle}>{t.confirmTitle}</h2>
          <p style={modalText}>
            {t.confirmBody(confirm.app.name, statusLabel(confirm.newStatus), confirm.app.email)}
          </p>
          <div style={modalActions}>
            <button type="button" onClick={() => setConfirm(null)} disabled={!!busy} style={btnGhost}>
              {t.cancel}
            </button>
            <button type="button" onClick={executeConfirmed} disabled={!!busy} style={btnPrimary}>
              {t.confirmSend}
            </button>
          </div>
        </Modal>
      )}

      {reopenApp && (
        <Modal onClose={() => !busy && setReopenApp(null)}>
          <h2 style={modalTitle}>{t.reopenTitle}</h2>
          <p style={modalText}>{t.reopenBody}</p>
          <div style={modalActions}>
            <button type="button" onClick={() => setReopenApp(null)} disabled={!!busy} style={btnGhost}>
              {t.cancel}
            </button>
            <button type="button" onClick={executeReopen} disabled={!!busy} style={btnPrimary}>
              {t.continue}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", maxWidth: 480, width: "100%",
          padding: "32px 28px", border: "1px solid #121212",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const modalTitle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontWeight: 600, color: "#121212",
  fontSize: 24, lineHeight: 1.2, margin: "0 0 16px",
};
const modalText: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif", fontSize: 14, fontWeight: 400,
  lineHeight: 1.55, color: "#121212", margin: "0 0 24px",
};
const modalActions: React.CSSProperties = {
  display: "flex", justifyContent: "flex-end", gap: 12,
};
const btnGhost: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 500,
  padding: "10px 18px", border: "1px solid #121212",
  background: "#fff", color: "#121212", cursor: "pointer",
};
const btnPrimary: React.CSSProperties = {
  fontFamily: "Manrope, sans-serif", fontSize: 13, fontWeight: 500,
  padding: "10px 18px", border: "1px solid #121212",
  background: "#121212", color: "#fff", cursor: "pointer",
};
