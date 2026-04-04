import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getBlogPosts, getServices } from "@/lib/content";
import { getLocalePath, getRuntimeSiteUrl, isImperpreHost, supportedLocales } from "@/lib/site";
import type { Locale } from "@/types/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  const siteUrl = getRuntimeSiteUrl(host);
  const imperpre = isImperpreHost(host);
  const lastModified = new Date();

  if (imperpre) {
    const locale = "es";
    const base = `${siteUrl}${getLocalePath(locale)}`;

    return [
      {
        url: base,
        lastModified,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${base}/privacy`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${base}/terms`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: `${base}/cookies`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ];
  }

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
