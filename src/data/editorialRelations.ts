// Manual relations for SEO inter-linking on Editorial article pages.
export const EDITORIAL_RELATIONS: Record<
  string,
  { relatedWorks: string[]; relatedArticles: string[] }
> = {
  "bronce-contemporaneo": {
    relatedWorks: ["torsion-i", "mujer-y-nino", "confluencia"],
    relatedArticles: ["helena-vazquez-entrevista", "coleccionar-escultura-hoy"],
  },
  "acero-corten-paisaje": {
    relatedWorks: ["vertigo", "vertice", "nexo"],
    relatedArticles: ["coleccionar-escultura-hoy", "bronce-contemporaneo"],
  },
  "helena-vazquez-entrevista": {
    relatedWorks: ["mujer-y-nino", "torsion-i", "arco"],
    relatedArticles: ["bronce-contemporaneo", "coleccionar-escultura-hoy"],
  },
  "coleccionar-escultura-hoy": {
    relatedWorks: ["vinculo", "pliegue-iii", "luz-interior"],
    relatedArticles: ["bronce-contemporaneo", "acero-corten-paisaje"],
  },
};
