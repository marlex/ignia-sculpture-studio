import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { getHeroWorks } from "@/data/igniaWorks";
import { ShieldCheck, Link2 } from "lucide-react";

export const Hero = () => {
  const [actual, setActual] = useState(0);
  const lang = useLang();
  const obras = getHeroWorks(lang);
  const o = obras[actual];

  const t = lang === "es"
    ? {
        buy: "Comprar",
        view3d: "Ver en 3D →",
        auth: "Autenticidad certificada",
        prev: "Anterior",
        next: "Siguiente",
        trust: ["Envío asegurado", "Certificado de autenticidad", "Devolución gratuita 14 días"],
        about: "Sobre esta obra",
        artist: "Sobre el artista",
        ship: "Envío y entrega",
        aboutP: "Pieza seleccionada por Ignia por su presencia escultórica, calidad material y trazabilidad completa de taller.",
        artistP: "Trayectoria documentada, taller verificado y obra firmada con certificado público.",
        shipP: "Envío asegurado puerta a puerta en 7–14 días. Embalaje museístico. Devolución gratuita durante 14 días.",
      }
    : {
        buy: "Buy",
        view3d: "View in 3D →",
        auth: "Certified authenticity",
        prev: "Previous",
        next: "Next",
        trust: ["Insured shipping", "Certificate of authenticity", "Free 14-day returns"],
        about: "About this work",
        artist: "About the artist",
        ship: "Shipping & delivery",
        aboutP: "Selected by Ignia for its sculptural presence, material quality and complete studio traceability.",
        artistP: "Documented career, verified studio and signed work with a public certificate.",
        shipP: "Insured door-to-door shipping in 7–14 days. Museum-grade packaging. Free returns for 14 days.",
      };

  useEffect(() => {
    const id = setInterval(() => setActual((a) => (a + 1) % obras.length), 9000);
    return () => clearInterval(id);
  }, [obras.length]);

  return (
    <section className="w-full bg-[#faf9f7]">
      <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] min-h-[calc(100vh-56px)]">
        {/* IMAGE — left */}
        <div className="relative bg-[#faf9f7] aspect-[4/5] md:aspect-auto md:min-h-[calc(100vh-56px)]">
          <img
            src={o.image}
            alt={o.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* slide selector dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {obras.map((ob, i) => (
              <button
                key={ob.slug}
                onClick={() => setActual(i)}
                aria-label={ob.title}
                className="transition-all"
                style={{
                  width: i === actual ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === actual ? "#111" : "rgba(0,0,0,0.25)",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        {/* INFO — right */}
        <div className="flex items-center bg-white">
          <div className="w-full px-6 md:px-12 py-10 md:py-16 max-w-[560px] mx-auto">
            {/* artist */}
            <Link
              to={`/perfil/escultor/${o.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
              className="font-body text-[11px] uppercase tracking-[0.22em] text-gray hover:text-ink transition-colors"
            >
              {o.artist}
            </Link>

            {/* title */}
            <h1
              className="mt-3 text-ink leading-[1.05] tracking-[-0.01em]"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: "clamp(32px, 3.6vw, 40px)" }}
            >
              {o.title}
            </h1>

            {/* material */}
            <p className="mt-3 font-body text-[13px] font-light text-gray">
              {o.material} · {o.year}
            </p>

            {/* blockchain pill */}
            <div className="mt-5 inline-flex items-center gap-2 border border-border bg-white px-3 py-1.5">
              <Link2 className="w-3 h-3 text-ink" strokeWidth={1.5} />
              <span className="font-body text-[11px] font-light text-ink uppercase tracking-[0.14em]">{t.auth}</span>
              <span className="font-mono text-[11px] text-ink/60">{o.authenticity}</span>
            </div>

            {/* price */}
            <div
              className="mt-7 text-ink"
              style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 400, fontSize: 28, lineHeight: 1 }}
            >
              {o.price}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => window.dispatchEvent(new Event("ignia:open-invite"))}
                className="w-full bg-ink text-white font-body text-[13px] tracking-[0.18em] uppercase py-4 hover:bg-ink/90 transition-colors"
              >
                {t.buy}
              </button>
              {o.glbUrl && (
                <Link
                  to={`/obra/${o.slug}?view=3d`}
                  className="w-full text-center font-body text-[12px] tracking-[0.16em] uppercase text-ink border border-ink py-3.5 hover:bg-secondary transition-colors"
                >
                  {t.view3d}
                </Link>
              )}
            </div>

            {/* trust signals */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 font-body text-[11px] text-gray">
              {t.trust.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-ink/60" strokeWidth={1.5} />
                  {s}
                </span>
              ))}
            </div>

            {/* collapsibles */}
            <div className="mt-8 border-t border-border">
              {[
                { q: t.about, a: t.aboutP },
                { q: t.artist, a: t.artistP },
                { q: t.ship, a: t.shipP },
              ].map((row) => (
                <details key={row.q} className="group border-b border-border">
                  <summary className="flex items-center justify-between cursor-pointer py-4 font-body text-[13px] text-ink list-none">
                    {row.q}
                    <span className="text-ink/50 group-open:rotate-45 transition-transform text-[18px] leading-none">+</span>
                  </summary>
                  <p className="pb-4 font-body text-[13px] font-light text-gray leading-relaxed">{row.a}</p>
                </details>
              ))}
            </div>

            {/* link to full detail */}
            <Link
              to={`/obra/${o.slug}`}
              className="mt-6 inline-block font-body text-[11px] uppercase tracking-[0.18em] text-ink border-b border-ink pb-px hover:opacity-60 transition-opacity"
            >
              {lang === "es" ? "Ver ficha completa →" : "View full details →"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
