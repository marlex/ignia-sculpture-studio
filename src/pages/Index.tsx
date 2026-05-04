import { Header } from "@/components/ignia/Header";
import { Hero } from "@/components/ignia/Hero";
import { Coleccion } from "@/components/ignia/Coleccion";
import { Artistas } from "@/components/ignia/Artistas";
import { Aprende } from "@/components/ignia/Aprende";
import { CtaFinal } from "@/components/ignia/CtaFinal";
import { Footer } from "@/components/ignia/Footer";

const Index = () => (
  <main>
    <Header />
    <Hero />
    <Coleccion />
    <Artistas />
    <Aprende />
    <CtaFinal />
    <Footer />
  </main>
);

export default Index;
