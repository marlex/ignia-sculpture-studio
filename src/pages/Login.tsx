import { useState, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/auth/AuthContext";

type Role = "escultor" | "coleccionista";

export default function Login() {
  const [role, setRole] = useState<Role>("escultor");
  const navigate = useNavigate();
  const lang = useLang();
  const { login } = useAuth();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "";
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailSignupRef = useRef<HTMLInputElement>(null);

  const t = lang === "es" ? {
    enter: "Entrar", access: "Accede con invitación",
    email: "Email", emailPh: "tu@email.com",
    pass: "Contraseña", passPh: "••••••••",
    btnIn: "Entrar ↗",
    or: "o crea una cuenta",
    register: "Registro", join: "Únete a Ignia",
    iam: (r: Role) => `Soy ${r === "escultor" ? "escultor" : "coleccionista"}`,
    fSculptor: { name: "Nombre artístico", namePh: "Ej. Helena Vázquez", disc: "Disciplina principal", discPh: "Bronce, mármol, acero, piedra...", city: "Ciudad / taller", cityPh: "Toledo, España", bio: "Bio breve", bioPh: "Cuéntanos sobre tu obra escultórica (máx. 280 caracteres)" },
    fCollector: { name: "Nombre completo", namePh: "Ej. María García", interests: "Intereses escultóricos", interestsPh: "Figurativo, abstracto, gran formato...", budget: "Rango de presupuesto", budgetPh: "2.000 € – 20.000 €" },
    btnReg: "Crear cuenta ↗",
    exit: "Salir",
  } : {
    enter: "Sign in", access: "Access Ignia",
    email: "Email", emailPh: "you@email.com",
    pass: "Password", passPh: "••••••••",
    btnIn: "Sign in ↗",
    or: "or create an account",
    register: "Sign up", join: "Join Ignia",
    iam: (r: Role) => `I'm a ${r === "escultor" ? "sculptor" : "collector"}`,
    fSculptor: { name: "Artist name", namePh: "e.g. Helena Vázquez", disc: "Main discipline", discPh: "Bronze, marble, steel, stone...", city: "City / studio", cityPh: "Toledo, Spain", bio: "Short bio", bioPh: "Tell us about your sculptural work (max. 280 characters)" },
    fCollector: { name: "Full name", namePh: "e.g. María García", interests: "Sculptural interests", interestsPh: "Figurative, abstract, large format...", budget: "Budget range", budgetPh: "€2,000 – €20,000" },
    btnReg: "Create account ↗",
    exit: "Exit",
  };

  const goToProfile = (e: React.FormEvent, r: Role, signup = false) => {
    e.preventDefault();
    const email = (signup ? emailSignupRef.current?.value : emailRef.current?.value) || "user@ignia.gallery";
    const name = nameRef.current?.value || (r === "escultor" ? "Artista" : "Coleccionista");
    login({ email, name, role: r });
    if (redirect) navigate(redirect);
    else navigate(r === "escultor" ? "/dashboard" : "/perfil/coleccionista");
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="h-14 border-b border-border flex items-center px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
      </header>

      <section className="max-w-[560px] mx-auto px-6 py-16 md:py-20">
        <div className="eyebrow mb-3">{t.enter}</div>
        <h1 className="font-display font-bold text-[clamp(28px,3.4vw,40px)] tracking-[-0.02em] text-ink mb-8 leading-tight">{t.access}</h1>

        <form onSubmit={(e) => goToProfile(e, role)} className="space-y-5">
          <Field label={t.email} type="email" placeholder={t.emailPh} inputRef={emailRef} />
          <Field label={t.pass} type="password" placeholder={t.passPh} />
          <button type="submit" className="btn-primary w-full justify-center !py-3.5">{t.btnIn}</button>
        </form>

      </section>
    </main>
  );
}

const Field = ({ label, type = "text", placeholder, inputRef }: { label: string; type?: string; placeholder?: string; inputRef?: React.RefObject<HTMLInputElement> }) => (
  <label className="block">
    <span className="block font-body text-[14px] font-medium uppercase tracking-[0.18em] text-muted-line mb-2">{label}</span>
    <input ref={inputRef} type={type} placeholder={placeholder} className="w-full bg-transparent border-0 border-b border-border focus:border-ink outline-none py-2.5 font-body text-[16px] text-ink placeholder:text-muted-line/60" />
  </label>
);

const FieldArea = ({ label, placeholder }: { label: string; placeholder?: string }) => (
  <label className="block">
    <span className="block font-body text-[14px] font-medium uppercase tracking-[0.18em] text-muted-line mb-2">{label}</span>
    <textarea rows={3} placeholder={placeholder} className="w-full bg-transparent border border-border focus:border-ink outline-none p-3 font-body text-[16px] text-ink placeholder:text-muted-line/60 resize-none" />
  </label>
);
