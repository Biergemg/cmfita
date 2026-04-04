import { headers } from "next/headers";

import corporateMessages from "@/messages/es.json";
import imperpreMessages from "@/messages/es-imperpre.json";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { TeamModel } from "@/components/sections/TeamModel";
import { Institutional } from "@/components/sections/Institutional";
import { Capabilities } from "@/components/sections/Capabilities";
import { ProjectExperience } from "@/components/sections/ProjectExperience";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { Methodology } from "@/components/sections/Methodology";
import { SafetyCompliance } from "@/components/sections/SafetyCompliance";
import { ProcurementReady } from "@/components/sections/ProcurementReady";
import { VoiceSearchFaq } from "@/components/sections/VoiceSearchFaq";
import { Contact } from "@/components/sections/Contact";
import { ImperpreHome } from "@/components/imperpre/ImperpreHome";
import { getRuntimeSiteUrl, isImperpreHost } from "@/lib/site";
import type { Locale } from "@/types/content";

function buildFaqSchema(items: Array<{ title: string; description: string }>, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: item.description },
    })),
    url,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const host = (await headers()).get("host");
  const imperpre = isImperpreHost(host);
  const siteUrl = getRuntimeSiteUrl(host);

  if (imperpre) {
    const faqItems = (imperpreMessages.Faq.items ?? []) as Array<{ title: string; description: string }>;
    return <ImperpreHome faqSchema={buildFaqSchema(faqItems, `${siteUrl}/${locale}`)} />;
  }

  const faqItems = (corporateMessages.Faq.items ?? []) as Array<{ title: string; description: string }>;
  const faqSchema = buildFaqSchema(faqItems, `${siteUrl}/${locale}`);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative min-h-screen bg-industrial-950 selection:bg-industrial-800 selection:text-steel-light">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <Hero />
        <Overview />
        <Capabilities />
        <ProjectExperience />
        <TeamModel />
        <Institutional />
        <Portfolio locale={locale} />
        <Methodology />
        <SafetyCompliance />
        <ProcurementReady />
        <Testimonials locale={locale} />
        <Certifications locale={locale} />
        <VoiceSearchFaq />
        <Contact locale={locale} />
      </main>
      <Footer />
    </>
  );
}
