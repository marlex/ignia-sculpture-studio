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
      titulo: "Bronce contemporáneo: una tradición que se reinventa",
      extracto: "Sobre la fundición a la cera perdida, los talleres que la mantienen viva y la manera en que la escultura en bronce dialoga hoy con su propia historia.",
      fechaLabel: "12 de mayo de 2026",
      body: [
        { type: "p", text: "La fundición a la cera perdida es uno de los procedimientos más antiguos que la humanidad sigue utilizando sin apenas modificaciones esenciales. Piezas como los Bronces de Riace, conservados en el Museo Nazionale della Magna Grecia en Reggio Calabria, demuestran que la técnica ya estaba plenamente desarrollada en el siglo V a.C." },
        { type: "p", text: "Veinticinco siglos después, el procedimiento sigue siendo el preferido por una buena parte de la escultura contemporánea. Lo eligen quienes buscan precisión en los detalles, una densidad material que sólo el bronce ofrece y una superficie capaz de envejecer con dignidad." },

        { type: "h2", text: "Una técnica que sobrevive a sus propias revoluciones" },
        { type: "p", text: "La cera perdida se basa en un principio sencillo: un modelo en cera se recubre de un molde refractario, se calienta hasta que la cera se derrite y se sustituye por bronce fundido. La sencillez del enunciado esconde decenas de pasos críticos." },
        { type: "p", text: "Las grandes ferias del sector, de Art Basel a TEFAF Maastricht, siguen exhibiendo cada año piezas obtenidas con este procedimiento. La presencia de obra en bronce en sus stands no es nostalgia: es una evidencia de que coleccionistas e instituciones le otorgan un lugar central." },

        { type: "h2", text: "Talleres europeos: una geografía exigente" },
        { type: "p", text: "En Italia, fundiciones históricas como la Fonderia Artistica Battaglia de Milán, fundada en 1913, han trabajado con figuras como Lucio Fontana o Arnaldo Pomodoro. Su archivo es estudiado por instituciones como la Pinacoteca di Brera." },
        { type: "p", text: "En España, la tradición pasa por talleres como Capa Esculturas, vinculados a la obra pública de Eduardo Chillida o Cristina Iglesias. La presencia recurrente de escultura en bronce en ARCOmadrid recuerda que el coleccionismo nacional sigue valorando el material." },
        { type: "p", text: "Más al norte, la AA2 Foundry en Reino Unido o las fundiciones francesas próximas a la École nationale supérieure des Beaux-Arts de París conforman una red discreta pero esencial. Sin ellas, buena parte de la escultura pública europea no existiría." },

        { type: "h2", text: "América Latina: un bronce con acento propio" },
        { type: "p", text: "En México, la herencia prehispánica del metal se entrelaza con la tradición colonial y la modernidad. El Museo Nacional de Arte (MUNAL) conserva piezas que documentan ese recorrido y artistas contemporáneos siguen trabajando con fundiciones locales en Ciudad de México y Guadalajara." },
        { type: "p", text: "En Colombia, la presencia internacional de Fernando Botero, representado durante décadas por casas como Marlborough, instaló al bronce como uno de los lenguajes reconocibles del arte latinoamericano. Sus piezas circulan habitualmente en subastas de Christie's y Sotheby's." },
        { type: "p", text: "En Argentina, instituciones como el Museo Nacional de Bellas Artes han mostrado obra en bronce de autores fundamentales del siglo XX, mientras que talleres rioplatenses continúan formando a nuevas generaciones de escultores." },

        { type: "h2", text: "Diálogo con la tradición, no sumisión" },
        { type: "p", text: "La escultura contemporánea no se relaciona con el bronce como con un material heredado al que debe respeto. Lo trata como una materia viva, capaz de aceptar pátinas más arriesgadas, superficies industriales y formatos pensados para el espacio doméstico." },
        { type: "p", text: "Exposiciones recientes en museos como la Tate Modern de Londres o el Museo Reina Sofía de Madrid han mostrado cómo artistas actuales utilizan el bronce para hablar de cuerpo, memoria y paisaje, sin recurrir al lenguaje monumental del siglo XIX." },

        { type: "h2", text: "La pátina como decisión autoral" },
        { type: "p", text: "Si la forma define la silueta de una escultura, la pátina define su piel. El óxido controlado, las sales aplicadas en caliente o las ceras coloreadas son herramientas que cada artista combina de manera personal." },
        { type: "p", text: "La crítica especializada, en publicaciones como The Art Newspaper o Artforum, suele insistir en este punto: no hay dos bronces idénticos, ni siquiera dentro de la misma edición. La pátina introduce siempre un margen de unicidad." },

        { type: "h2", text: "Un material para el tiempo largo" },
        { type: "p", text: "El bronce, por su propia naturaleza, se mide en décadas. Una pieza bien cuidada llega sin esfuerzo al siglo de vida y muchas superan ese umbral sin pérdidas significativas." },
        { type: "p", text: "Este tiempo largo encaja mal con la lógica de la novedad permanente. Quizá por eso, en un mercado del arte cada vez más acelerado, la escultura en bronce funciona como un contrapeso: pide paciencia para producirla, comprarla y entenderla." },
        { type: "p", text: "Reinventar esa tradición no significa romper con ella. Significa, sobre todo, decidir qué partes del oficio se conservan, qué pátinas se atreven y a qué ritmo se está dispuesto a trabajar. En ese equilibrio se juega buena parte de la escultura contemporánea." },
      ],
    },
    en: {
      seccion: "Essay",
      titulo: "Contemporary bronze: a tradition that reinvents itself",
      extracto: "On lost-wax casting, the workshops keeping it alive, and how today's bronze sculpture converses with its own history.",
      fechaLabel: "May 12, 2026",
      body: [
        { type: "p", text: "Lost-wax casting is one of the oldest procedures humanity still uses with hardly any essential change. Works such as the Riace Bronzes, held at the Museo Nazionale della Magna Grecia in Reggio Calabria, show that the technique was already fully developed in the fifth century BCE." },
        { type: "p", text: "Twenty-five centuries later, the process remains the favoured method for a large share of contemporary sculpture. It is chosen by those who want precise detail, the material density only bronze provides and a surface capable of aging with dignity." },

        { type: "h2", text: "A technique that survives its own revolutions" },
        { type: "p", text: "Lost-wax casting rests on a simple principle: a wax model is wrapped in a refractory mould, heated until the wax melts away and then replaced by molten bronze. The simplicity of the statement hides dozens of critical steps." },
        { type: "p", text: "Major fairs in the sector, from Art Basel to TEFAF Maastricht, continue to show bronze works obtained through this procedure every year. Its presence on their stands is not nostalgia: it is evidence that collectors and institutions still grant it a central place." },

        { type: "h2", text: "European workshops: a demanding geography" },
        { type: "p", text: "In Italy, historic foundries such as Fonderia Artistica Battaglia in Milan, founded in 1913, have worked with figures including Lucio Fontana and Arnaldo Pomodoro. Their archive is studied by institutions like the Pinacoteca di Brera." },
        { type: "p", text: "In Spain, the tradition runs through workshops like Capa Esculturas, linked to public works by Eduardo Chillida and Cristina Iglesias. The recurring presence of bronze sculpture at ARCOmadrid is a reminder that Spanish collecting still values the material." },
        { type: "p", text: "Further north, AA2 Foundry in the United Kingdom and the French foundries close to the École nationale supérieure des Beaux-Arts in Paris form a discreet but essential network. Without them, much of European public sculpture would simply not exist." },

        { type: "h2", text: "Latin America: bronze with its own accent" },
        { type: "p", text: "In Mexico, the pre-Hispanic heritage of metalwork intertwines with the colonial tradition and modernity. The Museo Nacional de Arte (MUNAL) holds pieces that document that path, and contemporary artists continue to work with local foundries in Mexico City and Guadalajara." },
        { type: "p", text: "In Colombia, the international presence of Fernando Botero, represented for decades by galleries such as Marlborough, installed bronze as one of the recognisable languages of Latin American art. His works regularly appear in Christie's and Sotheby's sales." },
        { type: "p", text: "In Argentina, institutions like the Museo Nacional de Bellas Artes have shown bronze work by key twentieth-century authors, while Río de la Plata workshops continue to train new generations of sculptors." },

        { type: "h2", text: "Dialogue with tradition, not submission" },
        { type: "p", text: "Contemporary sculpture does not approach bronze as an inherited material that demands deference. It treats it as a living matter, able to accept bolder patinas, industrial surfaces and formats designed for the domestic space." },
        { type: "p", text: "Recent exhibitions at museums such as Tate Modern in London or the Museo Reina Sofía in Madrid have shown how today's artists use bronze to speak about the body, memory and landscape, without resorting to the monumental language of the nineteenth century." },

        { type: "h2", text: "Patina as an authorial decision" },
        { type: "p", text: "If form defines the silhouette of a sculpture, patina defines its skin. Controlled oxidation, salts applied hot or coloured waxes are tools each artist combines in a personal way." },
        { type: "p", text: "Specialised criticism, in publications like The Art Newspaper or Artforum, tends to insist on this point: no two bronzes are identical, not even within the same edition. Patina always introduces a margin of uniqueness." },

        { type: "h2", text: "A material for the long term" },
        { type: "p", text: "Bronze, by its very nature, is measured in decades. A well-cared-for piece reaches a century of life without effort, and many surpass that threshold without significant loss." },
        { type: "p", text: "This long temporality fits poorly with the logic of permanent novelty. Perhaps for that reason, in an increasingly accelerated art market, bronze sculpture works as a counterweight: it asks for patience to produce it, buy it and understand it." },
        { type: "p", text: "Reinventing that tradition does not mean breaking with it. It means, above all, deciding which parts of the craft are kept, which patinas are dared and what rhythm one is willing to work at. Much of contemporary sculpture plays out in that balance." },
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
      extracto: "Cómo la escultura contemporánea ha convertido un acero industrial en uno de los lenguajes más reconocibles del arte público y privado.",
      fechaLabel: "28 de abril de 2026",
      body: [
        { type: "p", text: "El acero corten nació en los años treinta del siglo XX como solución industrial: una aleación capaz de generar una capa de óxido estable que protege al propio metal del deterioro. Estaba pensado para vagones de ferrocarril, no para galerías." },
        { type: "p", text: "Décadas después, esa pátina anaranjada se ha convertido en uno de los lenguajes más reconocibles de la escultura contemporánea, tanto en formato monumental como en piezas de interior. El paisaje urbano y rural lleva su huella en medio mundo." },

        { type: "h2", text: "Del lenguaje industrial al lenguaje plástico" },
        { type: "p", text: "La aceptación del corten en el arte no fue inmediata. Hizo falta una generación de escultores dispuestos a entender la oxidación como un fenómeno estético y no como un defecto." },
        { type: "p", text: "Richard Serra, ampliamente expuesto en instituciones como el Museo Guggenheim Bilbao y el MoMA de Nueva York, fue decisivo en ese desplazamiento. Sus piezas convirtieron a un material logístico en una experiencia espacial." },

        { type: "h2", text: "El tiempo como coautor" },
        { type: "p", text: "Cada pieza de corten cambia con las estaciones. La lluvia, la sal y el sol intervienen sobre la superficie hasta convertirla en una crónica visual del lugar donde habita." },
        { type: "p", text: "Por eso, una escultura en corten instalada cerca del mar evolucionará de manera muy distinta a otra colocada en un patio interior. El material no se limita a estar: registra." },
        { type: "p", text: "Esta capacidad de absorber el paso del tiempo lo aleja del bronce o del mármol, que tienden a presentarse como acabados desde el momento de la instalación. El corten, en cambio, asume la mutación como parte del proyecto." },

        { type: "h2", text: "Escultores de referencia" },
        { type: "p", text: "Además de Serra, figuras como Beverly Pepper, ampliamente coleccionada en Italia y Estados Unidos, contribuyeron a consolidar el corten en el repertorio de la escultura abstracta del siglo XX." },
        { type: "p", text: "En España, la obra pública de Eduardo Chillida demostró que el acero podía dialogar de tú a tú con la piedra. Piezas como El Peine del Viento, en San Sebastián, son hoy referencia obligada en cualquier debate sobre escultura y paisaje." },
        { type: "p", text: "Cristina Iglesias, presente en colecciones como las del Museo Reina Sofía o la Tate Modern, ha extendido las posibilidades del corten al combinarlo con agua y vegetación. Su trabajo demuestra que el material puede ser también un dispositivo poético." },

        { type: "h2", text: "Escultura exterior: la escala del paisaje" },
        { type: "p", text: "En el arte público, el corten ha permitido obras de gran tamaño sin la complejidad logística que exigirían otros materiales. Su peso es manejable y su mantenimiento, una vez estabilizada la pátina, mínimo." },
        { type: "p", text: "Bienales como la Skulptur Projekte Münster, que desde 1977 mapea la escultura contemporánea en el espacio público, han incluido recurrentemente piezas en corten. Su presencia en parques, plazas y zonas industriales reconvertidas se ha vuelto habitual." },
        { type: "p", text: "Coleccionistas privados con jardines escultóricos, desde la Hauser & Wirth Somerset en el Reino Unido hasta fincas en La Toscana o Sonoma, recurren al corten para piezas pensadas para vivir a la intemperie." },

        { type: "h2", text: "Escultura interior: una segunda vida" },
        { type: "p", text: "El uso del corten dentro de la casa es más reciente, pero crece con fuerza. Piezas de mediano formato, con pátinas estabilizadas y cuidados acabados, conviven con muebles contemporáneos sin agredir el espacio." },
        { type: "p", text: "Ferias como ARCOmadrid o Art Basel Miami Beach han incorporado en sus últimas ediciones esculturas en corten pensadas específicamente para el interior, con bases pulidas o tratamientos que evitan transferir óxido a los suelos." },

        { type: "h2", text: "Cómo coleccionar corten" },
        { type: "p", text: "Quien se acerca por primera vez a este material debe atender a tres aspectos. El primero es el sellado: una pátina sin tratar puede seguir liberando óxido durante meses, lo que requiere planificar su ubicación." },
        { type: "p", text: "El segundo es la procedencia del acero. Las grandes acerías europeas y norteamericanas ofrecen documentación técnica que conviene exigir, especialmente para piezas destinadas a colecciones institucionales." },
        { type: "p", text: "El tercero, quizá el más importante, es entender qué tipo de envejecimiento se desea. Algunos coleccionistas prefieren que la pieza siga cambiando indefinidamente; otros buscan congelar un momento concreto con una cera protectora." },

        { type: "h2", text: "Una conversación con el entorno" },
        { type: "p", text: "Lo que hace singular al corten no es sólo su color, ni siquiera su textura. Es su capacidad para entrar en conversación con el lugar." },
        { type: "p", text: "Una pieza bien situada deja de ser un objeto y se convierte en una presencia, una huella que organiza el espacio sin ocuparlo del todo. Por eso la escultura abstracta encuentra en este material un aliado natural." },
        { type: "p", text: "El acero corten, en definitiva, no se exhibe: se instala. Y al hacerlo, escribe, lentamente, el paisaje que lo rodea." },
      ],
    },
    en: {
      seccion: "Report",
      titulo: "Corten steel: the material that writes the landscape",
      extracto: "How contemporary sculpture turned an industrial alloy into one of the most recognisable languages of public and private art.",
      fechaLabel: "April 28, 2026",
      body: [
        { type: "p", text: "Corten steel emerged in the 1930s as an industrial solution: an alloy able to generate a stable layer of oxide that protects the metal itself from further decay. It was conceived for railway wagons, not for galleries." },
        { type: "p", text: "Decades later, that orange patina has become one of the most recognisable languages of contemporary sculpture, both at monumental scale and in interior pieces. Its imprint can be found in urban and rural landscapes around half the world." },

        { type: "h2", text: "From industrial to plastic language" },
        { type: "p", text: "The acceptance of corten in art was not immediate. It required a generation of sculptors willing to understand oxidation as an aesthetic phenomenon rather than a defect." },
        { type: "p", text: "Richard Serra, widely exhibited at institutions such as the Guggenheim Museum Bilbao and MoMA in New York, was decisive in that shift. His pieces turned a logistical material into a spatial experience." },

        { type: "h2", text: "Time as co-author" },
        { type: "p", text: "Every corten piece changes with the seasons. Rain, salt and sun work on the surface until it becomes a visual chronicle of the place it inhabits." },
        { type: "p", text: "A corten sculpture installed close to the sea will evolve very differently from one placed in an inner courtyard. The material does not simply exist: it records." },
        { type: "p", text: "This ability to absorb the passing of time sets it apart from bronze or marble, which tend to present themselves as finished from the moment of installation. Corten, by contrast, takes mutation on as part of the project." },

        { type: "h2", text: "Reference sculptors" },
        { type: "p", text: "In addition to Serra, figures like Beverly Pepper, widely collected in Italy and the United States, helped consolidate corten in the repertoire of twentieth-century abstract sculpture." },
        { type: "p", text: "In Spain, the public work of Eduardo Chillida proved that steel could engage on equal terms with stone. Pieces such as El Peine del Viento, in San Sebastián, are now an obligatory reference in any debate on sculpture and landscape." },
        { type: "p", text: "Cristina Iglesias, present in collections such as those of the Museo Reina Sofía and Tate Modern, has extended the possibilities of corten by combining it with water and vegetation. Her work shows that the material can also be a poetic device." },

        { type: "h2", text: "Outdoor sculpture: the scale of landscape" },
        { type: "p", text: "In public art, corten has enabled large-scale works without the logistical complexity demanded by other materials. Its weight is manageable and, once the patina has stabilised, maintenance is minimal." },
        { type: "p", text: "Biennials such as Skulptur Projekte Münster, which since 1977 has mapped contemporary sculpture in public space, have repeatedly included corten works. Their presence in parks, squares and reconverted industrial areas has become commonplace." },
        { type: "p", text: "Private collectors with sculpture gardens, from Hauser & Wirth Somerset in the United Kingdom to estates in Tuscany or Sonoma, turn to corten for pieces meant to live outdoors." },

        { type: "h2", text: "Interior sculpture: a second life" },
        { type: "p", text: "The use of corten inside the home is more recent, but growing fast. Medium-format works with stabilised patinas and careful finishes coexist with contemporary furniture without overwhelming the space." },
        { type: "p", text: "Fairs like ARCOmadrid and Art Basel Miami Beach have incorporated in their most recent editions corten sculptures specifically conceived for indoor use, with polished bases or treatments that prevent transferring oxide onto floors." },

        { type: "h2", text: "How to collect corten" },
        { type: "p", text: "Anyone approaching this material for the first time should pay attention to three points. The first is sealing: an untreated patina may keep releasing oxide for months, which requires planning the placement." },
        { type: "p", text: "The second is the steel's provenance. Major European and North American steelmakers provide technical documentation that buyers should request, especially for works destined for institutional collections." },
        { type: "p", text: "The third, perhaps the most important, is to understand what kind of aging is desired. Some collectors prefer the piece to keep changing indefinitely; others want to freeze a specific moment with a protective wax." },

        { type: "h2", text: "A conversation with the surroundings" },
        { type: "p", text: "What makes corten singular is not only its colour, nor even its texture. It is its ability to enter into conversation with the place." },
        { type: "p", text: "A well-placed piece stops being an object and becomes a presence, a mark that organises the space without fully occupying it. That is why abstract sculpture finds in this material a natural ally." },
        { type: "p", text: "Corten steel, in the end, is not exhibited: it is installed. And in doing so, it slowly writes the landscape that surrounds it." },
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
      titulo: "Helena Vázquez: tres décadas escuchando el bronce",
      extracto: "Una conversación sobre oficio lento, ediciones cortas y la convicción de que una pieza sólo está terminada cuando deja de pedir más trabajo.",
      fechaLabel: "10 de abril de 2026",
      body: [
        { type: "p", text: "Helena Vázquez recibe en su taller con las manos manchadas de cera. A su espalda, una pieza inacabada espera apoyada sobre un caballete de hierro. Lleva más de treinta años trabajando el bronce y, sin embargo, habla del material como quien acaba de descubrirlo." },
        { type: "p", text: "Su trayectoria se ha forjado lejos del ruido. Pocas entrevistas, escasa presencia en redes y una insistencia obstinada en producir poco y bien. Una excepción rara en un sistema acostumbrado a la sobreproducción." },

        { type: "h2", text: "Una formación entre talleres" },
        { type: "p", text: "Se formó entre la Real Academia de Bellas Artes de San Fernando, en Madrid, y un periodo decisivo en la Accademia di Belle Arti di Carrara, donde, asegura, aprendió a mirar la piedra y a entender por contraste qué pedía el bronce." },
        { type: "p", text: "«En Carrara descubrí que cada material tiene un tempo. El mármol exige decisiones definitivas; el bronce permite volver, pero te castiga si abusas de su paciencia»." },

        { type: "h2", text: "El oficio lento" },
        { type: "p", text: "«El bronce no admite prisa», advierte. «Si lo fuerzas, te castiga. Y si lo escuchas, te sorprende». Sus piezas pueden tardar meses en encontrar su forma definitiva." },
        { type: "p", text: "Su rutina diaria empieza temprano, con un café junto a las piezas en curso. «Las miro antes de tocarlas. Si no me dicen nada, no las trabajo ese día»." },
        { type: "p", text: "Esa metodología, casi conventual, choca con la lógica habitual de las galerías. «Me han pedido más obra muchas veces. He aprendido a decir que no sin sentirme culpable»." },

        { type: "h2", text: "Las piezas que casi destruye" },
        { type: "p", text: "Hay obras suyas que estuvieron a punto de no existir. «Tengo varias que rescaté del horno minutos antes de fundirlas de nuevo. Las miré y, de repente, entendí que estaban bien»." },
        { type: "p", text: "Una de ellas, que prefiere no nombrar, terminó en una colección privada europea. «El coleccionista me dijo años después que era su pieza favorita. No me atreví a contarle que la consideré fallida durante seis meses»." },
        { type: "p", text: "Otras no tuvieron tanta suerte. «He destruido obra. No lo digo con romanticismo. Lo hago porque a veces una pieza simplemente no llega y prolongarla sería deshonesto»." },

        { type: "h2", text: "Por qué rechaza las grandes ediciones" },
        { type: "p", text: "Vázquez ha rechazado en varias ocasiones producir ediciones grandes. «Si todo el mundo tiene la misma pieza, deja de ser una pieza. Pasa a ser un producto»." },
        { type: "p", text: "Sus ediciones suelen quedarse en tres o cuatro ejemplares más una prueba de artista. «No es un capricho. Es que cada fundición es distinta, y cuando el número crece dejo de poder vigilar las pátinas como quiero»." },
        { type: "p", text: "Reconoce que esa decisión tiene un precio económico. «Sí, podría facturar más. Pero entonces tendría que delegar partes del proceso que considero intransferibles»." },

        { type: "h2", text: "Diálogo con la tradición figurativa" },
        { type: "p", text: "Su obra dialoga con la tradición figurativa española sin instalarse en ella. «Vengo de mirar mucho a Julio López Hernández, a Venancio Blanco. Pero no quiero repetirlos. Quiero escucharlos»." },
        { type: "p", text: "Cita también referentes internacionales como Medardo Rosso, cuya obra ha estudiado en visitas reiteradas a la Galleria d'Arte Moderna de Milán. «Rosso me enseñó que el bronce puede ser frágil, casi tembloroso»." },

        { type: "h2", text: "Coleccionismo y permanencia" },
        { type: "p", text: "Sobre el coleccionismo actual, mantiene una mirada serena. «Antes había más miedo a comprar escultura. Hoy hay más curiosidad, más coleccionistas jóvenes que entran por la figura». Cita la presencia creciente de escultura en bronce en ARCOmadrid y en la sección Statements de Art Basel." },
        { type: "p", text: "También menciona el papel de publicaciones como The Art Newspaper o Apollo Magazine, que han recuperado en los últimos años la conversación sobre los oficios escultóricos." },

        { type: "h2", text: "El taller como territorio" },
        { type: "p", text: "El taller, en las afueras de Madrid, funciona casi como un ecosistema cerrado. Cuatro personas, todas formadas con ella, gestionan el día a día. «No quiero un equipo grande. Quiero un equipo bueno»." },
        { type: "p", text: "Hay un cuaderno de pátinas, una especie de libro de recetas que actualiza desde hace décadas. «Es lo único que me llevaría si tuviera que cerrar mañana»." },

        { type: "h2", text: "Una última definición" },
        { type: "p", text: "Antes de despedirse, propone una definición de su trabajo que evita la solemnidad. «No esculpo. Negocio con el material hasta que se rinde sin enfadarse»." },
        { type: "p", text: "Después se ríe, se limpia las manos en un paño y vuelve a la pieza que la esperaba. El bronce, otra vez, no admite prisa." },
      ],
    },
    en: {
      seccion: "Interview",
      titulo: "Helena Vázquez: three decades listening to bronze",
      extracto: "A conversation on slow craft, short editions and the conviction that a piece is only finished when it stops asking for more work.",
      fechaLabel: "April 10, 2026",
      body: [
        { type: "p", text: "Helena Vázquez welcomes us into her studio with wax-stained hands. Behind her, an unfinished piece waits propped on an iron easel. She has been working with bronze for more than thirty years and yet talks about the material as if she had just discovered it." },
        { type: "p", text: "Her career has been built away from the noise. Few interviews, scant presence on social media and a stubborn insistence on producing little and well. A rare exception in a system used to overproduction." },

        { type: "h2", text: "Trained between workshops" },
        { type: "p", text: "She trained at the Real Academia de Bellas Artes de San Fernando in Madrid, with a decisive period at the Accademia di Belle Arti di Carrara, where, she says, she learned to look at stone and understand, by contrast, what bronze was asking for." },
        { type: "p", text: "«In Carrara I discovered that every material has a tempo. Marble demands definitive decisions; bronze lets you go back, but punishes you if you abuse its patience»." },

        { type: "h2", text: "Slow craft" },
        { type: "p", text: "«Bronze allows no rush», she warns. «If you push it, it punishes you. If you listen to it, it surprises you». Her pieces can take months to find their final shape." },
        { type: "p", text: "Her daily routine starts early, with coffee in front of the works in progress. «I look at them before touching them. If they say nothing to me, I don't work on them that day»." },
        { type: "p", text: "That almost monastic methodology clashes with the usual logic of galleries. «I have been asked for more work many times. I have learned to say no without feeling guilty»." },

        { type: "h2", text: "The pieces she nearly destroyed" },
        { type: "p", text: "Some of her works came close to never existing. «I have several that I rescued from the kiln minutes before melting them down again. I looked at them and suddenly understood they were right»." },
        { type: "p", text: "One of them, which she prefers not to name, ended up in a European private collection. «The collector told me years later that it was his favourite piece. I never dared confess that I had considered it a failure for six months»." },
        { type: "p", text: "Others were less fortunate. «I have destroyed work. I don't say it with any romanticism. I do it because sometimes a piece simply doesn't arrive, and extending it would be dishonest»." },

        { type: "h2", text: "Why she refuses large editions" },
        { type: "p", text: "Vázquez has repeatedly refused to produce large editions. «If everyone owns the same piece, it stops being a piece. It becomes a product»." },
        { type: "p", text: "Her editions usually stay at three or four examples plus an artist's proof. «It is not a whim. Every cast is different, and when the number grows I stop being able to watch over the patinas the way I want»." },
        { type: "p", text: "She admits the decision carries an economic price. «Yes, I could earn more. But then I would have to delegate parts of the process I consider non-transferable»." },

        { type: "h2", text: "A dialogue with the figurative tradition" },
        { type: "p", text: "Her work converses with the Spanish figurative tradition without settling into it. «I come from looking at Julio López Hernández, at Venancio Blanco a lot. But I don't want to repeat them. I want to listen to them»." },
        { type: "p", text: "She also cites international references such as Medardo Rosso, whose work she has studied in repeated visits to the Galleria d'Arte Moderna in Milan. «Rosso taught me that bronze can be fragile, almost trembling»." },

        { type: "h2", text: "Collecting and permanence" },
        { type: "p", text: "On today's collecting scene, she keeps a calm view. «There used to be more fear of buying sculpture. Today there is more curiosity, more young collectors coming in through the figure». She points to the growing presence of bronze sculpture at ARCOmadrid and in the Statements section of Art Basel." },
        { type: "p", text: "She also mentions the role of publications like The Art Newspaper or Apollo Magazine, which in recent years have brought back the conversation about sculptural crafts." },

        { type: "h2", text: "The studio as territory" },
        { type: "p", text: "The studio, on the outskirts of Madrid, works almost as a closed ecosystem. Four people, all trained by her, run the day-to-day. «I don't want a large team. I want a good team»." },
        { type: "p", text: "There is a patina notebook, a sort of recipe book she has been updating for decades. «It is the only thing I would take with me if I had to close tomorrow»." },

        { type: "h2", text: "A final definition" },
        { type: "p", text: "Before saying goodbye, she offers a definition of her work that avoids solemnity. «I don't sculpt. I negotiate with the material until it surrenders without getting angry»." },
        { type: "p", text: "Then she laughs, wipes her hands on a cloth and returns to the piece that was waiting for her. Bronze, once again, allows no rush." },
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
      extracto: "Guía práctica para quien empieza a coleccionar: pieza única o edición, cómo se forma el precio y por qué la procedencia importa más que nunca.",
      fechaLabel: "22 de marzo de 2026",
      body: [
        { type: "p", text: "Coleccionar escultura exige una mirada más paciente que la que pide la pintura. El volumen pide tiempo, recorrido y, sobre todo, información clara sobre la procedencia de cada pieza." },
        { type: "p", text: "El Art Basel and UBS Global Art Market Report, que se publica cada año, ha documentado en sus últimas ediciones un aumento sostenido del interés por la escultura entre coleccionistas menores de cuarenta años. La curiosidad existe; faltan, en muchos casos, los criterios." },

        { type: "h2", text: "Pieza única o edición" },
        { type: "p", text: "Una pieza única tiene un valor distinto al de una edición numerada. Ambas son legítimas, pero exigen documentación específica: certificado del artista, número de ejemplar y registro del taller donde se fundió." },
        { type: "p", text: "En las ediciones, conviene atender al tamaño total. Una edición de tres o cinco ejemplares suele considerarse corta; a partir de doce, el mercado comienza a tratarla como producción seriada. Las casas de subastas como Christie's o Sotheby's publican esta información en sus catálogos." },
        { type: "p", text: "También importa saber si existen pruebas de artista (AP) y cuántas. En general, una proporción razonable es no más del 20% sobre el total de la edición." },

        { type: "h2", text: "Cómo se forma el precio" },
        { type: "p", text: "El precio de una escultura combina varios factores. Pesa la trayectoria del artista, su presencia en colecciones institucionales, su representación por galerías reconocidas y su historial de subastas." },
        { type: "p", text: "También intervienen elementos materiales: el coste del bronce, del mármol o del acero corten, así como las horas de taller. Una pieza pequeña en bronce, con buena pátina, rara vez baja de cierto umbral simplemente por el coste de su fundición." },
        { type: "p", text: "El contexto importa. Un artista que acaba de participar en una bienal como la de Venecia o en una exposición institucional verá variar su mercado en cuestión de meses." },

        { type: "h2", text: "Procedencia: el documento invisible" },
        { type: "p", text: "Antes de adquirir una obra, conviene revisar su historial: exposiciones, publicaciones, colecciones previas. Una procedencia clara protege la inversión y, sobre todo, protege el sentido de la obra." },
        { type: "p", text: "Las grandes instituciones (Museo Reina Sofía, Centre Pompidou, Tate, MoMA) llevan décadas exigiendo trazabilidad completa a la hora de adquirir obra contemporánea. El coleccionismo privado serio replica cada vez más ese estándar." },
        { type: "p", text: "Una buena procedencia incluye facturas de origen, catálogos de exposiciones, fotografías de instalación y, cuando existe, correspondencia con el artista o su estudio." },

        { type: "h2", text: "Galerías, ferias y subastas" },
        { type: "p", text: "Hay tres canales principales para comprar escultura: galerías, ferias y subastas. Cada uno ofrece ventajas distintas." },
        { type: "p", text: "La galería ofrece relación a largo plazo. Es el canal natural para quien quiere acompañar la trayectoria de un artista, acceder a obra reciente y construir un diálogo continuado." },
        { type: "p", text: "Las ferias (ARCOmadrid, Art Basel, Frieze, TEFAF) ofrecen una panorámica condensada del mercado en pocos días. Son útiles para comparar precios y descubrir artistas." },
        { type: "p", text: "Las subastas, públicas y trazables, marcan precios de referencia. Plataformas como Christie's Live o Sotheby's Online han abierto el acceso a coleccionistas que antes ni siquiera entraban en la sala." },

        { type: "h2", text: "Autenticidad y tecnología" },
        { type: "p", text: "La tecnología ha empezado a aliviar uno de los miedos clásicos del coleccionismo: la autenticidad. Empresas como Verisart ofrecen certificados digitales firmados por el artista, con trazabilidad sobre blockchain." },
        { type: "p", text: "Algunos talleres incorporan marcas internas en sus bronces, sólo visibles bajo radiografía, que permiten verificar el origen sin dañar la pieza. Es un estándar emergente que comienza a adoptarse en encargos institucionales." },
        { type: "p", text: "Las visualizaciones 3D, cada vez más comunes en plataformas especializadas, permiten al coleccionista evaluar el volumen real de una pieza antes del envío. No sustituyen al contacto físico, pero reducen el margen de sorpresa." },

        { type: "h2", text: "Cuidados básicos y conservación" },
        { type: "p", text: "Una vez adquirida la pieza, la conservación pasa a primer plano. Los bronces requieren limpieza suave y, en interiores, ambientes con humedad controlada. El corten, si está sellado, sólo necesita revisión periódica." },
        { type: "p", text: "Instituciones como el Instituto del Patrimonio Cultural de España (IPCE) publican manuales abiertos con buenas prácticas que pueden orientar al coleccionista privado." },

        { type: "h2", text: "El primer paso" },
        { type: "p", text: "Para quien empieza, el consejo más útil suele ser el más simple: ver mucha escultura antes de comprar la primera. Visitar exposiciones, recorrer ferias, leer publicaciones especializadas." },
        { type: "p", text: "Comprar una pieza es una decisión que combina criterio estético, capacidad económica y proyecto de vida. Hacerla con información sólida convierte la compra en parte de una conversación más larga: la del coleccionista con su propia mirada." },
      ],
    },
    en: {
      seccion: "Market",
      titulo: "Collecting sculpture today: criteria, prices and provenance",
      extracto: "A practical guide for new collectors: unique pieces versus editions, how price is formed and why provenance matters more than ever.",
      fechaLabel: "March 22, 2026",
      body: [
        { type: "p", text: "Collecting sculpture demands a more patient eye than painting does. Volume asks for time, for walking around it, and above all for clear information about the provenance of each piece." },
        { type: "p", text: "The Art Basel and UBS Global Art Market Report, published every year, has documented in its most recent editions a steady rise in sculpture interest among collectors under forty. Curiosity is there; what is often missing is criteria." },

        { type: "h2", text: "Unique piece or edition" },
        { type: "p", text: "A unique piece has a different value from a numbered edition. Both are legitimate, but each requires specific documentation: artist's certificate, edition number and a record of the foundry that cast it." },
        { type: "p", text: "For editions, total size matters. An edition of three or five is usually considered short; from twelve upwards, the market starts to treat it as serial production. Auction houses such as Christie's or Sotheby's publish this information in their catalogues." },
        { type: "p", text: "It is also important to know whether artist's proofs (AP) exist and how many. As a general rule, a reasonable ratio is no more than 20% on top of the total edition." },

        { type: "h2", text: "How price is formed" },
        { type: "p", text: "The price of a sculpture combines several factors. It carries the weight of the artist's career, their presence in institutional collections, representation by recognised galleries and auction history." },
        { type: "p", text: "Material elements also intervene: the cost of bronze, marble or corten steel, as well as studio hours. A small bronze piece, well patinated, rarely drops below a certain threshold simply because of casting costs." },
        { type: "p", text: "Context matters. An artist who has just taken part in a biennial such as Venice, or in an institutional show, will see their market shift within months." },

        { type: "h2", text: "Provenance: the invisible document" },
        { type: "p", text: "Before acquiring a work, review its history: exhibitions, publications, previous collections. A clear provenance protects the investment and, above all, protects the meaning of the work." },
        { type: "p", text: "Major institutions (Museo Reina Sofía, Centre Pompidou, Tate, MoMA) have for decades required full traceability when acquiring contemporary work. Serious private collecting is increasingly mirroring that standard." },
        { type: "p", text: "Good provenance includes original invoices, exhibition catalogues, installation photographs and, when available, correspondence with the artist or their studio." },

        { type: "h2", text: "Galleries, fairs and auctions" },
        { type: "p", text: "There are three main channels to buy sculpture: galleries, fairs and auctions. Each offers different advantages." },
        { type: "p", text: "The gallery offers a long-term relationship. It is the natural channel for those who want to follow an artist's career, access recent work and build an ongoing dialogue." },
        { type: "p", text: "Fairs (ARCOmadrid, Art Basel, Frieze, TEFAF) offer a condensed view of the market within a few days. They are useful for comparing prices and discovering artists." },
        { type: "p", text: "Auctions, public and traceable, set reference prices. Platforms like Christie's Live and Sotheby's Online have opened access to collectors who never used to enter the room." },

        { type: "h2", text: "Authenticity and technology" },
        { type: "p", text: "Technology has started to ease one of collecting's classic fears: authenticity. Companies like Verisart issue digital certificates signed by the artist, with blockchain traceability." },
        { type: "p", text: "Some workshops embed internal marks in their bronzes, only visible under X-ray, which allow the origin to be verified without damaging the piece. It is an emerging standard that is starting to be adopted in institutional commissions." },
        { type: "p", text: "3D visualisations, increasingly common on specialised platforms, allow the collector to assess the real volume of a piece before shipping. They do not replace physical contact, but they reduce the margin for surprise." },

        { type: "h2", text: "Basic care and conservation" },
        { type: "p", text: "Once the piece is acquired, conservation takes centre stage. Bronzes require gentle cleaning and, indoors, environments with controlled humidity. Corten, if sealed, only needs periodic review." },
        { type: "p", text: "Institutions such as the Instituto del Patrimonio Cultural de España (IPCE) publish open manuals with good practices that can guide private collectors." },

        { type: "h2", text: "The first step" },
        { type: "p", text: "For those starting out, the most useful piece of advice tends to be the simplest: look at a lot of sculpture before buying the first piece. Visit exhibitions, walk through fairs, read specialised publications." },
        { type: "p", text: "Buying a work is a decision that combines aesthetic judgment, financial capacity and a personal project. Making it with solid information turns the purchase into part of a longer conversation: the collector's dialogue with their own eye." },
      ],
    },
  },
];

export const getArticleBySlug = (slug: string) =>
  EDITORIAL_ARTICLES.find((a) => a.slug === slug);
