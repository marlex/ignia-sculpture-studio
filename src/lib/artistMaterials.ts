import { WORKS } from "@/data/igniaWorks";

// Each artist's bio states one material identity (or an explicit mix, e.g.
// Marcos Iriarte's "bronze and ceramic"). A WORKS entry only genuinely
// belongs on their profile if its own material matches — some catalogue
// entries were attributed to an artist whose bio doesn't actually cover
// that material, which reads as a factual error on the profile page.
const ARTIST_MATERIAL_KEYWORDS: Record<string, string[]> = {
  "susana-solano": ["metal"],
  "helena-vazquez": ["bronce", "bronze"],
  "carmen-aldea": ["marmol", "marble"],
  "marcos-iriarte": ["bronce", "bronze", "ceramica", "ceramic"],
  "alba-costa": ["marmol", "marble"],
  "diego-lara": ["acero", "steel", "vidrio", "glass"],
  "sofia-mendez": ["piedra", "stone", "madera", "wood"],
  "ada-la-cadena": ["ceramica", "ceramic"],
  "lucia-pardo": ["ceramica", "ceramic", "gres", "stoneware"],
  "pablo-reyes": ["bronce", "bronze"],
  "ines-ferrer": ["alabastro", "alabaster"],
  "tomas-vigo": ["vidrio", "glass"],
  "ana-ruiz": ["acero", "steel"],
  "camila-soler": ["bronce", "bronze", "laton", "brass"],
  "mateo-rivas": ["piedra", "stone", "mineral"],
};

const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export const materialMatchesArtist = (slug: string, work: { es: { material: string }; en: { material: string } }) => {
  const keywords = ARTIST_MATERIAL_KEYWORDS[slug];
  if (!keywords) return true;
  const materials = normalize(`${work.es.material} ${work.en.material}`);
  return keywords.some((k) => materials.includes(k));
};

// Only the artist's own works whose material actually matches their stated
// technique — see materialMatchesArtist above.
export const getWorksForArtist = (slug: string, bioNombre: string): (typeof WORKS)[number][] =>
  WORKS.filter((w) => (w.es.artist === bioNombre || w.en.artist === bioNombre) && materialMatchesArtist(slug, w));
