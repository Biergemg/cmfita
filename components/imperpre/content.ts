import { contactEmail, contactPhone, getWhatsappUrl } from "@/lib/site";

// Texto de la landing de Imperpre. Lo que no está confirmado como política pública (superficie mínima, urgencia)
// solo se pregunta como dato opcional en el mensaje de WhatsApp; nunca se presenta como requisito.

export const nav = [
  { href: "#oferta", label: "Qué incluye" },
  { href: "#metodo", label: "Cómo trabajamos" },
  { href: "#senales", label: "Señales de filtración" },
  { href: "#preguntas", label: "Preguntas" },
];

export const hero = {
  kicker: "Impermeabilización especializada para escuelas privadas",
  title: "Antes de impermeabilizar la azotea de tu escuela, hay que entender por qué gotea.",
  body: "Revisamos la losa en sitio, te explicamos qué está fallando y te entregamos una propuesta clara antes de cotizar. Atendemos escuelas privadas en Tampico, Ciudad Madero y Altamira.",
  primary: "Pedir valoración",
  secondary: "Ver cómo trabajamos",
  note: "La visita técnica no tiene costo.",
  hint: "El soplete funde la cara inferior de la membrana mientras el rollo avanza",
  before: "Losa en revisión · obra de Imperpre",
  after: "Azotea terminada · otra obra de Imperpre",
};

export const offer = {
  title: "Lo que recibe tu escuela",
  intro:
    "Un proceso pensado para quien administra un plantel: entender el problema, decidir con información y no pagar dos veces por la misma gotera.",
  items: [
    {
      title: "Diagnóstico en sitio",
      body: "Revisamos la losa por arriba y por abajo: grietas, pretiles, chaflanes, bajantes, encharcamientos y el estado del sistema anterior.",
    },
    {
      title: "Revisión técnica antes de cotizar",
      body: "No damos precio a ciegas ni por metro cuadrado. El costo se define con lo que encontramos, no con lo que suponemos.",
    },
    {
      title: "Propuesta clara y por escrito",
      body: "Qué se corrige, qué sistema se instala, en qué orden y cuánto cuesta. Lista para presentarla a dirección o al patronato.",
    },
    {
      title: "Propuesta por etapas cuando aplica",
      body: "Si el presupuesto o el calendario escolar lo piden, el trabajo puede dividirse en etapas, empezando por lo más urgente.",
    },
    {
      title: "Trabajo planeado con el plantel",
      body: "Horarios, accesos y zonas de trabajo se acuerdan con la escuela para afectar lo menos posible las clases.",
    },
    {
      title: "Seguimiento después de la obra",
      body: "Si en la siguiente temporada de lluvias reaparece una filtración en la zona intervenida y dentro del alcance contratado, regresamos a revisar y corregir sin costo.",
    },
  ],
  cta: "Pedir valoración",
};

export const method = {
  title: "La membrana es la última capa, no la primera decisión.",
  intro: "Sistema Imperpre 3C: el mismo orden en cada azotea, ajustado a lo que encontramos en la revisión.",
  steps: [
    {
      n: "C1",
      title: "Corrección",
      body: "Se atiende el origen: grietas, juntas, chaflanes, remates y antepechos. Si hace falta, se retira el material deteriorado.",
      img: "/imperpre/obra-instalacion-altura.jpg",
      alt: "Técnico de Imperpre colocando membrana en el pretil de una azotea",
    },
    {
      n: "C2",
      title: "Canalización",
      body: "El agua tiene por dónde salir: se revisan y corrigen pendientes y bajantes para que no se encharque sobre la losa.",
      img: "/imperpre/obra-resultado-perspectiva.jpg",
      alt: "Azotea con bajante y pendiente revisadas",
    },
    {
      n: "C3",
      title: "Cobertura",
      body: "Membrana prefabricada APP o SBS de 4 mm, termofusionada sobre la losa ya corregida y verificada.",
      img: "/imperpre/obra-progreso-skyline.jpg",
      alt: "Membrana prefabricada instalada en una azotea con la ciudad al fondo",
    },
  ],
  closing: "No cotizamos por metro cuadrado sin revisar. No trabajamos techos de lámina ni reparaciones estructurales mayores.",
};

export const signals = {
  title: "Cuándo conviene revisar la azotea",
  intro:
    "Si reconoces dos o más de estas señales, el problema ya no es solo de impermeabilizante. Lo mejor es revisarlo antes de la temporada de lluvias.",
  items: [
    "Manchas o plafones dañados en salones y pasillos",
    "Salones o áreas que se dejan de usar cuando llueve",
    "Equipo de cómputo, laboratorio o audiovisual expuesto a goteo",
    "Olor a humedad o pintura que se ampolla",
    "Agua encharcada en la azotea después de llover",
    "Goteras que regresan después de un parche",
  ],
  photo: "/imperpre/obra-proceso-equipo.jpg",
  photoAlt: "Equipo de Imperpre revisando una losa de concreto desgastada",
  cta: "Revisar la azotea de mi escuela",
};

export const works = {
  title: "Trabajo real, en azoteas reales",
  intro: "Fotografías de obras de Imperpre: revisión, instalación y resultado.",
  photos: [
    { src: "/imperpre/obra-resultado-azotea-blanca-1.jpg", alt: "Azotea terminada con acabado blanco y equipos de clima", tag: "Resultado" },
    { src: "/imperpre/obra-instalacion-altura.jpg", alt: "Instalación de membrana en pretil a altura", tag: "Instalación" },
    { src: "/imperpre/obra-materiales-montacargas.jpg", alt: "Rollos de membrana prefabricada cargados para la obra", tag: "Materiales" },
    { src: "/imperpre/obra-resultado-atardecer.jpg", alt: "Azotea con membrana instalada al atardecer", tag: "Resultado" },
  ],
  operatedBy: {
    title: "Imperpre es operado por FITA",
    body: "Detrás de cada obra hay una empresa formal con domicilio, RFC y facturación.",
    rows: [
      ["Razón social", "Construcción y Mantenimientos FITA, S.A. de C.V."],
      ["RFC", "CMF140509C49"],
      ["Domicilio", "Paseo de los Mexicas 126-D, col. 16 de Septiembre, Ciudad Madero, Tamps."],
      ["Teléfono", contactPhone],
      ["Correo", contactEmail],
    ] as const,
  },
};

export const valuation = {
  title: "Pide la valoración de tu azotea",
  intro: "Con estos datos armamos el mensaje por ti. Tú decides si lo envías; la visita técnica no tiene costo.",
  municipalities: ["Tampico", "Ciudad Madero", "Altamira"],
  signals: [
    "Manchas en plafón o muros",
    "Humedad u olor en salones",
    "Pintura que se ampolla",
    "Agua acumulada en la azotea",
    "Goteras que regresan tras un parche",
  ],
  sizes: ["Menos de 100 m²", "Entre 100 y 500 m²", "Más de 500 m²", "No lo sé"],
  active: ["Sí, hay goteras ahora", "No por ahora"],
  cta: "Pedir valoración por WhatsApp",
  fine: "Sin compromiso. No damos precio sin revisar la losa.",
};

export function buildValuationMessage(input: {
  school: string;
  who: string;
  municipality?: string;
  signals: string[];
  size?: string;
  active?: string;
}): string {
  const lines = [
    `Hola, Imperpre. ${input.who ? `Soy ${input.who}. ` : ""}Escribo de ${input.school ? `la escuela ${input.school}` : "una escuela"}${input.municipality ? ` en ${input.municipality}` : ""} y quiero pedir la valoración de la azotea.`,
  ];
  if (input.signals.length) lines.push(`Hemos notado: ${input.signals.map((s) => s.toLowerCase()).join("; ")}.`);
  if (input.size && input.size !== "No lo sé") lines.push(`Tamaño aproximado de la azotea: ${input.size}.`);
  if (input.active) lines.push(input.active.startsWith("Sí") ? "Ahora mismo hay goteras activas." : "Por ahora no hay goteras activas.");
  lines.push("¿Cuándo pueden venir a revisar la losa?");
  return lines.join("\n");
}

export const valuationUrl = (message: string) => getWhatsappUrl(message);
