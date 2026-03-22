declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const ANALYTICS_CONSENT_EVENT = "analytics-consent-change";

export type GtagEventParams = Record<string, string | number | boolean | undefined>;

function canTrack(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function" && Boolean(GA_ID);
}

export function pageview(url: string): void {
  if (!canTrack() || !GA_ID) return;
  window.gtag!("config", GA_ID, { page_path: url });
}

export function trackEvent(action: string, params: GtagEventParams = {}): void {
  if (!canTrack()) return;
  window.gtag!("event", action, params);
}

export function trackWhatsappClick(location = "general"): void {
  trackEvent("contact_click", { channel: "whatsapp", location });
}

export function trackEmailClick(location = "general"): void {
  trackEvent("contact_click", { channel: "email", location });
}

export function trackProposalRequest(location = "general"): void {
  trackEvent("proposal_request_click", { location });
}

export function trackContactFormStarted(): void {
  trackEvent("contact_form_started");
}

export function trackContactFormSubmitted(projectType: string): void {
  trackEvent("contact_form_submitted", { project_type: projectType });
}

export function trackContactFormFailed(reason: string): void {
  trackEvent("contact_form_failed", { reason });
}

export function trackPortfolioCaseView(slug: string): void {
  trackEvent("portfolio_case_view", { slug });
}

export function trackTestimonialCtaClick(): void {
  trackEvent("testimonial_cta_click");
}

export function trackServicePageView(slug: string): void {
  trackEvent("service_page_view", { slug });
}

export function trackRfqSubmitted(): void {
  trackEvent("rfq_submitted");
}
