import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const fieldLabel: React.CSSProperties = {
  display: "block", fontFamily: "Manrope, sans-serif", fontWeight: 400,
  textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 14,
  color: "#121212", marginBottom: 12,
};
const fieldInput: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1px solid #121212", outline: "none",
  fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#121212",
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
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth();
  const [title, setTitle] = useState("");
  const [yearVal, setYearVal] = useState("");
  const [medium, setMedium] = useState("");
  const [alto, setAlto] = useState("");
  const [ancho, setAncho] = useState("");
  const [profundo, setProfundo] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/login?redirect=/publicar"); return; }
    if (profile?.role !== "artist") { navigate("/dashboard"); return; }
    if (!profile.origin || !profile.technique || !profile.bio) {
      navigate("/perfil-artista");
    }
  }, [authLoading, user, profile, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setError(null);
    setLoading(true);
    try {
      let imageUrl: string | null = null;
      if (photo) {
        const path = `${user.id}/${crypto.randomUUID()}-${photo.name}`;
        const { error: uploadErr } = await supabase.storage.from("artwork-images").upload(path, photo);
        if (uploadErr) throw uploadErr;
        imageUrl = supabase.storage.from("artwork-images").getPublicUrl(path).data.publicUrl;
      }

      const dimensions = [alto, ancho, profundo].filter(Boolean).length
        ? `${alto || "?"} x ${ancho || "?"} x ${profundo || "?"} cm`
        : null;

      const { error: insertErr } = await supabase.from("artworks").insert({
        artist_id: user.id,
        title,
        description: description || null,
        image_url: imageUrl,
        price: price ? Number(price) : null,
        year: yearVal ? Number(yearVal) : null,
        medium: medium || null,
        dimensions,
      });
      if (insertErr) throw insertErr;
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "There was an error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user || profile?.role !== "artist" || !profile.origin || !profile.technique || !profile.bio) {
    return null;
  }

  return (
    <main style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px" }}>
        <Link to="/" style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400, color: "#121212", fontSize: 20, letterSpacing: "0.12em", textDecoration: "none", textTransform: "uppercase" }}>
          IGNIA
        </Link>
      </header>
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "#121212", fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Publicar una obra
        </h1>
        <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 17, lineHeight: 1.5, marginBottom: 56 }}>
          Completa los campos. Tu obra queda en revisión hasta que la aprobemos.
        </p>

        {submitted ? (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "#121212", fontSize: 28, marginBottom: 16 }}>
              Obra recibida.
            </h2>
            <p style={{ fontFamily: "Manrope, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
              Queda en revisión. Puedes ver su estado en tu panel.
            </p>
            <Link to="/dashboard" style={{ color: "#121212", textDecoration: "underline", fontFamily: "Manrope, sans-serif" }}>
              Ir a mi panel
            </Link>
          </div>
        ) : (
        <form onSubmit={onSubmit}>
          <Field label="Título de la obra"><input required value={title} onChange={(e) => setTitle(e.target.value)} style={fieldInput} /></Field>
          <Field label="Año"><input value={yearVal} onChange={(e) => setYearVal(e.target.value)} style={fieldInput} /></Field>
          <Field label="Materiales / técnica"><input value={medium} onChange={(e) => setMedium(e.target.value)} style={fieldInput} /></Field>
          <div style={fieldWrap}>
            <label style={fieldLabel}>Dimensiones (cm)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
              <input placeholder="Alto" value={alto} onChange={(e) => setAlto(e.target.value)} style={fieldInput} />
              <input placeholder="Ancho" value={ancho} onChange={(e) => setAncho(e.target.value)} style={fieldInput} />
              <input placeholder="Profundo" value={profundo} onChange={(e) => setProfundo(e.target.value)} style={fieldInput} />
            </div>
          </div>
          <Field label="Precio (€)"><input value={price} onChange={(e) => setPrice(e.target.value)} style={fieldInput} /></Field>
          <Field label="Descripción"><textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...fieldInput, resize: "vertical" }} /></Field>
          <Field label="Foto principal (jpg/png)">
            <input type="file" accept="image/jpeg,image/png" onChange={(e) => setPhoto(e.target.files?.[0] ?? null)} style={fieldInput} />
          </Field>

          {error && <p style={{ color: "#b00020", fontFamily: "Manrope, sans-serif", fontSize: 14, marginBottom: 16 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: "transparent", color: "#121212", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 13, padding: 18, border: "1px solid #121212", borderRadius: 0, cursor: loading ? "default" : "pointer", marginTop: 24, transition: "opacity 250ms", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Enviando…" : "Enviar obra"}
          </button>
        </form>
        )}
      </section>
    </main>
  );
}
