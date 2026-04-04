import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { getRuntimeSiteUrl } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host");
  const siteUrl = getRuntimeSiteUrl(host);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
