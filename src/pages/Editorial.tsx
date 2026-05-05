import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import obra1 from "@/assets/obra-1.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra6 from "@/assets/obra-6.jpg";
import obra7 from "@/assets/obra-7.jpg";
import { useLang } from "@/i18n/LanguageContext";

const PIEZAS = {
  es: [
    { img: obra1, seccion: "Ensayo", titulo: "El bronce contemporáneo: tradición que se reinventa", extracto: "Una mirada a los talleres que mantienen viva la fundición a la cera perdida en el siglo XXI.", autor: "Lucía Pardo" },
    { img: obra3, seccion: "Reportaje", titulo: "Acero corten: el material que escribe el paisaje", extracto: "Diego Lara y otros escultores convierten la oxidación en lenguaje plástico.", autor: "Marcos Iriarte" },
    { img: obra6, seccion: "Entrevista", titulo: "Helena Vázquez: tres décadas escuchando al bronce", extracto: "Sobre el oficio lento, las piezas que casi destruye y por qué se niega a producir ediciones grandes.", autor: "Redacción Ignia" },
    { img: obra7, seccion: "Mercado", titulo: "Coleccionar escultura hoy: criterios, precios y procedencia", extracto: "Qué mirar antes de adquirir una pieza única o de edición limitada.", autor: "Inés Ferrer" },
  ],
  en: [
    { img: obra1, seccion: "Essay", titulo: "Contemporary bronze: a tradition that reinvents itself", extracto: "A look at the workshops keeping lost-wax casting alive in the 21st century.", autor: "Lucía Pardo" },
    { img: obra3, seccion: "Report", titulo: "Corten steel: the material that writes the landscape", extracto: "Diego Lara and other sculptors turn oxidation into a plastic language.", autor: "Marcos Iriarte" },
    { img: obra6, seccion: "Interview", titulo: "Helena Vázquez: three decades listening to bronze", extracto: "On slow craft, the pieces she nearly destroyed, and why she refuses large editions.", autor: "Ignia Editorial" },
    { img: obra7, seccion: "Market", titulo: "Collecting sculpture today: criteria, prices and provenance", extracto: "What to look at before acquiring a unique piece or a limited edition.", autor: "Inés Ferrer" },
  ],
};

const EditorialPage = () => {
  const lang = useLang();
  const piezas = PIEZAS[lang];
  const t = lang === "es"
    ? { eyebrow: "Pensar la escultura", h: "Editorial", sub: "Ensayos, reportajes y entrevistas en torno a la escultura, el oficio y su mercado.", by: "Por" }
    : { eyebrow: "Thinking sculpture", h: "Editorial", sub: "Essays, reports and interviews on sculpture, craft and its market.", by: "By" };

  return (
    <main className="pt-14">
      <Header />
      <section className="px-6 md:px-12 pt-16 pb-12 bg-white">
        <div className="eyebrow mb-3">{t.eyebrow}</div>
        <h1 className="font-display font-bold text-[clamp(36px,5vw,64px)] tracking-[-0.02em] text-ink leading-[1.05]">{t.h}</h1>
        <p className="font-body text-[16px] font-light text-gray max-w-[640px] mt-4">{t.sub}</p>
      </section>

      <section className="bg-surface px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {piezas.map(p => (
            <article key={p.titulo} className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden bg-secondary mb-5">
                <img src={p.img} alt={p.titulo} loading="lazy" className="w-full h-full object-cover transition-transform duration-[700ms] group-hover:scale-[1.03]" />
              </div>
              <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line mb-3">{p.seccion}</div>
              <h2 className="font-display font-bold text-[clamp(20px,2vw,26px)] tracking-[-0.02em] text-ink leading-tight mb-3">{p.titulo}</h2>
              <p className="font-body text-[15px] font-light text-gray leading-relaxed mb-3">{p.extracto}</p>
              <div className="font-body text-[12px] uppercase tracking-[0.14em] text-muted-line">{t.by} {p.autor}</div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default EditorialPage;
