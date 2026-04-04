import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Teko } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import "../globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { routing } from "@/i18n/routing";
import { getIndustrialCompanySchema } from "@/lib/schema";
import { companyName, getLanguageAlternates, getLocaleUrl, getSiteUrl } from "@/lib/site";
import type { Locale } from "@/types/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
const teko = Teko({
  subsets: ["latin"],
  variable: "--font-teko",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = await getTranslations({ locale, namespace: "Index" });
  const title = `${t("title")} | FITA`;
  const description = t("description");
  const siteUrl = getSiteUrl();
  const localeUrl = getLocaleUrl(locale);
  const ogLocale = locale === "es" ? "es_MX" : "en_US";
  const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

  return {
    metadataBase,
    title,
    description,
    applicationName: "FITA",
    keywords: [
      "FITA",
      "infraestructura industrial",
      "fabricación estructural",
      "instalación estructural",
      "obra civil industrial",
      "mantenimiento estructural",
      "contratista industrial Mexico",
      "Ciudad Madero Tamaulipas",
    ],
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    category: "industrial services",
    alternates: {
      canonical: localeUrl ?? `/${locale}`,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: localeUrl ?? `/${locale}`,
      siteName: "FITA",
      title,
      description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "1024x1024", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/manifest.webmanifest",
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!routing.locales.includes(locale)) notFound();
  const messages = await getMessages({ locale });
  const organizationSchema = getIndustrialCompanySchema();

  return (
    <html lang={locale} className={`${inter.variable} ${teko.variable}`}>
      <body className="overflow-x-hidden bg-slate-950 font-inter text-slate-50 antialiased selection:bg-slate-700 selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
