import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/ignia/Header";
import { Coleccion } from "@/components/ignia/Coleccion";
import { Artistas } from "@/components/ignia/Artistas";
import { Footer } from "@/components/ignia/Footer";
import { Hero } from "@/components/ignia/Hero";
import { Ticker } from "@/components/ignia/home/Ticker";
import { Stats } from "@/components/ignia/home/Stats";
import { WhyIgnia } from "@/components/ignia/home/WhyIgnia";
import { Reviews } from "@/components/ignia/home/Reviews";
import { CtaFinalNew } from "@/components/ignia/home/CtaFinalNew";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { Splash } from "@/components/ignia/home/Splash";
import { HeroBanner } from "@/components/ignia/home/HeroBanner";
import { LogosTicker } from "@/components/ignia/home/LogosTicker";
import { ConstruidaPara } from "@/components/ignia/home/ConstruidaPara";
import { useFadeUp } from "@/hooks/useFadeUp";

const Index = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const coleccionRef = useRef<HTMLDivElement>(null);
  const scrollToColeccion = () => coleccionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    const open = () => setInviteOpen(true);
    window.addEventListener("ignia:open-invite", open);
    return () => window.removeEventListener("ignia:open-invite", open);
  }, []);

  const fadeBanner = useFadeUp<HTMLDivElement>();
  const fadeLogos = useFadeUp<HTMLDivElement>();
  const fadeTicker = useFadeUp<HTMLDivElement>();
  const fadeStats = useFadeUp<HTMLDivElement>();
  const fadeWhy = useFadeUp<HTMLDivElement>();
  const fadeCol = useFadeUp<HTMLDivElement>();
  const fadeArt = useFadeUp<HTMLDivElement>();
  const fadeConstruida = useFadeUp<HTMLDivElement>();
  const fadeReviews = useFadeUp<HTMLDivElement>();
  const fadeCta = useFadeUp<HTMLDivElement>();

  return (
    <main className="pt-14" style={{ background: "#FFFFFF" }}>
      <Splash />
      <Header />
      <Hero />
      <div ref={fadeBanner}>
        <HeroBanner onInvite={() => setInviteOpen(true)} onCollection={scrollToColeccion} />
      </div>
      <div ref={fadeLogos}>
        <LogosTicker />
      </div>
      <div ref={fadeTicker}>
        <Ticker />
      </div>
      <div ref={fadeStats}>
        <Stats />
      </div>
      <div ref={fadeWhy}>
        <WhyIgnia />
      </div>
      <div ref={coleccionRef}>
        <div ref={fadeCol}>
          <Coleccion />
        </div>
      </div>
      <div ref={fadeArt}>
        <Artistas />
      </div>
      <div ref={fadeConstruida}>
        <ConstruidaPara onInvite={() => setInviteOpen(true)} />
      </div>
      <div ref={fadeReviews}>
        <Reviews />
      </div>
      <div ref={fadeCta}>
        <CtaFinalNew onInvite={() => setInviteOpen(true)} onCollection={scrollToColeccion} />
      </div>
      <Footer />
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
};

export default Index;
