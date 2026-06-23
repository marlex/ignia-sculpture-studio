import bronzePatina from "@/assets/aprende-bronce-patina.jpg";
import sculpturePhoto from "@/assets/aprende-fotografiar-volumen.jpg";
import limitedEdition from "@/assets/aprende-ediciones-limitadas.jpg";

export type AprendeBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string };

export interface AprendeArticle {
  slug: string;
  img: string;
  fecha: string;
  autor: string;
  featuredWorks: string[]; // work slugs
  featuredArtists: string[]; // artist names
  es: {
    tag: string;
    titulo: string;
    extracto: string;
    tiempo: string;
    fechaLabel: string;
    body: AprendeBlock[];
  };
  en: {
    tag: string;
    titulo: string;
    extracto: string;
    tiempo: string;
    fechaLabel: string;
    body: AprendeBlock[];
  };
}

export const APRENDE_ARTICLES: AprendeArticle[] = [
  {
    slug: "como-leer-patina-bronce",
    img: bronzePatina,
    fecha: "2026-05-20",
    autor: "Lucía Pardo",
    featuredWorks: ["torsion-i", "mujer-y-nino", "confluencia"],
    featuredArtists: ["Helena Vázquez", "Marcos Iriarte", "Carmen Aldea"],
    es: {
      tag: "Para coleccionistas",
      titulo: "Cómo leer la pátina de una pieza de bronce",
      extracto: "Una guía visual para entender la historia y la técnica detrás del color del bronce.",
      tiempo: "8 min de lectura",
      fechaLabel: "20 de mayo de 2026",
      body: [
        { type: "p", text: "La pátina es la piel del bronce. Antes incluso que la forma, es lo primero que el ojo registra al acercarse a una escultura." },
        { type: "p", text: "Aprender a leerla permite distinguir un trabajo cuidado de una pieza apresurada, una obra antigua de una reciente y, en algunos casos, identificar el taller donde se fundió." },

        { type: "h2", text: "Qué es exactamente una pátina" },
        { type: "p", text: "La pátina es la capa de óxido y compuestos químicos que se forma sobre la superficie del bronce. Puede aparecer de manera natural con el paso del tiempo o aplicarse deliberadamente con ácidos, sales y calor controlado." },
        { type: "p", text: "Las grandes instituciones, desde el Museo Nazionale Romano hasta el British Museum, conservan piezas cuya pátina es ya inseparable de su valor artístico. Eliminarla equivaldría a borrar parte de la obra." },

        { type: "h2", text: "Los colores y lo que cuentan" },
        { type: "p", text: "Una pátina marrón oscura suele indicar un bronce trabajado con sulfuro de potasio, una técnica clásica. Es estable, sobria y muy utilizada en escultura figurativa europea del siglo XX." },
        { type: "p", text: "Los verdes y azulados aparecen cuando intervienen cloruros y compuestos de cobre. Históricos en exteriores marinos, son hoy reinterpretados por escultores contemporáneos buscando un acento más antiguo." },
        { type: "p", text: "Los tonos rojizos y ocres requieren calor y nitrato férrico. Demandan pericia: un grado de más y el color se quema; un grado de menos y el bronce queda sin profundidad." },

        { type: "h2", text: "Pátina natural o aplicada" },
        { type: "p", text: "Una pieza expuesta décadas a la intemperie desarrolla pátinas no planificadas. En ferias como TEFAF Maastricht es frecuente ver bronces históricos con superficies que combinan ambos procesos." },
        { type: "p", text: "En la escultura contemporánea, en cambio, la pátina suele ser una decisión autoral. Forma parte del proyecto desde el principio y se documenta en el certificado de la obra." },

        { type: "h2", text: "Señales de un trabajo cuidado" },
        { type: "p", text: "Una pátina bien ejecutada presenta tonos modulados, no planos. Bajo luz oblicua se perciben pequeñas variaciones que indican un trabajo manual y atento." },
        { type: "p", text: "El paso del dedo (siempre con guantes) debería sentir una superficie sellada, no pegajosa. Una pieza recién patinada y mal protegida puede transferir residuos." },
        { type: "p", text: "Las zonas de relieve más expuestas, como aristas y bordes, suelen mostrar un ligero desgaste planificado. Es lo que los talleres llaman «realces»: un recurso que aporta profundidad." },

        { type: "h2", text: "Conservación básica" },
        { type: "p", text: "El bronce no necesita mantenimiento agresivo. Un paño de algodón seco y, ocasionalmente, una cera microcristalina son suficientes para una pieza de interior." },
        { type: "p", text: "Los manuales abiertos del Getty Conservation Institute, accesibles en línea, son una buena referencia para el coleccionista privado que quiera profundizar en cuidados específicos." },

        { type: "h2", text: "Una mirada entrenada" },
        { type: "p", text: "Leer pátinas es, sobre todo, una cuestión de tiempo. Visitar exposiciones de escultura en museos como el Reina Sofía o el Centre Pompidou entrena el ojo más que cualquier manual." },
        { type: "p", text: "Con el tiempo, el coleccionista distingue, casi sin pensarlo, entre un bronce honesto y uno que pretende parecer más de lo que es. Esa es, quizá, la mejor garantía antes de comprar." },
      ],
    },
    en: {
      tag: "For collectors",
      titulo: "How to read the patina of a bronze piece",
      extracto: "A visual guide to understanding the history and technique behind bronze color.",
      tiempo: "8 min read",
      fechaLabel: "May 20, 2026",
      body: [
        { type: "p", text: "Patina is the skin of bronze. Even before the form, it is the first thing the eye registers when approaching a sculpture." },
        { type: "p", text: "Learning to read it lets you distinguish careful work from a rushed piece, an antique from a recent one, and in some cases identify the foundry where it was cast." },

        { type: "h2", text: "What exactly is a patina" },
        { type: "p", text: "Patina is the layer of oxide and chemical compounds that forms on the surface of bronze. It can appear naturally over time or be applied deliberately with acids, salts and controlled heat." },
        { type: "p", text: "Major institutions, from the Museo Nazionale Romano to the British Museum, hold works whose patina is now inseparable from their artistic value. Removing it would be like erasing part of the work itself." },

        { type: "h2", text: "Colours and what they tell" },
        { type: "p", text: "A dark brown patina usually indicates bronze worked with potassium sulfide, a classic technique. It is stable, sober and widely used in twentieth-century European figurative sculpture." },
        { type: "p", text: "Greens and blues appear when chlorides and copper compounds intervene. Historically common in marine outdoor pieces, they are reinterpreted today by contemporary sculptors seeking an older accent." },
        { type: "p", text: "Reddish and ochre tones require heat and ferric nitrate. They demand expertise: one degree too much and the colour burns; one degree too little and the bronze lacks depth." },

        { type: "h2", text: "Natural or applied patina" },
        { type: "p", text: "A piece exposed to the elements for decades develops unplanned patinas. At fairs like TEFAF Maastricht it is common to see historical bronzes whose surfaces combine both processes." },
        { type: "p", text: "In contemporary sculpture, by contrast, patina is usually an authorial decision. It is part of the project from the beginning and is documented in the work's certificate." },

        { type: "h2", text: "Signs of careful work" },
        { type: "p", text: "A well-executed patina has modulated, not flat, tones. Under oblique light small variations appear that indicate attentive, manual work." },
        { type: "p", text: "Running a (gloved) finger across the surface should feel sealed, not sticky. A freshly patinated piece that is poorly protected can transfer residue." },
        { type: "p", text: "The most exposed relief areas, like ridges and edges, usually show a slight planned wear. Workshops call them «highlights»: a resource that adds depth." },

        { type: "h2", text: "Basic conservation" },
        { type: "p", text: "Bronze does not require aggressive maintenance. A dry cotton cloth and, occasionally, a microcrystalline wax are enough for an indoor piece." },
        { type: "p", text: "The open manuals of the Getty Conservation Institute, available online, are a good reference for the private collector who wants to go deeper into specific care." },

        { type: "h2", text: "A trained eye" },
        { type: "p", text: "Reading patinas is, above all, a matter of time. Visiting sculpture exhibitions at museums like the Reina Sofía or the Centre Pompidou trains the eye better than any manual." },
        { type: "p", text: "Over time, the collector distinguishes, almost without thinking, between an honest bronze and one that tries to look more than it is. That is, perhaps, the best guarantee before buying." },
      ],
    },
  },
  {
    slug: "fotografiar-escultura",
    img: sculpturePhoto,
    fecha: "2026-05-05",
    autor: "Marcos Iriarte",
    featuredWorks: ["pliegue-iii", "raiz", "quietud-alabastro"],
    featuredArtists: ["Alba Costa", "Sofía Méndez", "Inés Ferrer"],
    es: {
      tag: "Para escultores",
      titulo: "Fotografiar escultura sin distorsionar el volumen",
      extracto: "Técnicas de luz y ángulo que capturan la profundidad real de una pieza.",
      tiempo: "12 min de lectura",
      fechaLabel: "5 de mayo de 2026",
      body: [
        { type: "p", text: "Fotografiar escultura es traducir tres dimensiones a dos sin que la pieza pierda su presencia. Es una tarea de precisión que decide buena parte de cómo se percibirá la obra en catálogos, ferias y plataformas digitales." },
        { type: "p", text: "Las grandes colecciones, desde el MoMA hasta la Tate, dedican equipos completos a este trabajo. Sus criterios son hoy una referencia para cualquier escultor que quiera documentar su obra con seriedad." },

        { type: "h2", text: "La luz como primer escultor" },
        { type: "p", text: "La iluminación define el volumen. Una luz frontal aplana la pieza; una luz lateral, en cambio, revela los planos y devuelve la profundidad real." },
        { type: "p", text: "El esquema clásico utiliza una luz principal a 45 grados, una luz de relleno suave en el lado opuesto y un contrafuego que separa la pieza del fondo. Es la base que utilizan los archivos fotográficos del Museo del Prado para piezas escultóricas." },

        { type: "h2", text: "Cuidar el fondo" },
        { type: "p", text: "Un fondo limpio es esencial. Gris neutro, blanco roto o un negro absoluto son las opciones más utilizadas en catalogación profesional." },
        { type: "p", text: "Evita texturas marcadas o degradados pronunciados. La pieza debe leerse con claridad, sin competir con el entorno." },

        { type: "h2", text: "El ángulo correcto" },
        { type: "p", text: "El error más común es fotografiar desde un punto demasiado bajo o demasiado alto. En general, la altura del eje principal de la pieza es la referencia más fiable." },
        { type: "p", text: "Para esculturas figurativas, la regla habitual es colocar la cámara a la altura del pecho o de la mirada. En piezas abstractas, conviene buscar el ángulo en el que la silueta es más reconocible." },

        { type: "h2", text: "La distancia focal" },
        { type: "p", text: "Los grandes angulares distorsionan los volúmenes. Una pieza fotografiada con un 24mm puede parecer estirada o pesada según el ángulo." },
        { type: "p", text: "Las focales recomendadas para escultura están entre 50mm y 85mm en formato completo. Reproducen la pieza con proporciones cercanas a las que percibe el ojo humano." },

        { type: "h2", text: "El detalle: una segunda lectura" },
        { type: "p", text: "Una buena documentación incluye, además del plano general, varias vistas: tres cuartos, perfil y planos de detalle de superficies, pátinas o cortes técnicos." },
        { type: "p", text: "Publicaciones como The Burlington Magazine o Apollo Magazine, especializadas en arte clásico y contemporáneo, suelen acompañar sus análisis con macrofotografías que revelan el trabajo del autor." },

        { type: "h2", text: "Color preciso, sin sobreedición" },
        { type: "p", text: "La fidelidad cromática es decisiva. Un bronce sobreeditado puede parecer un material distinto y un alabastro forzado puede perder su translucidez característica." },
        { type: "p", text: "Calibrar el monitor y trabajar con perfiles de color (sRGB para web, AdobeRGB para impresión) es un estándar mínimo. Las galerías que venden online dependen de ello para evitar devoluciones." },

        { type: "h2", text: "Fotografía y visualización 3D" },
        { type: "p", text: "La fotografía estática no compite con el modelo tridimensional; lo complementa. Plataformas que combinan ambas opciones permiten al coleccionista evaluar la pieza con un nivel de detalle inédito hace una década." },
        { type: "p", text: "El estándar emergente, especialmente en ferias como Art Basel, combina ficha técnica, fotografía profesional y vista 3D interactiva." },

        { type: "h2", text: "Un consejo final" },
        { type: "p", text: "Antes de subir cualquier imagen a una plataforma o enviar un PDF a una galería, conviene revisarla en distintos dispositivos. Lo que se ve bien en un monitor calibrado puede leerse muy distinto en un móvil." },
        { type: "p", text: "Fotografiar bien una escultura no la mejora, pero permite que llegue a su público en las mejores condiciones. Y, en un mercado cada vez más digital, esa diferencia puede ser decisiva." },
      ],
    },
    en: {
      tag: "For sculptors",
      titulo: "Photographing sculpture without distorting volume",
      extracto: "Light and angle techniques that capture the true depth of a piece.",
      tiempo: "12 min read",
      fechaLabel: "May 5, 2026",
      body: [
        { type: "p", text: "Photographing sculpture means translating three dimensions into two without the piece losing its presence. It is a task of precision that largely decides how the work will be perceived in catalogues, fairs and digital platforms." },
        { type: "p", text: "Major collections, from MoMA to Tate, devote entire teams to this work. Their criteria are today a reference for any sculptor who wants to document their work seriously." },

        { type: "h2", text: "Light as the first sculptor" },
        { type: "p", text: "Lighting defines volume. Frontal light flattens the piece; side light, by contrast, reveals planes and restores real depth." },
        { type: "p", text: "The classic scheme uses a key light at 45 degrees, a soft fill light on the opposite side and a back light that separates the piece from the background. It is the basis used by the photographic archives of the Museo del Prado for sculptural works." },

        { type: "h2", text: "Take care of the background" },
        { type: "p", text: "A clean background is essential. Neutral grey, off-white or absolute black are the most used options in professional cataloguing." },
        { type: "p", text: "Avoid pronounced textures or strong gradients. The piece must read clearly, without competing with its surroundings." },

        { type: "h2", text: "The right angle" },
        { type: "p", text: "The most common mistake is photographing from a point that is too low or too high. In general, the height of the piece's main axis is the most reliable reference." },
        { type: "p", text: "For figurative sculptures, the usual rule is to place the camera at chest or eye level. In abstract pieces, look for the angle in which the silhouette is most recognisable." },

        { type: "h2", text: "Focal length" },
        { type: "p", text: "Wide-angle lenses distort volumes. A piece shot with a 24mm can look stretched or heavy depending on the angle." },
        { type: "p", text: "Recommended focal lengths for sculpture sit between 50mm and 85mm on full frame. They render the piece with proportions close to those perceived by the human eye." },

        { type: "h2", text: "Detail: a second reading" },
        { type: "p", text: "Good documentation includes, besides the overall view, several angles: three-quarter, profile, and detail shots of surfaces, patinas or technical sections." },
        { type: "p", text: "Publications such as The Burlington Magazine or Apollo Magazine, specialised in classical and contemporary art, usually accompany their analysis with macro photography that reveals the author's work." },

        { type: "h2", text: "Accurate colour, no overediting" },
        { type: "p", text: "Colour fidelity is decisive. An over-edited bronze can look like a different material, and a forced alabaster can lose its characteristic translucency." },
        { type: "p", text: "Calibrating the monitor and working with colour profiles (sRGB for web, AdobeRGB for print) is a minimum standard. Galleries selling online rely on it to avoid returns." },

        { type: "h2", text: "Photography and 3D visualisation" },
        { type: "p", text: "Static photography does not compete with the three-dimensional model; it complements it. Platforms that combine both let collectors assess a piece with a level of detail unprecedented a decade ago." },
        { type: "p", text: "The emerging standard, especially at fairs like Art Basel, combines technical sheet, professional photography and interactive 3D view." },

        { type: "h2", text: "A final piece of advice" },
        { type: "p", text: "Before uploading any image to a platform or sending a PDF to a gallery, review it on different devices. What looks good on a calibrated monitor can read very differently on a phone." },
        { type: "p", text: "Photographing a sculpture well does not improve it, but it lets it reach its audience in the best conditions. And in an increasingly digital market, that difference can be decisive." },
      ],
    },
  },
  {
    slug: "ediciones-unicas-vs-limitadas",
    img: limitedEdition,
    fecha: "2026-04-18",
    autor: "Inés Ferrer",
    featuredWorks: ["vinculo", "luz-interior", "origen"],
    featuredArtists: ["Tomás Vigo", "Lucía Pardo", "Ana Ruiz"],
    es: {
      tag: "Editorial",
      titulo: "Ediciones únicas vs ediciones limitadas en escultura",
      extracto: "Qué diferencia una obra original de una reproducción numerada y por qué importa.",
      tiempo: "6 min de lectura",
      fechaLabel: "18 de abril de 2026",
      body: [
        { type: "p", text: "Pocas confusiones generan más dudas a un coleccionista que la diferencia entre una pieza única y una edición limitada. Ambas son legítimas, pero responden a lógicas muy distintas." },
        { type: "p", text: "Entender esa diferencia es decisivo para evaluar el precio, la trayectoria de la obra y su recorrido futuro en el mercado secundario." },

        { type: "h2", text: "Qué es una pieza única" },
        { type: "p", text: "Una pieza única es aquella de la que sólo existe un ejemplar. El artista no contempla repeticiones y cualquier reproducción posterior se considera distinta de la original." },
        { type: "p", text: "Casas de subastas como Christie's o Sotheby's distinguen claramente este formato en sus catálogos, donde aparece como «unique» o «pièce unique»." },

        { type: "h2", text: "Qué es una edición limitada" },
        { type: "p", text: "Una edición limitada es un grupo cerrado y numerado de ejemplares producidos a partir del mismo molde o modelo. La numeración (por ejemplo, 2/8) indica posición sobre el total." },
        { type: "p", text: "Las ediciones cortas, entre 3 y 8 ejemplares, suelen considerarse de coleccionismo riguroso. Las más amplias, de 30 o más, pertenecen al terreno del múltiple o la obra editada." },

        { type: "h2", text: "Las pruebas de artista" },
        { type: "p", text: "Junto a los ejemplares numerados pueden existir pruebas de artista (AP) y, en algunos casos, pruebas de fundición. Son ejemplares destinados al taller o a usos personales del autor." },
        { type: "p", text: "Como regla general, las pruebas no deberían superar el 20% del total de la edición. Una proporción más alta tiende a percibirse como una expansión encubierta del tiraje." },

        { type: "h2", text: "Por qué importa el formato" },
        { type: "p", text: "El formato afecta directamente al precio. Una pieza única suele valer entre dos y tres veces más que el primer ejemplar de una edición equivalente." },
        { type: "p", text: "También afecta a la circulación: las piezas únicas son más difíciles de comparar en el mercado secundario, mientras que las ediciones permiten establecer precios de referencia. Bases de datos como Artnet o Artprice trabajan con estos criterios." },

        { type: "h2", text: "Documentación imprescindible" },
        { type: "p", text: "Independientemente del formato, toda obra debe ir acompañada de un certificado del artista o de su estudio. Debe incluir título, año, técnica, dimensiones, edición y firma." },
        { type: "p", text: "Plataformas como Verisart están introduciendo certificados digitales con trazabilidad sobre blockchain, un estándar emergente que coexiste con la documentación tradicional." },

        { type: "h2", text: "Qué elegir como coleccionista" },
        { type: "p", text: "No hay una respuesta única. Las piezas únicas suelen ofrecer mayor singularidad y revalorización potencial; las ediciones permiten acceder a artistas consolidados con presupuestos más ajustados." },
        { type: "p", text: "El consejo más extendido en el coleccionismo institucional es claro: comprar siempre la mejor pieza posible dentro del presupuesto disponible, sin obsesionarse con el formato." },
      ],
    },
    en: {
      tag: "Editorial",
      titulo: "Unique vs limited editions in sculpture",
      extracto: "What sets an original work apart from a numbered reproduction and why it matters.",
      tiempo: "6 min read",
      fechaLabel: "April 18, 2026",
      body: [
        { type: "p", text: "Few confusions cause more doubt to a collector than the difference between a unique piece and a limited edition. Both are legitimate, but they respond to very different logics." },
        { type: "p", text: "Understanding that difference is decisive for evaluating price, the work's trajectory and its future path on the secondary market." },

        { type: "h2", text: "What a unique piece is" },
        { type: "p", text: "A unique piece is one of which only a single example exists. The artist does not plan repetitions and any later reproduction is considered different from the original." },
        { type: "p", text: "Auction houses such as Christie's or Sotheby's clearly distinguish this format in their catalogues, where it appears as «unique» or «pièce unique»." },

        { type: "h2", text: "What a limited edition is" },
        { type: "p", text: "A limited edition is a closed, numbered group of examples produced from the same mould or model. The numbering (for example, 2/8) indicates the position within the total." },
        { type: "p", text: "Short editions, between 3 and 8 examples, are usually considered rigorous collecting. Larger ones, of 30 or more, belong to the field of multiples or edited work." },

        { type: "h2", text: "Artist's proofs" },
        { type: "p", text: "Alongside the numbered examples there may be artist's proofs (AP) and, in some cases, foundry proofs. These are intended for the studio or for the author's personal use." },
        { type: "p", text: "As a general rule, proofs should not exceed 20% of the total edition. A higher ratio is usually perceived as a disguised expansion of the run." },

        { type: "h2", text: "Why format matters" },
        { type: "p", text: "Format affects price directly. A unique piece usually sells for between two and three times the first example of an equivalent edition." },
        { type: "p", text: "It also affects circulation: unique pieces are harder to compare on the secondary market, while editions allow reference prices to be established. Databases such as Artnet or Artprice work with these criteria." },

        { type: "h2", text: "Essential documentation" },
        { type: "p", text: "Regardless of format, every work must come with a certificate from the artist or their studio. It should include title, year, technique, dimensions, edition and signature." },
        { type: "p", text: "Platforms like Verisart are introducing digital certificates with blockchain traceability, an emerging standard that coexists with traditional documentation." },

        { type: "h2", text: "What to choose as a collector" },
        { type: "p", text: "There is no single answer. Unique pieces usually offer greater singularity and potential revaluation; editions allow access to established artists with tighter budgets." },
        { type: "p", text: "The most widespread advice in institutional collecting is clear: always buy the best possible piece within the available budget, without becoming obsessed with format." },
      ],
    },
  },
];

export const getAprendeArticleBySlug = (slug: string) =>
  APRENDE_ARTICLES.find((a) => a.slug === slug);
