import type { Locale } from "@/types/content";

export const routeCopy = {
  es: {
    services: {
      title: "Líneas de ejecución",
      subtitle: "Capacidades generales de FITA, con detalle técnico que puede profundizarse por propuesta o subdominio.",
      cta: "Solicitar propuesta",
      breadcrumb: "Servicios",
      readMore: "Ver servicio",
    },
    blog: {
      title: "Notas y perspectivas",
      subtitle: "Contenido para clientes, compras, supervisión y equipos que necesitan entender alcances de ejecución.",
      breadcrumb: "Blog",
      readMore: "Leer artículo",
    },
    team: {
      title: "Equipo y modelo operativo",
      subtitle: "Estructura flexible para participar en alcances parciales o integrales según el proyecto.",
      breadcrumb: "Equipo",
    },
    legal: {
      privacy: "Aviso de privacidad",
      terms: "Términos de uso",
      cookies: "Política de cookies",
      backHome: "Volver al inicio",
    },
    contact: {
      formTitle: "Cuéntanos del proyecto",
      formSubtitle: "Nombre de la obra, tipo de trabajo, etapa y datos de contacto. Con eso podemos hacer una primera revisión.",
      success: "Recibimos tu información. Revisamos el alcance y te respondemos por el canal que usaste.",
      error: "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      started: "Selecciona una opción",
      submit: "Enviar alcance del proyecto",
      sending: "Enviando...",
    },
    portfolio: {
      title: "Lo que ya hicimos. Lo que podemos hacer contigo.",
      subtitle: "Offshore industrial con Petrofac y obra civil institucional en Tamaulipas y Veracruz. Dos líneas verificables, no estimadas.",
    },
    testimonials: {
      title: "Documentado, no estimado.",
      subtitle: "El historial de FITA incluye frentes con clientes reales. No publicamos promesas — publicamos lo que ya ejecutamos y puede verificarse.",
    },
    certifications: {
      title: "Todo lo que necesitas para agregarnos como proveedor.",
      subtitle: "RFC, datos de contacto y canales formales para invitación, licitación o propuesta técnica.",
    },
    notFoundTitle: "No encontramos esa página",
    notFoundBody: "La ruta solicitada no existe o cambió de ubicación.",
    errorTitle: "Ocurrió un error inesperado",
    errorBody: "Puedes volver al inicio o intentar nuevamente en unos minutos.",
  },
  en: {
    services: {
      title: "Execution lines",
      subtitle: "General FITA capabilities, with technical detail that can be expanded in proposals or subdomains.",
      cta: "Request proposal",
      breadcrumb: "Services",
      readMore: "View service",
    },
    blog: {
      title: "Notes and insights",
      subtitle: "Content for clients, procurement, supervision, and teams that need to understand execution scope.",
      breadcrumb: "Blog",
      readMore: "Read article",
    },
    team: {
      title: "Team and operating model",
      subtitle: "Flexible structure for partial or broader project participation.",
      breadcrumb: "Team",
    },
    legal: {
      privacy: "Privacy notice",
      terms: "Terms of use",
      cookies: "Cookie policy",
      backHome: "Back to home",
    },
    contact: {
      formTitle: "Tell us about the project",
      formSubtitle: "Project name, type of work, stage, and contact details. With that, we can make an initial review.",
      success: "We received your information. We will review the scope and reply through the channel you used.",
      error: "We could not send your request. Please try again in a few minutes.",
      started: "Select an option",
      submit: "Send project scope",
      sending: "Sending...",
    },
    portfolio: {
      title: "What we already did. What we can do with you.",
      subtitle: "Industrial offshore work with Petrofac and institutional civil work in Tamaulipas and Veracruz. Two verifiable lines, not estimated claims.",
    },
    testimonials: {
      title: "Documented, not estimated.",
      subtitle: "FITA’s history includes work fronts with real clients. We do not publish promises — we publish what was already executed and can be verified.",
    },
    certifications: {
      title: "Everything you need to add us as a supplier.",
      subtitle: "Tax ID, contact data, and formal channels for invitations, bids, and technical proposals.",
    },
    notFoundTitle: "We couldn't find that page",
    notFoundBody: "The requested route does not exist or has moved.",
    errorTitle: "Something went wrong",
    errorBody: "You can return home or try again in a few minutes.",
  },
} as const satisfies Record<Locale, unknown>;
