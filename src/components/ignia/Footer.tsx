import { Logo } from "./Logo";

const cols = [
  { label: "Explorar", links: ["Colección", "Artistas", "Editorial", "Ignia Aprende"] },
  { label: "Para artistas", links: ["Publicar obra", "Comisiones", "Guía 3D", "Ayuda"] },
  { label: "Compañía", links: ["Sobre Ignia", "Prensa", "Términos", "Privacidad"] },
];

export const Footer = () => (
  <footer className="bg-white border-t-[0.5px] border-border px-6 md:px-12 pt-14 pb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <Logo />
        <p className="font-body text-[12px] font-light text-gray mt-4 max-w-[260px]">
          La primera galería digital dedicada exclusivamente a la escultura.
        </p>
      </div>
      {cols.map(c => (
        <div key={c.label}>
          <div className="font-body text-[9px] font-light text-muted-line uppercase tracking-[0.14em] mb-4">{c.label}</div>
          <div className="flex flex-col gap-2.5">
            {c.links.map(l => (
              <a key={l} href="#" className="font-body text-[12px] font-light text-gray hover:text-ink transition-colors">{l}</a>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="border-t-[0.5px] border-border mt-10 pt-5 flex justify-between flex-wrap gap-3">
      <span className="font-body text-[11px] font-light text-gray">© 2026 Ignia Gallery</span>
      <span className="font-body text-[11px] font-light" style={{ color: "#444" }}>v0.1 — Validación activa</span>
    </div>
  </footer>
);
