import type {
  CaseStudy,
  Certification,
  Locale,
  TeamMember,
  Testimonial,
} from "@/types/content";

export const caseStudies: Record<Locale, CaseStudy[]> = {
  es: [
    {
      slug: "frentes-offshore-metalmecanicos",
      title: "Frentes offshore y metal-mecánicos documentados",
      sector: "Industrial / costa afuera",
      scope: "Fabricación, instalación, mantenimiento y adecuaciones",
      location: "Plataformas Arenque",
      summary:
        "El CV histórico de FITA documenta participación en trabajos costa afuera con Petrofac México, incluyendo paneles estructurales, defensas de ducto, bajantes, líneas de proceso, barandales, rejillas y desmantelamientos.",
      deliverables: [
        "Fabricación y montaje de estructuras y componentes",
        "Intervenciones de tubería, bajantes, líneas y adecuaciones",
        "Recubrimientos, mantenimiento y trabajos complementarios en plataforma",
      ],
      metrics: [
        { label: "Cliente documentado", value: "Petrofac" },
        { label: "Entorno", value: "Offshore" },
        { label: "Frentes", value: "Arenque A/B/C" },
      ],
      gallery: [
        { src: "/infrastructure.png", alt: "Infraestructura industrial y costa afuera" },
        { src: "/crane.png", alt: "Intervención estructural con equipo de izaje" },
      ],
      ctaLabel: "Quiero invitar a FITA a participar",
    },
    {
      slug: "obra-civil-institucional",
      title: "Obra civil institucional y de servicio",
      sector: "Civil / institucional",
      scope: "Obra nueva y mantenimiento",
      location: "Tamaulipas y Veracruz",
      summary:
        "El mismo historial incorpora obra civil como domos, rehabilitación de baños, laboratorios, casetas y cancha multiusos con alumbrado, lo que respalda la línea civil del sitio global sin saturarlo de detalle técnico.",
      deliverables: [
        "Construcción y adecuación de infraestructura institucional",
        "Frentes civiles con acabados e instalaciones complementarias",
        "Participación en proyectos públicos y privados según alcance",
      ],
      metrics: [
        { label: "Línea respaldada", value: "Civil" },
        { label: "Obras visibles", value: "Domos / canchas" },
        { label: "Tipo", value: "Institucional" },
      ],
      gallery: [
        { src: "/capabilities.png", alt: "Frente de fabricación y ejecución" },
        { src: "/team.png", alt: "Equipo operativo en sitio" },
      ],
      ctaLabel: "Necesito revisar un alcance",
    },
  ],
  en: [
    {
      slug: "offshore-and-metal-mechanical-fronts",
      title: "Documented offshore and metal-mechanical fronts",
      sector: "Industrial / offshore",
      scope: "Fabrication, installation, maintenance, and modifications",
      location: "Arenque platforms",
      summary:
        "FITA’s legacy CV documents participation in offshore work with Petrofac México, including structural panels, pipe defenses, risers, process lines, handrails, grating, and dismantling work.",
      deliverables: [
        "Fabrication and erection of structures and components",
        "Piping, risers, lines, and modification work",
        "Coatings, maintenance, and complementary platform work",
      ],
      metrics: [
        { label: "Documented client", value: "Petrofac" },
        { label: "Environment", value: "Offshore" },
        { label: "Fronts", value: "Arenque A/B/C" },
      ],
      gallery: [
        { src: "/infrastructure.png", alt: "Industrial and offshore infrastructure" },
        { src: "/crane.png", alt: "Structural intervention with lifting equipment" },
      ],
      ctaLabel: "I want to invite FITA to participate",
    },
    {
      slug: "institutional-civil-work",
      title: "Institutional and service civil work",
      sector: "Civil / institutional",
      scope: "New construction and maintenance",
      location: "Tamaulipas and Veracruz",
      summary:
        "The same documented history includes civil work such as domes, restroom rehabilitation, laboratories, guardhouses, and sports courts with lighting, supporting the civil line of the global site without overloading it.",
      deliverables: [
        "Construction and adaptation of institutional infrastructure",
        "Civil fronts with finishes and complementary installations",
        "Participation in public and private projects according to scope",
      ],
      metrics: [
        { label: "Supported line", value: "Civil" },
        { label: "Visible works", value: "Domes / courts" },
        { label: "Type", value: "Institutional" },
      ],
      gallery: [
        { src: "/capabilities.png", alt: "Fabrication and execution front" },
        { src: "/team.png", alt: "Operations team on site" },
      ],
      ctaLabel: "I need to review a scope",
    },
  ],
};

export const testimonials: Record<Locale, Testimonial[]> = {
  es: [
    {
      name: "Petrofac México",
      role: "Referencia documentada en CV histórico",
      company: "Frentes costa afuera y metal-mecánicos",
      quote:
        "El historial presentado por FITA documenta participación en plataformas Arenque con trabajos de paneles modulares, recubrimientos, defensas de ducto, bajantes, líneas y desmantelamientos.",
    },
    {
      name: "Grupo Industrial Águila",
      role: "Referencia documentada en CV histórico",
      company: "Fabricación y montaje estructural",
      quote:
        "El mismo expediente registra fabricación de barandales, plataformas, estructuras de acero y proyectos de bajantes, lo que refuerza la experiencia metal-mecánica mostrada en el sitio.",
    },
  ],
  en: [
    {
      name: "Petrofac México",
      role: "Reference documented in legacy CV",
      company: "Offshore and metal-mechanical fronts",
      quote:
        "FITA’s presented record documents participation on Arenque platforms with modular panels, coatings, pipe defenses, risers, lines, and dismantling work.",
    },
    {
      name: "Grupo Industrial Águila",
      role: "Reference documented in legacy CV",
      company: "Structural fabrication and erection",
      quote:
        "The same file records handrails, platforms, steel structures, and riser projects, reinforcing the metal-mechanical experience shown on the site.",
    },
  ],
};

export const certifications: Record<Locale, Certification[]> = {
  es: [
    {
      name: "Contacto formal para invitaciones y propuestas",
      issuer: "cmfitasadecv@gmail.com",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Invitacion%20a%20participar%20-%20FITA",
      badgeLabel: "Correo formal",
    },
    {
      name: "WhatsApp para primer acercamiento",
      issuer: "+52 833 518 1171",
      referenceUrl: "https://wa.me/528335181171",
      badgeLabel: "Contacto rápido",
    },
    {
      name: "Datos corporativos base",
      issuer: "RFC CMF140509C49 · Ciudad Madero, Tamaulipas",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Solicitud%20de%20datos%20corporativos%20-%20FITA",
      badgeLabel: "Validación corporativa",
    },
  ],
  en: [
    {
      name: "Formal contact for invitations and proposals",
      issuer: "cmfitasadecv@gmail.com",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Project%20invitation%20-%20FITA",
      badgeLabel: "Formal email",
    },
    {
      name: "WhatsApp for first contact",
      issuer: "+52 833 518 1171",
      referenceUrl: "https://wa.me/528335181171",
      badgeLabel: "Quick contact",
    },
    {
      name: "Core corporate data",
      issuer: "Tax ID CMF140509C49 · Ciudad Madero, Tamaulipas",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Corporate%20data%20request%20-%20FITA",
      badgeLabel: "Corporate validation",
    },
  ],
};

export const teamMembers: Record<Locale, TeamMember[]> = {
  es: [
    {
      name: "Ing. Gustavo Bierge",
      role: "Contacto comercial y de participación",
      bio: "Canaliza invitaciones, revisiones iniciales de alcance y contacto formal para evaluar si FITA encaja en el proyecto o licitación.",
      image: "/team.png",
    },
    {
      name: "Modelo operativo FITA",
      role: "Integración de capacidades según alcance",
      bio: "La empresa arma sus frentes con base en la obra: civil, metal-mecánica, montaje e instalación y recubrimientos, sumando especialistas puntuales cuando el proyecto lo requiere.",
      image: "/infrastructure.png",
    },
  ],
  en: [
    {
      name: "Ing. Gustavo Bierge",
      role: "Commercial and participation contact",
      bio: "Handles invitations, initial scope reviews, and formal contact to evaluate whether FITA fits the project or bid.",
      image: "/team.png",
    },
    {
      name: "FITA operating model",
      role: "Capability integration by scope",
      bio: "The company structures its fronts according to the job: civil, metal-mechanical, installation, and coatings, adding specialist support when the project requires it.",
      image: "/infrastructure.png",
    },
  ],
};
