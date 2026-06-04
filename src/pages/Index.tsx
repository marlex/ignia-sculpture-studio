import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/ignia/Header";
import { Coleccion } from "@/components/ignia/Coleccion";
import { Artistas } from "@/components/ignia/Artistas";
import { Footer } from "@/components/ignia/Footer";
import { Hero } from "@/components/ignia/Hero";
import { Ticker } from "@/components/ignia/home/Ticker";

import { Reviews } from "@/components/ignia/home/Reviews";
import { CtaFinalNew } from "@/components/ignia/home/CtaFinalNew";
import { FollowIgnia } from "@/components/ignia/home/FollowIgnia";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { Splash } from "@/components/ignia/home/Splash";
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

  const fadeTicker = useFadeUp<HTMLDivElement>();
  const fadeCol = useFadeUp<HTMLDivElement>();
  const fadeArt = useFadeUp<HTMLDivElement>();
  const fadeReviews = useFadeUp<HTMLDivElement>();
  const fadeCta = useFadeUp<HTMLDivElement>();

  return (
    <main className="pt-14" style={{ background: "#FFFFFF" }}>
      <Splash />
      <Header />
      <Hero />
      <div ref={fadeTicker}>
        <Ticker />
      </div>

      <div ref={coleccionRef}>
        <div ref={fadeCol}>
          <Coleccion />
        </div>
      </div>
      <div ref={fadeArt}>
        <Artistas />
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
