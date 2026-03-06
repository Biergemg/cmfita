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
        name: "Construcción y Mantenimientos FITA S.A. de C.V.",
        legalName: "Construcción y Mantenimientos FITA S.A. de C.V.",
        url: siteUrl,
        image: imageUrl,
        logo: logoUrl,
        telephone: contactPhone,
        email: contactEmail,
        description:
          "Industrial and institutional infrastructure execution.",
        areaServed: "Mexico",
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
        description:
          "Industrial and institutional infrastructure execution.",
        address: {
          "@type": "PostalAddress",
          ...postalAddress,
        },
      },
    ],
  };
}
