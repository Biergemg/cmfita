import { ImperpreNavbar } from "@/components/imperpre/Navbar";
import { ImperpreFooter } from "@/components/imperpre/Footer";
import { ImperpreHero } from "@/components/imperpre/Hero";
import { ImperpreOverview } from "@/components/imperpre/Overview";
import { ImperpreCapabilities } from "@/components/imperpre/Capabilities";
import { ImperpreProjectExperience } from "@/components/imperpre/ProjectExperience";
import { ImperpreSafetyCompliance } from "@/components/imperpre/SafetyCompliance";
import { ImperpreMethodology } from "@/components/imperpre/Methodology";
import { ImperpreProcurementReady } from "@/components/imperpre/ProcurementReady";
import { ImperpreVoiceSearchFaq } from "@/components/imperpre/VoiceSearchFaq";
import { ImperpreContact } from "@/components/imperpre/Contact";

export function ImperpreHome({ faqSchema }: { faqSchema: unknown }) {
  return (
    <>
      <ImperpreNavbar />
      <main id="main-content" className="relative min-h-screen bg-industrial-950 selection:bg-industrial-800 selection:text-steel-light">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <ImperpreHero />
        <ImperpreOverview />
        <ImperpreCapabilities />
        <ImperpreProjectExperience />
        <ImperpreSafetyCompliance />
        <ImperpreMethodology />
        <ImperpreProcurementReady />
        <ImperpreVoiceSearchFaq />
        <ImperpreContact />
      </main>
      <ImperpreFooter />
    </>
  );
}
