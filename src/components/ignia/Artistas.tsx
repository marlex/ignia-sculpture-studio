import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import cristina from "@/assets/artist-cristina-iglesias-real.jpg";
import jaume from "@/assets/artist-jaume-plensa-real.jpg";
import susana from "@/assets/artist-susana-solano-real.jpg";

const ARTISTAS = {
  es: [
    { foto: cristina, nombre: "Cristina Iglesias", esp: "Espacio, agua y bronce", obras: "Obra pública y museística",
      titularEntrevista: "“Me interesa que la escultura no sea solo un objeto, sino un lugar que se atraviesa.”",
      extracto: "Fotografiada en un contexto editorial real, Iglesias trabaja la escultura como arquitectura íntima: celosías, bronce, agua y recorridos que invitan a mirar desde dentro.",
      tiempo: "18 min de lectura", tag: "Entrevista", credito: "Foto: Berria · CC BY-SA 4.0" },
    { foto: jaume, nombre: "Jaume Plensa", esp: "Figura, palabra y escala", obras: "Instalaciones internacionales",
      extracto: "Plensa aparece en una entrega de premios real, lejos del posado de catálogo. Su obra une presencia humana, silencio y escritura en piezas monumentales." , credito: "Foto: Gremi d'Editors de Catalunya · CC BY-SA 2.0" },
    { foto: susana, nombre: "Susana Solano", esp: "Metal, estructura y espacio", obras: "Escultura contemporánea",
      extracto: "Retratada junto a obra pública en un entorno real, Solano aborda el metal como construcción física y mental, con piezas que tensan vacío, peso y recorrido.", credito: "Foto: Kamahele · CC BY-SA 3.0" },
  ],
  en: [
    { foto: cristina, nombre: "Cristina Iglesias", esp: "Space, water and bronze", obras: "Public and museum work",
      titularEntrevista: "“I am interested in sculpture not only as an object, but as a place you move through.”",
      extracto: "Photographed in a real editorial context, Iglesias treats sculpture as intimate architecture: lattices, bronze, water and passages that invite you to look from within.",
      tiempo: "18 min read", tag: "Interview", credito: "Photo: Berria · CC BY-SA 4.0" },
    { foto: jaume, nombre: "Jaume Plensa", esp: "Figure, word and scale", obras: "International installations",
      extracto: "Plensa appears at a real awards ceremony, far from a catalogue pose. His work brings together human presence, silence and writing in monumental pieces.", credito: "Photo: Gremi d'Editors de Catalunya · CC BY-SA 2.0" },
    { foto: susana, nombre: "Susana Solano", esp: "Metal, structure and space", obras: "Contemporary sculpture",
      extracto: "Photographed beside public work in a real setting, Solano approaches metal as both physical and mental construction, tensioning void, weight and movement.", credito: "Photo: Kamahele · CC BY-SA 3.0" },
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
          <img src={principal.foto} alt={principal.nombre} loading="lazy" width={1600} height={900} className="w-full h-full object-cover object-[center_35%]" />
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
          <div className="font-body text-[11px] font-light text-muted-line mb-6">{principal.credito}</div>
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
                  <img src={a.foto} alt={a.nombre} loading="lazy" width={800} height={800} className="w-full h-full object-cover object-[center_35%] transition-transform duration-[700ms] group-hover:scale-[1.03]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[18px] text-ink mb-1.5 leading-tight">{a.nombre}</h4>
                  <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">{a.esp}</div>
                  <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-3">{a.extracto}</p>
                  <div className="font-body text-[11px] font-light text-muted-line mb-3">{a.credito}</div>
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
