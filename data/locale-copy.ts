import type { Locale } from "@/types/content";

export const routeCopy = {
  es: {
    services: {
      title: "Servicios de ejecución",
      subtitle: "Capacidades de ejecución orientadas a infraestructura industrial e institucional.",
      cta: "Solicitar propuesta",
      breadcrumb: "Servicios",
      readMore: "Ver servicio",
    },
    blog: {
      title: "Recursos y perspectivas",
      subtitle: "Notas prácticas para procurement, supervisión e ingeniería del cliente.",
      breadcrumb: "Blog",
      readMore: "Leer artículo",
    },
    team: {
      title: "Equipo y modelo operativo",
      subtitle: "Estructura flexible para coordinar frentes de ejecución, calidad y relación con cliente.",
      breadcrumb: "Equipo",
    },
    legal: {
      privacy: "Aviso de privacidad",
      terms: "Términos de uso",
      cookies: "Política de cookies",
      backHome: "Volver al inicio",
    },
    contact: {
      formTitle: "Formulario de contacto",
      formSubtitle: "Comparte tu alcance y te responderemos con una propuesta o siguiente paso.",
      success: "Gracias. Recibimos tu solicitud y te contactaremos pronto.",
      error: "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      started: "Completa tus datos",
      submit: "Enviar solicitud",
      sending: "Enviando...",
    },
    portfolio: {
      title: "Casos de ejecución",
      subtitle: "Estructura preparada para mostrar evidencia comercial mientras llegan activos reales.",
    },
    testimonials: {
      title: "Validación comercial",
      subtitle: "Referencias y narrativa comercial inicial para reforzar credibilidad B2B.",
    },
    certifications: {
      title: "Credenciales y procurement",
      subtitle: "Base documental y comercial lista para respaldar procesos de evaluación.",
    },
    notFoundTitle: "No encontramos esa página",
    notFoundBody: "La ruta solicitada no existe o cambió de ubicación.",
    errorTitle: "Ocurrió un error inesperado",
    errorBody: "Puedes volver al inicio o intentar nuevamente en unos minutos.",
  },
  en: {
    services: {
      title: "Execution services",
      subtitle: "Execution capabilities for industrial and institutional infrastructure.",
      cta: "Request proposal",
      breadcrumb: "Services",
      readMore: "View service",
    },
    blog: {
      title: "Insights and resources",
      subtitle: "Practical notes for procurement, supervision and client engineering teams.",
      breadcrumb: "Blog",
      readMore: "Read article",
    },
    team: {
      title: "Team and operating model",
      subtitle: "Flexible structure to coordinate execution fronts, quality and client-facing communication.",
      breadcrumb: "Team",
    },
    legal: {
      privacy: "Privacy notice",
      terms: "Terms of use",
      cookies: "Cookie policy",
      backHome: "Back to home",
    },
    contact: {
      formTitle: "Contact form",
      formSubtitle: "Share your scope and we will reply with a proposal or next step.",
      success: "Thanks. We received your request and will contact you soon.",
      error: "We could not send your request. Please try again in a few minutes.",
      started: "Complete your details",
      submit: "Send request",
      sending: "Sending...",
    },
    portfolio: {
      title: "Execution case studies",
      subtitle: "Commercial structure ready to showcase evidence while real assets are finalized.",
    },
    testimonials: {
      title: "Commercial validation",
      subtitle: "Early reference structure to strengthen B2B confidence.",
    },
    certifications: {
      title: "Credentials and procurement",
      subtitle: "Document and commercial readiness to support vendor evaluation processes.",
    },
    notFoundTitle: "We couldn't find that page",
    notFoundBody: "The requested route does not exist or has moved.",
    errorTitle: "Something went wrong",
    errorBody: "You can return home or try again in a few minutes.",
  },
} as const satisfies Record<Locale, unknown>;
