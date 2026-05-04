export const CtaFinal = () => (
  <section className="px-6 md:px-12 py-32 text-center" style={{ background: "hsl(var(--black-pure))" }}>
    <h2 className="font-display font-bold text-white tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
      Tu obra de arte empieza aquí.
    </h2>
    <p className="font-body text-[16px] font-light mt-5 mb-12 text-white">
      Colecciona y vende todo con la mayor autenticidad.
    </p>
    <div className="flex flex-wrap gap-3 justify-center">
      <button className="btn-primary btn-primary-inverse">Crear mi perfil de artista</button>
      <button className="btn-ghost btn-ghost-dark">Acceder como coleccionista</button>
    </div>
  </section>
);
