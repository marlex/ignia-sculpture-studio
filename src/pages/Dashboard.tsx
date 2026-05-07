import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Logo } from "@/components/ignia/Logo";
import { useAuth } from "@/auth/AuthContext";
import { useLang } from "@/i18n/LanguageContext";
import { listObras, Obra, ObraEstado } from "@/data/obrasStore";
import { LayoutGrid, Plus, BarChart3, ShoppingBag, User, ShieldCheck, LogOut, Eye, Heart, Image as ImgIcon } from "lucide-react";

type Section = "inicio" | "obras" | "publicar" | "stats" | "ventas" | "perfil" | "certificados";

const NAV_ES: { key: Section; label: string; icon: any }[] = [
  { key: "inicio", label: "Inicio", icon: LayoutGrid },
  { key: "obras", label: "Mis obras", icon: ImgIcon },
  { key: "publicar", label: "Publicar escultura", icon: Plus },
  { key: "stats", label: "Estadísticas", icon: BarChart3 },
  { key: "ventas", label: "Mis ventas", icon: ShoppingBag },
  { key: "perfil", label: "Mi perfil", icon: User },
  { key: "certificados", label: "Certificados", icon: ShieldCheck },
];
const NAV_EN: typeof NAV_ES = [
  { key: "inicio", label: "Home", icon: LayoutGrid },
  { key: "obras", label: "My works", icon: ImgIcon },
  { key: "publicar", label: "Publish sculpture", icon: Plus },
  { key: "stats", label: "Statistics", icon: BarChart3 },
  { key: "ventas", label: "Sales", icon: ShoppingBag },
  { key: "perfil", label: "My profile", icon: User },
  { key: "certificados", label: "Certificates", icon: ShieldCheck },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();
  const lang = useLang();
  const NAV = lang === "es" ? NAV_ES : NAV_EN;

  useEffect(() => {
    if (!user) navigate(`/login?redirect=/dashboard`);
  }, [user, navigate]);

  const [obras, setObras] = useState<Obra[]>([]);
  useEffect(() => {
    if (user) setObras(listObras(user.email));
  }, [user, section]);

  const active: Section = (section as Section) || "inicio";
  if (active === "publicar") {
    navigate("/publicar"); return null;
  }

  const t = lang === "es"
    ? { hi: "Hola", greet: "Bienvenido a tu panel de artista", publish: "Publicar nueva escultura", recent: "Obras recientes",
        published: "Obras publicadas", sold: "Vendidas", visits: "Visitas este mes", empty: "Aún no has publicado obras.",
        firstCta: "Publicar mi primera escultura", soon: "Próximamente" }
    : { hi: "Hi", greet: "Welcome to your artist dashboard", publish: "Publish new sculpture", recent: "Recent works",
        published: "Published", sold: "Sold", visits: "Visits this month", empty: "You haven't published any work yet.",
        firstCta: "Publish my first sculpture", soon: "Coming soon" };

  const stats = useMemo(() => ({
    published: obras.filter(o => o.estado === "Publicada").length,
    sold: obras.filter(o => o.estado === "Vendida").length,
    visits: obras.reduce((a, o) => a + o.visitas, 0) || 128,
  }), [obras]);

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 h-14 bg-white border-b border-border flex items-center justify-between px-6 md:px-12">
        <Link to="/" aria-label="Ignia Gallery"><Logo /></Link>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-body text-[13px] uppercase tracking-[0.14em] text-muted-line">{user?.name}</span>
          <Link to="/publicar" className="btn-primary !py-2 !px-4 text-[11px]">{lang === "es" ? "Publicar escultura" : "Publish sculpture"}</Link>
          <button onClick={() => { logout(); navigate("/"); }} className="text-gray hover:text-ink"><LogOut className="w-4 h-4" /></button>
        </div>
      </header>

      <div className="grid md:grid-cols-[240px_1fr] max-w-[1280px] mx-auto">
        <aside className="border-r border-border min-h-[calc(100vh-3.5rem)] py-8 px-4">
          <nav className="space-y-1">
            {NAV.map(({ key, label, icon: Icon }) => {
              const isActive = active === key;
              const isPublish = key === "publicar";
              return (
                <Link key={key} to={isPublish ? "/publicar" : `/dashboard/${key}`}
                  className={`flex items-center gap-3 px-3 py-2.5 font-body text-[13px] transition-colors ${
                    isActive ? "bg-ink text-white" : isPublish ? "border border-ink text-ink hover:bg-ink hover:text-white" : "text-gray hover:text-ink hover:bg-secondary"
                  }`}>
                  <Icon className="w-4 h-4" /> {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="px-6 md:px-10 py-10">
          {active === "inicio" && (
            <>
              <div className="mb-8">
                <div className="eyebrow mb-2">{t.greet}</div>
                <h1 className="font-display font-bold text-[clamp(28px,3.6vw,44px)] tracking-[-0.02em] text-ink">{t.hi}, {user?.name}</h1>
              </div>
              <Link to="/publicar" className="block w-full mb-10 border-2 border-ink p-8 hover:bg-ink hover:text-white transition-colors group">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <div className="font-body text-[12px] uppercase tracking-[0.18em] mb-2 opacity-70">{lang === "es" ? "Acción principal" : "Primary action"}</div>
                    <div className="font-display font-bold text-[clamp(20px,2.4vw,30px)]">{t.publish} →</div>
                  </div>
                  <Plus className="w-12 h-12 opacity-60 group-hover:rotate-90 transition-transform" />
                </div>
              </Link>
              <div className="grid grid-cols-3 gap-6 mb-12">
                <Stat label={t.published} value={stats.published} />
                <Stat label={t.sold} value={stats.sold} />
                <Stat label={t.visits} value={stats.visits} />
              </div>
              <h2 className="font-display font-bold text-[22px] text-ink mb-4">{t.recent}</h2>
              <ObrasList obras={obras.slice(0, 6)} lang={lang} t={t} />
            </>
          )}

          {active === "obras" && (
            <>
              <div className="flex items-end justify-between mb-8">
                <h1 className="font-display font-bold text-[clamp(24px,3vw,36px)] text-ink">{lang === "es" ? "Mis obras" : "My works"}</h1>
                <Link to="/publicar" className="btn-primary !py-2 !px-4 text-[11px]">{t.publish}</Link>
              </div>
              <ObrasList obras={obras} lang={lang} t={t} />
            </>
          )}

          {active === "stats" && <Placeholder title={lang === "es" ? "Estadísticas" : "Statistics"} t={t} />}
          {active === "ventas" && <Placeholder title={lang === "es" ? "Mis ventas" : "Sales"} t={t} />}
          {active === "perfil" && <PerfilEditor user={user!} lang={lang} />}
          {active === "certificados" && (
            <>
              <h1 className="font-display font-bold text-[clamp(24px,3vw,36px)] text-ink mb-8">{lang === "es" ? "Certificados blockchain" : "Blockchain certificates"}</h1>
              {obras.length === 0 ? <Placeholder title="" t={t} /> : (
                <div className="space-y-3">
                  {obras.map(o => (
                    <div key={o.id} className="flex items-center justify-between border border-border p-4">
                      <div>
                        <div className="font-display font-bold text-ink">{o.titulo}</div>
                        <div className="font-mono text-[11px] text-muted-line">#{o.certificadoId}</div>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-ink" />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="border-t border-border pt-5">
    <div className="font-display font-bold text-[clamp(28px,3vw,40px)] text-ink leading-none mb-2">{value}</div>
    <div className="font-body text-[11px] uppercase tracking-[0.16em] text-muted-line">{label}</div>
  </div>
);

const ObrasList = ({ obras, lang, t }: { obras: Obra[]; lang: "es" | "en"; t: any }) => {
  if (obras.length === 0) {
    return (
      <div className="border border-dashed border-border p-12 text-center">
        <p className="font-body text-[14px] text-gray mb-4">{t.empty}</p>
        <Link to="/publicar" className="btn-primary">{t.firstCta}</Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {obras.map(o => (
        <article key={o.id} className="group">
          <div className="aspect-[4/5] overflow-hidden bg-secondary mb-3">
            {o.fotoPrincipal ? (
              <img src={o.fotoPrincipal} alt={o.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            ) : <div className="w-full h-full flex items-center justify-center text-muted-line"><ImgIcon className="w-8 h-8" /></div>}
          </div>
          <h3 className="font-display font-bold text-[16px] text-ink mb-1">{o.titulo}</h3>
          <div className="flex items-center justify-between">
            <EstadoBadge estado={o.estado} lang={lang} />
            <div className="flex items-center gap-3 text-muted-line font-body text-[11px]">
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {o.visitas}</span>
              <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {o.favoritos}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

const ESTADO_LABELS: Record<ObraEstado, { es: string; en: string; cls: string }> = {
  "Publicada": { es: "Publicada", en: "Published", cls: "bg-ink text-white" },
  "En revisión": { es: "En revisión", en: "Under review", cls: "bg-secondary text-ink" },
  "Borrador": { es: "Borrador", en: "Draft", cls: "border border-border text-muted-line" },
  "Vendida": { es: "Vendida", en: "Sold", cls: "bg-accent text-ink" },
};
const EstadoBadge = ({ estado, lang }: { estado: ObraEstado; lang: "es" | "en" }) => {
  const l = ESTADO_LABELS[estado];
  return <span className={`px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.14em] ${l.cls}`}>{l[lang]}</span>;
};

const Placeholder = ({ title, t }: any) => (
  <>
    {title && <h1 className="font-display font-bold text-[clamp(24px,3vw,36px)] text-ink mb-8">{title}</h1>}
    <div className="border border-dashed border-border p-12 text-center font-body text-[14px] text-muted-line">{t.soon}</div>
  </>
);

const PerfilEditor = ({ user, lang }: { user: { name: string; email: string }; lang: "es" | "en" }) => (
  <>
    <h1 className="font-display font-bold text-[clamp(24px,3vw,36px)] text-ink mb-8">{lang === "es" ? "Mi perfil" : "My profile"}</h1>
    <div className="space-y-5 max-w-[560px]">
      <Field label={lang === "es" ? "Nombre artístico" : "Artist name"} value={user.name} />
      <Field label="Email" value={user.email} />
      <Field label={lang === "es" ? "Bio breve" : "Short bio"} value="" />
      <Field label={lang === "es" ? "Instagram" : "Instagram"} value="" />
      <button className="btn-primary">{lang === "es" ? "Guardar cambios" : "Save changes"}</button>
    </div>
  </>
);
const Field = ({ label, value }: { label: string; value: string }) => (
  <label className="block">
    <span className="block font-body text-[12px] uppercase tracking-[0.18em] text-muted-line mb-2">{label}</span>
    <input defaultValue={value} className="w-full bg-transparent border-0 border-b border-border focus:border-ink outline-none py-2.5 font-body text-[15px] text-ink" />
  </label>
);
