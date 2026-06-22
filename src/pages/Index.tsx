import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/ignia/Header";
import { Coleccion } from "@/components/ignia/Coleccion";
import { Artistas } from "@/components/ignia/Artistas";
import { Colectores } from "@/components/ignia/Colectores";
import { Footer } from "@/components/ignia/Footer";
import { HeroFull } from "@/components/ignia/home/HeroFull";
import { Ticker } from "@/components/ignia/home/Ticker";

import { Reviews } from "@/components/ignia/home/Reviews";
import { Aprende } from "@/components/ignia/Aprende";

import { SectionSeparator } from "@/components/ignia/home/SectionSeparator";
import { Inspiracion } from "@/components/ignia/Inspiracion";
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

  return (
    <main className="pt-14" style={{ background: "#FFFFFF" }}>
      <Splash />
      <Header />
      <HeroFull />
      <div ref={fadeTicker}>
        <Ticker />
      </div>

      <div ref={coleccionRef}>
        <div ref={fadeCol}>
          <Coleccion />
        </div>
      </div>
      <SectionSeparator
        title="El conocimiento que necesitas para decidir bien."
        subtitle="Comisiones transparentes, criterios abiertos y datos reales para escultores y coleccionistas."
      />
      <SectionSeparator
        title="Solo escultura. Siempre."
        subtitle="Un espacio construido enteramente alrededor de la escultura, el espacio que necesita."
      />
      <div ref={fadeArt}>
        <Artistas />
      </div>
      <div ref={fadeReviews}>
        <Reviews />
      </div>
      <Colectores />
      <Inspiracion />
      <SectionSeparator
        title="Cada obra, certificada para siempre."
        subtitle="Un certificado que garantiza la autenticidad de cada obra, para siempre."
      />
      <Aprende />
      <Footer />
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
};

export default Index;
