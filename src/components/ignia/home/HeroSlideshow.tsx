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
    <section className="relative w-full h-screen overflow-hidden" style={{ background: "#111111" }}>
      <style>{`
        @keyframes kb-a { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(-16px,0)} }
        @keyframes kb-b { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(0,-12px)} }
      `}</style>

      {/* Slideshow background — absolute, full hero */}
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
              className="w-full h-full object-cover"
              style={{
                animation: `${i % 2 === 0 ? "kb-a" : "kb-b"} 8s linear forwards`,
                animationPlayState: i === active ? "running" : "paused",
              }}
            />
          </div>
        ))}
      </div>

      {/* Overlay above slideshow */}
      <div className="absolute inset-0 z-[1]" style={{ background: "rgba(0,0,0,0.55)" }} />

      {/* Two-column content above overlay */}
      <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-[55%_45%] items-center gap-8 px-6 md:px-12 lg:px-16">
        <div className="max-w-[640px]">
          <h1
            style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400, color: "#FFFFFF", fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
          >
            La primera galería del mundo<br />dedicada exclusivamente<br />a la escultura.
          </h1>
          <p
            className="mt-7 max-w-[560px]"
            style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#FFFFFF", opacity: 0.85, fontSize: "19px", lineHeight: 1.5 }}
          >
            Ve cada obra en 3D. Compra con certificado blockchain. Los artistas se quedan con el 82–85%. Sin galería, sin condiciones.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onInvite}
              className="hero-cta-light"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "16px 32px", background: "#FFFFFF", color: "#111111", border: "none", borderRadius: 0, cursor: "pointer", transition: "background-color 250ms" }}
            >
              Solicitar invitación
            </button>
            <button
              onClick={onCollection}
              className="hero-cta-dark"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: "13px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "16px 32px", background: "transparent", color: "#FFFFFF", border: "1px solid #FFFFFF", borderRadius: 0, cursor: "pointer", transition: "background-color 250ms" }}
            >
              Ver la colección
            </button>
          </div>
        </div>

        {/* 3D viewer column */}
        <div className="hidden md:block w-full" style={{ height: "70vh" }}>
          {featured?.glbUrl && (
            <GlbViewer url={featured.glbUrl} alt={featured.title} bgColor="transparent" minHeight="70vh" />
          )}
        </div>
      </div>

      <style>{`
        .hero-cta-light:hover { background:#F2F2F2 !important; }
        .hero-cta-dark:hover { background:#333333 !important; }
      `}</style>
    </section>
  );
};
