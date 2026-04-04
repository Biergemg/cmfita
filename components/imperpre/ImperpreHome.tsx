import { ImperpreNavbar } from "@/components/imperpre/Navbar";
import { ImperpreFooter } from "@/components/imperpre/Footer";
import { ImperpreHero } from "@/components/imperpre/Hero";
import { ImperpreOverview } from "@/components/imperpre/Overview";
import { ImperpreProjectExperience } from "@/components/imperpre/ProjectExperience";
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
        <ImperpreProjectExperience />
        <ImperpreVoiceSearchFaq />
        <ImperpreContact />
      </main>
      <ImperpreFooter />
    </>
  );
}
