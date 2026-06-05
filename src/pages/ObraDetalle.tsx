import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { GlbViewer } from "@/components/ignia/GlbViewer";
import { useLang } from "@/i18n/LanguageContext";
import { getWorkBySlug } from "@/data/igniaWorks";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

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
  const [mode, setMode] = useState<"photos" | "3d">(has3d ? "3d" : "photos");
  const [idx, setIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

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

      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10">
          <div>
            {/* Mode tabs only when both modes are real */}
            {has3d && (
              <div className="flex gap-1 mb-3">
                {(["3d", "photos"] as const).map(m => (
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


            <div className="relative aspect-square w-full bg-secondary overflow-hidden">
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
            <div className="font-body text-[15px] font-light text-gray mb-6">
              <Link to={`/perfil/escultor/${o.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-")}`} className="underline-offset-4 hover:underline">{o.artist}</Link> · {o.material} · {o.year} · {o.edition}
            </div>
            <div className="font-display font-bold text-[26px] text-ink mb-8">{o.price}</div>
            <p className="font-body text-[16px] font-light text-gray leading-relaxed mb-10">{o.description}</p>

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

            <div className="flex gap-3">
              <button onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))} className="flex-1 bg-ink text-white font-body text-[15px] tracking-[0.16em] uppercase py-5 hover:bg-ink/90 transition-colors">{t.buy}</button>
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
                <span className="font-display font-bold text-[15px] text-ink">{t.talk}</span>
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

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
      <Footer />
    </main>
  );
};

export default ObraDetalle;
