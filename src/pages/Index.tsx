import { useState, useRef } from "react";
import { Header } from "@/components/ignia/Header";
import { Coleccion } from "@/components/ignia/Coleccion";
import { Artistas } from "@/components/ignia/Artistas";
import { Footer } from "@/components/ignia/Footer";
import { HeroSlideshow } from "@/components/ignia/home/HeroSlideshow";
import { Ticker } from "@/components/ignia/home/Ticker";
import { Stats } from "@/components/ignia/home/Stats";
import { WhyIgnia } from "@/components/ignia/home/WhyIgnia";
import { Reviews } from "@/components/ignia/home/Reviews";
import { CtaFinalNew } from "@/components/ignia/home/CtaFinalNew";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { Splash } from "@/components/ignia/home/Splash";
import { HeroBanner } from "@/components/ignia/home/HeroBanner";
import { useFadeUp } from "@/hooks/useFadeUp";


const Index = () => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const coleccionRef = useRef<HTMLDivElement>(null);
  const scrollToColeccion = () => coleccionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const fadeCol = useFadeUp<HTMLDivElement>();
  const fadeArt = useFadeUp<HTMLDivElement>();

  return (
    <main className="pt-14" style={{ background: "#FFFFFF" }}>
      <Splash />
      <Header />
      <HeroSlideshow onInvite={() => setInviteOpen(true)} onCollection={scrollToColeccion} />
      <HeroBanner onInvite={() => setInviteOpen(true)} onCollection={scrollToColeccion} />
      <Ticker />

      <Stats />
      <WhyIgnia />
      <div ref={coleccionRef}>
        <div ref={fadeCol}>
          <Coleccion />
        </div>
      </div>
      <div ref={fadeArt}>
        <Artistas />
      </div>
      <Reviews />
      <CtaFinalNew onInvite={() => setInviteOpen(true)} onCollection={scrollToColeccion} />
      <Footer />
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
};

export default Index;
