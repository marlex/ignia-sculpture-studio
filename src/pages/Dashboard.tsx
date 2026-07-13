import { useState } from "react";
import { Link } from "react-router-dom";

const NAV = ["Resumen", "Mis obras", "Analíticas", "Configuración"];

const METRICS = [
  { v: "3", l: "obras activas" },
  { v: "847", l: "visitas únicas" },
  { v: "12", l: "interacciones 3D esta semana" },
  { v: "€0", l: "0 ventas" },
];

const OBRAS = [
  { titulo: "Celosía menor", material: "Bronce y agua", precio: "€18.400", visitas: 312, estado: "Activa" },
  { titulo: "Silencio en blanco", material: "Mármol de Carrara", precio: "€9.200", visitas: 287, estado: "Activa" },
  { titulo: "Estructura abierta", material: "Acero corten", precio: "€14.700", visitas: 248, estado: "En revisión" },
];

const ACT = [
  { f: "Hoy · 11:42", d: "Una coleccionista de Madrid examinó 'Celosía menor' en 3D durante 4 minutos." },
  { f: "Ayer · 18:09", d: "Tu obra 'Silencio en blanco' fue añadida a favoritos por un usuario verificado." },
  { f: "Hace 3 días", d: "Subiste 'Estructura abierta'. Está en revisión para activación 3D." },
];

export default function Dashboard() {
  const [active, setActive] = useState(0);
  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400, color: "#121212", fontSize: 20, letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase" }}>
          IGNIA
        </Link>
        <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14 }}>
          Helena Vásquez · Artista Fundadora
        </span>
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
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 48 }}>
            Bienvenida, Helena.
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 56 }}>
            {METRICS.map((m) => (
              <div key={m.l} style={{ border: "1px solid #E5E5E5", padding: 28, borderRadius: 0 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 40, lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, marginTop: 12 }}>{m.l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 64 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Título", "Material", "Precio", "Visitas", "Estado"].map((h) => (
                    <th key={h} style={{ textAlign: "left", fontFamily: "Manrope, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#666666", padding: "16px 8px", borderBottom: "1px solid #E5E5E5" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {OBRAS.map((o) => (
                  <tr key={o.titulo}>
                    {[o.titulo, o.material, o.precio, o.visitas, o.estado].map((c, i) => (
                      <td key={i} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, fontSize: 15, color: "#121212", padding: "20px 8px", borderBottom: "1px solid #E5E5E5" }}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, color: "#121212", fontSize: 22, marginBottom: 24 }}>
              Actividad reciente
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {ACT.map((a, i) => (
                <li key={i} style={{ padding: "20px 0", borderBottom: i < ACT.length - 1 ? "1px solid #E5E5E5" : "none" }}>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 14, marginBottom: 4 }}>{a.f}</div>
                  <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#121212", fontSize: 15, lineHeight: 1.5 }}>{a.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
