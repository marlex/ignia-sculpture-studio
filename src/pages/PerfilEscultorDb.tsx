import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/ignia/Header";
import { Footer } from "@/components/ignia/Footer";
import NotFound from "@/pages/NotFound";
import { useLang } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import { fetchDbArtistBySlug, type DbArtistProfile, type DbWork } from "@/lib/dbArtworks";

// Public profile for an artist who published through the artist
// dashboard rather than being added to the curated catalogue
// (src/data/igniaWorks.ts + BIOS in PerfilEscultor.tsx). Deliberately
// simple: no scale drawings, no 3D round-view, no hand-written bio
// paragraphs — just what the artist themselves provided.
export default function PerfilEscultorDb({ slug }: { slug: string }) {
  const lang = useLang();
  const [state, setState] = useState<{ profile: DbArtistProfile; works: DbWork[] } | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    fetchDbArtistBySlug(slug, lang).then((result) => { if (alive) setState(result ?? null); });
    return () => { alive = false; };
  }, [slug, lang]);

  if (state === undefined) return null;
  if (state === null) return <NotFound />;

  const { profile, works } = state;
  const name = profile.name || profile.email;

  const t = lang === "es"
    ? { works: "Obras", origin: "Origen", technique: "Técnica", noWorks: "Todavía sin obras publicadas." }
    : { works: "Works", origin: "Origin", technique: "Technique", noWorks: "No published works yet." };

  return (
    <main className="pt-40 bg-white min-h-screen">
      <Seo title={`${name} | Ignia Institution`} description={profile.bio || undefined} path={`/perfil/escultor/${slug}`} />
      <Header theme="light" />
      <section className="px-6 md:px-12 pb-10 max-w-[900px] mx-auto">
        <h1 className="font-display font-medium text-[clamp(32px,4vw,52px)] tracking-[-0.02em] text-ink leading-[1.05] mb-3">{name}</h1>
        {(profile.origin || profile.technique) && (
          <p className="font-body text-[14px] text-muted-line uppercase tracking-[0.14em] mb-6">
            {[profile.origin, profile.technique].filter(Boolean).join(" · ")}
          </p>
        )}
        {profile.bio && (
          <p className="font-body text-[16px] font-normal text-gray leading-relaxed mb-6 whitespace-pre-wrap">{profile.bio}</p>
        )}
        <div className="flex flex-wrap gap-4 mb-10">
          {profile.instagram && (
            <a href={profile.instagram} target="_blank" rel="noreferrer" className="font-body text-[14px] text-ink underline-offset-4 hover:underline">Instagram ↗</a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noreferrer" className="font-body text-[14px] text-ink underline-offset-4 hover:underline">{lang === "es" ? "Sitio web" : "Website"} ↗</a>
          )}
          {profile.portfolio_url && (
            <a href={profile.portfolio_url} target="_blank" rel="noreferrer" className="font-body text-[14px] text-ink underline-offset-4 hover:underline">Portfolio ↗</a>
          )}
        </div>

        <h2 className="font-display font-semibold text-[24px] text-ink mb-6">{t.works}</h2>
        {works.length === 0 ? (
          <p className="font-body text-[15px] text-gray">{t.noWorks}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {works.map((w) => (
              <Link key={w.id} to={`/obra/${w.slug}`} className="group block">
                <div className="aspect-square bg-secondary overflow-hidden mb-3">
                  <img src={w.image} alt={w.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="font-body text-[14px] text-ink">{w.title}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
