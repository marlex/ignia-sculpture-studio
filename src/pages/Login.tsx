import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";

type Role = "escultor" | "coleccionista";

export default function Login() {
  const [role, setRole] = useState<Role>("escultor");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === "escultor" ? "/perfil/escultor" : "/perfil/coleccionista");
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="h-14 border-b border-border flex items-center px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
      </header>

      <section className="max-w-[560px] mx-auto px-6 py-16 md:py-24">
        <div className="eyebrow mb-3">{mode === "login" ? "Entrar" : "Crear cuenta"}</div>
        <h1 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-10 leading-tight">
          {mode === "login" ? "Accede a Ignia" : "Únete a Ignia"}
        </h1>

        {/* Selector de rol */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          {(["escultor", "coleccionista"] as Role[]).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="px-5 py-5 text-left transition-colors"
              style={{
                border: role === r ? "1px solid hsl(var(--black-pure))" : "1px solid hsl(var(--border))",
                background: role === r ? "hsl(var(--black-pure))" : "transparent",
                color: role === r ? "#fff" : "hsl(var(--black-pure))",
              }}
            >
              <div className="font-body text-[11px] uppercase tracking-[0.18em] opacity-70 mb-2">Soy</div>
              <div className="font-display font-bold text-[18px] capitalize">{r}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <Field label={role === "escultor" ? "Nombre artístico" : "Nombre completo"} placeholder={role === "escultor" ? "Ej. Helena Vázquez" : "Ej. María García"} />
          )}
          <Field label="Email" type="email" placeholder="tu@email.com" />
          <Field label="Contraseña" type="password" placeholder="••••••••" />

          {mode === "signup" && role === "escultor" && (
            <>
              <Field label="Disciplina principal" placeholder="Bronce, mármol, acero..." />
              <Field label="Ciudad / taller" placeholder="Toledo, España" />
              <FieldArea label="Bio breve" placeholder="Cuéntanos sobre tu obra (máx. 280 caracteres)" />
            </>
          )}

          {mode === "signup" && role === "coleccionista" && (
            <>
              <Field label="Intereses" placeholder="Figurativo, abstracto, gran formato..." />
              <Field label="Rango de presupuesto" placeholder="2.000 € – 20.000 €" />
            </>
          )}

          <button type="submit" className="btn-primary w-full justify-center !py-3.5">
            {mode === "login" ? "Entrar" : "Crear cuenta"} ↗
          </button>
        </form>

        <div className="mt-8 text-center font-body text-[14px] font-light text-gray">
          {mode === "login" ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="link-arrow !text-[13px]"
          >
            {mode === "login" ? "Crear cuenta" : "Entrar"}
          </button>
        </div>
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
