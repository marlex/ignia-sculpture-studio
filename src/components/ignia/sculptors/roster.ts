import { BIOS } from "@/pages/PerfilEscultor";
import { WORKS } from "@/data/igniaWorks";
import { artistSlug } from "@/lib/artistSlug";
import { materialMatchesArtist } from "@/lib/artistMaterials";
import type { Lang } from "@/i18n/LanguageContext";

export type RosterEntry = {
  slug: string;
  nombre: string;
  technique: string;
  location: string;
  thumbnail: string;
};

// A location prefix like "Toledo, España." sits at the start of each bio,
// before the technique sentence — same heuristic ObraDetalle.tsx uses for
// the inline artist blurb on a work's detail page.
const extractLocation = (bioText: string) => {
  const firstDot = bioText.indexOf(". ");
  return firstDot > 0 && firstDot < 60 ? bioText.slice(0, firstDot) : "";
};

// Only artists who actually have a published, material-matching work are
// real, sellable sculptors — a handful of BIOS entries exist purely as
// inspirational references and were never represented artists.
export const getSculptorRoster = (lang: Lang): RosterEntry[] =>
  Object.entries(BIOS)
    .map(([slug, bio]) => {
      const work = WORKS.find((w) => (w.es.artist === bio.nombre || w.en.artist === bio.nombre) && materialMatchesArtist(slug, w));
      if (!work) return null;
      const bioText = lang === "es" ? bio.bioEs : bio.bioEn;
      return {
        slug,
        nombre: bio.nombre,
        technique: lang === "es" ? bio.espEs : bio.espEn,
        location: extractLocation(bioText),
        // Same priority as the profile page: a dedicated portrait wins,
        // otherwise their own work — so the thumbnail here is always the
        // exact photo they'll see again when they click through.
        thumbnail: bio.retrato ?? work.image,
      };
    })
    .filter((entry): entry is RosterEntry => entry !== null);

export { artistSlug };
