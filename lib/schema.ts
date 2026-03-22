import {
  companyName,
  contactEmail,
  contactPhone,
  getSiteUrl,
  postalAddress,
} from "@/lib/site";

export function getIndustrialCompanySchema() {
  const siteUrl = getSiteUrl() ?? "https://cmfita.com";
  const logoUrl = `${siteUrl}/logo.png`;
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
        description: "Industrial and institutional infrastructure execution.",
        areaServed: "Mexico",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Paseo de los Mexicas 126-D",
          addressLocality: "Ciudad Madero",
          addressRegion: "Tamaulipas",
          postalCode: "89512",
          addressCountry: "Mexico",
        },
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
        description: "Industrial and institutional infrastructure execution.",
        address: { "@type": "PostalAddress", ...postalAddress },
      },
    ],
  };
}

export function getServiceSchema({
  localeUrl,
  title,
  description,
}: {
  localeUrl: string;
  title: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: title,
    provider: { "@type": "ConstructionCompany", name: companyName },
    areaServed: "Mexico",
    description,
    url: localeUrl,
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
