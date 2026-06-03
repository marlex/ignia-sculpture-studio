import hero1 from "@/assets/hero-real-1.jpg";
import hero2 from "@/assets/hero-real-2.jpg";
import hero3 from "@/assets/hero-real-3.jpg";
import obra1 from "@/assets/obra-1.jpg";
import obra2 from "@/assets/obra-2.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra4 from "@/assets/obra-4.jpg";
import obra5 from "@/assets/obra-5.jpg";
import obra6 from "@/assets/obra-6.jpg";
import obra7 from "@/assets/obra-7.jpg";
import obra8 from "@/assets/obra-8.jpg";
import arco from "@/assets/perfil-escultura-arco.jpg";
import caida from "@/assets/perfil-escultura-caida.jpg";
import ecoOndas from "@/assets/perfil-escultura-eco.jpg";
import latido from "@/assets/perfil-escultura-latido.jpg";
import memoria from "@/assets/perfil-escultura-memoria.jpg";
import mineral from "@/assets/perfil-escultura-mineral.jpg";
import nexo from "@/assets/perfil-escultura-nexo.jpg";
import orbita from "@/assets/perfil-escultura-orbita.jpg";
import quietudPerfil from "@/assets/perfil-escultura-quietud.jpg";
import respiro from "@/assets/perfil-escultura-respiro.jpg";
import resto from "@/assets/perfil-escultura-resto.jpg";
import umbral from "@/assets/perfil-escultura-umbral.jpg";
import verticePerfil from "@/assets/perfil-escultura-vertice.jpg";
import hecate1 from "@/assets/hecate-triformis-1.jpg";
import hecate2 from "@/assets/hecate-triformis-2.jpg";
import hecate3 from "@/assets/hecate-triformis-3.jpg";
import mujerNino1 from "@/assets/mujer-y-nino-1.jpg";
import mujerNino2 from "@/assets/mujer-y-nino-2.jpg";
import mujerNino3 from "@/assets/mujer-y-nino-3.jpg";

export type WorkModelKey =
  | "hero-flight"
  | "hero-offering"
  | "hero-torsion"
  | "figure-curvy"
  | "marble-fold"
  | "corten-ribbon"
  | "wood-root"
  | "blue-ceramic"
  | "slender-figure"
  | "white-loop"
  | "amber-glass"
  | "bronze-fall"
  | "black-figure"
  | "white-ring"
  | "geometric";

type Lang = "es" | "en";

type WorkCopy = {
  title: string;
  artist: string;
  material: string;
  year: string;
  edition: string;
  price: string;
  description: string;
  authenticity: string;
};

type WorkRecord = {
  slug: string;
  image: string;
  model: WorkModelKey;
  glbUrl?: string;
  extraImages?: string[];
  es: WorkCopy;
  en: WorkCopy;
};

const GLB_HECATE = "/models/hecate-triformis.glb";
const GLB_MUJER = "/models/mujer-y-nino.glb";

const desc = {
  es: "Pieza seleccionada por Ignia por su presencia escultórica, calidad material y trazabilidad completa de taller. El visor 3D usa el mismo registro de obra que la fotografía y la ficha ampliada.",
  en: "A work selected by Ignia for its sculptural presence, material quality and complete studio traceability. The 3D viewer uses the same artwork record as the photograph and detail page.",
};

export const HERO_WORK_SLUGS = ["vinculo", "torsion-i", "vertigo"] as const;
export const CATALOGUE_WORK_SLUGS = ["mujer-y-nino", "pliegue-iii", "raiz", "origen", "eco", "quietud-alabastro", "luz-interior", "arco"] as const;

export const WORKS: WorkRecord[] = [
  { slug: "vinculo", image: hecate1, model: "hero-flight", glbUrl: GLB_HECATE, es: { title: "Vínculo", artist: "Carmen Aldea", material: "Mármol de Macael tallado", year: "2025", edition: "Edición única", price: "€ 5.200", description: desc.es, authenticity: "#0xc81a…f390" }, en: { title: "Vínculo", artist: "Carmen Aldea", material: "Carved Macael marble", year: "2025", edition: "Unique edition", price: "€ 5,200", description: desc.en, authenticity: "#0xc81a…f390" } },
  { slug: "mujer-y-nino", image: mujerNino1, model: "figure-curvy", glbUrl: GLB_MUJER, extraImages: [mujerNino2, mujerNino3], es: { title: "Mujer y Niño", artist: "Helena Vázquez", material: "Bronce patinado", year: "2024", edition: "Edición única", price: "€ 6.800", description: "Estudio escultórico de figura materna. Pieza con visor 3D activo para explorarla desde cualquier ángulo.", authenticity: "#0x787d…4db" }, en: { title: "Woman and Child", artist: "Helena Vázquez", material: "Patinated bronze", year: "2024", edition: "Unique edition", price: "€ 6,800", description: "Sculptural study of a maternal figure. Piece with active 3D viewer to explore from every angle.", authenticity: "#0x787d…4db" } },
  { slug: "torsion-i", image: hero2, model: "hero-offering", es: { title: "Ofrenda", artist: "Helena Vázquez", material: "Bronce pulido a mano", year: "2025", edition: "Edición única", price: "€ 9.500", description: "Bronce pulido con doble lazo y esfera superior. Una pieza de presencia inmediata.", authenticity: "#0x7b14…e08" }, en: { title: "Offering", artist: "Helena Vázquez", material: "Hand-polished bronze", year: "2025", edition: "Unique edition", price: "€ 9,500", description: "Polished bronze with a double loop and upper sphere.", authenticity: "#0x7b14…e08" } },
  { slug: "confluencia", image: obra1, model: "figure-curvy", extraImages: [obra2, obra3, obra4], es: { title: "Confluencia", artist: "Marcos Iriarte", material: "Bronce", year: "2024", edition: "Edición única", price: "€ 4.200", description: desc.es, authenticity: "#0x3a9f…c21" }, en: { title: "Confluence", artist: "Marcos Iriarte", material: "Bronze", year: "2024", edition: "Unique edition", price: "€ 4,200", description: desc.en, authenticity: "#0x3a9f…c21" } },
  { slug: "pliegue-iii", image: obra2, model: "marble-fold", extraImages: [obra5, obra7], es: { title: "Pliegue III", artist: "Alba Costa", material: "Mármol", year: "2024", edition: "1 de 5", price: "€ 7.400", description: desc.es, authenticity: "#0x598e…07e" }, en: { title: "Fold III", artist: "Alba Costa", material: "Marble", year: "2024", edition: "1 of 5", price: "€ 7,400", description: desc.en, authenticity: "#0x598e…07e" } },
  { slug: "vertigo", image: obra3, model: "corten-ribbon", extraImages: [obra6, obra8], es: { title: "Vértigo", artist: "Diego Lara", material: "Acero corten", year: "2025", edition: "Edición única", price: "€ 2.900", description: desc.es, authenticity: "#0x787d…4db" }, en: { title: "Vertigo", artist: "Diego Lara", material: "Corten steel", year: "2025", edition: "Unique edition", price: "€ 2,900", description: desc.en, authenticity: "#0x787d…4db" } },
  { slug: "raiz", image: obra4, model: "wood-root", es: { title: "Raíz", artist: "Sofía Méndez", material: "Madera de roble", year: "2023", edition: "Edición única", price: "€ 1.650", description: desc.es, authenticity: "#0x976c…938" }, en: { title: "Root", artist: "Sofía Méndez", material: "Oak wood", year: "2023", edition: "Unique edition", price: "€ 1,650", description: desc.en, authenticity: "#0x976c…938" } },
  { slug: "origen", image: obra5, model: "blue-ceramic", es: { title: "Origen", artist: "Lucía Pardo", material: "Cerámica esmaltada", year: "2025", edition: "2 de 8", price: "€ 580", description: desc.es, authenticity: "#0xa614…22f" }, en: { title: "Origin", artist: "Lucía Pardo", material: "Glazed ceramic", year: "2025", edition: "2 of 8", price: "€ 580", description: desc.en, authenticity: "#0xa614…22f" } },
  { slug: "eco", image: obra6, model: "slender-figure", es: { title: "Eco", artist: "Pablo Reyes", material: "Bronce", year: "2024", edition: "Edición única", price: "€ 5.400", description: desc.es, authenticity: "#0xbf03…686" }, en: { title: "Echo", artist: "Pablo Reyes", material: "Bronze", year: "2024", edition: "Unique edition", price: "€ 5,400", description: desc.en, authenticity: "#0xbf03…686" } },
  { slug: "quietud-alabastro", image: obra7, model: "white-loop", es: { title: "Quietud", artist: "Inés Ferrer", material: "Alabastro", year: "2025", edition: "1 de 6", price: "€ 2.300", description: desc.es, authenticity: "#0xddf2…2dd" }, en: { title: "Stillness", artist: "Inés Ferrer", material: "Alabaster", year: "2025", edition: "1 of 6", price: "€ 2,300", description: desc.en, authenticity: "#0xddf2…2dd" } },
  { slug: "luz-interior", image: obra8, model: "amber-glass", es: { title: "Luz interior", artist: "Tomás Vigo", material: "Vidrio soplado", year: "2025", edition: "3 de 9", price: "€ 890", description: desc.es, authenticity: "#0xf5e1…b42" }, en: { title: "Inner light", artist: "Tomás Vigo", material: "Blown glass", year: "2025", edition: "3 of 9", price: "€ 890", description: desc.en, authenticity: "#0xf5e1…b42" } },
  { slug: "arco", image: arco, model: "white-ring", es: { title: "Arco", artist: "Helena Vázquez", material: "Piedra negra", year: "2023", edition: "Edición única", price: "€ 3.100", description: desc.es, authenticity: "#0x4e7a…a11" }, en: { title: "Arch", artist: "Helena Vázquez", material: "Black stone", year: "2023", edition: "Unique edition", price: "€ 3,100", description: desc.en, authenticity: "#0x4e7a…a11" } },
  { slug: "caida", image: caida, model: "bronze-fall", es: { title: "Caída", artist: "Cristina Iglesias", material: "Bronce", year: "2024", edition: "Edición única", price: "€ 8.900", description: desc.es, authenticity: "#0x8c12…91d" }, en: { title: "Fall", artist: "Cristina Iglesias", material: "Bronze", year: "2024", edition: "Unique edition", price: "€ 8,900", description: desc.en, authenticity: "#0x8c12…91d" } },
  { slug: "eco-ondas", image: ecoOndas, model: "hero-offering", es: { title: "Eco", artist: "Cristina Iglesias", material: "Bronce", year: "2024", edition: "1 de 3", price: "€ 7.200", description: desc.es, authenticity: "#0x7a33…19b" }, en: { title: "Echo", artist: "Cristina Iglesias", material: "Bronze", year: "2024", edition: "1 of 3", price: "€ 7,200", description: desc.en, authenticity: "#0x7a33…19b" } },
  { slug: "umbral", image: umbral, model: "white-ring", es: { title: "Umbral", artist: "Cristina Iglesias", material: "Mármol blanco", year: "2025", edition: "Edición única", price: "€ 9.800", description: desc.es, authenticity: "#0xd203…51a" }, en: { title: "Threshold", artist: "Cristina Iglesias", material: "White marble", year: "2025", edition: "Unique edition", price: "€ 9,800", description: desc.en, authenticity: "#0xd203…51a" } },
  { slug: "vertice", image: verticePerfil, model: "geometric", es: { title: "Vértice", artist: "Jaume Plensa", material: "Acero corten", year: "2025", edition: "Edición única", price: "€ 4.500", description: desc.es, authenticity: "#0x573d…c20" }, en: { title: "Vertex", artist: "Jaume Plensa", material: "Corten steel", year: "2025", edition: "Unique edition", price: "€ 4,500", description: desc.en, authenticity: "#0x573d…c20" } },
  { slug: "quietud", image: quietudPerfil, model: "white-loop", es: { title: "Quietud", artist: "Jaume Plensa", material: "Alabastro", year: "2024", edition: "2 de 6", price: "€ 3.400", description: desc.es, authenticity: "#0x36aa…5c0" }, en: { title: "Stillness", artist: "Jaume Plensa", material: "Alabaster", year: "2024", edition: "2 of 6", price: "€ 3,400", description: desc.en, authenticity: "#0x36aa…5c0" } },
  { slug: "resto", image: resto, model: "wood-root", es: { title: "Resto", artist: "Jaume Plensa", material: "Madera tallada", year: "2023", edition: "Edición única", price: "€ 2.100", description: desc.es, authenticity: "#0x444b…e75" }, en: { title: "Remnant", artist: "Jaume Plensa", material: "Carved wood", year: "2023", edition: "Unique edition", price: "€ 2,100", description: desc.en, authenticity: "#0x444b…e75" } },
  { slug: "memoria", image: memoria, model: "marble-fold", es: { title: "Memoria", artist: "Marcos Iriarte", material: "Cerámica esmaltada", year: "2025", edition: "1 de 4", price: "€ 1.250", description: desc.es, authenticity: "#0x2fa1…33c" }, en: { title: "Memory", artist: "Marcos Iriarte", material: "Glazed ceramic", year: "2025", edition: "1 of 4", price: "€ 1,250", description: desc.en, authenticity: "#0x2fa1…33c" } },
  { slug: "nexo", image: nexo, model: "white-ring", es: { title: "Nexo", artist: "Ana Ruiz", material: "Acero pulido", year: "2025", edition: "2 de 5", price: "€ 3.800", description: desc.es, authenticity: "#0x99d4…01f" }, en: { title: "Nexus", artist: "Ana Ruiz", material: "Polished steel", year: "2025", edition: "2 of 5", price: "€ 3,800", description: desc.en, authenticity: "#0x99d4…01f" } },
  { slug: "latido", image: latido, model: "amber-glass", es: { title: "Latido", artist: "Diego Lara", material: "Vidrio rojo", year: "2025", edition: "3 de 8", price: "€ 720", description: desc.es, authenticity: "#0x31ed…f0a" }, en: { title: "Heartbeat", artist: "Diego Lara", material: "Red glass", year: "2025", edition: "3 of 8", price: "€ 720", description: desc.en, authenticity: "#0x31ed…f0a" } },
  { slug: "orbita", image: orbita, model: "hero-offering", es: { title: "Órbita", artist: "Camila Soler", material: "Bronce y latón", year: "2024", edition: "1 de 3", price: "€ 6.300", description: desc.es, authenticity: "#0x6312…77c" }, en: { title: "Orbit", artist: "Camila Soler", material: "Bronze and brass", year: "2024", edition: "1 of 3", price: "€ 6,300", description: desc.en, authenticity: "#0x6312…77c" } },
  { slug: "mineral", image: mineral, model: "geometric", es: { title: "Mineral", artist: "Mateo Rivas", material: "Piedra verde", year: "2025", edition: "Edición única", price: "€ 2.700", description: desc.es, authenticity: "#0xa0c6…d18" }, en: { title: "Mineral", artist: "Mateo Rivas", material: "Green stone", year: "2025", edition: "Unique edition", price: "€ 2,700", description: desc.en, authenticity: "#0xa0c6…d18" } },
  { slug: "respiro", image: respiro, model: "amber-glass", es: { title: "Respiro", artist: "Helena Vázquez", material: "Resina ámbar", year: "2025", edition: "4 de 9", price: "€ 540", description: desc.es, authenticity: "#0xf0e4…b12" }, en: { title: "Breath", artist: "Helena Vázquez", material: "Amber resin", year: "2025", edition: "4 of 9", price: "€ 540", description: desc.en, authenticity: "#0xf0e4…b12" } },
];

export type LocalizedWork = ReturnType<typeof localizeWork>;

const localizeWork = (work: WorkRecord, lang: Lang, index: number) => ({
  slug: work.slug,
  image: work.image,
  model: work.model,
  glbUrl: work.glbUrl,
  extraImages: work.extraImages,
  index,
  ...work[lang],
});

export const getWorkBySlug = (slug: string | undefined, lang: Lang) => {
  const index = Math.max(0, WORKS.findIndex((work) => work.slug === slug));
  return localizeWork(WORKS[index], lang, index);
};

export const getWorksBySlugs = (slugs: readonly string[], lang: Lang) =>
  slugs.map((slug) => getWorkBySlug(slug, lang));

export const getHeroWorks = (lang: Lang) => getWorksBySlugs(HERO_WORK_SLUGS, lang);

export const getCatalogueWorks = (lang: Lang) => getWorksBySlugs(CATALOGUE_WORK_SLUGS, lang);