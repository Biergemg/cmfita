import type { MetadataRoute } from "next";

import { getLocalePath, getSiteUrl, supportedLocales } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const lastModified = new Date();

  return supportedLocales.map((locale) => ({
    url: `${siteUrl}${getLocalePath(locale)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "es" ? 1 : 0.9,
  }));
}
