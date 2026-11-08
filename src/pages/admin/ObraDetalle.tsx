import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Status = "pendiente" | "aprobada" | "rechazada";

type Artwork = {
  id: string;
  artist_id: string;
  title: string;
  description: string | null;
  price: number | null;
  year: number | null;
  medium: string | null;
  dimensions: string | null;
  status: Status;
  created_at: string;
  image_url: string | null;
  video_url: string | null;
  glb_url: string | null;
  model_status: "none" | "processing" | "ready";
  process_story: string | null;
  process_photo_urls: string[] | null;
};

type Profile = { id: string; email: string; name: string | null };

const tabBtn = (active: boolean): React.CSSProperties => ({
  fontFamily: "Hanken Grotesk, sans-serif",
  fontSize: 15,
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "10px 16px",
  border: "1px solid #121212",
  background: active ? "#121212" : "#fff",
  color: active ? "#fff" : "#121212",
  cursor: "pointer",
});

export default function AdminObraDetalle() {
  const { id } = useParams();
  const lang = useLang();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [artist, setArtist] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const t = lang === "es"
    ? {
        back: "← Volver a Obras",
        notFound: "Obra no encontrada.",
        artist: "Artista", year: "Año", price: "Precio", medium: "Materiales / técnica",
        dimensions: "Dimensiones", status: "Estado", description: "Descripción",
        process: "Proceso", noValue: "—",
        approve: "Aprobar", reject: "Rechazar",
        statusLabel: { pendiente: "Pendiente", aprobada: "Aprobada", rechazada: "Rechazada" } as Record<Status, string>,
        video: "Vídeo", model: "Modelo 3D", viewVideo: "Ver vídeo", uploadGlb: "Subir GLB",
        modelReady: "✓ Listo",
      }
    : {
        back: "← Back to Artworks",
        notFound: "Artwork not found.",
        artist: "Artist", year: "Year", price: "Price", medium: "Materials / technique",
        dimensions: "Dimensions", status: "Status", description: "Description",
        process: "Process", noValue: "—",
        approve: "Approve", reject: "Reject",
        statusLabel: { pendiente: "Pending", aprobada: "Approved", rechazada: "Rejected" } as Record<Status, string>,
        video: "Video", model: "3D model", viewVideo: "View video", uploadGlb: "Upload GLB",
        modelReady: "✓ Ready",
      };

  const load = async () => {
    if (!id) return;
    setLoading(true);
    const { data: art } = await supabase
      .from("artworks")
      .select("id, artist_id, title, description, price, year, medium, dimensions, status, created_at, image_url, video_url, glb_url, model_status, process_story, process_photo_urls")
      .eq("id", id)
      .maybeSingle();
    setArtwork((art as Artwork) || null);
    if (art?.artist_id) {
      const { data: prof } = await supabase.from("profiles").select("id, email, name").eq("id", art.artist_id).maybeSingle();
      setArtist((prof as Profile) || null);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const updateStatus = async (status: Status) => {
    if (!id) return;
    await supabase.from("artworks").update({ status }).eq("id", id);
    load();
  };

  const uploadGlb = async (file: File) => {
    if (!artwork) return;
    const path = `${artwork.artist_id}/${artwork.id}-${crypto.randomUUID()}.glb`;
    const { error: uploadErr } = await supabase.storage.from("artwork-media").upload(path, file);
    if (uploadErr) { alert(uploadErr.message); return; }
    const glbUrl = supabase.storage.from("artwork-media").getPublicUrl(path).data.publicUrl;
    await supabase.from("artworks").update({ glb_url: glbUrl, model_status: "ready" }).eq("id", artwork.id);
    load();
  };

  if (loading) return null;

  if (!artwork) {
    return (
      <div>
        <Link to="/admin/dashboard/obras" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#121212" }}>{t.back}</Link>
        <p style={{ fontFamily: "Hanken Grotesk, sans-serif", marginTop: 20 }}>{t.notFound}</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/admin/dashboard/obras" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#121212", display: "inline-block", marginBottom: 24 }}>
        {t.back}
      </Link>

      <h1 style={{
        fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, color: "#121212",
        fontSize: "clamp(28px, 3.4vw, 40px)", lineHeight: 1.1, letterSpacing: "-0.02em",
        margin: "0 0 4px",
      }}>{artwork.title}</h1>
      <p style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#666", margin: "0 0 32px" }}>
        {artist?.name ? `${artist.name} · ` : ""}{artist?.email || t.noValue}
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 480px) 1fr", gap: 48, marginBottom: 48 }}>
        <div>
          {artwork.image_url && (
            <img src={artwork.image_url} alt={artwork.title} style={{ width: "100%", height: "auto", objectFit: "cover", marginBottom: 16 }} />
          )}
          {artwork.video_url && (
            <a href={artwork.video_url} target="_blank" rel="noreferrer" style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#121212", textDecoration: "underline" }}>
              {t.viewVideo} ↗
            </a>
          )}
          {artwork.process_photo_urls && artwork.process_photo_urls.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 16 }}>
              {artwork.process_photo_urls.map((url, i) => (
                <img key={i} src={url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", objectPosition: "top" }} />
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gap: 20 }}>
          <Field label={t.status} value={t.statusLabel[artwork.status]} />
          <Field label={t.year} value={artwork.year != null ? String(artwork.year) : null} noValue={t.noValue} />
          <Field label={t.price} value={artwork.price != null ? `€${artwork.price}` : null} noValue={t.noValue} />
          <Field label={t.medium} value={artwork.medium} noValue={t.noValue} />
          <Field label={t.dimensions} value={artwork.dimensions} noValue={t.noValue} />
          <Field label={t.description} value={artwork.description} noValue={t.noValue} multiline />
          {artwork.process_story && <Field label={t.process} value={artwork.process_story} noValue={t.noValue} multiline />}
          <Field
            label={t.model}
            value={artwork.model_status === "ready" ? t.modelReady : artwork.model_status === "processing" ? null : null}
            noValue={artwork.model_status === "none" ? t.noValue : undefined}
          />
          {artwork.model_status === "processing" && (
            <input
              type="file"
              accept=".glb,model/gltf-binary"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadGlb(file);
              }}
              style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15 }}
            />
          )}

          {artwork.status === "pendiente" && (
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={tabBtn(false)} onClick={() => updateStatus("aprobada")}>{t.approve}</button>
              <button style={tabBtn(false)} onClick={() => updateStatus("rechazada")}>{t.reject}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, noValue, multiline }: { label: string; value?: string | null; noValue?: string; multiline?: boolean }) {
  if (value == null && noValue == null) return null;
  return (
    <div>
      <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#666", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: "Hanken Grotesk, sans-serif", fontSize: 15, color: "#121212", whiteSpace: multiline ? "pre-wrap" : "normal", lineHeight: 1.55 }}>
        {value || noValue}
      </div>
    </div>
  );
}
