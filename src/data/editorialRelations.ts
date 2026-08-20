// Manual relations for SEO inter-linking on Editorial article pages.
export const EDITORIAL_RELATIONS: Record<
  string,
  { relatedWorks: string[]; relatedArticles: string[]; featuredArtists: string[] }
> = {
  "bronce-contemporaneo": {
    relatedWorks: ["torsion-i", "mujer-y-nino", "confluencia"],
    relatedArticles: ["helena-vazquez-entrevista", "coleccionar-escultura-hoy"],
    featuredArtists: ["Helena Vázquez", "Marcos Iriarte", "Carmen Aldea"],
  },
  "acero-corten-paisaje": {
    relatedWorks: ["vertigo", "vertice", "nexo"],
    relatedArticles: ["coleccionar-escultura-hoy", "bronce-contemporaneo"],
    featuredArtists: ["Tomás Vigo", "Sofía Méndez", "Lucía Pardo"],
  },
  "helena-vazquez-entrevista": {
    relatedWorks: ["mujer-y-nino", "torsion-i", "arco"],
    relatedArticles: ["bronce-contemporaneo", "coleccionar-escultura-hoy"],
    featuredArtists: ["Helena Vázquez", "Marcos Iriarte", "Carmen Aldea"],
  },
  "coleccionar-escultura-hoy": {
    relatedWorks: ["vinculo", "pliegue-iii", "efusion"],
    relatedArticles: ["bronce-contemporaneo", "acero-corten-paisaje"],
    featuredArtists: ["Helena Vázquez", "Marcos Iriarte", "Carmen Aldea"],
  },
};
