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
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ignia-splash-logo { width: 36vw; max-width: 400px; animation: ignia-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; transform-origin: center; }
      `}</style>
      <div className="ignia-splash-logo">
        <svg width="100%" viewBox="0 0 151 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M139.536 29.9316H119.042L113.815 42.2128H111.083L128.665 0.480713H131.635L151 42.2128H145.238L139.536 29.9316ZM138.288 27.2489L128.962 7.15785H128.725L120.171 27.2489H138.288Z" fill="white"/>
          <path d="M100.077 0.480713H105.52V42.2128H100.077V0.480713Z" fill="white"/>
          <path d="M90.8802 0.519165H92.2505H93.6209L93.7242 42.1744H93.2659L60.255 10.9374H60.0167V42.1744H57.2759V0.67664H57.5738L90.6418 32.3864H90.8802V0.519165Z" fill="white"/>
          <path d="M51.395 23.5877V42.0859H48.8593H46.3237V39.5684C44.8298 40.3546 42.9428 41.0819 40.6626 41.7502C38.3825 42.3792 35.7682 42.6937 32.8197 42.6937C28.8884 42.6937 25.5075 42.0844 22.677 40.8657C19.8465 39.6077 17.5074 37.9565 15.6597 35.9123C13.8513 33.8287 12.495 31.4896 11.5908 28.8949C10.7259 26.261 10.2935 23.5484 10.2935 20.7572C10.2935 17.4942 10.8635 14.5851 12.0036 12.0297C13.1436 9.43508 14.7358 7.25322 16.7801 5.48414C18.8243 3.71506 21.2421 2.35877 24.0333 1.41526C26.8638 0.471754 29.9499 0 33.2915 0C36.2006 0 38.7166 0.334158 40.8395 1.00248C43.0017 1.63148 44.8101 2.41774 46.2647 3.36124C47.7193 4.30475 48.8593 5.32689 49.6849 6.42764C50.5498 7.48909 51.1592 8.45226 51.513 9.31714H47.2672C47.0313 8.49157 46.5006 7.68566 45.675 6.8994C44.8888 6.07383 43.8666 5.34654 42.6086 4.71754C41.3506 4.08853 39.9157 3.57747 38.3039 3.18434C36.692 2.79121 34.9623 2.59465 33.1146 2.59465C30.3233 2.59465 27.8663 3.04674 25.7434 3.95094C23.6598 4.85513 21.8907 6.1328 20.4362 7.78394C18.9816 9.43508 17.8808 11.4007 17.1339 13.6809C16.4263 15.961 16.0724 18.4574 16.0724 21.17C16.0724 23.9219 16.4459 26.4575 17.1929 28.777C17.9791 31.0571 19.1388 33.0424 20.672 34.7329C22.2052 36.384 24.1316 37.6813 26.451 38.6249C28.7705 39.5684 31.4831 40.0401 34.5888 40.0401C36.9476 40.0401 39.0508 39.7649 40.8985 39.2145C42.7462 38.6642 44.5546 37.8189 46.3237 36.6789V26.0054H39.7191V23.5877H51.395Z" fill="white"/>
          <path d="M0 0.480713H5.44331V42.2128H0V0.480713Z" fill="white"/>
        </svg>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.04em",
            textAlign: "center",
            marginTop: "24px",
            opacity: 0,
            animation: "ignia-in 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards",
          }}
        >
          Galería exclusiva para la escultura.
        </p>
      </div>
    </div>
  );
};
