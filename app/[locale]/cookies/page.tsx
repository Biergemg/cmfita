import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeCopy } from "@/data/locale-copy";
import type { Locale } from "@/types/content";

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].legal;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
        <section className="container mx-auto max-w-4xl px-6 pb-20">
          <h1 className="mb-6 text-5xl text-steel-light">{copy.cookies}</h1>
          <div className="space-y-6 text-industrial-300">
            <p>{locale === "es" ? "El sitio puede usar cookies y almacenamiento local para recordar consentimiento de analytics y medir uso del sitio cuando el visitante lo autoriza." : "The site may use cookies and local storage to remember analytics consent and measure usage when the visitor authorizes it."}</p>
            <p>{locale === "es" ? "Si rechazas analytics, el sitio mantiene su funcionalidad principal sin cargar medición de GA4." : "If you reject analytics, the site keeps its main functionality without loading GA4 measurement."}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
