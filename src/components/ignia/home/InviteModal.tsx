import { useEffect } from "react";
import { useLang } from "@/i18n/LanguageContext";

type Props = { open: boolean; onClose: () => void; defaultProfile?: "collector" | "artist" };

export const InviteModal = ({ open, onClose }: Props) => {
  const lang = useLang();

  const t = lang === "es"
    ? {
        title: "Únete a Ignia",
        whoTitle: "¿Quién eres?",
        roleArtista: "Soy escultor/a",
        roleColeccionista: "Soy coleccionista",
        roleEmpresa: "Soy galería o empresa",
        roleCurador: "Soy curador/a",
        roleAdvisor: "Soy art advisor",
        roleArtistaSub: "Sé descubierto por coleccionistas",
        roleColeccionistaSub: "Encuentra obras que no encontrarás en otro sitio",
        roleEmpresaSub: "Hablemos sobre tu proyecto u organización",
        roleCuradorSub: "Ofrece asesoría y valoración a escultores",
        roleAdvisorSub: "Guía a coleccionistas y escultores en el mercado",
        close: "Cerrar",
      }
    : {
        title: "Join Ignia",
        whoTitle: "Who are you?",
        roleArtista: "I'm a sculptor",
        roleColeccionista: "I'm a collector",
        roleEmpresa: "I'm a gallery or company",
        roleCurador: "I'm a curator",
        roleAdvisor: "I'm an art advisor",
        roleArtistaSub: "Get discovered by collectors",
        roleColeccionistaSub: "Find works you won't find elsewhere",
        roleEmpresaSub: "Let's talk about your project or organization",
        roleCuradorSub: "Offer advice and valuation to sculptors",
        roleAdvisorSub: "Guide collectors and sculptors in the market",
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

  if (!open) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn 300ms ease both" }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes modalIn { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .role-btn { display:block; width:100%; text-align:left; padding:20px 24px; background:#FFFFFF; border:1px solid #121212; color:#121212; font-family:Manrope,sans-serif; font-weight:400; font-size:16px; letter-spacing:0.04em; cursor:pointer; transition: background 200ms, color 200ms; margin-bottom:12px; text-decoration:none; }
        .role-btn:hover { background:#121212; color:#FFFFFF; }
        .role-sub { display:block; font-size:13px; font-weight:400; color:#666666; margin-top:4px; transition: color 200ms; }
        .role-btn:hover .role-sub { color:#AAAAAA; }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#FFFFFF", maxWidth: 560, width: "100%", padding: 48, borderRadius: 0, position: "relative", maxHeight: "92vh", overflowY: "auto", animation: "modalIn 300ms cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <button
          onClick={onClose}
          aria-label={t.close}
          style={{ position: "absolute", top: 12, right: 16, background: "transparent", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 32, lineHeight: 1, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
        >×</button>

        <h2 className="font-display font-semibold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-7">
          {t.title}
        </h2>

        <div>
          <a className="role-btn" href={lang === "es" ? "/join/escultores" : "/join/sculptors"}>{t.roleArtista}<span className="role-sub">{t.roleArtistaSub}</span></a>
          <a className="role-btn" href={lang === "es" ? "/join/coleccionistas" : "/join/collectors"}>{t.roleColeccionista}<span className="role-sub">{t.roleColeccionistaSub}</span></a>
          <a className="role-btn" href={lang === "es" ? "/join/galerias" : "/join/galleries"}>{t.roleEmpresa}<span className="role-sub">{t.roleEmpresaSub}</span></a>
        </div>
      </div>
    </div>
  );
};
