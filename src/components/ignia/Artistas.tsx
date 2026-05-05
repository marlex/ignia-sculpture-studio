import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

const helena = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80";
const marcos = "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&q=80";
const ana = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80";

const ARTISTAS = {
  es: [
    { foto: helena, nombre: "Helena Vázquez", esp: "Bronce figurativo", obras: "24 obras",
      titularEntrevista: "“El bronce no se domina, se escucha durante años hasta que empieza a responder.”",
      extracto: "Helena Vázquez lleva tres décadas trabajando la figura humana en bronce desde su taller en Toledo. En esta conversación habla del oficio lento, de las piezas que casi destruye, y de por qué se niega a producir ediciones grandes.",
      tiempo: "18 min de lectura", tag: "Entrevista" },
    { foto: marcos, nombre: "Marcos Iriarte", esp: "Abstracción metálica", obras: "18 obras",
      extracto: "El acero corten como lenguaje del paisaje industrial reinterpretado. Iriarte trabaja la oxidación controlada como parte del proceso creativo." },
    { foto: ana, nombre: "Ana Ruiz", esp: "Mármol y piedra", obras: "31 obras",
      extracto: "Desde su taller en Macael, Ana talla mármol blanco buscando la forma orgánica que la piedra ya contiene. Una obra puede llevarle más de un año." },
  ],
  en: [
    { foto: helena, nombre: "Helena Vázquez", esp: "Figurative bronze", obras: "24 works",
      titularEntrevista: "“You don't master bronze. You listen to it for years until it starts to answer.”",
      extracto: "Helena Vázquez has spent three decades working the human figure in bronze from her studio in Toledo. In this conversation she talks about slow craft, the pieces she almost destroyed, and why she refuses to produce large editions.",
      tiempo: "18 min read", tag: "Interview" },
    { foto: marcos, nombre: "Marcos Iriarte", esp: "Metal abstraction", obras: "18 works",
      extracto: "Corten steel as a reinterpreted language of the industrial landscape. Iriarte uses controlled oxidation as part of the creative process." },
    { foto: ana, nombre: "Ana Ruiz", esp: "Marble and stone", obras: "31 works",
      extracto: "From her workshop in Macael, Ana carves white marble searching for the organic form the stone already contains. A piece can take her over a year." },
  ],
};

export const Artistas = () => {
  const lang = useLang();
  const artistas = ARTISTAS[lang];
  const [i, setI] = useState(0);
  const principal = artistas[i];
  const secundarios = artistas.filter((_, idx) => idx !== i).slice(0, 2);
  const t = lang === "es"
    ? { h: "Escultores", all: "Ver todos →", featured: "Escultores destacados", view: "Ver artista →" }
    : { h: "Sculptors", all: "View all →", featured: "Featured sculptors", view: "View artist →" };

  return (
    <section className="bg-white px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">{t.h}</h2>
        <a href="#" className="link-arrow">{t.all}</a>
      </div>

      <article className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center mb-16">
        <div className="aspect-[16/9] overflow-hidden bg-secondary">
          <img src={principal.foto} alt={principal.nombre} loading="lazy" width={1600} height={900} className="w-full h-full object-cover object-[center_25%]" />
        </div>
        <div>
          <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-4">
            {principal.tag} · {principal.nombre}
          </div>
          <h3 className="font-display font-bold text-[clamp(24px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-5 leading-[1.15]">
            {principal.titularEntrevista}
          </h3>
          <p className="font-body text-[15px] font-light text-gray leading-relaxed mb-6">{principal.extracto}</p>
          <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-6">
            {principal.esp} · {principal.obras} · {principal.tiempo}
          </div>
          <a href="#" className="link-arrow">{t.view}</a>
        </div>
      </article>

      <div className="border-t border-border pt-10">
        <div className="font-body text-[12px] font-light text-muted-line uppercase tracking-[0.18em] mb-6">{t.featured}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {secundarios.map((a) => {
            const realIdx = artistas.findIndex((x) => x.nombre === a.nombre);
            return (
              <button key={a.nombre} onClick={() => setI(realIdx)} className="group grid grid-cols-[40%_60%] gap-5 text-left items-start">
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img src={a.foto} alt={a.nombre} loading="lazy" width={800} height={800} className="w-full h-full object-cover object-[center_25%] transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[18px] text-ink mb-1.5 leading-tight">{a.nombre}</h4>
                  <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{a.esp}</div>
                  <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-3">{a.extracto}</p>
                  <span className="link-arrow text-[12px]">{t.view}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
