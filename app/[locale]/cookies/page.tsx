import type { Metadata } from "next";
import { headers } from "next/headers";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ImperpreCookiesPolicy, imperpreCookiesMeta } from "@/components/imperpre/CookiesPolicy";
import { routeCopy } from "@/data/locale-copy";
import { isImperpreHost } from "@/lib/site";
import type { Locale } from "@/types/content";

// En el host de Imperpre se sirve su propia política (cabecera, pie y canonical de Imperpre).
// En cmfita.com la página y sus metadatos quedan exactamente como estaban.
export async function generateMetadata(): Promise<Metadata> {
  if (!isImperpreHost((await headers()).get("host"))) return {};
  const { title, description, path } = imperpreCookiesMeta;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "es_MX", siteName: "Imperpre", url: path, title, description },
    robots: { index: true, follow: true },
  };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (isImperpreHost((await headers()).get("host"))) return <ImperpreCookiesPolicy />;
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
