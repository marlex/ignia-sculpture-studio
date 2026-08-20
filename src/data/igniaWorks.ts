import hero1 from "@/assets/hero-real-1.jpg";
import hero2 from "@/assets/hero-real-2.jpg";
import hero3 from "@/assets/hero-real-3.jpg";
import obra1 from "@/assets/obra-1.jpg";
import obraPliegueAsset from "@/assets/obra-pliegue-iii-new.jpg.asset.json";
import obra3 from "@/assets/obra-3.jpg";
import obraRaizAsset from "@/assets/obra-raiz-new.jpg.asset.json";
import obraOrigenAsset from "@/assets/obra-origen-new.jpg.asset.json";
import obraDespertarAsset from "@/assets/obra-despertar.jpg.asset.json";
import obra6 from "@/assets/obra-eco.jpg";
import obraQuietudAsset from "@/assets/obra-quietud-new.webp.asset.json";
import obra8 from "@/assets/obra-luz-interior.jpg";

const obra2 = obraPliegueAsset.url;
const obra4 = obraRaizAsset.url;
const obra5 = obraOrigenAsset.url;
const obraDespertar = obraDespertarAsset.url;
const obra7 = obraQuietudAsset.url;
const obraEfusion = obraEfusionAsset.url;
import arco from "@/assets/obra-arco-new.jpg";
import obraSudarioAsset from "@/assets/obra-sudario.jpeg.asset.json";
const obraCuerpoFosil = obraSudarioAsset.url;
import obraEfusionAsset from "@/assets/obra-efusion.jpg.asset.json";
import obraMantoAsset from "@/assets/obra-manto.jpg.asset.json";
const obraManto = obraMantoAsset.url;
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
import triadaGalleryAsset from "@/assets/triada-olimpias-gallery.png.asset.json";
const triadaGallery = triadaGalleryAsset.url;
import ulmukMainAsset from "@/assets/ulmuk-vase-main.jpeg.asset.json";
import ulmuk2Asset from "@/assets/ulmuk-vase-2.jpeg.asset.json";
import ulmuk3Asset from "@/assets/ulmuk-vase-3.jpeg.asset.json";
import ulmuk4Asset from "@/assets/ulmuk-vase-4.jpeg.asset.json";
const ulmukMain = ulmukMainAsset.url;
const ulmuk2 = ulmuk2Asset.url;
const ulmuk3 = ulmuk3Asset.url;
const ulmuk4 = ulmuk4Asset.url;

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
  heroImage?: string;
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
export const CATALOGUE_WORK_SLUGS = ["arco", "nervadura", "ulmuk-vase", "vinculo", "quietud-alabastro", "efusion", "mujer-y-nino", "eco", "pliegue-iii", "cuerpo-fosil"] as const;

export const WORKS: WorkRecord[] = [
  { slug: "vinculo", image: hecate1, heroImage: triadaGallery, model: "hero-flight", glbUrl: GLB_HECATE, extraImages: [triadaGallery, hecate2, hecate3], es: { title: "Tríada Olimpias", artist: "Carmen Aldea", material: "Mármol de Macael tallado", year: "2025", edition: "Edición única", price: "€ 9.500", description: desc.es, authenticity: "#0xc81a…f390" }, en: { title: "Tríada Olimpias", artist: "Carmen Aldea", material: "Carved Macael marble", year: "2025", edition: "Unique edition", price: "€ 9,500", description: desc.en, authenticity: "#0xc81a…f390" } },
  { slug: "mujer-y-nino", image: mujerNino1, model: "figure-curvy", glbUrl: GLB_MUJER, extraImages: [mujerNino2, mujerNino3], es: { title: "Mujer y Niño", artist: "Helena Vázquez", material: "Bronce patinado", year: "2024", edition: "Edición única", price: "€ 11.200", description: "Estudio escultórico de figura materna. Pieza con visor 3D activo para explorarla desde cualquier ángulo.", authenticity: "#0x787d…4db" }, en: { title: "Woman and Child", artist: "Helena Vázquez", material: "Patinated bronze", year: "2024", edition: "Unique edition", price: "€ 11,200", description: "Sculptural study of a maternal figure. Piece with active 3D viewer to explore from every angle.", authenticity: "#0x787d…4db" } },
  { slug: "torsion-i", image: hero2, model: "hero-offering", es: { title: "Ofrenda", artist: "Helena Vázquez", material: "Bronce pulido a mano", year: "2025", edition: "Edición única", price: "€ 9.500", description: "Bronce pulido con doble lazo y esfera superior. Una pieza de presencia inmediata.", authenticity: "#0x7b14…e08" }, en: { title: "Offering", artist: "Helena Vázquez", material: "Hand-polished bronze", year: "2025", edition: "Unique edition", price: "€ 9,500", description: "Polished bronze with a double loop and upper sphere.", authenticity: "#0x7b14…e08" } },
  { slug: "confluencia", image: obra1, model: "figure-curvy", extraImages: [obra2, obra3, obra4], es: { title: "Confluencia", artist: "Marcos Iriarte", material: "Bronce", year: "2024", edition: "Edición única", price: "€ 4.200", description: desc.es, authenticity: "#0x3a9f…c21" }, en: { title: "Confluence", artist: "Marcos Iriarte", material: "Bronze", year: "2024", edition: "Unique edition", price: "€ 4,200", description: desc.en, authenticity: "#0x3a9f…c21" } },
  { slug: "pliegue-iii", image: obra2, model: "marble-fold", es: { title: "Pliegue III", artist: "Alba Costa", material: "Mármol", year: "2024", edition: "1 de 5", price: "€ 12.500", description: desc.es, authenticity: "#0x598e…07e" }, en: { title: "Fold III", artist: "Alba Costa", material: "Marble", year: "2024", edition: "1 of 5", price: "€ 12,500", description: desc.en, authenticity: "#0x598e…07e" } },
  { slug: "vertigo", image: obra3, model: "corten-ribbon", extraImages: [obra6, obra8], es: { title: "Vértigo", artist: "Diego Lara", material: "Acero corten", year: "2025", edition: "Edición única", price: "€ 2.900", description: desc.es, authenticity: "#0x787d…4db" }, en: { title: "Vertigo", artist: "Diego Lara", material: "Corten steel", year: "2025", edition: "Unique edition", price: "€ 2,900", description: desc.en, authenticity: "#0x787d…4db" } },
  { slug: "nervadura", image: obraManto, model: "slender-figure", es: { title: "Manto", artist: "Sofía Méndez", material: "Acero inoxidable forjado y pulido a espejo", year: "2025", edition: "Pieza única", price: "€ 10.200", description: "Figura vertical de acero inoxidable forjado y pulido a espejo. Un manto de metal envuelve el cuerpo en pliegues amplios y pausados, deteniéndose a media altura como una tela congelada. La superficie reflectante devuelve el entorno y la mirada del espectador, convirtiendo la pieza en presencia cambiante. Forjada en una sola operación de taller, cada pliegue conserva la memoria del calor y del golpe.", authenticity: "#0x976c…938" }, en: { title: "Mantle", artist: "Sofía Méndez", material: "Forged stainless steel, mirror-polished", year: "2025", edition: "Unique piece", price: "€ 10,200", description: "A vertical figure in forged stainless steel, mirror-polished. A mantle of metal wraps the body in broad, paused folds, stopping at mid-height like frozen cloth. The reflective surface returns the surroundings and the viewer's gaze, turning the piece into a shifting presence. Forged in a single studio operation, each fold retains the memory of heat and the hammer.", authenticity: "#0x976c…938" } },
  { slug: "ulmuk-vase", image: ulmukMain, model: "blue-ceramic", glbUrl: "/models/ulmuk-vase.glb", extraImages: [ulmuk2, ulmuk3, ulmuk4], es: { title: "Ulmuk Vase", artist: "Ada La Cadena", material: "Cerámica esmaltada", year: "2025", edition: "Edición única", price: "€ 1.450", description: "Ulmuk es un jarrón de cerámica de forma antropomorfa: un cuerpo cerrado con cuello largo y dos asas simétricas, sobre los que emerge con perturbadora naturalidad un rostro humano modelado en relieve. Ojos entrecerrados, nariz pronunciada, labios entreabiertos. Una expresión suspendida entre el peso y la resignación, entre la memoria y el sueño.\n\nSobre toda la superficie, una ornamentación densa en azul cobalto sobre fondo blanco despliega motivos florales y arabescos que no decoran sino que invaden. Trepan por la frente, bordean los párpados, fluyen desde la boca como si el ornamento y el ser fueran una sola materia. Toques de rosa y rojo rompen la frialdad del azul y aportan una dimensión carnal, casi visceral, al conjunto.\n\nLa pieza dialoga con la tradición de la cerámica mediterránea, la talavera, el azulejo portugués, el mayólica italiano, pero la subvierte al convertir el objeto utilitario en retrato. Ulmuk habla sin voz, existe en ese espacio liminal donde la arcilla deja de ser materia para convertirse en memoria.", authenticity: "#0xulmk…v4se" }, en: { title: "Ulmuk Vase", artist: "Ada La Cadena", material: "Glazed ceramic", year: "2025", edition: "Unique edition", price: "€ 1,450", description: "Ulmuk is an anthropomorphic ceramic vase: a closed body with a long neck and two symmetrical handles, from which a human face modelled in relief emerges with unsettling naturalness. Half-closed eyes, a pronounced nose, parted lips. An expression suspended between weight and resignation, between memory and dream.\n\nAcross the entire surface, a dense cobalt-blue ornamentation on a white ground unfolds floral motifs and arabesques that do not decorate but invade. They climb the forehead, edge the eyelids, flow from the mouth as if ornament and being were one single matter. Touches of pink and red break the coldness of the blue and bring a carnal, almost visceral dimension to the whole.\n\nThe piece dialogues with the Mediterranean ceramic tradition — Talavera, Portuguese azulejo, Italian maiolica — but subverts it by turning the utilitarian object into a portrait. Ulmuk speaks without voice, existing in that liminal space where clay ceases to be matter and becomes memory.", authenticity: "#0xulmk…v4se" } },
  { slug: "cuerpo-fosil", image: obraCuerpoFosil, model: "blue-ceramic", es: { title: "Sudario", artist: "Lucía Pardo", material: "Gres chamotado, esmalte de ceniza y óxido de hierro", year: "2025", edition: "Pieza única", price: "€ 4.100", description: "Gres chamotado cocido a alta temperatura en horno de leña, trabajado hasta un espesor mínimo para que la materia se comporte como tela. Los pliegues giran sobre sí mismos y quedan detenidos en pleno movimiento, sostenidos únicamente por una base estrecha. El esmalte de ceniza y el óxido de hierro se aplican en veladuras finísimas, dejando la superficie mate y ligeramente arenosa. Cada pliegue pertenece a esta única cocción y no puede repetirse.", authenticity: "#0xa614…22f" }, en: { title: "Shroud", artist: "Lucía Pardo", material: "Chamotte stoneware, ash glaze and iron oxide", year: "2025", edition: "Unique piece", price: "€ 4,100", description: "Chamotte stoneware wood-fired at high temperature, worked down to a minimal thickness so the clay behaves like cloth. The folds turn on themselves and are arrested mid-movement, held only by a narrow base. Ash glaze and iron oxide are applied in the thinnest of veils, leaving the surface matte and faintly sandy. Every fold belongs to this single firing and cannot be repeated.", authenticity: "#0xa614…22f" } },
  { slug: "eco", image: obraDespertar, model: "slender-figure", es: { title: "Despertar", artist: "Pablo Reyes", material: "Bronce", year: "2024", edition: "Edición única", price: "€ 8.200", description: "Figura masculina de bronce que emerge a medio torso de una masa rocosa fragmentada. El cuerpo se arquea en un gesto de tensión, con un brazo extendido hacia adelante como quien alcanza la superficie desde el interior de la materia. La pátina oscura deja visibles los matices ocre y ámbar del metal, mientras las zonas rotas conservan la aspereza del molde original. La pieza se detiene en el instante preciso en que la forma humana se libera de la piedra.", authenticity: "#0xbf03…686" }, en: { title: "Awakening", artist: "Pablo Reyes", material: "Bronze", year: "2024", edition: "Unique edition", price: "€ 8,200", description: "A male bronze figure emerging at half-torso from a fragmented rocky mass. The body arches in a gesture of tension, with one arm reaching forward as if rising toward the surface from within the matter. The dark patina leaves the ochre and amber tones of the metal visible, while the broken areas retain the roughness of the original mould. The piece is arrested at the precise moment when the human form frees itself from the stone.", authenticity: "#0xbf03…686" } },
  { slug: "quietud-alabastro", image: obra7, model: "white-loop", es: { title: "Quietud", artist: "Inés Ferrer", material: "Alabastro", year: "2025", edition: "1 de 6", price: "€ 3.200", description: desc.es, authenticity: "#0xddf2…2dd" }, en: { title: "Stillness", artist: "Inés Ferrer", material: "Alabaster", year: "2025", edition: "1 of 6", price: "€ 3,200", description: desc.en, authenticity: "#0xddf2…2dd" } },
  { slug: "efusion", image: obraEfusion, model: "amber-glass", es: { title: "Efusión", artist: "Tomás Vigo", material: "Vidrio soplado en caliente sobre estructura de hierro oxidado", year: "2025", edition: "Pieza única", price: "€ 6.800", description: "Vidrio soplado en caliente sobre una estructura de hierro oxidado. La masa vitrea se despliega en formas orgánicas que parecen derramarse sobre el metal, capturando un momento de efusión entre rigidez y fluidez. Cada pieza es el resultado de una sola operación de taller, donde el control del soplo y el azar del enfriamiento definen un gesto irrepetible.", authenticity: "#0xf5e1…b42" }, en: { title: "Effusion", artist: "Tomás Vigo", material: "Hot-blown glass on an oxidised iron armature", year: "2025", edition: "Unique piece", price: "€ 6,800", description: "Hot-blown glass on an oxidised iron armature. The molten glass unfolds in organic shapes that seem to spill over the metal, capturing a moment of effusion between rigidity and fluidity. Each piece is the result of a single studio operation, where the control of the blow and the chance of cooling define an unrepeatable gesture.", authenticity: "#0xf5e1…b42" } },
  { slug: "arco", image: arco, model: "white-ring", es: { title: "Arco", artist: "Helena Vázquez", material: "Piedra negra", year: "2023", edition: "Edición única", price: "€ 4.300", description: desc.es, authenticity: "#0x4e7a…a11" }, en: { title: "Arch", artist: "Helena Vázquez", material: "Black stone", year: "2023", edition: "Unique edition", price: "€ 4,300", description: desc.en, authenticity: "#0x4e7a…a11" } },
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
  heroImage: work.heroImage,
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