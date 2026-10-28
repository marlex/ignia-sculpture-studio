import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AppBrand } from "@/components/ignia/AppBrand";
import { AppSidebar } from "@/components/ignia/AppSidebar";
import { AppAccountMenu } from "@/components/ignia/AppAccountMenu";
import { useSetLang, type Lang } from "@/i18n/LanguageContext";

const NAV = ["Resumen", "Mis obras", "Analíticas", "Configuración"];

type Artwork = {
  id: string;
  title: string;
  medium: string | null;
  price: number | null;
  status: "pendiente" | "aprobada" | "rechazada";
};

const STATUS_LABEL: Record<Artwork["status"], string> = {
  pendiente: "En revisión",
  aprobada: "Activa",
  rechazada: "Rechazada",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile, loading: authLoading, signOut, refreshProfile } = useAuth();
  const setLang = useSetLang();
  const [active, setActive] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loadingArtworks, setLoadingArtworks] = useState(true);
  const [savingLang, setSavingLang] = useState(false);

  const updateLang = async (l: Lang) => {
    if (!user || savingLang) return;
    setSavingLang(true);
    setLang(l);
    await supabase.from("profiles").update({ lang: l }).eq("id", user.id);
    await refreshProfile();
    setSavingLang(false);
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/login?redirect=/dashboard"); return; }
    if (profile?.role !== "artist") { navigate("/"); return; }
  }, [authLoading, user, profile, navigate]);

  useEffect(() => {
    if (!user || profile?.role !== "artist") return;
    supabase
      .from("artworks")
      .select("id, title, medium, price, status")
      .eq("artist_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setArtworks(data ?? []);
        setLoadingArtworks(false);
      });
  }, [user, profile]);

  if (authLoading || !user || profile?.role !== "artist") return null;

  const profileIncomplete = !profile.origin || !profile.technique || !profile.bio;
  const activeCount = artworks.filter((a) => a.status === "aprobada").length;
  const pendingCount = artworks.filter((a) => a.status === "pendiente").length;

  const METRICS = [
    { v: String(activeCount), l: "obras activas" },
    { v: String(pendingCount), l: "en revisión" },
    { v: String(artworks.length), l: "obras totales" },
  ];

  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <AppBrand to="/dashboard" label="My Studio" />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, textDecoration: "underline" }}
          >
            Ver sitio público ↗
          </a>
          <AppAccountMenu
            name={profile.name || user.email || ""}
            subtitle={profile.founding_artist ? "Artista Fundador" : "Artista"}
            items={[
              { key: "config", label: "Configuración", onClick: () => setActive(3) },
              { key: "signout", label: "Cerrar sesión", onClick: async () => { await signOut(); navigate("/"); } },
            ]}
          />
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 65px)" }}>
        <AppSidebar
          items={NAV.map((n, i) => ({ key: n, label: n, active: active === i, onClick: () => setActive(i) }))}
        />

        <section style={{ padding: "56px 56px 80px" }}>
          {active === 0 && (
            <>
              <h1 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 32 }}>
                Hola{profile.name ? `, ${profile.name}` : ""}.
              </h1>

              {profileIncomplete && (
                <div style={{ border: "1px solid #121212", padding: "20px 24px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                  <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#121212", margin: 0 }}>
                    Completa tu perfil de artista (origen, técnica, biografía) antes de publicar tu primera obra.
                  </p>
                  <Link to="/perfil-artista" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#121212", whiteSpace: "nowrap" }}>
                    Completar →
                  </Link>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                {METRICS.map((m) => (
                  <div key={m.l} style={{ border: "1px solid #E5E5E5", padding: 28, borderRadius: 0 }}>
                    <div style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, letterSpacing: "-0.04em", color: "#121212", fontSize: 40, lineHeight: 1 }}>{m.v}</div>
                    <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, marginTop: 12 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              {!profileIncomplete && (
                <div style={{ border: "1px solid #E5E5E5", padding: "24px 28px", marginBottom: 40 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                    <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, letterSpacing: "-0.04em", color: "#121212", fontSize: 20, margin: 0 }}>
                      Mi perfil
                    </h2>
                    <Link to="/perfil-artista" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, color: "#666666" }}>
                      Editar →
                    </Link>
                  </div>
                  <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: "0 0 6px" }}>
                    <strong>Origen:</strong> {profile.origin}
                  </p>
                  <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: "0 0 6px" }}>
                    <strong>Técnica:</strong> {profile.technique}
                  </p>
                  <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: "0 0 6px" }}>
                    <strong>Bio:</strong> {profile.bio}
                  </p>
                  {(profile.instagram || profile.website || profile.portfolio_url) && (
                    <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#666666", margin: 0 }}>
                      {[profile.instagram, profile.website, profile.portfolio_url].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              )}

              <div>
                <Link
                  to={profileIncomplete ? "/perfil-artista" : "/publicar"}
                  style={{
                    display: "inline-block",
                    padding: "14px 28px",
                    background: "#121212",
                    color: "#FFFFFF",
                    fontFamily: "Hanken Grotesk, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Publicar una obra
                </Link>
              </div>
            </>
          )}

          {active === 1 && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 40 }}>
                <h1 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.04em", margin: 0 }}>
                  Mis obras
                </h1>
                <Link
                  to={profileIncomplete ? "/perfil-artista" : "/publicar"}
                  style={{
                    display: "inline-block",
                    padding: "14px 28px",
                    background: "#121212",
                    color: "#FFFFFF",
                    fontFamily: "Hanken Grotesk, sans-serif",
                    fontWeight: 500,
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Publicar una obra
                </Link>
              </div>

              {loadingArtworks ? (
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", color: "#666666" }}>Cargando…</p>
              ) : artworks.length === 0 ? (
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", color: "#666666" }}>Aún no has publicado ninguna obra.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Título", "Material", "Precio", "Estado"].map((h) => (
                        <th key={h} style={{ textAlign: "left", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666", padding: "16px 8px", borderBottom: "1px solid #E5E5E5" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {artworks.map((o) => (
                      <tr key={o.id}>
                        {[o.title, o.medium || "—", o.price ? `€${o.price.toLocaleString("es-ES")}` : "—", STATUS_LABEL[o.status]].map((c, i) => (
                          <td key={i} style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, fontSize: 15, color: "#121212", padding: "20px 8px", borderBottom: "1px solid #E5E5E5" }}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {active === 2 && (
            <>
              <h1 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 32 }}>
                Analíticas
              </h1>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
                {METRICS.map((m) => (
                  <div key={m.l} style={{ border: "1px solid #E5E5E5", padding: 28, borderRadius: 0 }}>
                    <div style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, letterSpacing: "-0.04em", color: "#121212", fontSize: 40, lineHeight: 1 }}>{m.v}</div>
                    <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, marginTop: 12 }}>{m.l}</div>
                  </div>
                ))}
              </div>

              <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#666666" }}>
                Las analíticas detalladas por obra (vistas, interés) estarán disponibles próximamente.
              </p>
            </>
          )}

          {active === 3 && (
            <>
              <h1 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 32 }}>
                Configuración
              </h1>

              <div style={{ border: "1px solid #E5E5E5", padding: "24px 28px", marginBottom: 24, maxWidth: 520 }}>
                <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, letterSpacing: "-0.04em", color: "#121212", fontSize: 20, margin: "0 0 16px" }}>
                  Cuenta
                </h2>
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: "0 0 6px" }}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: 0 }}>
                  <strong>Tipo de cuenta:</strong> {profile.founding_artist ? "Artista Fundador" : "Artista"}
                </p>
              </div>

              <div style={{ border: "1px solid #E5E5E5", padding: "24px 28px", marginBottom: 24, maxWidth: 520 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                  <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, letterSpacing: "-0.04em", color: "#121212", fontSize: 20, margin: 0 }}>
                    Perfil público
                  </h2>
                  <Link to="/perfil-artista" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, color: "#666666" }}>
                    Editar →
                  </Link>
                </div>
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: "0 0 6px" }}>
                  <strong>Origen:</strong> {profile.origin || "—"}
                </p>
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: "0 0 6px" }}>
                  <strong>Técnica:</strong> {profile.technique || "—"}
                </p>
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", margin: 0 }}>
                  <strong>Bio:</strong> {profile.bio || "—"}
                </p>
              </div>

              <div style={{ border: "1px solid #E5E5E5", padding: "24px 28px", marginBottom: 24, maxWidth: 520 }}>
                <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, letterSpacing: "-0.04em", color: "#121212", fontSize: 20, margin: "0 0 16px" }}>
                  Idioma de comunicación
                </h2>
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#666666", margin: "0 0 16px" }}>
                  El idioma en el que te escribimos (emails, notificaciones). Se guarda en tu cuenta.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {([
                    { code: "es" as const, label: "Español" },
                    { code: "en" as const, label: "English" },
                  ]).map((l) => (
                    <button
                      key={l.code}
                      onClick={() => updateLang(l.code)}
                      disabled={savingLang}
                      style={{
                        padding: "10px 18px",
                        fontFamily: "Hanken Grotesk, sans-serif", fontSize: 13, fontWeight: 500,
                        letterSpacing: "0.04em",
                        background: profile.lang === l.code ? "#121212" : "#fff",
                        color: profile.lang === l.code ? "#fff" : "#121212",
                        border: "1px solid #121212",
                        cursor: savingLang ? "default" : "pointer",
                        opacity: savingLang ? 0.6 : 1,
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <Link to="/recuperar-password" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, color: "#121212", textDecoration: "underline" }}>
                Cambiar contraseña
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
