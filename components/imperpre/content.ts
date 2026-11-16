import { contactEmail, contactPhone, getWhatsappUrl } from "@/lib/site";

// Texto de la landing de Imperpre. Recorrido: reconocer la situación, entender cómo entra el agua, ver lo que cuesta,
// decidir con información, solicitar la revisión técnica y su Ficha de Hallazgos. Una sola acción en toda la página.
// Plazos de entrega y de garantía no se publican mientras no exista respaldo operativo y contractual verificado.

export const CTA = "Solicitar revisión técnica";
export const CTA_SHORT = "Solicitar revisión";

export const nav = [
  { href: "#origen", label: "Por qué gotea" },
  { href: "#revision", label: "La revisión" },
  { href: "#metodo", label: "Cómo se corrige" },
  { href: "#preguntas", label: "Preguntas" },
];

export const hero = {
  kicker: "Para escuelas privadas en Tampico, Ciudad Madero y Altamira",
  title: "Antes de llegar al salón, la gotera deja huellas en la azotea.",
  body: "Revisamos sin costo la azotea de concreto de tu escuela y te entregamos una Ficha de Hallazgos con fotos por zona: qué se encontró, qué requiere atención y qué conviene hacer.",
  primary: CTA,
  secondary: "Ver qué incluye",
  note: "La ficha se queda en tu escuela, contrates o no.",
  hint: "Membrana prefabricada termofusionada",
  before: "Losa en preparación · obra de Imperpre",
  after: "Membrana prefabricada instalada · obra de Imperpre",
};

export const recognition = {
  title: "Cuando llueve, la escuela cambia de rutina",
  intro: "En muchos planteles, la temporada de lluvias se reconoce por escenas como estas:",
  items: [
    "Cubetas en los mismos salones, en el mismo lugar de cada año.",
    "Personal de intendencia secando el piso antes de que entren los alumnos.",
    "Un grupo que se cambia de aula «mientras tanto».",
    "El proyector o las computadoras cubiertos con plástico.",
    "Una mancha en el plafón que cada temporada crece un poco.",
    "La misma reparación, pagada otra vez al año siguiente.",
  ],
  closing:
    "Si alguna te suena, no es descuido. La gotera se atiende donde aparece, y no siempre aparece donde entra el agua.",
};

export const discovery = {
  title: "El agua no siempre cae donde entra",
  paragraphs: [
    "Sobre una losa, el agua viaja. Entra por una grieta, por una unión abierta junto al pretil o por una zona donde se encharca. Avanza por la losa o entre capas viejas de impermeabilizante y gotea donde encuentra salida, que puede estar lejos del punto de entrada.",
    "Por eso un parche encima de la mancha puede aguantar una temporada y fallar la siguiente: tapó el lugar equivocado. Antes de decidir qué aplicar, hay que saber por dónde entra el agua, y eso se ve en sitio, arriba y abajo de la losa.",
  ],
  listTitle: "Dónde suele empezar una filtración",
  list: [
    "Grietas y juntas de la losa",
    "Uniones con pretiles y chaflanes",
    "Zonas donde el agua se queda encharcada",
    "Bajantes tapadas o insuficientes",
    "Impermeabilizante anterior despegado o agotado",
    "Bases de equipos, domos y tuberías",
  ],
  photo: "/imperpre/obra-proceso-equipo.jpg",
  photoAlt: "Personal de Imperpre preparando una losa de concreto deteriorada antes de impermeabilizar",
  caption: "Losa deteriorada en preparación · obra de Imperpre",
};

export const consequences = {
  title: "Una filtración rara vez se queda en la azotea",
  intro: "No todas las escuelas viven todo esto. Pero cuando el agua entra una y otra vez, el costo aparece en varios frentes:",
  items: [
    {
      title: "Clases",
      body: "Aulas que no se usan los días de lluvia, grupos reacomodados y tiempo de dirección dedicado a resolver lo urgente.",
    },
    {
      title: "Personal",
      body: "Horas de intendencia y mantenimiento secando, moviendo mobiliario y colocando cubetas.",
    },
    {
      title: "Equipo y patrimonio",
      body: "Proyectores, computadoras, material de laboratorio y archivo a pocos centímetros del goteo.",
    },
    {
      title: "Acabados",
      body: "Plafones manchados o caídos, pintura que se ampolla, aplanados que se desprenden y mobiliario que se hincha.",
    },
    {
      title: "Humedad interior",
      body: "Manchas y olor que regresan. La Organización Mundial de la Salud recomienda evitar la humedad persistente en interiores porque se asocia con síntomas respiratorios, alergias y asma.",
    },
    {
      title: "Presupuesto",
      body: "Reparaciones que se repiten cada temporada porque el origen sigue ahí.",
    },
  ],
};

export const urgent = {
  title: "Cuándo no hay que esperar una revisión",
  items: [
    {
      title: "Agua cerca de lámparas, contactos o tableros",
      body: "Corta la energía de esa zona sin tocar nada mojado y pide la revisión de un electricista.",
    },
    {
      title: "Varilla expuesta, grietas que crecen o piezas que se desprenden",
      body: "Aparta a los alumnos de esa área y solicita una evaluación estructural.",
    },
  ],
  foot: "La impermeabilización protege la losa del agua; no sustituye una evaluación estructural. Si durante la revisión vemos señales de ese tipo, las anotamos aparte en la ficha para que las atienda el especialista adecuado.",
};

export const decide = {
  title: "Primero conocer la azotea. Después elegir el tratamiento.",
  body: "Un precio por metro cuadrado sin revisar responde a «¿cuánto cuesta cubrir?», no a «¿por qué entra el agua?». Antes de aprobar una intervención, dirección necesita saber qué está fallando, dónde y qué puede programarse.",
  season:
    "Y conviene saberlo con tiempo: una azotea mojada no se impermeabiliza bien, así que estas decisiones se toman mejor en meses secos, antes de la temporada de lluvias.",
  without: {
    title: "Decidir sin revisar",
    items: [
      "Se cubre la superficie y la causa puede quedar debajo.",
      "Las propuestas se comparan solo por precio por metro.",
      "Se aprueba sin saber qué es urgente y qué puede esperar.",
    ],
  },
  with: {
    title: "Decidir con la Ficha de Hallazgos",
    items: [
      "Cada hallazgo queda ubicado por zona y fotografiado.",
      "Se distingue lo que requiere atención de lo que puede programarse.",
      "Lo que no es impermeabilización queda señalado aparte.",
    ],
  },
};

export const offer = {
  title: "Revisión técnica de azotea escolar, sin costo",
  lead: "Un técnico recorre la azotea y, cuando hace falta, los salones donde aparece el agua. Después recibes la Ficha de Hallazgos de tu azotea.",
  reviewTitle: "Qué se revisa",
  review: [
    "Losa de concreto",
    "Grietas y juntas",
    "Pretiles y chaflanes",
    "Pendientes y zonas de encharcamiento",
    "Bajantes",
    "Impermeabilización existente",
    "Señales de filtración en interiores, cuando corresponde",
  ],
  reviewNote: "Se revisan las condiciones visibles y las zonas accesibles de forma segura.",
  card: {
    title: "Ficha de Hallazgos de la Azotea",
    sub: "Documento digital con fotografías y referencias por zona",
    rows: [
      { n: "1", title: "Lo que se observó", body: "Condiciones visibles, con fotografía y ubicación en la azotea." },
      { n: "2", title: "Lo que requiere atención", body: "Y lo que puede programarse, con el fundamento técnico de cada caso." },
      { n: "3", title: "Lo que necesita otro especialista", body: "Señales de estructura, electricidad u otras instalaciones, anotadas aparte." },
      { n: "4", title: "Trabajos a considerar", body: "La base para la propuesta, explicada sin tecnicismos." },
    ],
    foot: "La ficha distingue lo que se observó de sus posibles causas. Es una revisión visual: no es un dictamen estructural ni garantiza detectar todas las filtraciones.",
  },
  proposalTitle: "Propuesta técnica escrita, cuando procede",
  proposal: [
    "Alcance recomendado y zonas de intervención",
    "Trabajos previos a impermeabilizar",
    "Sistema de impermeabilización",
    "Etapas técnicamente viables",
    "Condiciones de ejecución",
    "Presupuesto específico",
  ],
  promises: [
    { title: "La ficha es de tu escuela", body: "Se queda contigo, contrates o no." },
    { title: "Sin obligación de contratar", body: "Decides con la información en la mano." },
    { title: "Nada fuera de lo aprobado", body: "Ningún trabajo adicional se ejecuta sin tu autorización." },
  ],
  cta: CTA,
  eligibility:
    "Para escuelas privadas con azotea de concreto en Tampico, Ciudad Madero y Altamira. Sujeta a cobertura y agenda.",
};

export const method = {
  title: "Si decides corregir, la membrana es la última capa",
  intro: "El trabajo sigue el orden que marcan los hallazgos de tu azotea.",
  steps: [
    {
      n: "1",
      title: "Corrección",
      body: "Primero se atienden los puntos críticos incluidos en el alcance: grietas, juntas, chaflanes, remates y material deteriorado.",
      img: "/imperpre/obra-proceso-equipo.jpg",
      alt: "Personal de Imperpre resanando una losa de concreto antes de impermeabilizar",
    },
    {
      n: "2",
      title: "Manejo del agua",
      body: "Después se revisan pendientes, bajantes y lo necesario para que el agua de lluvia salga de la losa.",
      img: "/imperpre/obra-resultado-panoramica-hero.jpg",
      alt: "Azotea con membrana prefabricada instalada y coladera pluvial",
    },
    {
      n: "3",
      title: "Impermeabilización",
      body: "Al final se instala membrana prefabricada termofusionada sobre la superficie ya preparada.",
      img: "/imperpre/obra-instalacion-altura.jpg",
      alt: "Técnico de Imperpre termofusionando membrana prefabricada sobre un pretil",
    },
  ],
  afterTitle: "Durante y después de la obra",
  after: [
    { title: "Coordinación con la escuela", body: "Horarios, accesos, zonas de trabajo y condiciones de seguridad se definen con dirección antes de iniciar." },
    { title: "Control de alcance", body: "Nada fuera del presupuesto aprobado se ejecuta sin autorización." },
    { title: "Entrega documentada", body: "Relación de zonas intervenidas, fotografías del trabajo realizado y recomendaciones de mantenimiento." },
    {
      title: "Garantía de instalación por escrito",
      body: "Cubre defectos atribuibles a los trabajos ejecutados en las zonas contratadas. Su plazo y sus condiciones quedan establecidos en el contrato.",
    },
  ],
  closing: "Trabajamos azoteas de concreto. No atendemos techos de lámina ni reparaciones estructurales.",
};

export const works = {
  title: "Membrana prefabricada en obras de Imperpre",
  intro: "Fotografías reales de preparación, instalación y terminado.",
  photos: [
    { src: "/imperpre/obra-resultado-atardecer.jpg", alt: "Azotea con membrana prefabricada instalada hasta los pretiles", tag: "Terminado" },
    { src: "/imperpre/obra-progreso-skyline.jpg", alt: "Membrana prefabricada en instalación con rollos y tanque de gas sobre la azotea", tag: "En instalación" },
    { src: "/imperpre/obra-instalacion-altura.jpg", alt: "Instalación de membrana prefabricada en pretil a altura", tag: "Remates" },
    { src: "/imperpre/obra-materiales-montacargas.jpg", alt: "Rollos de membrana prefabricada cargados para la obra", tag: "Material en obra" },
  ],
  operatedBy: {
    title: "Quién responde por el servicio",
    body: "Imperpre es el servicio de impermeabilización de Construcción y Mantenimientos FITA, S.A. de C.V. Propuestas, contratos y facturas se emiten a su nombre.",
    rows: [
      ["Razón social", "Construcción y Mantenimientos FITA, S.A. de C.V."],
      ["RFC", "CMF140509C49"],
      ["Domicilio", "Paseo de los Mexicas 126-D, col. 16 de Septiembre, Ciudad Madero, Tamps."],
      ["Teléfono", contactPhone],
      ["Correo", contactEmail],
    ] as const,
  },
};

export const faqTitle = "Antes de solicitar la revisión";

export const valuation = {
  title: "Solicita la revisión técnica de tu azotea",
  intro: "Con estos datos armamos el mensaje de WhatsApp por ti. Tú decides si lo envías.",
  municipalities: ["Tampico", "Ciudad Madero", "Altamira"],
  active: ["Sí, hay goteras ahora", "No por ahora"],
  incentiveTitle: "Lo que recibes",
  incentive: "Después de la visita, la Ficha de Hallazgos de tu azotea. Se queda en tu escuela, contrates o no.",
  cta: CTA,
  fine: "Sin costo y sin compromiso. Sujeta a cobertura y agenda.",
};

export function buildValuationMessage(input: { school: string; who: string; municipality?: string; active?: string }): string {
  const place = `${input.school ? `la escuela ${input.school}` : "una escuela"}${input.municipality ? ` en ${input.municipality}` : ""}`;
  const from = input.who ? `Soy ${input.who}, de ${place}.` : `Escribo de ${place}.`;
  const lines = [`Hola, Imperpre. ${from}`, "Quiero solicitar la revisión técnica de la azotea, sin costo."];
  if (input.active) lines.push(input.active.startsWith("Sí") ? "Ahora mismo tenemos goteras." : "Por ahora no tenemos goteras activas.");
  lines.push("¿Qué días tienen disponibles para la visita?");
  return lines.join("\n");
}

export const footerWhatsappMessage = "Hola, Imperpre. Quiero solicitar la revisión técnica de la azotea de mi escuela.";

export const valuationUrl = (message: string) => getWhatsappUrl(message);
