import type { Metadata } from "next";
import { Inter, Teko } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import {
  companyName,
  getLanguageAlternates,
  getLocaleUrl,
  getSiteUrl,
} from "@/lib/site";
import { getIndustrialCompanySchema } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const teko = Teko({ subsets: ["latin"], variable: "--font-teko", weight: ["300", "400", "500", "600", "700"] });

export async function generateMetadata(
  { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await params;
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
      "fabricacion estructural",
      "instalacion estructural",
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
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "1024x1024" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "1024x1024", type: "image/png" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/manifest.webmanifest",
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  const messages = await getMessages({ locale });
  const organizationSchema = getIndustrialCompanySchema();

  return (
    <html lang={locale} className={`${inter.variable} ${teko.variable}`}>
      <body className="antialiased bg-slate-950 text-slate-50 font-inter overflow-x-hidden selection:bg-slate-700 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
