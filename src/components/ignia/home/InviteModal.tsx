import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Props = { open: boolean; onClose: () => void };

export const InviteModal = ({ open, onClose }: Props) => {
  const lang = useLang();
  const [bio, setBio] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es"
    ? {
        title: "Solicitar invitación",
        subtitle: "30 plazas. Comisión Pro permanente del 15%. Sin cuotas, sin exclusividad.",
        name: "Nombre completo",
        email: "Email",
        country: "País",
        social: "Instagram o web",
        material: "Materiales principales",
        materialOptions: ["Piedra", "Madera", "Metal", "Cerámica", "Resina", "Textil", "Técnica mixta", "Otro"],
        works: "Obras disponibles (aprox.)",
        worksOptions: ["1–3", "4–10", "11–20", "Más de 20"],
        bioLabel: "Cuéntanos tu práctica",
        bioPlaceholder: "",
        submit: "Enviar solicitud",
        sending: "Enviando…",
        successTitle: "Solicitud recibida.",
        successMsg: "Revisamos cada solicitud personalmente y te contactamos en 48 horas.",
        close: "Cerrar",
      }
    : {
        title: "Request invitation",
        subtitle: "30 spots. Permanent 15% Pro commission. No fees, no exclusivity.",
        name: "Full name",
        email: "Email",
        country: "Country",
        social: "Instagram or website",
        material: "Main materials",
        materialOptions: ["Stone", "Wood", "Metal", "Ceramics", "Resin", "Textile", "Mixed media", "Other"],
        works: "Available works (approx.)",
        worksOptions: ["1–3", "4–10", "11–20", "More than 20"],
        bioLabel: "Tell us about your practice",
        bioPlaceholder: "",
        submit: "Send request",
        sending: "Sending…",
        successTitle: "Request received.",
        successMsg: "We review every request personally and will contact you within 48 hours.",
        close: "Close",
      };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) { setSubmitted(false); setBio(""); setError(null); }
  }, [open]);

  if (!open) return null;

  const endpoint = "https://formspree.io/f/xgobbeyp";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = e.currentTarget;
      const data = {
        nombre: (form.elements.namedItem("nombre") as HTMLInputElement)?.value,
        email: (form.elements.namedItem("email") as HTMLInputElement)?.value,
        pais: (form.elements.namedItem("pais") as HTMLInputElement)?.value,
        social: (form.elements.namedItem("social") as HTMLInputElement)?.value,
        material: (form.elements.namedItem("material") as HTMLSelectElement)?.value,
        obras: (form.elements.namedItem("obras") as HTMLSelectElement)?.value,
        bio: (form.elements.namedItem("bio") as HTMLTextAreaElement)?.value,
      };
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const result = await res.json().catch(() => ({}));
        setError(result.error || (lang === "es" ? "Hubo un error al enviar. Inténtalo de nuevo." : "There was an error sending. Please try again."));
      }
    } catch {
      setError(lang === "es" ? "Hubo un error al enviar. Inténtalo de nuevo." : "There was an error sending. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 300ms ease both" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .invite-input { width:100%; background:transparent; border:none; border-bottom:1px solid #111111; outline:none; font-family:Manrope,sans-serif; font-weight:500; color:#111111; font-size:16px; padding:0 0 8px; border-radius:0; }
        .invite-input:focus { border-bottom-color:#111111; }
        .invite-label { display:block; font-family:Manrope,sans-serif; font-weight:400; text-transform:uppercase; letter-spacing:0.14em; font-size:11px; color:#111111; margin-bottom:12px; }
        .invite-field { margin-bottom:28px; }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#FFFFFF", maxWidth: 560, width: "100%", padding: 48, borderRadius: 0, position: "relative", maxHeight: "92vh", overflowY: "auto", animation: "modalIn 300ms cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <button
          onClick={onClose}
          aria-label={t.close}
          style={{ position: "absolute", top: 16, right: 20, background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: 24, lineHeight: 1 }}
        >×</button>

        {submitted ? (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#111111", fontSize: 24, marginBottom: 16 }}>
              {t.successTitle}
            </h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#666666", fontSize: 15, lineHeight: 1.6 }}>
              {t.successMsg}
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#111111", fontSize: 32, lineHeight: 1.1, marginBottom: 12 }}>
              {t.title}
            </h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#666666", fontSize: 15, lineHeight: 1.5, marginBottom: 36 }}>
              {t.subtitle}
            </p>
            <form onSubmit={handleSubmit}>
              {[
                { l: t.name, n: "nombre", type: "text" },
                { l: t.email, n: "email", type: "email" },
                { l: t.country, n: "pais", type: "text" },
                { l: t.social, n: "social", type: "text" },
              ].map((f) => (
                <div key={f.n} className="invite-field">
                  <label className="invite-label" htmlFor={f.n}>{f.l}</label>
                  <input id={f.n} name={f.n} type={f.type} className="invite-input" />
                </div>
              ))}
              <div className="invite-field">
                <label className="invite-label" htmlFor="material">{t.material}</label>
                <select id="material" name="material" className="invite-input">
                  {t.materialOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="invite-field">
                <label className="invite-label" htmlFor="obras">{t.works}</label>
                <select id="obras" name="obras" className="invite-input">
                  {t.worksOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="invite-field">
                <label className="invite-label" htmlFor="bio">{t.bioLabel}</label>
                <textarea
                  id="bio" name="bio" maxLength={300} rows={3}
                  value={bio} onChange={(e) => setBio(e.target.value)}
                  className="invite-input" style={{ resize: "vertical", minHeight: 80 }}
                />
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#666666", fontSize: 12, marginTop: 6 }}>
                  {bio.length}/300
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="font-body"
                style={{ width: "100%", background: "#111111", color: "#FFFFFF", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 14, padding: "18px 36px", border: "none", borderRadius: 0, cursor: "pointer", transition: "background-color 250ms" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333333")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
              >
                {loading ? t.sending : t.submit}
              </button>
              {error && (
                <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#b91c1c", fontSize: 13, marginTop: 16, textAlign: "center" }}>
                  {error}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};
