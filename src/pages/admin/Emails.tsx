import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type TemplatePreview = {
  templateName: string;
  displayName: string;
  subject: string;
  html: string;
  status: "ready" | "preview_data_required" | "render_failed";
  errorMessage?: string;
};

const cellStyle: React.CSSProperties = {
  padding: "12px 10px", fontFamily: "Hanken Grotesk, sans-serif",
  fontSize: 15, color: "#121212", borderBottom: "1px solid #eee", verticalAlign: "top",
};
const thStyle: React.CSSProperties = {
  ...cellStyle, fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.12em", fontSize: 15, color: "#666",
  textAlign: "left", borderBottom: "1px solid #121212",
};
const btnStyle: React.CSSProperties = {
  fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, fontWeight: 500,
  letterSpacing: "0.08em", textTransform: "uppercase",
  padding: "8px 14px", border: "1px solid #121212", background: "#fff",
  color: "#121212", cursor: "pointer",
};

export default function AdminEmails() {
  const lang = useLang();
  const [templates, setTemplates] = useState<TemplatePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewing, setViewing] = useState<TemplatePreview | null>(null);
  const [testEmail, setTestEmail] = useState("");
  const [sendingFor, setSendingFor] = useState<string | null>(null);
  const [sentMsg, setSentMsg] = useState<string | null>(null);

  const t = lang === "es"
    ? {
        title: "Emails", subtitle: "Todos los emails transaccionales de Ignia: nombre, asunto y vista previa.",
        name: "Nombre", subject: "Asunto", preview: "Ver", close: "Cerrar",
        testPlaceholder: "Email de prueba", send: "Enviar prueba", sending: "Enviando…",
        sent: "Enviado.", failed: "No se pudo enviar.", notReady: "Sin datos de previsualización.",
      }
    : {
        title: "Emails", subtitle: "Every transactional email Ignia sends: name, subject and preview.",
        name: "Name", subject: "Subject", preview: "Preview", close: "Close",
        testPlaceholder: "Test email", send: "Send test", sending: "Sending…",
        sent: "Sent.", failed: "Could not send.", notReady: "No preview data.",
      };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error: fnErr } = await supabase.functions.invoke("preview-transactional-email", { method: "POST" });
      if (fnErr) { setError(fnErr.message); setLoading(false); return; }
      setTemplates((data as any)?.templates || []);
      setLoading(false);
    })();
  }, []);

  const sendTest = async (templateName: string) => {
    if (!testEmail) return;
    setSendingFor(templateName);
    setSentMsg(null);
    try {
      const { error: sendErr } = await supabase.functions.invoke("send-transactional-email", {
        body: { templateName, recipientEmail: testEmail },
      });
      if (sendErr) throw sendErr;
      setSentMsg(t.sent);
    } catch {
      setSentMsg(t.failed);
    } finally {
      setSendingFor(null);
    }
  };

  return (
    <div>
      <h1 style={{
        fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 8px",
      }}>{t.title}</h1>
      <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#666", margin: "0 0 20px" }}>
        {t.subtitle}
      </p>

      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <input
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          placeholder={t.testPlaceholder}
          style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, padding: "8px 12px", border: "1px solid #ccc", minWidth: 240 }}
        />
        {sentMsg && <span style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212" }}>{sentMsg}</span>}
      </div>

      {error && <p style={{ color: "#b00020", fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14 }}>{error}</p>}

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr>
              <th style={thStyle}>{t.name}</th>
              <th style={thStyle}>{t.subject}</th>
              <th style={thStyle}></th>
            </tr>
          </thead>
          <tbody>
            {!loading && templates.map((tpl) => (
              <tr key={tpl.templateName}>
                <td style={cellStyle}>{tpl.displayName}</td>
                <td style={cellStyle}>
                  {tpl.status === "ready" ? tpl.subject : <span style={{ color: "#999" }}>{t.notReady}</span>}
                </td>
                <td style={cellStyle}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {tpl.status === "ready" && (
                      <button style={btnStyle} onClick={() => setViewing(tpl)}>{t.preview}</button>
                    )}
                    <button
                      style={{ ...btnStyle, opacity: testEmail ? 1 : 0.5 }}
                      disabled={!testEmail || sendingFor === tpl.templateName}
                      onClick={() => sendTest(tpl.templateName)}
                    >
                      {sendingFor === tpl.templateName ? t.sending : t.send}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setViewing(null)}
        >
          <div style={{ background: "#fff", width: "100%", maxWidth: 640, maxHeight: "90vh", display: "flex", flexDirection: "column" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #eee" }}>
              <strong style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15 }}>{viewing.displayName} — {viewing.subject}</strong>
              <button style={btnStyle} onClick={() => setViewing(null)}>{t.close}</button>
            </div>
            <iframe title={viewing.displayName} srcDoc={viewing.html} style={{ flex: 1, border: "none", width: "100%" }} />
          </div>
        </div>
      )}
    </div>
  );
}
