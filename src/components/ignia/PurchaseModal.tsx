import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Obra = {
  id?: string | number;
  slug?: string;
  title: string;
  artist: string;
  material?: string;
  year?: string | number;
  price?: string;
  image: string;
};

type Props = { open: boolean; onClose: () => void; obra: Obra | null };

const COUNTRIES_ES = ["Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Esuatini","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guinea","Guinea-Bisáu","Guinea Ecuatorial","Guyana","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República del Congo","República Democrática del Congo","República Dominicana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Sudáfrica","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Vaticano","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue"];
const COUNTRIES_EN = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

export const PurchaseModal = ({ open, onClose, obra }: Props) => {
  const lang = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = lang === "es"
    ? {
        title: "Comprar esta obra",
        intro: "Déjanos tus datos y te acompañaremos personalmente para confirmar la disponibilidad de la obra, resolver cualquier duda y completar la compra.",
        name: "Nombre completo",
        email: "Email",
        country: "País",
        countryPlaceholder: "Selecciona...",
        message: "Mensaje (opcional)",
        messagePh: "Puedes preguntarnos sobre la obra, el envío, la instalación o el proceso de compra.",
        cta: "Solicitar compra",
        sending: "Enviando…",
        below: "Recibirás una respuesta personalizada en menos de 24 horas.",
        privacy: "Tus datos solo se utilizarán para gestionar esta solicitud.",
        successTitle: "Solicitud recibida.",
        successMsg: "Te contactaremos personalmente en menos de 24 horas.",
        close: "Cerrar",
        errMsg: "Hubo un error al enviar. Inténtalo de nuevo.",
      }
    : {
        title: "Buy this artwork",
        intro: "Share your details and we will personally assist you in confirming availability, answering your questions and completing the purchase.",
        name: "Full name",
        email: "Email",
        country: "Country",
        countryPlaceholder: "Select...",
        message: "Message (optional)",
        messagePh: "You can ask us about the artwork, shipping, installation or the purchasing process.",
        cta: "Request to buy",
        sending: "Sending…",
        below: "You will receive a personalised response within 24 hours.",
        privacy: "Your details will only be used to manage this request.",
        successTitle: "Request received.",
        successMsg: "We will contact you personally within 24 hours.",
        close: "Close",
        errMsg: "There was an error sending. Please try again.",
      };

  const countryOptions = lang === "es" ? COUNTRIES_ES : COUNTRIES_EN;

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
    if (!open) { setSubmitted(false); setError(null); }
  }, [open]);

  if (!open || !obra) return null;

  const endpoint = "https://formspree.io/f/xgobbeyp";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const form = e.currentTarget;
      const get = (name: string) =>
        (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? "";

      const data = {
        form_type: "Purchase request",
        obra_id: obra.id ?? obra.slug ?? "",
        obra_slug: obra.slug ?? "",
        obra_title: obra.title,
        obra_artist: obra.artist,
        obra_price: obra.price ?? "",
        idioma: lang,
        nombre: get("nombre"),
        email: get("email"),
        pais: get("pais"),
        mensaje: get("mensaje"),
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
      else {
        const result = await res.json().catch(() => ({}));
        setError(result.error || t.errMsg);
      }
    } catch {
      setError(t.errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 300ms ease both" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .pm-input { width:100%; background:transparent; border:none; border-bottom:1px solid #121212; outline:none; font-family:Manrope,sans-serif; font-weight:400; color:#121212; font-size:16px; padding:0 0 8px; border-radius:0; }
        .pm-textarea { width:100%; background:transparent; border:1px solid #121212; outline:none; font-family:Manrope,sans-serif; font-weight:400; color:#121212; font-size:15px; padding:10px 12px; border-radius:0; resize:vertical; min-height:80px; }
        .pm-label { display:block; font-family:Manrope,sans-serif; font-weight:400; text-transform:uppercase; letter-spacing:0.14em; font-size:12px; color:#121212; margin-bottom:8px; }
        .pm-field { margin-bottom:18px; }
        .pm-cta { width:100%; background:#000000; color:#FFFFFF; border:1px solid #000000; font-family:Manrope,sans-serif; font-weight:500; font-size:13px; letter-spacing:0.18em; text-transform:uppercase; padding:16px 0; cursor:pointer; transition: background 200ms, border-color 200ms; }
        .pm-cta:hover:not(:disabled) { background:#222222; border-color:#222222; }
        .pm-cta:focus-visible { outline:2px solid #000000; outline-offset:2px; }
        .pm-cta:disabled { opacity:0.6; cursor:not-allowed; }
        .pm-close { position:absolute; top:10px; right:12px; background:transparent; border:none; cursor:pointer; font-family:'Cormorant Garamond',serif; font-weight:400; color:#121212; font-size:32px; line-height:1; width:44px; height:44px; display:flex; align-items:center; justify-content:center; z-index:2; }
        .pm-shell { background:#FFFFFF; width:100%; max-width:880px; position:relative; max-height:94vh; overflow-y:auto; animation: modalIn 300ms cubic-bezier(0.16,1,0.3,1) both; display:grid; grid-template-columns: 35fr 65fr; }
        .pm-left { padding:36px 32px; background:#F7F6F2; display:flex; flex-direction:column; gap:16px; }
        .pm-right { padding:44px 44px 36px; display:flex; flex-direction:column; }
        .pm-img { width:100%; aspect-ratio: 4/5; object-fit:cover; background:#EEE; }
        @media (max-width: 760px) {
          .pm-shell { grid-template-columns: 1fr; max-height: 96vh; }
          .pm-left { padding: 48px 20px 20px; gap:10px; }
          .pm-right { padding: 20px 20px 28px; }
          .pm-img { aspect-ratio: 16/10; }
          .pm-field { margin-bottom:14px; }
        }
      `}</style>
      <div className="pm-shell" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label={t.close} className="pm-close">×</button>

        {submitted ? (
          <div style={{ gridColumn: "1 / -1", padding: 48 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 28, marginBottom: 12 }}>{t.successTitle}</h2>
            <p style={{ fontFamily: "Manrope, sans-serif", color: "#666", fontSize: 16, lineHeight: 1.6 }}>{t.successMsg}</p>
          </div>
        ) : (
          <>
            <aside className="pm-left">
              <img src={obra.image} alt={obra.title} className="pm-img" loading="lazy" />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 22, lineHeight: 1.15, margin: "6px 0 0" }}>{obra.title}</h3>
              <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "#121212", letterSpacing: "0.06em" }}>{obra.artist}</div>
              {(obra.material || obra.year) && (
                <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "#666" }}>
                  {[obra.material, obra.year].filter(Boolean).join(" · ")}
                </div>
              )}
              {obra.price && (
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, fontSize: 16, color: "#121212", marginTop: 4 }}>{obra.price}</div>
              )}
            </aside>

            <div className="pm-right">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: 1.15, margin: "0 0 12px" }}>{t.title}</h2>
              <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#555", fontSize: 14, lineHeight: 1.55, margin: "0 0 22px" }}>{t.intro}</p>

              <form onSubmit={handleSubmit}>
                <div className="pm-field">
                  <label className="pm-label" htmlFor="pm-nombre">{t.name}</label>
                  <input id="pm-nombre" name="nombre" type="text" required className="pm-input" />
                </div>
                <div className="pm-field">
                  <label className="pm-label" htmlFor="pm-email">{t.email}</label>
                  <input id="pm-email" name="email" type="email" required className="pm-input" />
                </div>
                <div className="pm-field">
                  <label className="pm-label" htmlFor="pm-pais">{t.country}</label>
                  <select id="pm-pais" name="pais" required defaultValue="" className="pm-input">
                    <option value="" disabled>{t.countryPlaceholder}</option>
                    {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="pm-field">
                  <label className="pm-label" htmlFor="pm-mensaje">{t.message}</label>
                  <textarea id="pm-mensaje" name="mensaje" rows={3} placeholder={t.messagePh} className="pm-textarea" />
                </div>

                {error && <div style={{ color: "#B00", fontFamily: "Manrope, sans-serif", fontSize: 13, marginBottom: 12 }}>{error}</div>}

                <button type="submit" disabled={loading} className="pm-cta">
                  {loading ? t.sending : t.cta}
                </button>

                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 12, color: "#555", margin: "12px 0 6px", textAlign: "center" }}>{t.below}</p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 11, color: "#888", margin: 0, textAlign: "center" }}>{t.privacy}</p>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
