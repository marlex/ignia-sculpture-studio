import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Props = { open: boolean; onClose: () => void; defaultProfile?: "collector" | "artist" };
type Profile = "artista" | "coleccionista" | "empresa";

export const InviteModal = ({ open, onClose, defaultProfile }: Props) => {
  const lang = useLang();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es"
    ? {
        title: "Únete a Ignia",
        subtitleArtista: "30 plazas. Comisión Pro permanente del 15%. Sin cuotas, sin exclusividad.",
        subtitleColeccionista: "Acceso anticipado a una nueva forma de coleccionar escultura.",
        subtitleEmpresa: "Hablemos sobre tu proyecto u organización.",
        whoTitle: "¿Quién eres?",
        roleArtista: "Soy escultor/a",
        roleColeccionista: "Soy coleccionista",
        roleEmpresa: "Soy galería o empresa",
        roleArtistaSub: "Sé descubierto por coleccionistas",
        roleColeccionistaSub: "Encuentra obras que no encontrarás en otro sitio",
        roleEmpresaSub: "Encarga, adquiere o colabora",
        back: "← Cambiar",
        name: "Nombre completo",
        org: "Nombre de la organización",
        email: "Email",
        country: "País",
        social: "Instagram o web",
        socialOpt: "Instagram o web (opcional)",
        contact: "Persona de contacto",
        material: "Materiales principales",
        materialOptions: ["Piedra", "Madera", "Metal", "Cerámica", "Resina", "Textil", "Técnica mixta", "Otro"],
        works: "Obras disponibles (aprox.)",
        worksOptions: ["1–3", "4–10", "11–20", "Más de 20"],
        bioLabel: "Cuéntanos tu práctica",
        interestsLabel: "Intereses de colección",
        interestsOptions: ["Escultura figurativa", "Abstracta", "Contemporánea", "Clásica/histórica", "Arte público/gran escala"],
        budgetCol: "Presupuesto orientativo por pieza",
        budgetColOptions: ["Menos de 1.500€", "1.500–5.000€", "5.000–15.000€", "Más de 15.000€", "Prefiero no decirlo"],
        howKnow: "Cómo conociste Ignia (opcional)",
        howKnowOptions: ["Instagram", "Recomendación", "Búsqueda en Google", "Otro"],
        collabType: "Tipo de colaboración",
        collabOptions: ["Exposición o evento", "Compra corporativa", "Patrocinio", "Alianza institucional/museística", "Otro"],
        budgetEmp: "Presupuesto orientativo",
        budgetEmpOptions: ["A definir", "Hasta 10.000€", "10.000–50.000€", "Más de 50.000€"],
        msgLabel: "Mensaje breve",
        submit: "Enviar solicitud",
        sending: "Enviando…",
        successTitle: "Solicitud recibida.",
        successMsg: "Revisamos cada solicitud personalmente y te contactamos en 48 horas.",
        close: "Cerrar",
        errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
      }
    : {
        title: "Join Ignia",
        subtitleArtista: "30 spots. Permanent 15% Pro commission. No fees, no exclusivity.",
        subtitleColeccionista: "Early access to a new way of collecting sculpture.",
        subtitleEmpresa: "Let's talk about your project or organization.",
        whoTitle: "Who are you?",
        roleArtista: "I'm a sculptor",
        roleColeccionista: "I'm a collector",
        roleEmpresa: "I'm a gallery or company",
        roleArtistaSub: "Get discovered by collectors",
        roleColeccionistaSub: "Find works you won't find elsewhere",
        roleEmpresaSub: "Source, commission or collaborate",
        back: "← Change",
        name: "Full name",
        org: "Organization name",
        email: "Email",
        country: "Country",
        social: "Instagram or website",
        socialOpt: "Instagram or website (optional)",
        contact: "Contact person",
        material: "Main materials",
        materialOptions: ["Stone", "Wood", "Metal", "Ceramics", "Resin", "Textile", "Mixed media", "Other"],
        works: "Available works (approx.)",
        worksOptions: ["1–3", "4–10", "11–20", "More than 20"],
        bioLabel: "Tell us about your practice",
        interestsLabel: "Collection interests",
        interestsOptions: ["Figurative sculpture", "Abstract", "Contemporary", "Classical/historical", "Public/large-scale art"],
        budgetCol: "Indicative budget per piece",
        budgetColOptions: ["Less than €1,500", "€1,500–5,000", "€5,000–15,000", "More than €15,000", "Prefer not to say"],
        howKnow: "How did you hear about Ignia (optional)",
        howKnowOptions: ["Instagram", "Referral", "Google search", "Other"],
        collabType: "Type of collaboration",
        collabOptions: ["Exhibition or event", "Corporate purchase", "Sponsorship", "Institutional/museum partnership", "Other"],
        budgetEmp: "Indicative budget",
        budgetEmpOptions: ["To be defined", "Up to €10,000", "€10,000–50,000", "More than €50,000"],
        msgLabel: "Brief message",
        submit: "Send request",
        sending: "Sending…",
        successTitle: "Request received.",
        successMsg: "We review every request personally and will contact you within 48 hours.",
        close: "Close",
        errMsg: "There was an error sending. Please try again.",
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
    if (!open) {
      setSubmitted(false); setBio(""); setMessage(""); setInterests([]);
      setError(null); setProfile(null);
    }
  }, [open]);

  useEffect(() => {
    if (open && defaultProfile === "collector") {
      setProfile("coleccionista");
    } else if (open && defaultProfile === "artist") {
      setProfile("artista");
    }
  }, [open, defaultProfile]);

  if (!open) return null;

  const endpoint = "https://formspree.io/f/xgobbeyp";

  const profileLabel = (p: Profile) =>
    p === "artista" ? "Artista" : p === "coleccionista" ? "Coleccionista" : "Empresa";

  const toggleInterest = (val: string) => {
    setInterests((cur) => cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;
    setLoading(true);
    setError(null);
    try {
      const form = e.currentTarget;
      const get = (name: string) =>
        (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? "";

      let data: Record<string, unknown> = { profile_type: profileLabel(profile) };

      if (profile === "artista") {
        data = {
          ...data,
          nombre: get("nombre"),
          email: get("email"),
          pais: get("pais"),
          social: get("social"),
          material: get("material"),
          obras: get("obras"),
          bio: get("bio"),
        };
      } else if (profile === "coleccionista") {
        data = {
          ...data,
          nombre: get("nombre"),
          email: get("email"),
          pais: get("pais"),
          social: get("social"),
          intereses: interests.join(", "),
          presupuesto: get("presupuesto"),
          conocio: get("conocio"),
        };
      } else {
        data = {
          ...data,
          organizacion: get("organizacion"),
          email: get("email"),
          pais: get("pais"),
          contacto: get("contacto"),
          tipo_colaboracion: get("tipo_colaboracion"),
          presupuesto: get("presupuesto"),
          mensaje: get("mensaje"),
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const result = await res.json().catch(() => ({}));
        setError(result.error || t.errMsg);
      }
    } catch {
      setError(t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  const textInputs = (fields: { l: string; n: string; type?: string }[]) =>
    fields.map((f) => (
      <div key={f.n} className="invite-field">
        <label className="invite-label" htmlFor={f.n}>{f.l}</label>
        <input id={f.n} name={f.n} type={f.type || "text"} className="invite-input" />
      </div>
    ));

  const selectField = (id: string, label: string, options: string[]) => (
    <div className="invite-field">
      <label className="invite-label" htmlFor={id}>{label}</label>
      <select id={id} name={id} className="invite-input">
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 300ms ease both" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .invite-input { width:100%; background:transparent; border:none; border-bottom:1px solid #111111; outline:none; font-family:Manrope,sans-serif; font-weight:400; color:#111111; font-size:16px; padding:0 0 8px; border-radius:0; }
        .invite-input:focus { border-bottom-color:#111111; }
        .invite-label { display:block; font-family:Manrope,sans-serif; font-weight:400; text-transform:uppercase; letter-spacing:0.14em; font-size:14px; color:#111111; margin-bottom:12px; }
        .invite-field { margin-bottom:28px; }
        .role-btn { display:block; width:100%; text-align:left; padding:20px 24px; background:#FFFFFF; border:1px solid #111111; color:#111111; font-family:Manrope,sans-serif; font-weight:400; font-size:16px; letter-spacing:0.04em; cursor:pointer; transition: background 200ms, color 200ms; margin-bottom:12px; }
        .role-btn:hover { background:#111111; color:#FFFFFF; }
        .role-sub { display:block; font-size:13px; font-weight:400; color:#666666; margin-top:4px; transition: color 200ms; }
        .role-btn:hover .role-sub { color:#AAAAAA; }
        .chip { display:inline-block; padding:8px 14px; margin:0 8px 8px 0; border:1px solid #111111; background:#FFFFFF; color:#111111; font-family:Manrope,sans-serif; font-weight:400; font-size:13px; cursor:pointer; transition: background 200ms, color 200ms; }
        .chip.active { background:#111111; color:#FFFFFF; }
        .back-btn { background:transparent; border:none; padding:0; margin-bottom:20px; cursor:pointer; font-family:Manrope,sans-serif; font-weight:400; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:#666666; }
        .back-btn:hover { color:#111111; }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#FFFFFF", maxWidth: 560, width: "100%", padding: 48, borderRadius: 0, position: "relative", maxHeight: "92vh", overflowY: "auto", animation: "modalIn 300ms cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <button
          onClick={onClose}
          aria-label={t.close}
          style={{ position: "absolute", top: 16, right: 20, background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#111111", fontSize: 24, lineHeight: 1 }}
        >×</button>

        {submitted ? (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#111111", fontSize: 24, marginBottom: 16 }}>
              {t.successTitle}
            </h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6 }}>
              {t.successMsg}
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-7">
              {defaultProfile === "collector" ? "Adquirir esta obra" : t.title}
            </h2>

            {!profile ? (
              <div>
                <a className="role-btn" href={lang === "es" ? "/join/escultores" : "/join/sculptors"} style={{ textDecoration: "none" }}>{t.roleArtista}<span className="role-sub">{t.roleArtistaSub}</span></a>
                <button type="button" className="role-btn" onClick={() => setProfile("coleccionista")}>{t.roleColeccionista}<span className="role-sub">{t.roleColeccionistaSub}</span></button>
                <button type="button" className="role-btn" onClick={() => setProfile("empresa")}>{t.roleEmpresa}<span className="role-sub">{t.roleEmpresaSub}</span></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {defaultProfile !== "collector" && (
                  <button type="button" className="back-btn" onClick={() => setProfile(null)}>
                    {t.back} · {profile === "artista" ? t.roleArtista : profile === "coleccionista" ? t.roleColeccionista : t.roleEmpresa}
                  </button>
                )}

                {profile && (
                  <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.5, marginBottom: 36 }}>
                    {profile === "artista" ? t.subtitleArtista : profile === "coleccionista" ? t.subtitleColeccionista : t.subtitleEmpresa}
                  </p>
                )}

                {profile === "artista" && (
                  <>
                    {textInputs([
                      { l: t.name, n: "nombre" },
                      { l: t.email, n: "email", type: "email" },
                      { l: t.country, n: "pais" },
                      { l: t.social, n: "social" },
                    ])}
                    {selectField("material", t.material, t.materialOptions)}
                    {selectField("obras", t.works, t.worksOptions)}
                    <div className="invite-field">
                      <label className="invite-label" htmlFor="bio">{t.bioLabel}</label>
                      <textarea
                        id="bio" name="bio" maxLength={300} rows={3}
                        value={bio} onChange={(e) => setBio(e.target.value)}
                        className="invite-input" style={{ resize: "vertical", minHeight: 80 }}
                      />
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 12, marginTop: 6 }}>
                        {bio.length}/300
                      </div>
                    </div>
                  </>
                )}

                {profile === "coleccionista" && (
                  <>
                    {textInputs([
                      { l: t.name, n: "nombre" },
                      { l: t.email, n: "email", type: "email" },
                      { l: t.country, n: "pais" },
                      { l: t.socialOpt, n: "social" },
                    ])}
                    <div className="invite-field">
                      <label className="invite-label">{t.interestsLabel}</label>
                      <div>
                        {t.interestsOptions.map((opt) => (
                          <span
                            key={opt}
                            className={`chip${interests.includes(opt) ? " active" : ""}`}
                            onClick={() => toggleInterest(opt)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleInterest(opt); } }}
                          >{opt}</span>
                        ))}
                      </div>
                    </div>
                    {selectField("presupuesto", t.budgetCol, t.budgetColOptions)}
                    {selectField("conocio", t.howKnow, t.howKnowOptions)}
                  </>
                )}

                {profile === "empresa" && (
                  <>
                    {textInputs([
                      { l: t.org, n: "organizacion" },
                      { l: t.email, n: "email", type: "email" },
                      { l: t.country, n: "pais" },
                      { l: t.contact, n: "contacto" },
                    ])}
                    {selectField("tipo_colaboracion", t.collabType, t.collabOptions)}
                    {selectField("presupuesto", t.budgetEmp, t.budgetEmpOptions)}
                    <div className="invite-field">
                      <label className="invite-label" htmlFor="mensaje">{t.msgLabel}</label>
                      <textarea
                        id="mensaje" name="mensaje" maxLength={300} rows={3}
                        value={message} onChange={(e) => setMessage(e.target.value)}
                        className="invite-input" style={{ resize: "vertical", minHeight: 80 }}
                      />
                      <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 12, marginTop: 6 }}>
                        {message.length}/300
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="font-body"
                  style={{ width: "100%", background: "transparent", color: "#111111", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 14, padding: "18px 36px", border: "1px solid #111111", borderRadius: 0, cursor: "pointer", transition: "opacity 250ms" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {loading ? t.sending : t.submit}
                </button>
                {error && (
                  <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#b91c1c", fontSize: 13, marginTop: 16, textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};
