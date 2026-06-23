import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { GlbViewer } from "@/components/ignia/GlbViewer";
import { useLang } from "@/i18n/LanguageContext";
import { getWorkBySlug } from "@/data/igniaWorks";
import { ChevronLeft, ChevronRight, MessageCircle, Link2, Mail, ChevronDown } from "lucide-react";

const T = {
  es: {
    back: "← Volver a la colección",
    auth: "Autenticidad verificada",
    authP: "Cada obra de Ignia incluye un certificado de autenticidad emitido en blockchain. Es público, verificable desde cualquier parte del mundo y viaja con la pieza en futuras reventas.",
    tokenId: "Token ID", chain: "Cadena", signed: "Firmado por", edition: "Edición",
    cert: "Ver certificado público →",
    buy: "Adquirir", talk: "Hablar con Ignia",
    photos: "Fotos", view3d: "Vista 3D",
    counter: (n: number) => `${n} fotos · Navega por los ángulos`,
  },
  en: {
    back: "← Back to the collection",
    auth: "Verified authenticity",
    authP: "Every Ignia work includes a certificate of authenticity issued on blockchain. It is public, verifiable worldwide and travels with the piece in future resales.",
    tokenId: "Token ID", chain: "Chain", signed: "Signed by", edition: "Edition",
    cert: "View public certificate →",
    buy: "Acquire", talk: "Talk to Ignia",
    photos: "Photos", view3d: "3D view",
    counter: (n: number) => `${n} photos · Browse angles`,
  },
};

const ObraDetalle = () => {
  const { slug = "" } = useParams();
  const lang = useLang();
  const t = T[lang];
  const o = getWorkBySlug(slug, lang);

  const photos = [o.image, ...(o.extraImages || [])];
  const hasGallery = photos.length >= 2;
  const has3d = !!o.glbUrl;

  // Default mode: 3d if no extra photos, otherwise photos
  const [mode, setMode] = useState<"photos" | "3d">("photos");
  const [idx, setIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const open = () => setInviteOpen(true);
    window.addEventListener("ignia:open-invite", open);
    return () => window.removeEventListener("ignia:open-invite", open);
  }, []);

  useEffect(() => { setIdx(0); }, [slug]);

  const next = () => setIdx((idx + 1) % photos.length);
  const prev = () => setIdx((idx + photos.length - 1) % photos.length);

  return (
    <main className="pt-14 bg-white">
      <Header />

      <section className="px-6 md:px-12 pt-10 pb-20 md:pb-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10">
          <div>
            {/* Mode tabs only when both modes are real */}
            {has3d && (
              <div className="flex gap-1 mb-3">
                {(["photos", "3d"] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`font-body text-[11px] uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                      mode === m ? "bg-ink text-white border-ink" : "border-border text-gray hover:text-ink hover:border-ink"
                    }`}
                  >
                    {m === "photos" ? t.photos : t.view3d}
                  </button>
                ))}
              </div>
            )}


            <div className="relative w-full aspect-square bg-secondary overflow-hidden">
              {mode === "3d" && has3d ? (
                <GlbViewer url={o.glbUrl!} />
              ) : (
                <>
                  {/* Crossfade stack */}
                  {photos.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${o.title} — ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                      style={{ opacity: i === idx ? 1 : 0 }}
                    />
                  ))}
                  {hasGallery && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border border-border flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 hover:bg-white transition-opacity"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </>
              )}

            </div>

            {/* Thumbnails (photos mode + gallery) */}
            {mode === "photos" && hasGallery && (
              <>
                <div className="flex gap-2 mt-3 overflow-x-auto snap-x">
                  {photos.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`shrink-0 w-16 h-16 border-2 overflow-hidden snap-start transition-colors ${
                        i === idx ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`Ángulo ${i + 1}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-muted-line mt-3">
                  {t.counter(photos.length)}
                </p>
              </>
            )}
          </div>

          <div>
            <div className="eyebrow mb-3"><Link to="/coleccion" className="hover:text-ink">{t.back}</Link></div>
            <h1 className="font-display font-bold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{o.title}</h1>
            <div className="font-body text-[16px] font-light text-gray mb-6">
              <Link to={`/perfil/escultor/${o.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-")}`} className="underline-offset-4 hover:underline">{o.artist}</Link> · {o.material} · {o.year} · {o.edition}
            </div>
            <div className="font-display font-bold text-[26px] text-ink mb-8">{o.price}</div>
            <div className="font-body text-[16px] font-light text-gray leading-relaxed mb-10 space-y-4">
              {o.description.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="border border-border p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span aria-hidden className="text-ink">◆</span>
                <h2 className="font-display font-bold text-[18px] text-ink">{t.auth}</h2>
              </div>
              <p className="font-body text-[14px] font-light text-gray leading-relaxed mb-4">{t.authP}</p>
              <dl className="grid grid-cols-2 gap-y-2.5 gap-x-4 font-body text-[13px]">
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.tokenId}</dt>
                <dd className="text-ink font-mono">{o.authenticity}</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.chain}</dt>
                <dd className="text-ink">Polygon</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.signed}</dt>
                <dd className="text-ink">{o.artist}</dd>
                <dt className="text-muted-line uppercase tracking-[0.12em]">{t.edition}</dt>
                <dd className="text-ink">{o.edition}</dd>
              </dl>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => {
                  const priceNum = String(o.price).replace(/[^\d.,]/g, "");
                  const text = `${o.title} · ${o.artist} · €${priceNum}\n${window.location.href}`;
                  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                  if (isMobile) window.location.href = url;
                  else window.open(url, "_blank", "noopener,noreferrer");
                }}
                aria-label="Compartir por WhatsApp"
                className="flex flex-col items-center gap-1 bg-white border border-[#E0E0E0] rounded-[4px] px-3 py-2 hover:border-ink transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden>
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                <span className="font-body text-[10px] text-gray">WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                  } catch {}
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                aria-label="Copiar enlace"
                className="flex flex-col items-center gap-1 bg-white border border-[#E0E0E0] rounded-[4px] px-3 py-2 hover:border-ink transition-colors"
              >
                <Link2 size={18} className="text-ink" />
                <span className="font-body text-[10px] text-gray">{copied ? "¡Copiado!" : "Copiar enlace"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const priceNum = String(o.price).replace(/[^\d.,]/g, "");
                  const subject = `${o.title} — Ignia Gallery`;
                  const body = `Te comparto esta obra de ${o.artist}:\n\n${window.location.href}\n\n${o.title}\n${o.artist} · ${o.material} · ${o.year}\n€${priceNum}`;
                  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                }}
                aria-label="Enviar por email"
                className="flex flex-col items-center gap-1 bg-white border border-[#E0E0E0] rounded-[4px] px-3 py-2 hover:border-ink transition-colors"
              >
                <Mail size={18} className="text-ink" />
                <span className="font-body text-[10px] text-gray">Enviar por email</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))} className="flex-1 bg-ink text-white font-body text-[16px] tracking-[0.16em] uppercase py-5 hover:bg-ink/90 transition-colors">{t.buy}</button>
              <button
                onClick={() => setChatOpen(true)}
                aria-label={t.talk}
                className="shrink-0 w-14 border border-ink text-ink flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {chatOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-end md:items-center md:justify-end" onClick={() => setChatOpen(false)}>
          <div
            className="w-full md:w-[420px] h-[80vh] md:h-full bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-5 h-14 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-ink" />
                <span className="font-display font-bold text-[16px] text-ink">{t.talk}</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray hover:text-ink font-body text-[20px] leading-none">×</button>
            </header>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              <div className="bg-secondary px-4 py-3 font-body text-[14px] text-ink max-w-[85%]">
                Hola, soy Ignia. ¿En qué puedo ayudarte con <strong>{o.title}</strong>?
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); }}
              className="border-t border-border p-3 flex gap-2"
            >
              <input
                type="text"
                placeholder="Escribe tu mensaje…"
                className="flex-1 border border-border px-3 py-2.5 font-body text-[14px] outline-none focus:border-ink"
              />
              <button type="submit" className="bg-ink text-white font-body text-[12px] uppercase tracking-[0.14em] px-4">
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} defaultProfile="collector" />
      <Footer />
    </main>
  );
};

export default ObraDetalle;
