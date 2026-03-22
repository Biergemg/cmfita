import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeCopy } from "@/data/locale-copy";
import type { Locale } from "@/types/content";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].legal;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
        <section className="container mx-auto max-w-4xl px-6 pb-20">
          <h1 className="mb-6 text-5xl text-steel-light">{copy.terms}</h1>
          <div className="space-y-6 text-industrial-300">
            <p>{locale === "es" ? "La información del sitio es informativa y comercial. Toda propuesta formal queda sujeta a revisión técnica, alcance y validación documental." : "Site information is informational and commercial. Any formal proposal remains subject to technical review, scope confirmation and document validation."}</p>
            <p>{locale === "es" ? "Las capacidades, referencias y credenciales mostradas pueden actualizarse conforme se incorporen nuevos proyectos o activos aprobados para publicación." : "Capabilities, references and credentials shown here may be updated as new projects or publication-approved assets are added."}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
