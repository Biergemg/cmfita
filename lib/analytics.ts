declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type GtagEventParams = Record<string, string | number | boolean | undefined>;

function canTrack(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function" && Boolean(GA_ID);
}

export function pageview(url: string): void {
  if (!canTrack() || !GA_ID) {
    return;
  }

  window.gtag!("config", GA_ID, {
    page_path: url,
  });
}

function trackEvent(action: string, params: GtagEventParams): void {
  if (!canTrack()) {
    return;
  }

  window.gtag!("event", action, params);
}

export function trackWhatsappClick(): void {
  trackEvent("contact", {
    event_category: "engagement",
    event_label: "lead",
    contact_method: "whatsapp",
  });
}

export function trackEmailClick(): void {
  trackEvent("contact", {
    event_category: "engagement",
    event_label: "lead",
    contact_method: "email",
  });
}

export function trackProposalRequest(): void {
  trackEvent("contact", {
    event_category: "engagement",
    event_label: "lead",
    contact_method: "proposal_request",
  });
}
