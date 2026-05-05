export const CtaFinal = ({ lang = "es" }: { lang?: "es" | "en" }) => {
  const t = lang === "es" ? {
    title: "Tu escultura empieza aquí.",
    sub: "Colecciona y vende esculturas con la mayor autenticidad.",
    a: "Crear mi perfil de artista",
    b: "Acceder como coleccionista",
  } : {
    title: "Your sculpture starts here.",
    sub: "Collect and sell sculpture with verified authenticity.",
    a: "Create my artist profile",
    b: "Sign in as collector",
  };
  return (
    <section className="px-6 md:px-12 py-32 text-center" style={{ background: "hsl(var(--black-pure))" }}>
      <h2 className="font-display font-bold text-white tracking-[-0.02em]" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
        {t.title}
      </h2>
      <p className="font-body text-[16px] font-light mt-5 mb-12 text-white">{t.sub}</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button className="btn-primary btn-primary-inverse">{t.a}</button>
        <button className="btn-ghost btn-ghost-dark">{t.b}</button>
      </div>
    </section>
  );
};
