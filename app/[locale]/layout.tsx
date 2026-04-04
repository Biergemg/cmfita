import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Inter, Teko } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import corporateMessages from "@/messages/es.json";
import imperpreMessages from "@/messages/es-imperpre.json";
import "../globals.css";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { routing } from "@/i18n/routing";
import {
  companyName,
  contactEmail,
  contactPhone,
  getRuntimeSiteUrl,
  imperpreSeo,
  imperpreTagline,
  isImperpreHost,
  postalAddress,
  siteTagline,
} from "@/lib/site";
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

function getSchema(host: string | null, imperpre: boolean, locale: string) {
  const siteUrl = getRuntimeSiteUrl(host);
  const localeUrl = `${siteUrl}/${locale}`;
  const logoUrl = `${siteUrl}/logo.png`;

  if (imperpre) {
    const imageUrl = `${siteUrl}/imperpre-og.png`;
    const serviceArea = imperpreSeo.areas.map((name) => ({
      "@type": "City",
      name,
      containedInPlace: {
        "@type": "State",
        name: "Tamaulipas",
      },
    }));

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "@id": `${localeUrl}#localbusiness`,
          name: "Imperpre",
          url: localeUrl,
          image: imageUrl,
          logo: logoUrl,
          telephone: contactPhone,
          email: contactEmail,
          description: imperpreSeo.description,
          areaServed: serviceArea,
          serviceArea,
          availableLanguage: "es-MX",
        },
        {
          "@type": "Service",
          "@id": `${localeUrl}#service`,
          name: imperpreSeo.serviceName,
          serviceType: "Revisión de losa de concreto con filtraciones, desgaste o humedad",
          provider: { "@id": `${localeUrl}#localbusiness` },
          areaServed: serviceArea,
          audience: {
            "@type": "Audience",
            audienceType: "Escuelas privadas",
          },
          description: imperpreSeo.serviceDescription,
          url: localeUrl,
        },
      ],
    };
  }

  const imageUrl = `${siteUrl}/og-image.jpg`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}#localbusiness`,
        name: companyName,
        legalName: companyName,
        url: siteUrl,
        image: imageUrl,
        logo: logoUrl,
        telephone: contactPhone,
        email: contactEmail,
        description: siteTagline,
        areaServed: "Mexico",
        address: { "@type": "PostalAddress", ...postalAddress },
      },
      {
        "@type": "ConstructionCompany",
        "@id": `${siteUrl}#constructioncompany`,
        name: companyName,
        url: siteUrl,
        image: imageUrl,
        logo: logoUrl,
        telephone: contactPhone,
        email: contactEmail,
        areaServed: "Mexico",
        knowsAbout: [
          "Industrial infrastructure execution",
          "Institutional infrastructure execution",
          "Structural fabrication",
          "Structural installation",
          "Industrial construction services",
        ],
        description: siteTagline,
        address: { "@type": "PostalAddress", ...postalAddress },
      },
    ],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const host = (await headers()).get("host");
  const imperpre = isImperpreHost(host);
  const siteUrl = getRuntimeSiteUrl(host);
  const localeUrl = `${siteUrl}/${locale}`;
  const metadataBase = new URL(siteUrl);

  if (imperpre) {
    const title = imperpreSeo.title;
    const description = imperpreSeo.description;
    return {
      metadataBase,
      title,
      description,
      applicationName: "Imperpre",
      authors: [{ name: companyName }],
      creator: companyName,
      publisher: companyName,
      category: "roof inspection services",
      alternates: { canonical: localeUrl },
      openGraph: {
        type: "website",
        locale: "es_MX",
        url: localeUrl,
        siteName: "Imperpre",
        title,
        description,
        images: [{ url: "/imperpre-og.png", width: 1536, height: 1024, alt: title }],
      },
      twitter: { card: "summary_large_image", title, description, images: ["/imperpre-og.png"] },
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
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
    };
  }

  const title = `${corporateMessages.Index.title} | FITA`;
  const description = corporateMessages.Index.description;
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
    ],
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    category: "industrial services",
    alternates: { canonical: localeUrl },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: localeUrl,
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
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  const host = (await headers()).get("host");
  const imperpre = isImperpreHost(host);
  const messages = imperpre ? imperpreMessages : corporateMessages;
  const organizationSchema = getSchema(host, imperpre, locale);

  return (
    <html lang={locale} className={`${inter.variable} ${teko.variable}`}>
      <body className="overflow-x-hidden bg-slate-950 font-inter text-slate-50 antialiased selection:bg-slate-700 selection:text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:text-black">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <Suspense fallback={null}><GoogleAnalytics /></Suspense>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <CookieConsent locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
