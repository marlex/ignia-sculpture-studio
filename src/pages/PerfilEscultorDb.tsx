import { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Maximize2, X, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import NotFound from "@/pages/NotFound";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import { fetchDbArtistBySlug, type DbArtistProfile, type DbWork } from "@/lib/dbArtworks";
import { StickyIndex } from "@/components/ignia/sculptor-profile/StickyIndex";

const GlbViewer = lazy(() => import("@/components/ignia/GlbViewer").then((m) => ({ default: m.GlbViewer })));

const clean = (s: string) => (s || "").replace(/\s+/g, " ").trim();
const excerpt = (s: string, max: number) => {
  const c = clean(s);
  if (c.length <= max) return c;
  const cut = c.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
};

// Public profile for an artist who published through the artist
// dashboard rather than being hand-added to the curated catalogue
// (src/data/igniaWorks.ts + BIOS in PerfilEscultor.tsx). Mirrors that
// page's design section by section, reading from whatever the artist
// actually provided instead of hand-written catalogue copy.
export default function PerfilEscultorDb({ slug }: { slug: string }) {
  const lang = useLang();
  const [state, setState] = useState<{ profile: DbArtistProfile; works: DbWork[] } | null | undefined>(undefined);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    let alive = true;
    fetchDbArtistBySlug(slug, lang).then((result) => { if (alive) setState(result ?? null); });
    return () => { alive = false; };
  }, [slug, lang]);

  if (state === undefined) return null;
  if (state === null) return <NotFound />;

  const { profile, works } = state;
  const name = profile.name || (lang === "es" ? "Artista Ignia" : "Ignia artist");
  const firstName = name.split(" ")[0];
  const bioText = clean(profile.bio || "");
  const statement = bioText ? excerpt(bioText, 160) : null;
  // Same override as the home/Esculturas catalogue: a specific piece can
  // be chosen as the artist's lead image instead of just the newest one.
  const FEATURED_TITLES: Record<string, string> = { "eric-vanel": "Les Fleurs du Mal" };
  const openerWork = works.find((w) => w.title === FEATURED_TITLES[slug]) ?? works[0];
  const roundWork = works.find((w) => w.glbUrl) ?? works[0];
  const useHalfPage = !openerWork;

  const t = lang === "es"
    ? {
        works: "Obras", round: "En volumen", about: "Sobre", enquire: "Consultar",
        livesIn: "Vive y trabaja en", materials: "Materiales",
        enquireCta: (n: string) => `Consultar por la obra de ${n}`,
        enquireSub: "Escríbenos para conocer disponibilidad, precio y el proceso completo de la pieza.",
        enquireSending: "Enviando…", enquireSent: "Mensaje enviado. Te responderemos pronto.", enquireError: "Hubo un error. Inténtalo de nuevo.",
        enquireEmailPlaceholder: "Tu email", enquireEmailError: "Escribe un email válido para que podamos responderte.",
        closingQuestion: "¿Eres escultor?", closingCta: "Muestra tu obra en Ignia",
        noWorks: "Sin obras publicadas todavía.", viewWork: "Ver obra",
        dimsUnset: "Dimensiones no registradas todavía.",
      }
    : {
        works: "Works", round: "In the round", about: "About", enquire: "Enquire",
        livesIn: "Lives and works in", materials: "Materials",
        enquireCta: (n: string) => `Enquire about ${n}'s work`,
        enquireSub: "Write to us for availability, price and the full process behind the piece.",
        enquireSending: "Sending…", enquireSent: "Message sent. We'll get back to you soon.", enquireError: "Something went wrong. Please try again.",
        enquireEmailPlaceholder: "Your email", enquireEmailError: "Enter a valid email so we can reply to you.",
        closingQuestion: "Are you a sculptor?", closingCta: "Show your work at Ignia",
        noWorks: "No works published yet.", viewWork: "View work",
        dimsUnset: "Dimensions not recorded yet.",
      };

  return (
    <main className="bg-white">
      <Seo title={`${name}, Sculptor · Ignia Institution`} description={bioText.slice(0, 155) || undefined} path={`/perfil/escultor/${slug}`} image={openerWork?.image} />
      <Header theme={useHalfPage ? "light" : "dark"} />

      {/* 1. Opener */}
      {openerWork && !useHalfPage ? (
        <section className="relative w-full h-screen overflow-hidden" style={{ background: "#0a0a0a" }}>
          <img
            src={openerWork.image}
            alt={name}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.2) 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-16 md:pb-20">
            <h1
              style={{
                fontFamily: "'Albert Sans', sans-serif", fontWeight: 300,
                fontSize: "clamp(56px, 9vw, 140px)", color: "#FFFFFF",
                lineHeight: 0.95, letterSpacing: "0.005em", margin: 0,
              }}
            >
              {name}
            </h1>
            <p className="font-body" style={{ color: "rgba(255,255,255,0.88)", fontWeight: 400, fontSize: "clamp(15px,1.7vw,19px)", marginTop: 18 }}>
              {[profile.technique, profile.origin].filter(Boolean).join(" · ")}
            </p>
          </div>
        </section>
      ) : (
        <section className="w-full">
          <div className="flex flex-col justify-center px-6 md:px-16 py-24" style={{ minHeight: "60vh", background: "#f7f7f5" }}>
            <h1
              style={{
                fontFamily: "'Albert Sans', sans-serif", fontWeight: 300,
                fontSize: "clamp(44px, 6vw, 88px)", color: "#121212",
                lineHeight: 1, letterSpacing: "0.005em", margin: 0,
              }}
            >
              {name}
            </h1>
            <p className="font-body text-gray" style={{ fontWeight: 400, fontSize: "clamp(15px,1.7vw,19px)", marginTop: 18 }}>
              {[profile.technique, profile.origin].filter(Boolean).join(" · ")}
            </p>
          </div>
        </section>
      )}

      {/* 2. Sticky index */}
      <StickyIndex
        items={[
          { id: "works", label: t.works },
          { id: "round", label: t.round },
          { id: "about", label: t.about },
          { id: "enquire", label: t.enquire },
        ]}
      />

      {/* 3. Statement */}
      {statement && (
        <section className="px-6 md:px-12 py-28 md:py-36">
          <p
            className="max-w-[820px] mx-auto text-center"
            style={{
              fontFamily: "'Albert Sans', sans-serif", fontWeight: 300,
              fontSize: "clamp(32px, 4.2vw, 52px)", lineHeight: 1.2,
              letterSpacing: "0.005em", color: "#121212",
            }}
          >
            {statement}
          </p>
        </section>
      )}

      {/* 4. In the round */}
      {roundWork && (
        <section id="round" className="px-6 md:px-12 py-20 md:py-28 bg-surface">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display font-medium text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-10">{t.round}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div className="bg-white h-[488px] md:h-[520px]">
                {roundWork.glbUrl ? (
                  <Suspense fallback={<div className="w-full h-full bg-secondary" />}>
                    <GlbViewer url={roundWork.glbUrl} alt={roundWork.title} bgColor="#ffffff" minHeight="100%" cameraOrbit="0deg 75deg 60%" />
                  </Suspense>
                ) : (
                  <div className="relative h-full overflow-hidden bg-secondary">
                    <img src={roundWork.image} alt={roundWork.title} loading="lazy" className="w-full h-full object-cover object-top" />
                    <ExpandButton onClick={() => setLightbox({ src: roundWork.image, alt: roundWork.title })} />
                  </div>
                )}
              </div>
              <div className="pt-2">
                <h3 className="font-display font-medium text-[28px] max-md:text-[25px] text-ink mb-1">{roundWork.title}</h3>
                <div className="font-body text-[12px] font-normal text-muted-line uppercase tracking-[0.14em] mb-2">
                  {roundWork.year} · {roundWork.material}
                </div>
                <div className="font-body text-[16px] font-normal text-ink mb-6">{roundWork.price}</div>
                {roundWork.description && (
                  <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-8 max-w-[480px]">
                    {excerpt(roundWork.description, 220)}
                  </p>
                )}
                <p className="font-body text-[13px] text-muted-line mb-8">{t.dimsUnset}</p>
                <Link to={`/obra/${roundWork.slug}`} className="link-arrow font-body text-[13px]">{t.viewWork}</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Works */}
      <section id="works" className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-display font-medium text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-12">{t.works}</h2>
          {works.length === 0 && <p className="font-body text-[14px] text-muted-line">{t.noWorks}</p>}
          {works.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {works.map((w, i) => {
                const isWide = works.length % 2 === 1 && i === works.length - 1;
                return (
                  <article key={w.id} className={isWide ? "md:col-span-2" : ""}>
                    <Link to={`/obra/${w.slug}`} className={`relative block overflow-hidden bg-secondary mb-5 ${isWide ? "aspect-[4/5] md:aspect-[21/9]" : "aspect-[4/5]"}`}>
                      <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover object-top" />
                      <ExpandButton onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightbox({ src: w.image, alt: w.title }); }} />
                    </Link>
                    <div>
                      <h3 className="font-display font-medium text-[28px] max-md:text-[25px] text-ink mb-1">
                        <Link to={`/obra/${w.slug}`} className="hover:underline underline-offset-4">{w.title}</Link>
                      </h3>
                      <div className="font-body text-[12px] font-normal text-muted-line uppercase tracking-[0.14em] mb-1">
                        {w.year} · {w.material}
                      </div>
                      <div className="font-body text-[16px] font-normal text-ink mt-2">{w.price}</div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. About */}
      <section id="about" className="px-6 md:px-12 py-20 md:py-28 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="font-display font-medium text-[clamp(28px,3.4vw,40px)] max-md:text-[30px] tracking-[-0.02em] text-ink mb-12">{t.about}</h2>
          <div className="max-w-[720px] mx-auto text-center">
            {profile.bio && (
              <div className="font-body text-[16px] font-normal text-gray leading-relaxed space-y-4 mb-10 text-left">
                {profile.bio.split(/\n\s*\n/).map(clean).filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            <dl className="space-y-3 font-body text-[14px] font-normal text-left max-w-[480px] mx-auto">
              {profile.origin && (
                <div className="flex gap-3">
                  <dt className="text-muted-line uppercase tracking-[0.14em] text-[12px] w-32 shrink-0 pt-0.5">{t.livesIn}</dt>
                  <dd className="text-ink">{profile.origin}</dd>
                </div>
              )}
              {profile.technique && (
                <div className="flex gap-3">
                  <dt className="text-muted-line uppercase tracking-[0.14em] text-[12px] w-32 shrink-0 pt-0.5">{t.materials}</dt>
                  <dd className="text-ink">{profile.technique}</dd>
                </div>
              )}
            </dl>
            <div className="flex flex-wrap gap-6 max-w-[480px] mx-auto mt-8">
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="link-arrow inline-flex items-center gap-1">
                  Instagram <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noreferrer" className="link-arrow inline-flex items-center gap-1">
                  {lang === "es" ? "Sitio web" : "Website"} <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {profile.portfolio_url && (
                <a href={profile.portfolio_url} target="_blank" rel="noreferrer" className="link-arrow inline-flex items-center gap-1">
                  Portfolio <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Enquire */}
      <EnquireSection name={name} firstName={firstName} slug={slug} openerImage={openerWork?.image} t={t} />

      {/* 8. Closing */}
      <section className="px-6 md:px-12 py-20 md:py-28 text-center bg-surface border-t border-border">
        <Link to="/join/sculptors" className="group inline-flex flex-col items-center gap-2">
          <span style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, fontSize: "clamp(18px, 2vw, 24px)", color: "#121212", letterSpacing: "0.005em" }}>
            {t.closingQuestion}
          </span>
          <span className="inline-flex items-center gap-3">
            <span style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, fontSize: "clamp(40px, 6vw, 72px)", color: "#121212", lineHeight: 1.05, letterSpacing: "0.005em" }}>
              {t.closingCta}
            </span>
            <span className="font-body text-[28px] text-ink transition-transform duration-200 group-hover:translate-x-1">→</span>
          </span>
        </Link>
      </section>

      <Footer />

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} aria-label="Close" className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity">
            <X className="w-7 h-7" />
          </button>
          <img src={lightbox.src} alt={lightbox.alt} className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </main>
  );
}

const ExpandButton = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => (
  <button type="button" onClick={onClick} aria-label="Expand image" className="absolute top-3 right-3 z-20 w-10 h-10 bg-white/90 border border-border flex items-center justify-center hover:opacity-65 transition-opacity">
    <Maximize2 className="w-4 h-4" />
  </button>
);

function EnquireSection({ name, firstName, slug, openerImage, t }: {
  name: string; firstName: string; slug: string; openerImage?: string;
  t: { enquireCta: (n: string) => string; enquireSub: string; enquireSending: string; enquireSent: string; enquireError: string; enquireEmailPlaceholder: string; enquireEmailError: string; enquire: string };
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "invalid">("idle");
  const [email, setEmail] = useState("");

  const handleEnquire = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setStatus("invalid"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xwlvbepd", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          subject: t.enquireCta(firstName),
          message: `New enquiry about ${name}'s work on Ignia Institution.\n\nFrom: ${email.trim()}\nProfile: ${window.location.origin}/perfil/escultor/${slug}`,
          _cc: "hello@marianabolivargarcia.com",
          _replyto: email.trim(),
        }),
      });
      if (!res.ok) throw new Error("Formspree error");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="enquire" className="grid grid-cols-1 md:grid-cols-2">
      {openerImage && (
        <div className="order-1 md:order-1" style={{ minHeight: 420 }}>
          <img src={openerImage} alt={name} loading="lazy" className="w-full h-full object-cover object-top" style={{ minHeight: 420 }} />
        </div>
      )}
      <div className={`order-2 md:order-2 flex flex-col justify-center px-6 md:px-16 py-24 md:py-0 ${openerImage ? "" : "col-span-2"}`} style={{ background: "#121212" }}>
        <div className={openerImage ? "" : "max-w-[560px] mx-auto text-center"}>
          <h2 style={{ fontFamily: "'Albert Sans', sans-serif", fontWeight: 300, fontSize: "clamp(32px, 3.6vw, 52px)", color: "#FFFFFF", lineHeight: 1.1, letterSpacing: "0.005em", margin: 0 }}>
            {t.enquireCta(firstName)}
          </h2>
          <p className="font-body text-[15px] font-normal mt-5 mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>{t.enquireSub}</p>
          {status === "sent" ? (
            <p className="font-body text-[14px]" style={{ color: "rgba(255,255,255,0.9)" }}>{t.enquireSent}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-fit">
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={t.enquireEmailPlaceholder}
                className="font-body text-[14px] font-normal px-5 py-4 bg-transparent border border-white/30 text-white placeholder:text-white/50 outline-none focus:border-white w-full sm:min-w-[220px] sm:w-auto"
              />
              <button
                type="button" onClick={handleEnquire} disabled={status === "sending"}
                className="inline-flex items-center justify-center font-body text-[13px] font-medium uppercase tracking-[0.18em] text-ink bg-white px-10 py-5 hover:opacity-85 transition-opacity w-full sm:w-fit disabled:opacity-60"
              >
                {status === "sending" ? t.enquireSending : t.enquire}
              </button>
            </div>
          )}
          {status === "invalid" && <p className="font-body text-[13px] mt-3" style={{ color: "#ff8080" }}>{t.enquireEmailError}</p>}
          {status === "error" && <p className="font-body text-[13px] mt-3" style={{ color: "#ff8080" }}>{t.enquireError}</p>}
        </div>
      </div>
    </section>
  );
}
