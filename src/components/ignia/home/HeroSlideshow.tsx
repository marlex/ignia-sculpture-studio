import { useEffect, useRef, useState } from "react";
import { GlbViewer } from "../GlbViewer";
import { getHeroWorks } from "@/data/igniaWorks";
import { useLang } from "@/i18n/LanguageContext";

const IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Michelangelo%27s_David_-_right_view_2.jpg/800px-Michelangelo%27s_David_-_right_view_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Venus_de_Milo_Louvre_Ma399_n4.jpg/533px-Venus_de_Milo_Louvre_Ma399_n4.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Le_Penseur_in_the_Jardin_du_Mus%C3%A9e_Rodin%2C_Paris_14_June_2015.jpg/800px-Le_Penseur_in_the_Jardin_du_Mus%C3%A9e_Rodin%2C_Paris_14_June_2015.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Winged_Victory_of_Samothrace_-_Louvre.jpg/480px-Winged_Victory_of_Samothrace_-_Louvre.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Laocoonte.jpg/480px-Laocoonte.jpg",
];

type Props = { onInvite: () => void; onCollection: () => void };

export const HeroSlideshow = ({ onInvite, onCollection }: Props) => {
  const [active, setActive] = useState(0);
  const layerRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const heroWorks = getHeroWorks(lang);
  const featured = heroWorks.find((w) => w.glbUrl) || heroWorks[0];

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % IMAGES.length), 7000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.25;
        if (layerRef.current) layerRef.current.style.transform = `translateY(${y}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden" style={{ background: "#000000" }}>
      <style>{`
        @keyframes kb-a { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(-16px,0)} }
        @keyframes kb-b { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(0,-12px)} }
        .hero-cta-light:hover { opacity: 0.65 !important; }
      `}</style>

      {/* Slideshow background */}
      <div ref={layerRef} className="absolute inset-0 will-change-transform z-0">
        {IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: i === active ? 1 : 0, transition: "opacity 1200ms cubic-bezier(0.16,1,0.3,1)" }}
            aria-hidden={i !== active}
          >
            <img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className="w-full h-full object-cover"
              style={{
                animation: `${i % 2 === 0 ? "kb-a" : "kb-b"} 8s linear forwards`,
                animationPlayState: i === active ? "running" : "paused",
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.6)" }} />

      {/* 3D sculpture centered, 65vh, slightly above center */}
      {featured?.glbUrl && (
        <div
          className="absolute left-1/2 z-[2] pointer-events-auto"
          style={{ top: "46%", transform: "translate(-50%, -50%)", height: "65vh", width: "min(900px, 90vw)" }}
        >
          <GlbViewer url={featured.glbUrl} alt={featured.title} bgColor="transparent" minHeight="65vh" />
        </div>
      )}

      {/* Headline above sculpture */}
      <h1
        className="absolute left-1/2 z-[3] text-center w-full px-6 pointer-events-none"
        style={{
          top: "10vh",
          transform: "translateX(-50%)",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          color: "#FFFFFF",
          fontSize: 28,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          lineHeight: 1.2,
        }}
      >
        La primera galería mundial de escultura
      </h1>

      {/* Subtitle + CTAs below sculpture */}
      <div
        className="absolute left-1/2 z-[3] text-center w-full px-6"
        style={{ bottom: "8vh", transform: "translateX(-50%)" }}
      >
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 400,
            color: "#FFFFFF",
            opacity: 0.75,
            fontSize: 16,
            lineHeight: 1.5,
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          Ve cada obra en 3D. Certificado blockchain en cada venta. Los artistas se quedan con el 82–85%.
        </p>
        <div className="flex items-center justify-center flex-wrap" style={{ gap: 32, marginTop: 32 }}>
          <button
            onClick={onInvite}
            className="hero-cta-light"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "14px 28px",
              background: "#FFFFFF",
              color: "#121212",
              border: "none",
              borderRadius: 0,
              cursor: "pointer",
              transition: "background-color 250ms",
            }}
          >
            Únete a Ignia
          </button>
          <button
            onClick={onCollection}
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid #FFFFFF",
              paddingBottom: 2,
              cursor: "pointer",
            }}
          >
            Ver la colección
          </button>
        </div>
      </div>
    </section>
  );
};
