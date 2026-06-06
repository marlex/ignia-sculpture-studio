import { useEffect, useState } from "react";

export const Splash = () => {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // soft fade-in 1200ms + hold 1400ms = 2600ms, then soft fade out 1200ms
    const t1 = setTimeout(() => setFading(true), 2600);
    const t2 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = prevOverflow;
    }, 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prevOverflow;
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 1.2s ease",
      }}
    >
      <style>{`
        @keyframes ignia-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .ignia-splash-group { opacity: 0; animation: ignia-in 2s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .ignia-splash-logo { width: 36vw; max-width: 400px; display: block; margin: 0 auto; }
      `}</style>
      <div className="ignia-splash-group">
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(34px, 5.2vw, 64px)",
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          The place for sculpture.
        </p>
      </div>
    </div>
  );
};
