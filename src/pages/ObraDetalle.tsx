import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { PurchaseModal } from "@/components/ignia/PurchaseModal";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
const GlbViewer = lazy(() => import("@/components/ignia/GlbViewer").then(m => ({ default: m.GlbViewer })));
import { useLang } from "@/i18n/LanguageContext";
import { getWorkBySlug, WORKS } from "@/data/igniaWorks";
import { ChevronLeft, ChevronRight, MessageCircle, Link2, Mail, ChevronDown, Info } from "lucide-react";
import { BIOS } from "@/pages/PerfilEscultor";
import { artistSlug } from "@/lib/artistSlug";
import { supabase } from "@/integrations/supabase/client";

const T = {
  es: {
    back: "← Volver a la colección",
    auth: "Autenticidad verificada",
    authP: "Cada obra de Ignia incluye un certificado de autenticidad emitido en blockchain. Es público, verificable desde cualquier parte del mundo y viaja con la pieza en futuras reventas.",
    tokenId: "Token ID", chain: "Cadena", signed: "Firmado por", edition: "Edición",
    cert: "Ver certificado público →",
    buy: "Comprar", talk: "Hablar con Ignia",
    photos: "Fotos", view3d: "Vista 3D",
    counter: (n: number) => `${n} fotos · Navega por los ángulos`,
    chatGreeting: (title: string) => `Hola, soy Ignia. ¿En qué puedo ayudarte con ${title}?`,
    chatPlaceholder: "Escribe tu mensaje…",
    chatSend: "Enviar",
    chatTyping: "Escribiendo…",
    chatError: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
  },
  en: {
    back: "← Back to the collection",
    auth: "Verified authenticity",
    authP: "Every Ignia work includes a certificate of authenticity issued on blockchain. It is public, verifiable worldwide and travels with the piece in future resales.",
    tokenId: "Token ID", chain: "Chain", signed: "Signed by", edition: "Edition",
    cert: "View public certificate →",
    buy: "Buy", talk: "Talk to Ignia",
    photos: "Photos", view3d: "3D view",
    counter: (n: number) => `${n} photos · Browse angles`,
    chatGreeting: (title: string) => `Hi, I'm Ignia. How can I help you with ${title}?`,
    chatPlaceholder: "Type your message…",
    chatSend: "Send",
    chatTyping: "Typing…",
    chatError: "Couldn't send the message. Please try again.",
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
  type ChatMsg = { role: "user" | "assistant"; content: string };
  const greeting = t.chatGreeting(o?.title ?? "");
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chatMessages, chatSending, chatOpen]);

  async function sendChat(e: React.FormEvent) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text || chatSending) return;
    const history = chatMessages.map((m) => ({ role: m.role, content: m.content }));
    const nextUser: ChatMsg = { role: "user", content: text };
    setChatMessages((prev) => [...prev, nextUser]);
    setChatInput("");
    setChatSending(true);
    setChatError(null);
    try {
      const { data, error } = await supabase.functions.invoke("ignia-sales-assistant", {
        body: {
          message: text,
          history,
          context: {
            page: typeof window !== "undefined" ? window.location.pathname : undefined,
            locale: lang,
            product: o
              ? {
                  title: o.title,
                  artist: o.artist,
                  material: o.material,
                  year: o.year as any,
                  price: o.price,
                  description: o.description,
                }
              : null,
          },
        },
      });
      if (error) throw error;
      const reply = (data as any)?.reply as string | undefined;
      if (!reply) throw new Error("empty reply");
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setChatError(t.chatError);
    } finally {
      setChatSending(false);
    }
  }

  const [copied, setCopied] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(false);
  
  const [shipOpen, setShipOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [priceInfoOpen, setPriceInfoOpen] = useState(false);
  const [buyOpen, setBuyOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("buy") === "1") {
      setBuyOpen(true);
      const next = new URLSearchParams(searchParams);
      next.delete("buy");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => { setIdx(0); }, [slug]);

  useEffect(() => {
    if (!o) return;
    const title = `${o.title} — ${o.artist} · Ignia Gallery`;
    const rawDesc = (o.description || "").replace(/\s+/g, " ").trim();
    const shortDesc = rawDesc.length > 140 ? rawDesc.slice(0, 137) + "…" : rawDesc;
    const description = lang === "es"
      ? `${shortDesc} ${o.material}, ${o.year}. ${o.price}.`
      : `${shortDesc} ${o.material}, ${o.year}. ${o.price}.`;
    const SITE_BASE = "https://igniagallery.com";
    const rawImage = o.image || "";
    const ogImage = rawImage.startsWith("http")
      ? rawImage
      : `${SITE_BASE}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;
    document.title = title;
    const setMeta = (sel: string, content: string) => {
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const nameMatch = sel.match(/\[name="([^"]+)"\]/);
        const propMatch = sel.match(/\[property="([^"]+)"\]/);
        if (nameMatch) el.setAttribute("name", nameMatch[1]);
        if (propMatch) el.setAttribute("property", propMatch[1]);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:image:width"]', "1200");
    setMeta('meta[property="og:image:height"]', "630");
    setMeta('meta[name="twitter:image"]', ogImage);
  }, [slug, lang, o]);


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
                    className={`font-body text-[13px] font-medium uppercase tracking-[0.18em] px-4 py-2 border transition-colors ${
                      mode === m ? "bg-ink text-white border-ink" : "border-border text-gray hover:opacity-65 transition-opacity"
                    }`}
                  >
                    {m === "photos" ? t.photos : t.view3d}
                  </button>
                ))}
              </div>
            )}


            <div className="relative w-full aspect-square bg-secondary overflow-hidden">
              {mode === "3d" && has3d ? (
                <Suspense fallback={<div className="absolute inset-0 bg-secondary" />}><GlbViewer url={o.glbUrl!} /></Suspense>
              ) : (
                <>
                  {/* Crossfade stack */}
                  {photos.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${o.title} — ${i + 1}`}
                      loading={i === 0 ? "eager" : "lazy"}
                      fetchPriority={i === 0 ? "high" : "low"}
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                      style={{ opacity: i === idx ? 1 : 0 }}
                    />
                  ))}
                  {hasGallery && (
                    <>
                      <button
                        onClick={prev}
                        aria-label="Anterior"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border border-border flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 hover:opacity-65 transition-opacity"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={next}
                        aria-label="Siguiente"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity"
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
                        i === idx ? "border-ink" : "border-transparent opacity-60 hover:opacity-65"
                      }`}
                      aria-label={`Ángulo ${i + 1}`}
                    >
                      <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
            <div className="eyebrow mb-3"><Link to="/coleccion" className="hover:opacity-65 transition-opacity">{t.back}</Link></div>
            <h1 className="font-display font-semibold text-[clamp(32px,4vw,56px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{o.title}</h1>
            <div className="font-body text-[16px] font-normal text-gray mb-6">
              <Link to={`/perfil/escultor/${o.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g,"-")}`} className="underline-offset-4 hover:underline">{o.artist}</Link> · {o.material} · {o.year} · {o.edition}
            </div>
            <div className="mb-8">
              <div className="font-display font-semibold text-[32px] text-ink">{o.price}</div>
              <button
                type="button"
                onClick={() => setPriceInfoOpen(true)}
                className="font-body text-[12px] text-muted-line underline-offset-4 hover:underline hover:opacity-65 transition-opacity mt-1"
              >
                {lang === "es" ? "Cómo se calcula este precio" : "How this price is calculated"}
              </button>
            </div>
            {priceInfoOpen && (
              <div
                className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center px-4"
                onClick={() => setPriceInfoOpen(false)}
              >
                <div
                  className="bg-white max-w-[480px] w-full p-8 relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setPriceInfoOpen(false)}
                    className="absolute top-3 right-4 text-gray hover:opacity-65 transition-opacity font-body text-[22px] leading-none"
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h3 className="font-display font-semibold text-[20px] text-ink mb-4">
                    {lang === "es" ? "Cómo se calcula este precio" : "How this price is calculated"}
                  </h3>
                  <p className="font-body text-[14px] font-normal text-gray leading-relaxed">
                    {lang === "es"
                      ? "El precio incluye el certificado de autenticidad en blockchain, la gestión logística especializada y la comisión de Ignia Gallery. Sin costes ocultos."
                      : "The price includes the blockchain certificate of authenticity, specialised logistics handling and Ignia Gallery's commission. No hidden fees."}
                  </p>
                </div>
              </div>
            )}
            <div className="font-body text-[16px] font-normal text-gray leading-relaxed mb-10 space-y-4">
              {o.description.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>


            {(() => {
              const anyO = o as any;
              const dims = anyO.dimensions
                ? `${anyO.dimensions.h ?? "—"} × ${anyO.dimensions.w ?? "—"} × ${anyO.dimensions.d ?? "—"} cm`
                : "—";
              const weight = anyO.weight ? `${anyO.weight} kg` : "—";
              const technique = anyO.technique ?? "—";
              const specLabel = lang === "es" ? "Ficha técnica" : "Technical specs";
              const rows: [string, string][] = [
                [lang === "es" ? "Dimensiones" : "Dimensions", dims],
                [lang === "es" ? "Peso" : "Weight", weight],
                [lang === "es" ? "Material" : "Material", o.material],
                [lang === "es" ? "Técnica / acabado" : "Technique / finish", technique],
                [lang === "es" ? "Año" : "Year", o.year],
                [lang === "es" ? "Edición" : "Edition", o.edition],
              ];
              return (
                <div className="border border-border mb-6">
                  <button
                    type="button"
                    onClick={() => setSpecsOpen(v => !v)}
                    aria-expanded={specsOpen}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-body text-[13px] text-muted-line uppercase tracking-[0.12em]">{specLabel}</span>
                    <ChevronDown
                      size={16}
                      className="text-gray transition-transform duration-200"
                      style={{ transform: specsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-200 ease-out"
                    style={{ maxHeight: specsOpen ? 600 : 0 }}
                  >
                    <dl className="px-6 pb-5 font-body text-[14px]">
                      {rows.map(([k, v], i) => (
                        <div
                          key={k}
                          className="grid grid-cols-2 gap-x-4 py-2.5"
                          style={{ borderTop: i === 0 ? "none" : "1px solid #F0F0F0" }}
                        >
                          <dt className="text-gray">{k}</dt>
                          <dd className="text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              );
            })()}


            <div className="border border-border mb-6">
              <button
                type="button"
                onClick={() => setAuthOpen(v => !v)}
                aria-expanded={authOpen}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-body text-[13px] text-muted-line uppercase tracking-[0.12em]">{t.auth}</span>
                <ChevronDown
                  size={16}
                  className="text-gray transition-transform duration-200"
                  style={{ transform: authOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-200 ease-out"
                style={{ maxHeight: authOpen ? 600 : 0 }}
              >
                <div className="px-6 pb-5">
                  <p className="font-body text-[14px] font-normal text-gray leading-relaxed mb-4">{t.authP}</p>
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
              </div>
            </div>


            {(() => {
              const isEs = lang === "es";
              const shipLabel = isEs ? "Envío y logística" : "Shipping & logistics";
              const policyText = isEs ? "Ver política completa →" : "View full policy →";
              const rows: [string, string][] = isEs ? [
                ["Recogida", "Nuestro socio logístico coordina la recogida directamente con el artista. El artista solo debe dar acceso a la obra."],
                ["Embalaje", "Embalaje especializado para escultura a cargo del equipo logístico, incluido en el proceso."],
                ["Plazo estimado", "5–15 días hábiles según destino y disponibilidad del artista."],
                ["Seguro", "Cada envío incluye cobertura de seguro durante todo el tránsito."],
                ["Devoluciones", "Dispones de 14 días desde la entrega confirmada para ejercer tu derecho de devolución. Consulta nuestra Política de Envíos y Devoluciones para más detalles."],
              ] : [
                ["Pickup", "Our logistics partner coordinates pickup directly with the artist. The artist only needs to grant access to the work."],
                ["Packaging", "Specialised sculpture packaging handled by the logistics team, included in the process."],
                ["Estimated time", "5–15 business days depending on destination and artist availability."],
                ["Insurance", "Every shipment includes insurance coverage throughout transit."],
                ["Returns", "You have 14 days from confirmed delivery to exercise your right of return. See our Shipping & Returns Policy for details."],
              ];
              return (
                <div className="border border-border mb-6">
                  <button
                    type="button"
                    onClick={() => setShipOpen(v => !v)}
                    aria-expanded={shipOpen}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-body text-[13px] text-muted-line uppercase tracking-[0.12em]">{shipLabel}</span>
                    <ChevronDown
                      size={16}
                      className="text-gray transition-transform duration-200"
                      style={{ transform: shipOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-200 ease-out"
                    style={{ maxHeight: shipOpen ? 900 : 0 }}
                  >
                    <div className="px-6 pb-5 font-body text-[14px] space-y-3">
                      {rows.map(([k, v]) => (
                        <p key={k} className="text-gray font-normal leading-relaxed">
                          <span className="text-ink font-normal">{k}:</span> {v}
                        </p>
                      ))}
                      <Link
                        to="/legal/envios-y-devoluciones"
                        className="inline-block text-ink underline-offset-4 hover:underline pt-1"
                      >
                        {policyText}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })()}


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
className="flex-1 flex flex-col items-center gap-1 bg-white border border-ink rounded-[4px] px-3 py-2 hover:opacity-65 transition-opacity"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1A1A" aria-hidden>
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
className="flex-1 flex flex-col items-center gap-1 bg-white border border-ink rounded-[4px] px-3 py-2 hover:opacity-65 transition-opacity"
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
                className="flex-1 flex flex-col items-center gap-1 bg-white border border-ink rounded-[4px] px-3 py-2 hover:opacity-65 transition-opacity"
              >
                <Mail size={18} className="text-ink" />
                <span className="font-body text-[10px] text-gray">Enviar por email</span>
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setBuyOpen(true)} className="flex-1 font-body text-[16px] tracking-[0.16em] uppercase py-5 transition-colors" style={{ background: "#000000", color: "#FFFFFF", border: "1px solid #000000" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#222222"; e.currentTarget.style.borderColor = "#222222"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#000000"; e.currentTarget.style.borderColor = "#000000"; }}>{t.buy}</button>
              <button
                onClick={() => setChatOpen(true)}
                aria-label={t.talk}
                className="shrink-0 w-14 border border-ink text-ink flex items-center justify-center hover:opacity-65 transition-opacity"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>

            {(() => {
              const slug = artistSlug(o.artist);
              const bio = BIOS[slug];
              if (!bio) return null;
              const bioText = lang === "es" ? bio.bioEs : bio.bioEn;
              const firstDot = bioText.indexOf(". ");
              const location = firstDot > 0 && firstDot < 60 ? bioText.slice(0, firstDot) : "";
              const rest = location ? bioText.slice(firstDot + 2) : bioText;
              const short = rest.length > 180 ? rest.slice(0, 180).trimEnd() + "…" : rest;
              const initials = o.artist.split(/\s+/).slice(0, 2).map(s => s[0]).join("").toUpperCase();
              const female = /a$/i.test(o.artist.split(/\s+/)[0] || "");
              const header = lang === "es"
                ? (female ? "SOBRE LA ARTISTA" : "SOBRE EL ARTISTA")
                : "ABOUT THE ARTIST";
              const viewProfile = lang === "es" ? "Ver perfil completo →" : "View full profile →";
              return (
                <div className="mt-10 pt-8 border-t border-[#E8E8E8]">
                  <p className="font-body text-[12px] tracking-[0.18em] uppercase text-muted-line mb-4">{header}</p>
                  <div className="flex items-center gap-3 mb-4">
                    {bio.retrato ? (
                      <img src={bio.retrato} alt={o.artist} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-body text-[13px] text-ink">{initials}</div>
                    )}
                    <div>
                      <div className="font-display font-semibold text-[28px] text-ink leading-tight">{o.artist}</div>
                      {location && <div className="font-body text-[13px] text-gray">{location}</div>}
                    </div>
                  </div>
                  <p className="font-body text-[14px] font-normal text-gray leading-relaxed mb-4">{short}</p>
                  <Link
                    to={`/perfil/escultor/${slug}`}
                    className="font-body text-[14px] text-ink underline-offset-4 hover:underline"
                  >
                    {viewProfile}
                  </Link>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {(() => {
        const others = WORKS
          .filter(w => w.slug !== o.slug && w[lang].artist === o.artist)
          .slice(0, 4)
          .map(w => getWorkBySlug(w.slug, lang));
        if (others.length < 2) return null;
        const heading = lang === "es" ? `Más obras de ${o.artist}` : `More works by ${o.artist}`;
        return (
          <section className="px-6 md:px-12 pb-20">
            <div className="max-w-[1280px] mx-auto">
              <h2 className="font-display font-semibold text-[clamp(22px,2.4vw,32px)] tracking-[-0.01em] text-ink mb-8">{heading}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {others.map(w => (
                  <Link key={w.slug} to={`/obra/${w.slug}`} className="group block">
                    <div className="aspect-square bg-secondary overflow-hidden mb-3">
                      <img src={w.image} alt={w.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                    </div>
                    <div className="font-body text-[14px] text-ink">{w.title}</div>
                    <div className="font-body text-[14px] text-ink">{w.price}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}


      {chatOpen && (
        <div key={lang} className="fixed inset-0 z-[200] bg-black/50 flex items-end md:items-center md:justify-end" onClick={() => setChatOpen(false)}>
          <div
            className="w-full md:w-[420px] h-[80vh] md:h-full bg-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between px-5 h-14 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-ink" />
                <span className="font-display font-semibold text-[25px] text-ink">{t.talk}</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-gray hover:opacity-65 transition-opacity font-body text-[28px] leading-none w-11 h-11 flex items-center justify-center">×</button>
            </header>
            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-5 space-y-3">
              <div className="bg-secondary px-4 py-3 font-body text-[14px] text-ink max-w-[85%] whitespace-pre-wrap">
                {greeting}
              </div>
              {chatMessages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "bg-ink text-white px-4 py-3 font-body text-[14px] max-w-[85%] ml-auto whitespace-pre-wrap"
                      : "bg-secondary px-4 py-3 font-body text-[14px] text-ink max-w-[85%] whitespace-pre-wrap"
                  }
                >
                  {m.content}
                </div>
              ))}
              {chatSending && (
                <div className="bg-secondary px-4 py-3 font-body text-[14px] text-gray max-w-[85%]">
                  {t.chatTyping}
                </div>
              )}
              {chatError && (
                <div className="px-4 py-2 font-body text-[13px] text-red-600">{chatError}</div>
              )}
            </div>
            <form
              onSubmit={sendChat}
              className="border-t border-border p-3 flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={chatSending}
                placeholder={t.chatPlaceholder}
                className="flex-1 border border-border px-3 py-2.5 font-body text-[14px] outline-none focus:border-ink disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={chatSending || !chatInput.trim()}
                className="bg-transparent text-ink border border-ink font-body text-[12px] uppercase tracking-[0.14em] px-4 hover:opacity-65 transition-opacity disabled:opacity-40"
              >
                {t.chatSend}
              </button>
            </form>

          </div>
        </div>
      )}


      <Footer />
      <PurchaseModal
        open={buyOpen}
        onClose={() => setBuyOpen(false)}
        obra={o ? { id: (o as any).id, slug: o.slug, title: o.title, artist: o.artist, material: o.material, year: o.year as any, price: o.price, image: o.image } : null}
      />
    </main>
  );
};

export default ObraDetalle;
