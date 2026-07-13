import { useFadeUp } from "@/hooks/useFadeUp";
import { useLang } from "@/i18n/LanguageContext";

export const CtaFinalNew = ({ onInvite, onCollection }: { onInvite: () => void; onCollection: () => void }) => {
  const ref = useFadeUp<HTMLDivElement>();
  const lang = useLang();
  const t = lang === "es"
    ? { h: "Tu escultura empieza aquí.", a: "Únete a Ignia", b: "Ver la colección" }
    : { h: "Your sculpture starts here.", a: "Join Ignia", b: "View the collection" };
  return (
    <section className="cta-final-section" style={{ background: "#121212", padding: "120px 24px" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto" style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#FFFFFF", fontSize: "clamp(33px,6vw,65px)", lineHeight: 1, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
          {t.h}
        </h2>
        <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={onInvite}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            className="font-body"
            style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", padding: "18px 36px", background: "transparent", color: "#FFFFFF", border: "1px solid #FFFFFF", borderRadius: 0, cursor: "pointer", transition: "opacity 250ms" }}
          >
            {t.a}
          </button>
          <button
            onClick={onCollection}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.65"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            className="font-body"
            style={{ fontWeight: 400, fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", padding: "18px 36px", background: "transparent", color: "#FFFFFF", border: "1px solid #FFFFFF", borderRadius: 0, cursor: "pointer", transition: "opacity 250ms" }}
          >
            {t.b}
          </button>
        </div>
      </div>
    </section>
  );
};
