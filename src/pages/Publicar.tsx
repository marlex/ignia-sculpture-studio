import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AppBrand } from "@/components/ignia/AppBrand";

const fieldLabel: React.CSSProperties = {
  display: "block", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400,
  textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 14,
  color: "#121212", marginBottom: 12,
};
const fieldInput: React.CSSProperties = {
  width: "100%", background: "transparent", border: "none",
  borderBottom: "1px solid #121212", outline: "none",
  fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#121212",
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
  const [video, setVideo] = useState<File | null>(null);
  const [processStory, setProcessStory] = useState("");
  const [processPhotos, setProcessPhotos] = useState<File[]>([]);
  const [tab, setTab] = useState<"detalles" | "3d" | "proceso">("detalles");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = !submitted && !!(title || yearVal || medium || alto || ancho || profundo || price || description || photo || video || processStory || processPhotos.length);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/login?redirect=/publicar"); return; }
    if (profile?.role !== "artist") { navigate("/dashboard"); return; }
    if (!profile.origin || !profile.technique || !profile.bio) {
      navigate("/perfil-artista");
    }
  }, [authLoading, user, profile, navigate]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (dirty && !window.confirm("Tienes cambios sin guardar en esta obra. ¿Seguro que quieres salir?")) return;
    navigate("/dashboard");
  };

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

      let videoUrl: string | null = null;
      if (video) {
        const path = `${user.id}/${crypto.randomUUID()}-${video.name}`;
        const { error: uploadErr } = await supabase.storage.from("artwork-media").upload(path, video);
        if (uploadErr) throw uploadErr;
        videoUrl = supabase.storage.from("artwork-media").getPublicUrl(path).data.publicUrl;
      }

      const dimensions = [alto, ancho, profundo].filter(Boolean).length
        ? `${alto || "?"} x ${ancho || "?"} x ${profundo || "?"} cm`
        : null;

      const processPhotoUrls: string[] = [];
      for (const file of processPhotos) {
        const path = `${user.id}/${crypto.randomUUID()}-${file.name}`;
        const { error: uploadErr } = await supabase.storage.from("artwork-images").upload(path, file);
        if (uploadErr) throw uploadErr;
        processPhotoUrls.push(supabase.storage.from("artwork-images").getPublicUrl(path).data.publicUrl);
      }

      const { error: insertErr } = await supabase.from("artworks").insert({
        artist_id: user.id,
        title,
        description: description || null,
        image_url: imageUrl,
        price: price ? Number(price) : null,
        year: yearVal ? Number(yearVal) : null,
        medium: medium || null,
        dimensions,
        video_url: videoUrl,
        model_status: videoUrl ? "processing" : "none",
        process_story: processStory || null,
        process_photo_urls: processPhotoUrls,
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
      <header style={{ borderBottom: "1px solid #E5E5E5", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <AppBrand to="/dashboard" label="My Studio" onClick={handleBrandClick} />
        <button
          type="button"
          onClick={handleBrandClick}
          aria-label="Cerrar"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#121212", fontSize: 24, lineHeight: 1, padding: 4 }}
        >
          ✕
        </button>
      </header>
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 120px" }}>
        <h1 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Publicar una obra
        </h1>
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 17, lineHeight: 1.5, marginBottom: 56 }}>
          Completa los campos. Tu obra queda en revisión hasta que la aprobemos.
        </p>

        {submitted ? (
          <div>
            <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212", fontSize: 28, marginBottom: 16 }}>
              Obra recibida.
            </h2>
            <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#666666", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
              Queda en revisión. Puedes ver su estado en tu panel.
            </p>
            <Link to="/dashboard" style={{ color: "#121212", textDecoration: "underline", fontFamily: "Hanken Grotesk, sans-serif" }}>
              Ir a mi panel
            </Link>
          </div>
        ) : (
        <form onSubmit={onSubmit}>
          <div style={{ display: "flex", gap: 32, borderBottom: "1px solid #E5E5E5", marginBottom: 40 }}>
            {([
              { key: "detalles", label: "Detalles" },
              { key: "3d", label: "3D / AR" },
              { key: "proceso", label: "Proceso" },
            ] as const).map((t) => (
              <button
                type="button"
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400,
                  textTransform: "uppercase", letterSpacing: "0.1em", fontSize: 13,
                  color: tab === t.key ? "#121212" : "#999",
                  padding: "0 0 14px", borderBottom: tab === t.key ? "2px solid #121212" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: tab === "detalles" ? "block" : "none" }}>
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
          </div>

          <div style={{ display: tab === "3d" ? "block" : "none" }}>
            <div style={fieldWrap}>
              <label style={fieldLabel}>
                Video para 3D / AR{" "}
                <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, color: "#999" }}>
                  (opcional)
                </span>
              </label>
              <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={(e) => setVideo(e.target.files?.[0] ?? null)} style={fieldInput} />
              <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#999", fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>
                Graba una vuelta completa de 360° alrededor de la pieza, con movimiento lento y constante, buena luz y sin cambios bruscos de cámara. Con eso preparamos el modelo 3D y la vista en AR — puede tardar unos días en estar listo.
              </p>
              <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#999", fontSize: 13, lineHeight: 1.6, marginTop: 10 }}>
                Si ya tienes experiencia con apps de escaneo 3D como Polycam o Luma AI, puedes usar ese mismo vídeo ahí para generar tú mismo el archivo 3D; igualmente sube el vídeo aquí para que lo integremos.
              </p>
            </div>
          </div>

          <div style={{ display: tab === "proceso" ? "block" : "none" }}>
            <Field label="El proceso de esta obra (opcional)">
              <textarea
                rows={5}
                placeholder="Cuenta cómo surgió esta pieza, las técnicas o materiales que usaste, los retos del proceso..."
                value={processStory}
                onChange={(e) => setProcessStory(e.target.value)}
                style={{ ...fieldInput, resize: "vertical" }}
              />
            </Field>
            <div style={fieldWrap}>
              <label style={fieldLabel}>
                Fotos del proceso{" "}
                <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400, color: "#999" }}>
                  (opcional, varias)
                </span>
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={(e) => setProcessPhotos(Array.from(e.target.files ?? []))}
                style={fieldInput}
              />
              {processPhotos.length > 0 && (
                <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 400, color: "#999", fontSize: 13, marginTop: 10 }}>
                  {processPhotos.length} foto{processPhotos.length > 1 ? "s" : ""} seleccionada{processPhotos.length > 1 ? "s" : ""}.
                </p>
              )}
            </div>
          </div>

          {error && <p style={{ color: "#b00020", fontFamily: "Hanken Grotesk, sans-serif", fontSize: 14, marginBottom: 16 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", background: "#121212", color: "#FFFFFF", fontFamily: "Hanken Grotesk, sans-serif", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", fontSize: 13, padding: 18, border: "1px solid #121212", borderRadius: 0, cursor: loading ? "default" : "pointer", marginTop: 24, transition: "opacity 250ms", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Enviando…" : "Enviar obra"}
          </button>
        </form>
        )}
      </section>
    </main>
  );
}
