import { useEffect, useState } from "react";

const SPLASH_KEY = "ignia-splash-shown";

export const Splash = () => {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [fading, setFading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem(SPLASH_KEY) === "1";
    setShow(!hasSeen);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!show || !ready) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const revealT = setTimeout(() => setRevealed(true), 100);
    const fadeT = setTimeout(() => setFading(true), 3600);
    const hideT = setTimeout(() => {
      setShow(false);
      localStorage.setItem(SPLASH_KEY, "1");
      document.body.style.overflow = prevOverflow;
    }, 4800);

    return () => {
      clearTimeout(revealT);
      clearTimeout(fadeT);
      clearTimeout(hideT);
      document.body.style.overflow = prevOverflow;
    };
  }, [show, ready]);

  if (!ready || !show) return null;

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
        transition: "opacity 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes ignia-splash-reveal {
          0% {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
            filter: blur(6px);
          }
          55% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        @keyframes ignia-splash-line {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .ignia-splash-group {
          opacity: 0;
          animation: ignia-splash-reveal 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .ignia-splash-group.revealed {
          opacity: 1;
        }
        .ignia-splash-line {
          height: 1px;
          background: rgba(255,255,255,0.18);
          margin: 28px auto 0;
          transform-origin: center;
          transform: scaleX(0);
          animation: ignia-splash-line 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards;
          width: min(120px, 18vw);
        }
      `}</style>
      <div className={`ignia-splash-group ${revealed ? "revealed" : ""}`}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: "clamp(34px, 5.2vw, 64px)",
            color: "rgba(255,255,255,0.84)",
            letterSpacing: "0.04em",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          The place for sculpture.
        </p>
        <div className="ignia-splash-line" />
      </div>
    </div>
  );
};
