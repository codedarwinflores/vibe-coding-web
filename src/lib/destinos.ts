export type Categoria = "Playa" | "Volcán" | "Lago" | "Montaña" | "Pueblo" | "Arqueología";

export interface Destino {
  slug: string;
  nombre: string;
  departamento: string;
  categoria: Categoria;
  emoji: string;
  /** Clases de Tailwind para el degradado de la tarjeta. */
  gradiente: string;
  resumen: string;
  descripcion: string;
  actividades: string[];
  lat: number;
  lon: number;
  altitud: number;
}

export const CATEGORIAS: Categoria[] = ["Playa", "Volcán", "Lago", "Montaña", "Pueblo", "Arqueología"];

export const DESTINOS: Destino[] = [
  {
    slug: "el-tunco",
    nombre: "Playa El Tunco",
    departamento: "La Libertad",
    categoria: "Playa",
    emoji: "🏄",
    gradiente: "from-sky-500 to-cyan-400",
    resumen: "Olas de clase mundial y atardeceres icónicos en Surf City.",
    descripcion:
      "Parte de la ruta Surf City, El Tunco es famosa por su roca en forma de cerdo, sus olas consistentes todo el año y su vida nocturna relajada frente al Pacífico.",
    actividades: ["Surf", "Atardeceres", "Gastronomía de mar", "Vida nocturna"],
    lat: 13.4936,
    lon: -89.3836,
    altitud: 5,
  },
  {
    slug: "volcan-santa-ana",
    nombre: "Volcán de Santa Ana (Ilamatepec)",
    departamento: "Santa Ana",
    categoria: "Volcán",
    emoji: "🌋",
    gradiente: "from-orange-600 to-amber-500",
    resumen: "El volcán más alto del país, con una laguna turquesa en su cráter.",
    descripcion:
      "Con 2,381 m de altura, el Ilamatepec ofrece una caminata guiada de unas 2 horas hasta el cráter, donde una laguna de agua sulfurosa de color esmeralda sorprende a los visitantes.",
    actividades: ["Senderismo", "Fotografía", "Avistamiento de aves"],
    lat: 13.8536,
    lon: -89.6303,
    altitud: 2381,
  },
  {
    slug: "lago-coatepeque",
    nombre: "Lago de Coatepeque",
    departamento: "Santa Ana",
    categoria: "Lago",
    emoji: "🛶",
    gradiente: "from-teal-600 to-emerald-400",
    resumen: "Lago de origen volcánico que cambia de color azul a turquesa.",
    descripcion:
      "Ubicado dentro de una caldera volcánica, Coatepeque es ideal para kayak, paseos en lancha y restaurantes con vista. Su agua cambia de tonalidad en ciertas épocas del año.",
    actividades: ["Kayak", "Paseos en lancha", "Buceo", "Miradores"],
    lat: 13.8667,
    lon: -89.5444,
    altitud: 745,
  },
  {
    slug: "suchitoto",
    nombre: "Suchitoto",
    departamento: "Cuscatlán",
    categoria: "Pueblo",
    emoji: "🏘️",
    gradiente: "from-rose-500 to-pink-400",
    resumen: "Ciudad colonial con calles empedradas y vista al lago Suchitlán.",
    descripcion:
      "Considerada la capital cultural de El Salvador, Suchitoto conserva su arquitectura colonial, talleres de añil, galerías de arte y el embalse Suchitlán con islas y aves migratorias.",
    actividades: ["Talleres de añil", "Arte y cultura", "Paseo en lancha", "Cascada Los Tercios"],
    lat: 13.9381,
    lon: -89.0278,
    altitud: 390,
  },
  {
    slug: "ruta-de-las-flores",
    nombre: "Ruta de las Flores (Juayúa)",
    departamento: "Sonsonate",
    categoria: "Pueblo",
    emoji: "🌺",
    gradiente: "from-fuchsia-500 to-purple-400",
    resumen: "Pueblos coloridos, cafetales y la feria gastronómica de Juayúa.",
    descripcion:
      "Un recorrido de 36 km por pueblos como Nahuizalco, Salcoatitán, Juayúa, Apaneca y Ataco, entre murales, artesanías, cascadas y fincas de café de altura.",
    actividades: ["Feria gastronómica", "Tour de café", "Cascadas", "Artesanías"],
    lat: 13.8417,
    lon: -89.7456,
    altitud: 1020,
  },
  {
    slug: "joya-de-ceren",
    nombre: "Joya de Cerén",
    departamento: "La Libertad",
    categoria: "Arqueología",
    emoji: "🏛️",
    gradiente: "from-yellow-600 to-orange-400",
    resumen: "La “Pompeya de América”, Patrimonio de la Humanidad por la UNESCO.",
    descripcion:
      "Aldea maya sepultada por la ceniza del volcán Loma Caldera hacia el año 600 d. C. Su excelente conservación muestra la vida cotidiana de una comunidad agrícola prehispánica.",
    actividades: ["Recorrido guiado", "Museo de sitio", "Historia maya"],
    lat: 13.8272,
    lon: -89.3694,
    altitud: 450,
  },
  {
    slug: "el-pital",
    nombre: "Cerro El Pital",
    departamento: "Chalatenango",
    categoria: "Montaña",
    emoji: "⛰️",
    gradiente: "from-green-700 to-lime-500",
    resumen: "El punto más alto del país, con bosque nuboso y clima fresco.",
    descripcion:
      "A 2,730 m sobre el nivel del mar, El Pital ofrece camping, bosques de pino y temperaturas que pueden bajar de 10 °C, algo excepcional en El Salvador.",
    actividades: ["Camping", "Senderismo", "Observación de estrellas"],
    lat: 14.3889,
    lon: -89.1219,
    altitud: 2730,
  },
  {
    slug: "playa-el-cuco",
    nombre: "Playa El Cuco",
    departamento: "San Miguel",
    categoria: "Playa",
    emoji: "🏖️",
    gradiente: "from-blue-600 to-indigo-400",
    resumen: "Arena oscura y aguas tranquilas en el oriente del país.",
    descripcion:
      "Una de las playas más visitadas del oriente salvadoreño, con aguas cálidas, palmeras y una zona de manglares cercana, ideal para descansar en familia.",
    actividades: ["Natación", "Manglares", "Pesca artesanal"],
    lat: 13.1717,
    lon: -88.1092,
    altitud: 3,
  },
];

export function getDestinos(categoria?: string | null): Destino[] {
  if (!categoria) return DESTINOS;
  return DESTINOS.filter((d) => d.categoria.toLowerCase() === categoria.toLowerCase());
}

export function getDestino(slug: string): Destino | undefined {
  return DESTINOS.find((d) => d.slug === slug);
}
