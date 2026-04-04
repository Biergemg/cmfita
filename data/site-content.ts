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
      slug: "petrofac-plataformas-arenque",
      title: "Petrofac México — Plataformas Arenque",
      sector: "Industrial / costa afuera",
      scope: "Paneles, recubrimientos, bajantes y desmantelamientos",
      location: "Plataformas Arenque",
      summary:
        "Paneles estructurales, recubrimientos, defensas de ducto, bajantes y desmantelamientos en entorno offshore. El tipo de trabajo que exige calidad en soldadura, coordinación en campo y control de alcance en condiciones difíciles.",
      deliverables: [
        "Paneles estructurales, defensas de ducto y líneas de proceso",
        "Bajantes, barandales, rejillas y desmantelamientos documentados",
        "Ejecución según alcance y requerimientos técnicos del frente offshore",
      ],
      metrics: [
        { label: "Cliente", value: "Petrofac" },
        { label: "Entorno", value: "Offshore" },
        { label: "Frentes", value: "Arenque A/B/C" },
      ],
      gallery: [
        { src: "/infrastructure.png", alt: "Infraestructura industrial y costa afuera" },
        { src: "/crane.png", alt: "Intervención estructural en entorno offshore" },
      ],
      ctaLabel: "¿Tu proyecto tiene frentes similares? Escríbenos",
    },
    {
      slug: "obra-civil-tamaulipas-veracruz",
      title: "Obra civil en Tamaulipas y Veracruz",
      sector: "Civil / institucional",
      scope: "Domos, laboratorios, casetas y canchas",
      location: "Tamaulipas y Veracruz",
      summary:
        "Domos, laboratorios, casetas, canchas con alumbrado y rehabilitaciones. Proyectos de sector público con entrega documentada, que respaldan la línea civil de FITA con hechos concretos.",
      deliverables: [
        "Frentes civiles institucionales con entrega documentada",
        "Participación según alcance de obra y condiciones de contratación",
        "Coordinación de ejecución sin inflar el frente más allá de lo contratado",
      ],
      metrics: [
        { label: "Línea", value: "Civil" },
        { label: "Obras", value: "Domos / canchas" },
        { label: "Sector", value: "Público" },
      ],
      gallery: [
        { src: "/capabilities.png", alt: "Frente de ejecución civil" },
        { src: "/team.png", alt: "Equipo operativo en obra" },
      ],
      ctaLabel: "¿Tienes una obra civil similar? Cuéntanos el alcance",
    },
  ],
  en: [
    {
      slug: "petrofac-arenque-platforms",
      title: "Petrofac México — Arenque Platforms",
      sector: "Industrial / offshore",
      scope: "Panels, coatings, risers, and dismantling",
      location: "Arenque platforms",
      summary:
        "Structural panels, coatings, pipe defenses, risers, and dismantling in an offshore environment. The kind of work that requires welding quality, field coordination, and scope control under difficult conditions.",
      deliverables: [
        "Structural panels, pipe defenses, and process lines",
        "Documented risers, handrails, grating, and dismantling work",
        "Execution according to offshore scope and technical requirements",
      ],
      metrics: [
        { label: "Client", value: "Petrofac" },
        { label: "Environment", value: "Offshore" },
        { label: "Fronts", value: "Arenque A/B/C" },
      ],
      gallery: [
        { src: "/infrastructure.png", alt: "Industrial and offshore infrastructure" },
        { src: "/crane.png", alt: "Structural intervention in offshore environment" },
      ],
      ctaLabel: "Does your project have similar fronts? Write to us",
    },
    {
      slug: "civil-work-tamaulipas-veracruz",
      title: "Civil work in Tamaulipas and Veracruz",
      sector: "Civil / institutional",
      scope: "Domes, labs, guardhouses, and courts",
      location: "Tamaulipas and Veracruz",
      summary:
        "Domes, laboratories, guardhouses, sports courts with lighting, and rehabilitation work. Public-sector projects with documented delivery that support FITA’s civil line with concrete facts.",
      deliverables: [
        "Institutional civil fronts with documented delivery",
        "Participation according to work scope and contract conditions",
        "Execution coordination without inflating the front beyond what was contracted",
      ],
      metrics: [
        { label: "Line", value: "Civil" },
        { label: "Works", value: "Domes / courts" },
        { label: "Sector", value: "Public" },
      ],
      gallery: [
        { src: "/capabilities.png", alt: "Civil execution front" },
        { src: "/team.png", alt: "Operations team on site" },
      ],
      ctaLabel: "Do you have a similar civil project? Tell us the scope",
    },
  ],
};

export const testimonials: Record<Locale, Testimonial[]> = {
  es: [
    {
      name: "Petrofac México — Plataformas Arenque",
      role: "Historial verificable",
      company: "Frentes costa afuera documentados",
      quote:
        "Participación documentada en paneles modulares, recubrimientos, defensas de ducto, bajantes, líneas de proceso y desmantelamientos en entorno offshore.",
    },
    {
      name: "Grupo Industrial Águila — Fabricación y estructuras",
      role: "Historial verificable",
      company: "Fabricación y montaje estructural",
      quote:
        "Registros de fabricación de barandales, plataformas, estructuras de acero y proyectos de bajantes que respaldan la experiencia metal-mecánica mostrada en el sitio.",
    },
  ],
  en: [
    {
      name: "Petrofac México — Arenque Platforms",
      role: "Documented track record",
      company: "Offshore fronts on record",
      quote:
        "Documented participation in modular panels, coatings, pipe defenses, risers, process lines, and dismantling in an offshore environment.",
    },
    {
      name: "Grupo Industrial Águila — Fabrication and structures",
      role: "Documented track record",
      company: "Structural fabrication and erection",
      quote:
        "Records of handrails, platforms, steel structures, and riser projects that support the metal-mechanical experience shown on the site.",
    },
  ],
};

export const certifications: Record<Locale, Certification[]> = {
  es: [
    {
      name: "Correo para invitaciones y propuestas técnicas",
      issuer: "cmfitasadecv@gmail.com",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Invitacion%20a%20cotizar%20-%20FITA",
      badgeLabel: "Canal formal",
    },
    {
      name: "WhatsApp para validación rápida",
      issuer: "+52 833 518 1171",
      referenceUrl: "https://wa.me/528335181171",
      badgeLabel: "Canal rápido",
    },
    {
      name: "RFC y ubicación corporativa",
      issuer: "RFC CMF140509C49 · Ciudad Madero, Tamaulipas",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Solicitud%20de%20datos%20corporativos%20-%20FITA",
      badgeLabel: "Datos oficiales",
    },
  ],
  en: [
    {
      name: "Email for invitations and technical proposals",
      issuer: "cmfitasadecv@gmail.com",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Invitation%20to%20bid%20-%20FITA",
      badgeLabel: "Formal channel",
    },
    {
      name: "WhatsApp for quick validation",
      issuer: "+52 833 518 1171",
      referenceUrl: "https://wa.me/528335181171",
      badgeLabel: "Quick channel",
    },
    {
      name: "Tax ID and corporate location",
      issuer: "Tax ID CMF140509C49 · Ciudad Madero, Tamaulipas",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Corporate%20data%20request%20-%20FITA",
      badgeLabel: "Official data",
    },
  ],
};

export const teamMembers: Record<Locale, TeamMember[]> = {
  es: [
    {
      name: "Ing. Gustavo Bierge",
      role: "Contacto comercial y de participación",
      bio: "Canaliza invitaciones a cotizar, revisiones iniciales de alcance y contacto formal para evaluar si FITA encaja en el proyecto o licitación.",
      image: "/team.png",
    },
    {
      name: "Modelo operativo FITA",
      role: "Capacidad armada según el frente",
      bio: "La empresa arma sus frentes con base en el alcance del proyecto y, cuando aplica, conforme a los requerimientos e ingeniería del cliente, integrando especialistas puntuales solo cuando el caso lo requiere.",
      image: "/infrastructure.png",
    },
  ],
  en: [
    {
      name: "Ing. Gustavo Bierge",
      role: "Commercial and participation contact",
      bio: "Handles invitations to bid, initial scope reviews, and formal contact to evaluate whether FITA fits the project or bid.",
      image: "/team.png",
    },
    {
      name: "FITA operating model",
      role: "Capacity built according to the front",
      bio: "The company structures its fronts according to project scope and, when applicable, according to the client’s engineering and technical requirements, adding specialist support only when needed.",
      image: "/infrastructure.png",
    },
  ],
};
