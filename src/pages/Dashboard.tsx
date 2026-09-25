import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [active, setActive] = useState(0);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loadingArtworks, setLoadingArtworks] = useState(true);

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
        <Link to="/" style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400, color: "#121212", fontSize: 20, letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase" }}>
          IGNIA
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14 }}>
            {user.email} · {profile.founding_artist ? "Artista Fundador" : "Artista"}
          </span>
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            style={{ background: "none", border: "none", color: "#121212", fontFamily: "Manrope, sans-serif", fontSize: 14, textDecoration: "underline", cursor: "pointer" }}
          >
            Salir
          </button>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 65px)" }}>
        <aside style={{ borderRight: "1px solid #E5E5E5", padding: "40px 0" }}>
          {NAV.map((n, i) => (
            <button
              key={n}
              onClick={() => setActive(i)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "14px 32px",
                fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 15,
                color: "#121212", background: "transparent",
                border: "none", borderLeft: active === i ? "2px solid #121212" : "2px solid transparent",
                cursor: "pointer", borderRadius: 0,
              }}
            >
              {n}
            </button>
          ))}
        </aside>

        <section style={{ padding: "56px 56px 80px" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "#121212", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 32 }}>
            Bienvenida.
          </h1>

          {profileIncomplete && (
            <div style={{ border: "1px solid #121212", padding: "20px 24px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24 }}>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 15, color: "#121212", margin: 0 }}>
                Completa tu perfil de artista (origen, técnica, biografía) antes de publicar tu primera obra.
              </p>
              <Link to="/perfil-artista" style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.1em", color: "#121212", whiteSpace: "nowrap" }}>
                Completar →
              </Link>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
            {METRICS.map((m) => (
              <div key={m.l} style={{ border: "1px solid #E5E5E5", padding: 28, borderRadius: 0 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 40, lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, marginTop: 12 }}>{m.l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 40 }}>
            <Link
              to={profileIncomplete ? "/perfil-artista" : "/publicar"}
              style={{
                display: "inline-block",
                padding: "14px 28px",
                background: "#121212",
                color: "#FFFFFF",
                fontFamily: "Manrope, sans-serif",
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

          <div style={{ marginBottom: 64 }}>
            {loadingArtworks ? (
              <p style={{ fontFamily: "Manrope, sans-serif", color: "#666666" }}>Cargando…</p>
            ) : artworks.length === 0 ? (
              <p style={{ fontFamily: "Manrope, sans-serif", color: "#666666" }}>Aún no has publicado ninguna obra.</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Título", "Material", "Precio", "Estado"].map((h) => (
                      <th key={h} style={{ textAlign: "left", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666", padding: "16px 8px", borderBottom: "1px solid #E5E5E5" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {artworks.map((o) => (
                    <tr key={o.id}>
                      {[o.title, o.medium || "—", o.price ? `€${o.price.toLocaleString("es-ES")}` : "—", STATUS_LABEL[o.status]].map((c, i) => (
                        <td key={i} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 15, color: "#121212", padding: "20px 8px", borderBottom: "1px solid #E5E5E5" }}>{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
