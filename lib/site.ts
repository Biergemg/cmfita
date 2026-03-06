import { routing } from "@/i18n/routing";

export const companyName = "Construcción y Mantenimientos FITA S.A. de C.V.";
export const legalIdentifier = "RFC: CMF140509C49";
export const productionSiteUrl = "https://cmfita.com";
export const defaultLocale = routing.defaultLocale;
export const supportedLocales = routing.locales;
export const contactEmail = "cmfitasadecv@gmail.com";
export const contactPhone = "+52 833 518 1171";
export const whatsappPhone = "+528335181171";
export const siteTagline =
  "Empresa especializada en fabricacion, instalacion y construccion de infraestructura industrial e institucional.";

export const postalAddress = {
  streetAddress: "Paseo de los Mexicas 126-D Col. 16 de Septiembre",
  addressLocality: "Ciudad Madero",
  addressRegion: "Tamaulipas",
  postalCode: "89512",
  addressCountry: "MX",
};

export function getSiteUrl(): string | null {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    productionSiteUrl;

  const normalized = candidate.startsWith("http") ? candidate : `https://${candidate}`;
  return normalized.replace(/\/+$/, "");
}

export function getLocalePath(locale: string): string {
  return `/${locale}`;
}

export function getLocaleUrl(locale: string): string | null {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return null;
  }

  return `${siteUrl}${getLocalePath(locale)}`;
}

export function getLanguageAlternates(): Record<string, string> {
  return Object.fromEntries(
    supportedLocales.map((locale) => [locale, getLocalePath(locale)]),
  );
}
