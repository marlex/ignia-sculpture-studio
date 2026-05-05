import { useState } from "react";

const artistas = [
  {
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80",
    nombre: "Helena Vázquez",
    esp: "Bronce figurativo",
    obras: "24 obras",
    titularEntrevista: "“El bronce no se domina, se escucha durante años hasta que empieza a responder.”",
    extracto:
      "Helena Vázquez lleva tres décadas trabajando la figura humana en bronce desde su taller en Toledo. En esta conversación habla del oficio lento, de las piezas que casi destruye, y de por qué se niega a producir ediciones grandes.",
    tiempo: "18 min de lectura",
    tag: "Entrevista",
  },
  {
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    nombre: "Marcos Iriarte",
    esp: "Abstracción metálica",
    obras: "18 obras",
    extracto:
      "El acero corten como lenguaje del paisaje industrial reinterpretado. Iriarte trabaja la oxidación controlada como parte del proceso creativo.",
  },
  {
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    nombre: "Ana Ruiz",
    esp: "Mármol y piedra",
    obras: "31 obras",
    extracto:
      "Desde su taller en Macael, Ana talla mármol blanco buscando la forma orgánica que la piedra ya contiene. Una obra puede llevarle más de un año.",
  },
];

export const Artistas = () => {
  const [i, setI] = useState(0);
  const principal = artistas[i];
  const secundarios = artistas.filter((_, idx) => idx !== i).slice(0, 2);

  return (
    <section className="bg-white px-6 md:px-12 py-24">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <h2 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink">
          Escultores
        </h2>
        <a href="#" className="link-arrow">Ver todos →</a>
      </div>

      {/* Entrevista destacada */}
      <article className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 md:gap-14 items-center mb-16">
        <div className="aspect-[16/9] overflow-hidden bg-secondary">
          <img
            src={principal.foto}
            alt={principal.nombre}
            loading="lazy"
            className="w-full h-full object-cover object-[center_25%] grayscale"
          />
        </div>
        <div>
          <div className="font-body text-[14px] font-light text-muted-line uppercase tracking-[0.14em] mb-4">
            {principal.tag} · {principal.nombre}
          </div>
          <h3 className="font-display font-bold text-[clamp(24px,2.4vw,32px)] tracking-[-0.02em] text-ink mb-5 leading-[1.15]">
            {principal.titularEntrevista}
          </h3>
          <p className="font-body text-[15px] font-light text-gray leading-relaxed mb-6">
            {principal.extracto}
          </p>
          <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-6">
            {principal.esp} · {principal.obras} · {principal.tiempo}
          </div>
          <a href="#" className="link-arrow">Leer entrevista completa →</a>
        </div>
      </article>

      {/* Otros artistas - miniaturas con descripción a la derecha */}
      <div className="border-t border-border pt-10">
        <div className="font-body text-[12px] font-light text-muted-line uppercase tracking-[0.18em] mb-6">
          Escultores destacados
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {secundarios.map((a) => {
            const realIdx = artistas.findIndex((x) => x.nombre === a.nombre);
            return (
              <button
                key={a.nombre}
                onClick={() => setI(realIdx)}
                className="group grid grid-cols-[40%_60%] gap-5 text-left items-start"
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={a.foto}
                    alt={a.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover object-[center_25%] grayscale group-hover:grayscale-0 transition-all duration-[700ms]"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[18px] text-ink mb-1.5 leading-tight">
                    {a.nombre}
                  </h4>
                  <div className="font-body text-[13px] font-light text-muted-line uppercase tracking-[0.14em] mb-3">
                    {a.esp}
                  </div>
                  <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-3">
                    {a.extracto}
                  </p>
                  <span className="link-arrow text-[12px]">Ver artista →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
