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
      formTitle: "Comparte el alcance del proyecto",
      formSubtitle: "Usa este formulario para invitaciones, solicitudes de propuesta o evaluación inicial del frente.",
      success: "Gracias. Recibimos tu información y revisaremos el alcance para responderte por el canal adecuado.",
      error: "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      started: "Selecciona una opción",
      submit: "Enviar información",
      sending: "Enviando...",
    },
    portfolio: {
      title: "Referencias de ejecución",
      subtitle: "Dos líneas reales del historial FITA: frentes industriales/metal-mecánicos y obra civil institucional.",
    },
    testimonials: {
      title: "Antecedentes documentados",
      subtitle: "En lugar de inventar promesas, mostramos referencias que sí están respaldadas por el historial operativo de FITA.",
    },
    certifications: {
      title: "Datos corporativos y validación",
      subtitle: "Información base para contacto formal, revisión documental y continuidad comercial.",
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
      formTitle: "Share the project scope",
      formSubtitle: "Use this form for invitations, proposal requests, or an initial evaluation of the work front.",
      success: "Thanks. We received your information and will review the scope before replying through the right channel.",
      error: "We could not send your request. Please try again in a few minutes.",
      started: "Select an option",
      submit: "Send information",
      sending: "Sending...",
    },
    portfolio: {
      title: "Execution references",
      subtitle: "Two real FITA lines: industrial/metal-mechanical fronts and institutional civil work.",
    },
    testimonials: {
      title: "Documented background",
      subtitle: "Instead of invented promises, we show references supported by FITA’s operating history.",
    },
    certifications: {
      title: "Corporate data and validation",
      subtitle: "Base information for formal contact, document review, and commercial continuity.",
    },
    notFoundTitle: "We couldn't find that page",
    notFoundBody: "The requested route does not exist or has moved.",
    errorTitle: "Something went wrong",
    errorBody: "You can return home or try again in a few minutes.",
  },
} as const satisfies Record<Locale, unknown>;
