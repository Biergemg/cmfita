import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeCopy } from "@/data/locale-copy";
import type { Locale } from "@/types/content";

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const copy = routeCopy[locale].legal;

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-36">
        <section className="container mx-auto max-w-4xl px-6 pb-20">
          <h1 className="mb-6 text-5xl text-steel-light">{copy.privacy}</h1>
          <div className="space-y-6 text-industrial-300">
            <p>{locale === "es" ? "FITA utiliza los datos enviados en formularios para responder solicitudes comerciales y técnicas." : "FITA uses form-submitted data to answer commercial and technical requests."}</p>
            <p>{locale === "es" ? "Los datos se usan únicamente para atención comercial, seguimiento de propuestas y comunicación operativa relacionada con el alcance solicitado." : "Data is used only for commercial follow-up, proposal handling and operational communication related to the requested scope."}</p>
            <p>{locale === "es" ? "Para ejercer solicitudes sobre tus datos, escribe a cmfitasadecv@gmail.com." : "To submit data-related requests, contact cmfitasadecv@gmail.com."}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
