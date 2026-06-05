import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import { InviteModal } from "@/components/ignia/home/InviteModal";
import { GlbViewer } from "@/components/ignia/GlbViewer";
import { useLang } from "@/i18n/LanguageContext";
import { getWorkBySlug } from "@/data/igniaWorks";
import { ChevronLeft, ChevronRight, MessageCircle, ShieldCheck, Link2, X } from "lucide-react";

const T = {
  es: {
    back: "← Volver a la colección",
    auth: "Autenticidad certificada",
    buy: "Comprar",
    view3d: "Ver en 3D →",
    talk: "Hablar con Ignia",
    trust: ["Envío asegurado", "Certificado de autenticidad", "Devolución gratuita 14 días"],
    about: "Sobre esta obra",
    artist: "Sobre el artista",
    ship: "Envío y entrega",
    artistP: "Trayectoria documentada, taller verificado y obra firmada con certificado público en blockchain.",
    shipP: "Envío asegurado puerta a puerta en 7–14 días. Embalaje museístico. Devolución gratuita durante 14 días.",
    close: "Cerrar",
  },
  en: {
    back: "← Back to the collection",
    auth: "Certified authenticity",
    buy: "Buy",
    view3d: "View in 3D →",
    talk: "Talk to Ignia",
    trust: ["Insured shipping", "Certificate of authenticity", "Free 14-day returns"],
    about: "About this work",
    artist: "About the artist",
    ship: "Shipping & delivery",
    artistP: "Documented career, verified studio and signed work with a public certificate on blockchain.",
    shipP: "Insured door-to-door shipping in 7–14 days. Museum-grade packaging. Free returns for 14 days.",
    close: "Close",
  },
};

const ObraDetalle = () => {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const lang = useLang();
  const t = T[lang];
  const o = getWorkBySlug(slug, lang);

  const photos = [o.image, ...(o.extraImages || [])];
  const hasGallery = photos.length >= 2;
  const has3d = !!o.glbUrl;

  const [idx, setIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    if (params.get("view") === "3d" && has3d) setShow3d(true);
  }, [params, has3d]);

  useEffect(() => {
    const open = () => setInviteOpen(true);
    window.addEventListener("ignia:open-invite", open);
    return () => window.removeEventListener("ignia:open-invite", open);
  }, []);

  useEffect(() => { setIdx(0); }, [slug]);

  useEffect(() => {
    if (!show3d) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow3d(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [show3d]);

  const next = () => setIdx((idx + 1) % photos.length);
  const prev = () => setIdx((idx + photos.length - 1) % photos.length);

  const artistSlug = o.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");

  return (
    <main className="pt-14 bg-white">
      <Header />

      <section className="bg-[#faf9f7]">
        <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] min-h-[calc(100vh-56px)]">
          {/* IMAGE LEFT */}
          <div className="relative bg-[#faf9f7] aspect-[4/5] md:aspect-auto md:min-h-[calc(100vh-56px)]">
            {photos.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${o.title} — ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: i === idx ? 1 : 0 }}
              />
            ))}
            {hasGallery && (
              <>
                <button
                  onClick={prev}
                  aria-label="Anterior"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Siguiente"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`Foto ${i + 1}`}
                      style={{
                        width: i === idx ? 18 : 5,
                        height: 5,
                        borderRadius: 3,
                        background: i === idx ? "#111" : "rgba(0,0,0,0.3)",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        transition: "all 200ms",
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* INFO RIGHT */}
          <div className="flex items-center bg-white">
            <div className="w-full px-6 md:px-12 py-10 md:py-16 max-w-[560px] mx-auto">
              <div className="mb-6">
                <Link to="/coleccion" className="font-body text-[11px] uppercase tracking-[0.18em] text-gray hover:text-ink transition-colors">
                  {t.back}
                </Link>
              </div>

              <Link
                to={`/perfil/escultor/${artistSlug}`}
                className="font-body text-[11px] uppercase tracking-[0.22em] text-gray hover:text-ink transition-colors"
              >
                {o.artist}
              </Link>

              <h1
                className="mt-3 text-ink leading-[1.05] tracking-[-0.01em]"
                style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(32px, 3.6vw, 40px)" }}
              >
                {o.title}
              </h1>

              <p className="mt-3 font-body text-[13px] font-light text-gray">
                {o.material} · {o.year} · {o.edition}
              </p>

              <div className="mt-5 inline-flex items-center gap-2 border border-border bg-white px-3 py-1.5">
                <Link2 className="w-3 h-3 text-ink" strokeWidth={1.5} />
                <span className="font-body text-[11px] font-light text-ink uppercase tracking-[0.14em]">{t.auth}</span>
                <span className="font-mono text-[11px] text-ink/60">{o.authenticity}</span>
              </div>

              <div
                className="mt-7 text-ink"
                style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 28, lineHeight: 1 }}
              >
                {o.price}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))}
                  className="w-full bg-ink text-white font-body text-[13px] tracking-[0.18em] uppercase py-4 hover:bg-ink/90 transition-colors"
                >
                  {t.buy}
                </button>
                {has3d && (
                  <button
                    onClick={() => setShow3d(true)}
                    className="w-full text-center font-body text-[12px] tracking-[0.16em] uppercase text-ink border border-ink py-3.5 hover:bg-secondary transition-colors"
                  >
                    {t.view3d}
                  </button>
                )}
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full text-center font-body text-[11px] tracking-[0.16em] uppercase text-gray hover:text-ink transition-colors inline-flex items-center justify-center gap-2 py-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  {t.talk}
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 font-body text-[11px] text-gray">
                {t.trust.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-ink/60" strokeWidth={1.5} />
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-8 border-t border-border">
                {[
                  { q: t.about, a: o.description },
                  { q: t.artist, a: t.artistP },
                  { q: t.ship, a: t.shipP },
                ].map((row, i) => (
                  <details key={row.q} className="group border-b border-border" open={i === 0}>
                    <summary className="flex items-center justify-between cursor-pointer py-4 font-body text-[13px] text-ink list-none">
                      {row.q}
                      <span className="text-ink/50 group-open:rotate-45 transition-transform text-[18px] leading-none">+</span>
                    </summary>
                    <p className="pb-4 font-body text-[13px] font-light text-gray leading-relaxed">{row.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D modal (now opt-in via secondary CTA) */}
      {show3d && has3d && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col">
          <header className="flex items-center justify-between px-6 md:px-10 h-14 border-b border-white/10 text-white">
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-[16px]">{o.title}</span>
              <span className="font-body text-[12px] uppercase tracking-[0.14em] text-white/55">{o.artist} · {o.material}</span>
            </div>
            <button onClick={() => setShow3d(false)} aria-label={t.close} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </header>
          <div className="flex-1">
            <GlbViewer url={o.glbUrl!} />
          </div>
        </div>
      )}

      {chatOpen && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-end md:items-center md:justify-end" onClick={() => setChatOpen(false)}>
          <div className="w-full md:w-[420px] h-[80vh] md:h-full bg-white flex flex-col" onClick={(e) => e.stopPropagation()}>
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
            <form onSubmit={(e) => e.preventDefault()} className="border-t border-border p-3 flex gap-2">
              <input type="text" placeholder="Escribe tu mensaje…" className="flex-1 border border-border px-3 py-2.5 font-body text-[14px] outline-none focus:border-ink" />
              <button type="submit" className="bg-ink text-white font-body text-[12px] uppercase tracking-[0.14em] px-4">Enviar</button>
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
