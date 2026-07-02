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
import { useLang } from "@/i18n/LanguageContext";

const SEPARATORS = {
  es: {
    s1: {
      title: "El conocimiento que necesitas para decidir bien.",
      subtitle: "Comisiones transparentes, criterios abiertos y datos reales para escultores y coleccionistas.",
      cta: "Unirme a Ignia",
    },
    s2: {
      title: "Cada obra, certificada para siempre.",
      subtitle: "Un certificado que garantiza la autenticidad de cada obra, para siempre.",
      cta: "Unirme a Ignia",
    },
    s3: {
      title: "Solo escultura. Siempre.",
      subtitle: "Un espacio construido enteramente para la escultura, únete a Ignia",
      cta: "Unirme a Ignia",
    },
  },
  en: {
    s1: {
      title: "The knowledge you need to decide well.",
      subtitle: "Transparent commissions, open criteria and real data for sculptors and collectors.",
      cta: "Join Ignia",
    },
    s2: {
      title: "Every work, certified forever.",
      subtitle: "A certificate that guarantees the authenticity of every work, forever.",
      cta: "Join Ignia",
    },
    s3: {
      title: "Only sculpture. Always.",
      subtitle: "A space built entirely for sculpture, join Ignia",
      cta: "Join Ignia",
    },
  },
} as const;

const Index = () => {
  const lang = useLang();
  const t = SEPARATORS[lang];
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
      <SectionSeparator title={t.s1.title} subtitle={t.s1.subtitle} cta={t.s1.cta} />
      <div ref={fadeArt}>
        <Artistas />
      </div>
      <div ref={fadeReviews}>
        <Reviews />
      </div>
      <SectionSeparator title={t.s2.title} subtitle={t.s2.subtitle} cta={t.s2.cta} />
      <Colectores />
      <Inspiracion />
      <Aprende />
      <SectionSeparator title={t.s3.title} subtitle={t.s3.subtitle} cta={t.s3.cta} />
      <Footer />
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </main>
  );
};

export default Index;
