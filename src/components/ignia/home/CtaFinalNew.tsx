import { useFadeUp } from "@/hooks/useFadeUp";

export const CtaFinalNew = ({ onInvite, onCollection }: { onInvite: () => void; onCollection: () => void }) => {
  const ref = useFadeUp<HTMLDivElement>();
  return (
    <section style={{ background: "#111111", padding: "120px 24px" }}>
      <div ref={ref} className="max-w-[1280px] mx-auto" style={{ textAlign: "center" }}>
        <h2 style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 700, color: "#FFFFFF", fontSize: "clamp(48px,7vw,80px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
          Tu escultura<br />empieza aquí.
        </h2>
        <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={onInvite}
            className="hero-cta-light"
            style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", padding: "18px 36px", background: "#FFFFFF", color: "#111111", border: "none", borderRadius: 0, cursor: "pointer", transition: "background-color 250ms" }}
          >
            Solicitar invitación
          </button>
          <button
            onClick={onCollection}
            style={{ fontFamily: "Urbanist, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FFFFFF", background: "transparent", border: "none", borderBottom: "1px solid #FFFFFF", paddingBottom: 4, cursor: "pointer" }}
          >
            Ver la colección
          </button>
        </div>
      </div>
    </section>
  );
};
