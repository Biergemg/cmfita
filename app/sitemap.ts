import type { MetadataRoute } from "next";

import { getBlogPosts, getServices } from "@/lib/content";
import { getLocalePath, getSiteUrl, supportedLocales } from "@/lib/site";
import type { Locale } from "@/types/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];

  const lastModified = new Date();
  const baseRoutes = ["", "/services", "/blog", "/team", "/privacy", "/terms", "/cookies"];

  const routeEntries = supportedLocales.flatMap((locale) =>
    baseRoutes.map((route) => ({
      url: `${siteUrl}${getLocalePath(locale)}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? (locale === "es" ? 1 : 0.9) : 0.8,
    })),
  );

  const contentEntries = (await Promise.all(
    (supportedLocales as readonly Locale[]).map(async (locale) => {
      const services = await getServices(locale);
      const posts = await getBlogPosts(locale);
      return [
        ...services.map((service) => ({ url: `${siteUrl}${getLocalePath(locale)}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.75 })),
        ...posts.map((post) => ({ url: `${siteUrl}${getLocalePath(locale)}/blog/${post.slug}`, lastModified: new Date(post.date), changeFrequency: "monthly" as const, priority: 0.7 })),
      ];
    }),
  )).flat();

  return [...routeEntries, ...contentEntries];
}
