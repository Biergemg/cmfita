import { routing } from "@/i18n/routing";

export const companyName = "Construcción y Mantenimientos FITA S.A. de C.V.";
export const legalIdentifier = "RFC: CMF140509C49";
export const productionSiteUrl = "https://cmfita.com";
export const imperpreProductionSiteUrl = "https://imperpre.cmfita.com";
export const defaultLocale = routing.defaultLocale;
export const supportedLocales = routing.locales;
export const contactEmail = "cmfitasadecv@gmail.com";
export const contactPhone = "+52 833 518 1171";
export const whatsappPhone = "+528335181171";
export const whatsappPrefillMessage =
  "Hola, quiero revisar una losa de concreto. Te comparto fotos, ubicación y una breve descripción del problema.";
export const siteTagline = "Empresa especializada en fabricación, instalación y construcción de infraestructura industrial e institucional.";
export const imperpreTagline =
  "Revisión y definición de solución para losas de concreto con filtraciones, desgaste o deterioro por humedad y exposición climática.";

export const postalAddress = {
  streetAddress: "Paseo de los Mexicas 126-D Col. 16 de Septiembre",
  addressLocality: "Ciudad Madero",
  addressRegion: "Tamaulipas",
  postalCode: "89512",
  addressCountry: "MX",
};

export function isImperpreHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const normalized = host.toLowerCase();
  return normalized === "imperpre.cmfita.com" || normalized.startsWith("imperpre.");
}

export function getSiteUrl(): string | null {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    productionSiteUrl;

  const normalized = candidate.startsWith("http") ? candidate : `https://${candidate}`;
  return normalized.replace(/\/+$/, "");
}

export function getRuntimeSiteUrl(host?: string | null): string {
  if (host) return `https://${host}`;
  return getSiteUrl() ?? productionSiteUrl;
}

export function getLocalePath(locale: string): string {
  return `/${locale}`;
}

export function getLocalizedRoute(locale: string, route: string): string {
  return `${getLocalePath(locale)}${route}`;
}

export function getLocaleUrl(locale: string, route = ""): string | null {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return null;
  return `${siteUrl}${getLocalePath(locale)}${route}`;
}

export function getLanguageAlternates(route = ""): Record<string, string> {
  return Object.fromEntries(supportedLocales.map((locale) => [locale, `${getLocalePath(locale)}${route}`]));
}

export function getWhatsappUrl(message = whatsappPrefillMessage): string {
  return `https://wa.me/${whatsappPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
