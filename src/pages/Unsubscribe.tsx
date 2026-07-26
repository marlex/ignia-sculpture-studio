import { useEffect, useState } from "react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "ready" | "already" | "invalid" | "success" | "error";

export default function Unsubscribe() {
  const lang = useLang();
  const [state, setState] = useState<State>("loading");
  const [token, setToken] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const t = lang === "es" ? {
    title: "Cancelar suscripción",
    checking: "Comprobando…",
    confirm: "Confirmar cancelación",
    ready: "¿Confirmas que deseas dejar de recibir emails de Ignia?",
    already: "Este correo ya se dio de baja.",
    invalid: "El enlace no es válido o ha caducado.",
    success: "Listo. No volverás a recibir emails.",
    error: "No se pudo procesar. Inténtalo de nuevo.",
  } : {
    title: "Unsubscribe",
    checking: "Checking…",
    confirm: "Confirm unsubscribe",
    ready: "Do you want to stop receiving emails from Ignia?",
    already: "This address is already unsubscribed.",
    invalid: "This link is invalid or has expired.",
    success: "Done. You will no longer receive emails.",
    error: "Something went wrong. Please try again.",
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tk = params.get("token");
    setToken(tk);
    if (!tk) { setState("invalid"); return; }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(tk)}`, {
      headers: { apikey: SUPABASE_ANON_KEY },
    })
      .then(async (r) => {
        const j = await r.json().catch(() => ({}));
        if (!r.ok) { setState("invalid"); return; }
        if (j.valid) setState("ready");
        else if (j.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      })
      .catch(() => setState("error"));
  }, []);

  const onConfirm = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
        body: JSON.stringify({ token }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) { setState("error"); return; }
      if (j.success) setState("success");
      else if (j.reason === "already_unsubscribed") setState("already");
      else setState("error");
    } catch {
      setState("error");
    } finally {
      setSubmitting(false);
    }
  };

  const message =
    state === "loading" ? t.checking :
    state === "ready" ? t.ready :
    state === "already" ? t.already :
    state === "invalid" ? t.invalid :
    state === "success" ? t.success :
    t.error;

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: 56 }}>
        <section style={{ maxWidth: 560, margin: "0 auto", padding: "120px 24px 160px", textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            color: "#121212",
            fontSize: "clamp(32px, 4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 24px",
          }}>{t.title}</h1>
          <p style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "#666666",
            fontSize: 16,
            lineHeight: 1.6,
            marginBottom: 40,
          }}>{message}</p>

          {state === "ready" && (
            <button
              onClick={onConfirm}
              disabled={submitting}
              style={{
                padding: "16px 32px",
                background: "#121212",
                color: "#FFFFFF",
                border: "1px solid #121212",
                fontFamily: "Manrope, sans-serif",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: submitting ? "default" : "pointer",
                opacity: submitting ? 0.6 : 1,
              }}
            >{t.confirm}</button>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
