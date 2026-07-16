## Cambios

### 1. Eliminar sección "Referentes que nos inspiran"
- En `src/pages/Index.tsx`: quitar el import `Inspiracion` y su uso `<Inspiracion />` (línea 98).
- Eliminar el archivo `src/components/ignia/Inspiracion.tsx` (ya no se usará en otras rutas — es la única referencia).

### 2. Añadir post de Chillida en Ignia Learn
Nuevo artículo en `src/data/aprendeArticles.ts` con la misma estructura, longitud y calidad de los existentes (~8 min de lectura, secciones h2 + párrafos, referencias externas a instituciones/museos para SEO).

- **slug:** `chillida-espacio-hierro-vacio`
- **imagen:** reutilizar `@/assets/artist-eduardo-chillida-real.jpg` (ya presente en el proyecto, la misma que usaba la sección eliminada).
- **fecha:** 2026-07-10, **autor:** "Ignia Editorial"
- **tag ES:** "Maestros de la escultura" / **EN:** "Sculpture masters"
- **título ES:** "Eduardo Chillida: el escultor que dio forma al vacío"
- **título EN:** "Eduardo Chillida: the sculptor who gave form to emptiness"
- **featuredWorks / featuredArtists:** relacionados con hierro/acero/espacio del catálogo actual (a elegir entre los slugs ya existentes en `igniaWorks` — p. ej. piezas de Helena Vázquez, Marcos Iriarte, Carmen Aldea que trabajan volumen y metal).

**Estructura de contenido (ES y EN, paralelas):**
1. Intro: por qué Chillida sigue siendo el referente del "espacio como material".
2. h2 *Del hierro forjado de Hernani al Peine del Viento* — biografía material.
3. h2 *El vacío como escultura* — su idea del "hueco" y diálogo con Heidegger (*Die Kunst und der Raum*).
4. h2 *Chillida Leku: caminar la obra* — el museo-bosque de Hernani como manifiesto (con enlace a chillidaleku.com).
5. h2 *Obra pública que redefinió ciudades* — Peine del Viento (San Sebastián), Elogio del Horizonte (Gijón), Berlín, París (Guggenheim Bilbao, Reina Sofía como colecciones de referencia).
6. h2 *Materiales: hierro, acero corten, hormigón, alabastro* — cómo cada material sostiene una idea distinta.
7. h2 *Lo que Chillida enseña al coleccionista contemporáneo* — leer volumen, escala, gravedad; entrenar el ojo en Chillida Leku, Museo Reina Sofía, Fundación Botín.
8. Cierre: la vigencia de su vocabulario en la escultura española actual.

Enlaces externos incluidos en el cuerpo (dentro del texto, para SEO — instituciones citadas): Museo Chillida Leku, Museo Reina Sofía, Guggenheim Bilbao, Fundación Botín, ensayo *Die Kunst und der Raum* de Heidegger.

### 3. Verificación
- `bun run build` para confirmar que no queda import roto tras borrar `Inspiracion.tsx`.

### Detalles técnicos
- No se toca la lógica de rutas: el nuevo artículo aparece automáticamente en `/aprende` y es accesible en `/aprende/chillida-espacio-hierro-vacio` gracias a los componentes existentes (`Aprende.tsx`, `AprendeArticulo.tsx`).
- No se añaden nuevas dependencias ni assets nuevos.
