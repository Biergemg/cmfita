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
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-industrial-950 selection:bg-industrial-800 selection:text-steel-light">
        <Hero />
        <Overview />
        <TeamModel />
        <Institutional />
        <Capabilities />
        <ProjectExperience />
        <Methodology />
        <SafetyCompliance />
        <ProcurementReady />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
