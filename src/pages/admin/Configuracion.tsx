import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const cardStyle: React.CSSProperties = {
  border: "1px solid #E5E5E5", padding: "24px 28px", marginBottom: 24, maxWidth: 480,
};
const labelStyle: React.CSSProperties = {
  display: "block", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 500,
  textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12, color: "#666",
  marginBottom: 8,
};
const inputStyle: React.CSSProperties = {
  width: "100%", fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14,
  padding: "10px 12px", border: "1px solid #ccc", marginBottom: 16,
};
const btnPrimary: React.CSSProperties = {
  fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, fontWeight: 500,
  padding: "10px 18px", border: "1px solid #121212",
  background: "#121212", color: "#fff", cursor: "pointer",
};

export default function Configuracion() {
  const lang = useLang();
  const { user, profile, refreshProfile } = useAuth();
  const [name, setName] = useState(profile?.name || "");
  const [savingName, setSavingName] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const t = lang === "es" ? {
    title: "Configuración",
    account: "Cuenta",
    email: "Email",
    name: "Nombre",
    saveName: "Guardar nombre",
    nameSaved: "Nombre actualizado.",
    password: "Cambiar contraseña",
    newPassword: "Nueva contraseña",
    savePassword: "Actualizar contraseña",
    passwordSaved: "Contraseña actualizada.",
    passwordTooShort: "La contraseña debe tener al menos 8 caracteres.",
  } : {
    title: "Settings",
    account: "Account",
    email: "Email",
    name: "Name",
    saveName: "Save name",
    nameSaved: "Name updated.",
    password: "Change password",
    newPassword: "New password",
    savePassword: "Update password",
    passwordSaved: "Password updated.",
    passwordTooShort: "Password must be at least 8 characters.",
  };

  const saveName = async () => {
    if (!user) return;
    setSavingName(true); setMsg(null);
    try {
      const { error } = await supabase.from("profiles").update({ name }).eq("id", user.id);
      if (error) throw error;
      await refreshProfile();
      setMsg(t.nameSaved);
    } catch (err: any) {
      setMsg(err?.message || "Error");
    } finally {
      setSavingName(false);
    }
  };

  const savePassword = async () => {
    if (newPassword.length < 8) { setMsg(t.passwordTooShort); return; }
    setSavingPassword(true); setMsg(null);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setNewPassword("");
      setMsg(t.passwordSaved);
    } catch (err: any) {
      setMsg(err?.message || "Error");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div>
      <h1 style={{
        fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 24px",
      }}>{t.title}</h1>

      {msg && (
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", marginBottom: 16 }}>{msg}</p>
      )}

      <div style={cardStyle}>
        <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 20, margin: "0 0 16px" }}>
          {t.account}
        </h2>
        <label style={labelStyle}>{t.email}</label>
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", marginBottom: 16 }}>{user?.email}</p>
        <label style={labelStyle}>{t.name}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <button type="button" onClick={saveName} disabled={savingName} style={btnPrimary}>
          {t.saveName}
        </button>
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 20, margin: "0 0 16px" }}>
          {t.password}
        </h2>
        <label style={labelStyle}>{t.newPassword}</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} />
        <button type="button" onClick={savePassword} disabled={savingPassword} style={btnPrimary}>
          {t.savePassword}
        </button>
      </div>
    </div>
  );
}
