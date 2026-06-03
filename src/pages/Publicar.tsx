import { useState } from "react";
import { Link } from "react-router-dom";

const fieldLabel: React.CSSProperties = {
  display: "block", fontFamily: "Manrope, sans-serif", fontWeight: 700,
  textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 11,
  color: "#111111", marginBottom: 12,
};
const fieldInput: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1px solid #111111", outline: "none",
  fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#111111",
  fontSize: 16, padding: "0 0 8px", borderRadius: 0,
};
const fieldWrap: React.CSSProperties = { marginBottom: 28 };

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={fieldWrap}>
    <label style={fieldLabel}>{label}</label>
    {children}
  </div>
);

export default function Publicar() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const endpoint = (import.meta as any).env?.VITE_FORMSPREE_WORK_ENDPOINT as string | undefined;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (endpoint) {
        const fd = new FormData(e.currentTarget);
        await fetch(endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" } });
      }
    } catch {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px" }}>
        <Link to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: 20, letterSpacing: "0.12em", textDecoration: "none" }}>
          IGNIA
        </Link>
      </header>
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Publicar una obra
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#666666", fontSize: 17, lineHeight: 1.5, marginBottom: 56 }}>
          Completa todos los campos. Activamos tu obra en el visor 3D en un máximo de 48 horas.
        </p>

        {submitted ? (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "#111111", fontSize: 28, marginBottom: 16 }}>
              Obra recibida.
            </h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500, color: "#666666", fontSize: 16, lineHeight: 1.6 }}>
              La activamos en el visor 3D en un máximo de 48 horas.
            </p>
          </div>
        ) : (
        <form onSubmit={onSubmit}>
          <Field label="Nombre del artista"><input name="artista" style={fieldInput} /></Field>
          <Field label="Email"><input type="email" name="email" style={fieldInput} /></Field>
          <Field label="Título de la obra"><input name="titulo" style={fieldInput} /></Field>
          <Field label="Año"><input name="anio" style={fieldInput} /></Field>
          <Field label="Materiales"><input name="materiales" style={fieldInput} /></Field>
          <Field label="Técnica"><input name="tecnica" style={fieldInput} /></Field>
          <div style={fieldWrap}>
            <label style={fieldLabel}>Dimensiones (cm)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              <input name="alto" placeholder="Alto" style={fieldInput} />
              <input name="ancho" placeholder="Ancho" style={fieldInput} />
              <input name="profundo" placeholder="Profundo" style={fieldInput} />
            </div>
          </div>
          <Field label="Peso (kg)"><input name="peso" style={fieldInput} /></Field>
          <Field label="Precio (€)"><input name="precio" style={fieldInput} /></Field>
          <Field label="Edición">
            <select name="edicion" style={fieldInput}>
              <option>Pieza única</option>
              <option>Edición limitada</option>
              <option>Edición abierta</option>
            </select>
          </Field>
          <Field label="Descripción"><textarea name="descripcion" rows={4} style={{ ...fieldInput, resize: "vertical" }} /></Field>
          <Field label="Statement del artista (opcional)"><textarea name="statement" rows={4} style={{ ...fieldInput, resize: "vertical" }} /></Field>
          <Field label="Foto principal (jpg/png)"><input type="file" name="foto1" accept="image/jpeg,image/png" required style={fieldInput} /></Field>
          <Field label="Foto 2 (opcional)"><input type="file" name="foto2" accept="image/jpeg,image/png" style={fieldInput} /></Field>
          <Field label="Foto 3 (opcional)"><input type="file" name="foto3" accept="image/jpeg,image/png" style={fieldInput} /></Field>
          <Field label="Foto 4 (opcional)"><input type="file" name="foto4" accept="image/jpeg,image/png" style={fieldInput} /></Field>

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: "#111111", color: "#FFFFFF", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 13, padding: 18, border: "none", borderRadius: 0, cursor: "pointer", marginTop: 24, transition: "background-color 250ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
          >
            {loading ? "Enviando…" : "Enviar obra"}
          </button>
        </form>
        )}
      </section>
    </main>
  );
}
