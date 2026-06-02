import { Header } from "@/components/ignia/Header";
import { Hero } from "@/components/ignia/Hero";
import { Coleccion } from "@/components/ignia/Coleccion";
import { Artistas } from "@/components/ignia/Artistas";
import { Aprende } from "@/components/ignia/Aprende";
import { CtaFinal } from "@/components/ignia/CtaFinal";
import { Testimonials } from "@/components/ignia/Testimonials";
import { Sponsors } from "@/components/ignia/Sponsors";
import { Footer } from "@/components/ignia/Footer";
import { useLang } from "@/i18n/LanguageContext";

const Index = () => {
  const lang = useLang();
  return (
    <main className="pt-14">
      <Header />
      <Hero />
      <Coleccion />
      <Artistas />
      <Aprende />
      <CtaFinal lang={lang} />
      <Testimonials />
      <Sponsors />
      <Footer />
    </main>
  );
};

export default Index;

