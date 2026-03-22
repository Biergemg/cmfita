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
      slug: "pisos-estructurales-offshore",
      title: "Rehabilitación de pisos estructurales suspendidos",
      sector: "Energía costa afuera",
      scope: "Sustitución, fabricación e instalación",
      location: "Golfo de México",
      summary:
        "Proyecto representativo de reemplazo de plataformas metálicas con ejecución controlada, trazabilidad de materiales y coordinación con supervisión del cliente.",
      deliverables: [
        "Levantamiento y secuencia de intervención",
        "Fabricación estructural conforme a planos aprobados",
        "Instalación en sitio con protocolos de seguridad",
      ],
      metrics: [
        { label: "Frentes coordinados", value: "3" },
        { label: "Entregables críticos", value: "12" },
        { label: "Cumplimiento documental", value: "100%" },
      ],
      gallery: [
        { src: "/infrastructure.png", alt: "Infraestructura industrial de gran escala" },
        { src: "/crane.png", alt: "Intervención estructural con grúa" },
      ],
      ctaLabel: "Solicitar caso similar",
    },
    {
      slug: "modulos-estructurales-industriales",
      title: "Fabricación e instalación de módulos estructurales",
      sector: "Infraestructura industrial",
      scope: "Fabricación, protección y montaje",
      location: "Tamaulipas",
      summary:
        "Caso tipo para clientes que requieren componentes modulares, coordinación entre taller y campo, y cumplimiento dimensional.",
      deliverables: [
        "Fabricación en taller",
        "Aplicación de recubrimientos técnicos",
        "Montaje y cierre de calidad",
      ],
      metrics: [
        { label: "Especialidades integradas", value: "4" },
        { label: "Ventanas de montaje", value: "6" },
        { label: "Tolerancia controlada", value: "±3 mm" },
      ],
      gallery: [
        { src: "/capabilities.png", alt: "Fabricación estructural en taller" },
        { src: "/team.png", alt: "Equipo operativo en ejecución" },
      ],
      ctaLabel: "Quiero una propuesta",
    },
  ],
  en: [
    {
      slug: "offshore-structural-flooring",
      title: "Suspended structural flooring rehabilitation",
      sector: "Offshore energy",
      scope: "Replacement, fabrication and installation",
      location: "Gulf of Mexico",
      summary:
        "Representative execution project involving structural replacement, documented quality controls and close coordination with client supervision.",
      deliverables: [
        "Intervention sequence planning",
        "Structural fabrication per approved drawings",
        "On-site installation under safety protocols",
      ],
      metrics: [
        { label: "Coordinated work fronts", value: "3" },
        { label: "Critical deliverables", value: "12" },
        { label: "Document compliance", value: "100%" },
      ],
      gallery: [
        { src: "/infrastructure.png", alt: "Large-scale industrial infrastructure" },
        { src: "/crane.png", alt: "Crane-supported structural intervention" },
      ],
      ctaLabel: "Request a similar case",
    },
    {
      slug: "industrial-structural-modules",
      title: "Fabrication and installation of structural modules",
      sector: "Industrial infrastructure",
      scope: "Fabrication, protection and erection",
      location: "Tamaulipas",
      summary:
        "Reference case for clients needing modular steel work, workshop-to-field coordination and dimensional compliance.",
      deliverables: [
        "Workshop fabrication",
        "Technical protective coatings",
        "Installation and quality closeout",
      ],
      metrics: [
        { label: "Integrated specialties", value: "4" },
        { label: "Installation windows", value: "6" },
        { label: "Controlled tolerance", value: "±3 mm" },
      ],
      gallery: [
        { src: "/capabilities.png", alt: "Structural fabrication in workshop" },
        { src: "/team.png", alt: "Field execution team" },
      ],
      ctaLabel: "I need a proposal",
    },
  ],
};

export const testimonials: Record<Locale, Testimonial[]> = {
  es: [
    {
      name: "Cliente en proceso de validación",
      role: "Gerencia de proyecto",
      company: "Cuenta industrial confidencial",
      quote:
        "FITA mantiene un enfoque disciplinado en campo, comunicación técnica clara y cumplimiento documental consistente durante la ejecución.",
    },
    {
      name: "Referencia comercial disponible bajo solicitud",
      role: "Supervisión de obra",
      company: "Contratista principal",
      quote:
        "Su valor está en ejecutar conforme a planos del cliente, con trazabilidad y orden operativo incluso en frentes complejos.",
    },
  ],
  en: [
    {
      name: "Reference pending formal publication",
      role: "Project management",
      company: "Confidential industrial account",
      quote:
        "FITA brings field discipline, clear technical communication and consistent documentation throughout execution.",
    },
    {
      name: "Commercial reference available on request",
      role: "Site supervision",
      company: "Prime contractor",
      quote:
        "Their value comes from executing against client drawings with operational order and traceability across complex work fronts.",
    },
  ],
};

export const certifications: Record<Locale, Certification[]> = {
  es: [
    {
      name: "Cumplimiento fiscal y corporativo",
      issuer: "SAT / RFC empresarial",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Solicitud%20de%20documentacion%20corporativa",
      badgeLabel: "Documentación corporativa",
    },
    {
      name: "Expediente de seguridad y habilitación",
      issuer: "Cliente / sitio de trabajo",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Solicitud%20de%20credenciales%20de%20seguridad",
      badgeLabel: "Seguridad operativa",
    },
    {
      name: "Capacidad de integración a procurement",
      issuer: "Proceso comercial FITA",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Solicitud%20de%20informacion%20de%20procurement",
      badgeLabel: "Procurement ready",
    },
  ],
  en: [
    {
      name: "Corporate and tax compliance",
      issuer: "SAT / corporate tax ID",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Corporate%20documentation%20request",
      badgeLabel: "Corporate records",
    },
    {
      name: "Safety and site qualification file",
      issuer: "Client / worksite",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Safety%20credentials%20request",
      badgeLabel: "Operational safety",
    },
    {
      name: "Procurement onboarding readiness",
      issuer: "FITA commercial process",
      referenceUrl: "mailto:cmfitasadecv@gmail.com?subject=Procurement%20information%20request",
      badgeLabel: "Procurement ready",
    },
  ],
};

export const teamMembers: Record<Locale, TeamMember[]> = {
  es: [
    {
      name: "Gustavo Bierge",
      role: "Dirección técnica y comercial",
      bio: "Coordina propuestas, evaluación de alcance y comunicación técnica con clientes industriales e institucionales.",
      image: "/team.png",
    },
    {
      name: "Coordinación de campo FITA",
      role: "Supervisión operativa",
      bio: "Integra seguridad, ejecución en sitio, calidad y secuencia de trabajo conforme a la ingeniería del cliente.",
      image: "/infrastructure.png",
    },
  ],
  en: [
    {
      name: "Gustavo Bierge",
      role: "Technical and commercial lead",
      bio: "Coordinates proposals, scope assessment and technical communication with industrial and institutional clients.",
      image: "/team.png",
    },
    {
      name: "FITA field coordination",
      role: "Operational supervision",
      bio: "Aligns safety, site execution, quality and work sequencing to client engineering requirements.",
      image: "/infrastructure.png",
    },
  ],
};
