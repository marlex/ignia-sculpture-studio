import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";

type Role = "escultor" | "coleccionista";

export default function Login() {
  const [role, setRole] = useState<Role>("escultor");
  const navigate = useNavigate();

  const goToProfile = (e: React.FormEvent, r: Role) => {
    e.preventDefault();
    navigate(r === "escultor" ? "/perfil/escultor" : "/perfil/coleccionista");
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="h-14 border-b border-border flex items-center px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
      </header>

      <section className="max-w-[560px] mx-auto px-6 py-16 md:py-20">
        {/* LOGIN */}
        <div className="eyebrow mb-3">Entrar</div>
        <h1 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-8 leading-tight">
          Accede a Ignia
        </h1>

        <form onSubmit={(e) => goToProfile(e, role)} className="space-y-5">
          <Field label="Email" type="email" placeholder="tu@email.com" />
          <Field label="Contraseña" type="password" placeholder="••••••••" />
          <button type="submit" className="btn-primary w-full justify-center !py-3.5">
            Entrar ↗
          </button>
        </form>

        {/* Separador */}
        <div className="flex items-center gap-4 my-14">
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-[12px] uppercase tracking-[0.18em] text-muted-line">o crea una cuenta</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* REGISTRO con tabs */}
        <div className="eyebrow mb-3">Registro</div>
        <h2 className="font-display font-bold text-[clamp(24px,2.6vw,32px)] tracking-[-0.02em] text-ink mb-8 leading-tight">
          Únete a Ignia
        </h2>

        <div className="flex gap-7 border-b border-border mb-8">
          {(["escultor", "coleccionista"] as Role[]).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="font-body text-[14px] font-light tracking-[0.08em] pb-3 capitalize transition-colors"
              style={{
                color: role === r ? "hsl(var(--black-pure))" : "hsl(var(--gray))",
                borderBottom: role === r ? "1.5px solid hsl(var(--black-pure))" : "1.5px solid transparent",
                marginBottom: "-1px",
              }}
            >
              Soy {r}
            </button>
          ))}
        </div>

        <form onSubmit={(e) => goToProfile(e, role)} className="space-y-5">
          {role === "escultor" ? (
            <>
              <Field label="Nombre artístico" placeholder="Ej. Helena Vázquez" />
              <Field label="Email" type="email" placeholder="tu@email.com" />
              <Field label="Contraseña" type="password" placeholder="••••••••" />
              <Field label="Disciplina principal" placeholder="Bronce, mármol, acero, piedra..." />
              <Field label="Ciudad / taller" placeholder="Toledo, España" />
              <FieldArea label="Bio breve" placeholder="Cuéntanos sobre tu obra escultórica (máx. 280 caracteres)" />
            </>
          ) : (
            <>
              <Field label="Nombre completo" placeholder="Ej. María García" />
              <Field label="Email" type="email" placeholder="tu@email.com" />
              <Field label="Contraseña" type="password" placeholder="••••••••" />
              <Field label="Intereses escultóricos" placeholder="Figurativo, abstracto, gran formato..." />
              <Field label="Rango de presupuesto" placeholder="2.000 € – 20.000 €" />
            </>
          )}
          <button type="submit" className="btn-primary w-full justify-center !py-3.5">
            Crear cuenta ↗
          </button>
        </form>
      </section>
    </main>
  );
}

const Field = ({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) => (
  <label className="block">
    <span className="block font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-2">{label}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent border-0 border-b border-border focus:border-ink outline-none py-2.5 font-body text-[15px] text-ink placeholder:text-muted-line/60"
    />
  </label>
);

const FieldArea = ({ label, placeholder }: { label: string; placeholder?: string }) => (
  <label className="block">
    <span className="block font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-2">{label}</span>
    <textarea
      rows={3}
      placeholder={placeholder}
      className="w-full bg-transparent border border-border focus:border-ink outline-none p-3 font-body text-[15px] text-ink placeholder:text-muted-line/60 resize-none"
    />
  </label>
);
