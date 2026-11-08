import { supabase } from "@/integrations/supabase/client";
import { artistSlug } from "@/lib/artistSlug";

type Lang = "es" | "en";

export type DbWork = {
  slug: string;
  id: string;
  artistId: string;
  artistSlug: string;
  image: string;
  heroImage?: string;
  glbUrl?: string;
  extraImages?: string[];
  title: string;
  artist: string;
  material: string;
  year: string;
  edition: string;
  price: string;
  description: string;
  authenticity: string;
};

export type DbArtistProfile = {
  id: string;
  name: string | null;
  origin: string | null;
  technique: string | null;
  bio: string | null;
  instagram: string | null;
  website: string | null;
  portfolio_url: string | null;
};

const formatPrice = (price: number | null, lang: Lang) => {
  if (price == null) return lang === "es" ? "Precio a consultar" : "Price on request";
  const n = Math.round(price);
  return `€ ${n.toLocaleString(lang === "es" ? "es-ES" : "en-US")}`;
};

type RawArtwork = {
  id: string;
  artist_id: string;
  title: string;
  description: string | null;
  price: number | null;
  year: number | null;
  medium: string | null;
  image_url: string | null;
  glb_url: string | null;
  model_status: string | null;
  process_photo_urls: string[] | null;
};

const toDbWork = (a: RawArtwork, artist: DbArtistProfile | undefined, lang: Lang): DbWork => {
  const artistName = artist?.name || (lang === "es" ? "Artista Ignia" : "Ignia artist");
  return {
    slug: `db-${a.id}`,
    id: a.id,
    artistId: a.artist_id,
    artistSlug: artistSlug(artistName),
    image: a.image_url || "",
    glbUrl: a.model_status === "ready" && a.glb_url ? a.glb_url : undefined,
    extraImages: a.process_photo_urls && a.process_photo_urls.length > 0 ? a.process_photo_urls : undefined,
    title: a.title,
    artist: artistName,
    material: a.medium || (lang === "es" ? "Técnica mixta" : "Mixed media"),
    year: a.year != null ? String(a.year) : "",
    edition: lang === "es" ? "Pieza única" : "Unique piece",
    price: formatPrice(a.price, lang),
    description: a.description || "",
    authenticity: `#${a.id.slice(0, 8)}`,
  };
};

async function fetchApprovedWithProfiles(): Promise<{ artworks: RawArtwork[]; profiles: Record<string, DbArtistProfile> }> {
  const { data: arts } = await supabase
    .from("artworks")
    .select("id, artist_id, title, description, price, year, medium, image_url, glb_url, model_status, process_photo_urls")
    .eq("status", "aprobada")
    .not("image_url", "is", null)
    .order("created_at", { ascending: false });
  const list = (arts as RawArtwork[]) || [];
  if (list.length === 0) return { artworks: [], profiles: {} };

  const artistIds = Array.from(new Set(list.map((a) => a.artist_id)));
  const { data: profs } = await supabase
    .from("public_artist_profiles")
    .select("id, name, origin, technique, bio, instagram, website, portfolio_url")
    .in("id", artistIds);
  const map: Record<string, DbArtistProfile> = {};
  (profs as DbArtistProfile[] || []).forEach((p) => { map[p.id] = p; });
  return { artworks: list, profiles: map };
}

export async function fetchApprovedDbWorks(lang: Lang): Promise<DbWork[]> {
  const { artworks, profiles } = await fetchApprovedWithProfiles();
  return artworks.map((a) => toDbWork(a, profiles[a.artist_id], lang));
}

export async function fetchDbWorkBySlug(slug: string, lang: Lang): Promise<DbWork | undefined> {
  if (!slug.startsWith("db-")) return undefined;
  const id = slug.slice(3);
  const { data: a } = await supabase
    .from("artworks")
    .select("id, artist_id, title, description, price, year, medium, image_url, glb_url, model_status, process_photo_urls")
    .eq("id", id)
    .eq("status", "aprobada")
    .maybeSingle();
  if (!a) return undefined;
  const { data: prof } = await supabase
    .from("public_artist_profiles")
    .select("id, name, origin, technique, bio, instagram, website, portfolio_url")
    .eq("id", (a as RawArtwork).artist_id)
    .maybeSingle();
  return toDbWork(a as RawArtwork, (prof as DbArtistProfile) || undefined, lang);
}

export async function fetchDbArtistBySlug(slug: string, lang: Lang = "en"): Promise<{ profile: DbArtistProfile; works: DbWork[] } | undefined> {
  const { artworks, profiles } = await fetchApprovedWithProfiles();
  const match = Object.values(profiles).find((p) => p.name && artistSlug(p.name) === slug);
  if (!match) return undefined;
  const works = artworks.filter((a) => a.artist_id === match.id).map((a) => toDbWork(a, match, lang));
  return { profile: match, works };
}
