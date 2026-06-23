import obra1 from "@/assets/obra-1.jpg";
import obra3 from "@/assets/obra-3.jpg";
import obra6 from "@/assets/obra-6.jpg";
import obra7 from "@/assets/obra-7.jpg";

export type EditorialBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string };

export interface EditorialArticle {
  slug: string;
  img: string;
  fecha: string; // ISO
  autor: string;
  es: {
    seccion: string;
    titulo: string;
    extracto: string;
    fechaLabel: string;
    body: EditorialBlock[];
  };
  en: {
    seccion: string;
    titulo: string;
    extracto: string;
    fechaLabel: string;
    body: EditorialBlock[];
  };
}

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    slug: "bronce-contemporaneo",
    img: obra1,
    fecha: "2026-05-12",
    autor: "Lucía Pardo",
    es: {
      seccion: "Ensayo",
      titulo: "El bronce contemporáneo: tradición que se reinventa",
      extracto: "Una mirada a los talleres que mantienen viva la fundición a la cera perdida en el siglo XXI.",
      fechaLabel: "12 de mayo de 2026",
      body: [
        { type: "p", text: "La fundición a la cera perdida es uno de los procedimientos más antiguos de la historia del arte. Hoy, lejos de haber sido sustituida por tecnologías más rápidas, sigue siendo el método preferido por los escultores que buscan precisión, densidad y una superficie capaz de envejecer con dignidad." },
        { type: "h2", text: "Talleres que resisten" },
        { type: "p", text: "En ciudades como Florencia, Madrid o Ciudad de México, pequeños talleres familiares custodian un saber transmitido a lo largo de generaciones. Cada pieza pasa por decenas de manos antes de salir del horno." },
        { type: "p", text: "El bronce contemporáneo dialoga con esa tradición sin someterse a ella: las patinas se vuelven más arriesgadas, las superficies aceptan texturas industriales, los formatos se reducen para vivir en el espacio doméstico." },
        { type: "h2", text: "Una materia que escucha" },
        { type: "p", text: "Trabajar el bronce es, ante todo, escuchar. Escuchar la cera, el molde, la temperatura. El resultado nunca es del todo previsible, y en esa pequeña incertidumbre reside buena parte de su belleza." },
      ],
    },
    en: {
      seccion: "Essay",
      titulo: "Contemporary bronze: a tradition that reinvents itself",
      extracto: "A look at the workshops keeping lost-wax casting alive in the 21st century.",
      fechaLabel: "May 12, 2026",
      body: [
        { type: "p", text: "Lost-wax casting is one of the oldest procedures in the history of art. Far from being replaced by faster technologies, it remains the preferred method for sculptors who seek precision, density and a surface capable of aging with dignity." },
        { type: "h2", text: "Workshops that endure" },
        { type: "p", text: "In cities like Florence, Madrid or Mexico City, small family workshops safeguard knowledge passed down through generations. Each piece passes through dozens of hands before leaving the kiln." },
        { type: "p", text: "Contemporary bronze converses with that tradition without submitting to it: patinas grow bolder, surfaces accept industrial textures, and formats shrink to live inside the home." },
        { type: "h2", text: "A material that listens" },
        { type: "p", text: "Working with bronze is, above all, an act of listening. Listening to the wax, the mould, the temperature. The outcome is never fully predictable, and much of its beauty lies in that small uncertainty." },
      ],
    },
  },
  {
    slug: "acero-corten-paisaje",
    img: obra3,
    fecha: "2026-04-28",
    autor: "Marcos Iriarte",
    es: {
      seccion: "Reportaje",
      titulo: "Acero corten: el material que escribe el paisaje",
      extracto: "Diego Lara y otros escultores convierten la oxidación en lenguaje plástico.",
      fechaLabel: "28 de abril de 2026",
      body: [
        { type: "p", text: "El acero corten nació como solución industrial: una aleación capaz de oxidarse de forma controlada para protegerse a sí misma. Décadas después, esa pátina anaranjada se ha convertido en uno de los lenguajes más reconocibles de la escultura contemporánea al aire libre." },
        { type: "h2", text: "El tiempo como coautor" },
        { type: "p", text: "Cada pieza de corten cambia con las estaciones. La lluvia, la sal y el sol intervienen sobre la superficie hasta convertirla en una crónica visual del lugar donde habita." },
        { type: "h2", text: "Una conversación con el entorno" },
        { type: "p", text: "Artistas como Diego Lara plantean sus obras como diálogos con el paisaje. La escultura deja de ser objeto para convertirse en presencia, en una huella que organiza el espacio sin ocuparlo del todo." },
      ],
    },
    en: {
      seccion: "Report",
      titulo: "Corten steel: the material that writes the landscape",
      extracto: "Diego Lara and other sculptors turn oxidation into a plastic language.",
      fechaLabel: "April 28, 2026",
      body: [
        { type: "p", text: "Corten steel was born as an industrial solution: an alloy able to rust in a controlled way to protect itself. Decades later, that orange patina has become one of the most recognisable languages of contemporary outdoor sculpture." },
        { type: "h2", text: "Time as co-author" },
        { type: "p", text: "Every corten piece changes with the seasons. Rain, salt and sun work on the surface until it becomes a visual chronicle of the place it inhabits." },
        { type: "h2", text: "A conversation with the surroundings" },
        { type: "p", text: "Artists like Diego Lara conceive their works as dialogues with the landscape. Sculpture stops being an object and becomes a presence, a mark that organises the space without fully occupying it." },
      ],
    },
  },
  {
    slug: "helena-vazquez-entrevista",
    img: obra6,
    fecha: "2026-04-10",
    autor: "Redacción Ignia",
    es: {
      seccion: "Entrevista",
      titulo: "Helena Vázquez: tres décadas escuchando al bronce",
      extracto: "Sobre el oficio lento, las piezas que casi destruye y por qué se niega a producir ediciones grandes.",
      fechaLabel: "10 de abril de 2026",
      body: [
        { type: "p", text: "Helena Vázquez recibe en su taller con las manos manchadas de cera. Lleva más de treinta años trabajando el bronce y, sin embargo, habla del material como quien acaba de descubrirlo." },
        { type: "h2", text: "El oficio lento" },
        { type: "p", text: "«El bronce no admite prisa», advierte. «Si lo fuerzas, te castiga. Y si lo escuchas, te sorprende». Sus piezas pueden tardar meses en encontrar su forma definitiva." },
        { type: "h2", text: "Ediciones cortas, por convicción" },
        { type: "p", text: "Vázquez ha rechazado en varias ocasiones producir ediciones grandes. «Si todo el mundo tiene la misma pieza, deja de ser una pieza. Pasa a ser un producto»." },
      ],
    },
    en: {
      seccion: "Interview",
      titulo: "Helena Vázquez: three decades listening to bronze",
      extracto: "On slow craft, the pieces she nearly destroyed, and why she refuses large editions.",
      fechaLabel: "April 10, 2026",
      body: [
        { type: "p", text: "Helena Vázquez welcomes us into her studio with wax-stained hands. She has been working with bronze for over thirty years and yet talks about the material as if she had just discovered it." },
        { type: "h2", text: "Slow craft" },
        { type: "p", text: "«Bronze allows no rush», she warns. «If you push it, it punishes you. If you listen to it, it surprises you». Her pieces can take months to find their final shape." },
        { type: "h2", text: "Short editions, by conviction" },
        { type: "p", text: "Vázquez has refused several times to produce large editions. «If everyone owns the same piece, it stops being a piece. It becomes a product»." },
      ],
    },
  },
  {
    slug: "coleccionar-escultura-hoy",
    img: obra7,
    fecha: "2026-03-22",
    autor: "Inés Ferrer",
    es: {
      seccion: "Mercado",
      titulo: "Coleccionar escultura hoy: criterios, precios y procedencia",
      extracto: "Qué mirar antes de adquirir una pieza única o de edición limitada.",
      fechaLabel: "22 de marzo de 2026",
      body: [
        { type: "p", text: "Coleccionar escultura exige una mirada más paciente que la que pide la pintura. El volumen pide tiempo, recorrido y, sobre todo, información clara sobre la procedencia de cada pieza." },
        { type: "h2", text: "Pieza única o edición" },
        { type: "p", text: "Una pieza única tiene un valor distinto al de una edición numerada. Ambas son legítimas, pero exigen documentación específica: certificado del artista, número de ejemplar y registro del taller donde se fundió." },
        { type: "h2", text: "Cuidar el origen" },
        { type: "p", text: "Antes de adquirir una obra, conviene revisar su historial: exposiciones, publicaciones, colecciones previas. Una procedencia clara protege la inversión y, sobre todo, protege el sentido de la obra." },
      ],
    },
    en: {
      seccion: "Market",
      titulo: "Collecting sculpture today: criteria, prices and provenance",
      extracto: "What to look at before acquiring a unique piece or a limited edition.",
      fechaLabel: "March 22, 2026",
      body: [
        { type: "p", text: "Collecting sculpture demands a more patient eye than painting does. Volume asks for time, for walking around, and above all for clear information about the provenance of each piece." },
        { type: "h2", text: "Unique piece or edition" },
        { type: "p", text: "A unique piece has a different value from a numbered edition. Both are legitimate, but each requires specific documentation: artist's certificate, edition number and a record of the foundry that cast it." },
        { type: "h2", text: "Protecting the origin" },
        { type: "p", text: "Before acquiring a work, review its history: exhibitions, publications, previous collections. A clear provenance protects the investment and, above all, protects the meaning of the work." },
      ],
    },
  },
];

export const getArticleBySlug = (slug: string) =>
  EDITORIAL_ARTICLES.find((a) => a.slug === slug);
