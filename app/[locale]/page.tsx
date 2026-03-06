import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Overview } from "@/components/sections/Overview";
import { Institutional } from "@/components/sections/Institutional";
import { Capabilities } from "@/components/sections/Capabilities";
import { TeamModel } from "@/components/sections/TeamModel";
import { ProjectExperience } from "@/components/sections/ProjectExperience";
import { SafetyCompliance } from "@/components/sections/SafetyCompliance";
import { ProcurementReady } from "@/components/sections/ProcurementReady";
import { Methodology } from "@/components/sections/Methodology";
import { Contact } from "@/components/sections/Contact";
import { VoiceSearchFaq } from "@/components/sections/VoiceSearchFaq";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getLocaleUrl } from "@/lib/site";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  const items = t.raw("items") as Array<{ title: string; description: string }>;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.description,
      },
    })),
    url: getLocaleUrl(locale) ?? `/${locale}`,
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-industrial-950 selection:bg-industrial-800 selection:text-steel-light">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Hero />
        <Overview />
        <TeamModel />
        <Institutional />
        <Capabilities />
        <ProjectExperience />
        <Methodology />
        <SafetyCompliance />
        <ProcurementReady />
        <VoiceSearchFaq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
