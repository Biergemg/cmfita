import type { Metadata } from "next";

import { ImperpreNavbar } from "@/components/imperpre/Navbar";
import { ImperpreFooter } from "@/components/imperpre/Footer";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Imperpre",
  description:
    "Aviso de privacidad de Imperpre — servicio especializado de Construcción y Mantenimientos FITA S.A. de C.V. — para solicitudes de diagnóstico, formularios, WhatsApp y contacto comercial.",
  alternates: { canonical: "/es/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <>
      <ImperpreNavbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">

          {/* Header */}
          <div className="mb-10 border-b border-industrial-800 pb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-industrial-500">Legal</p>
            <h1 className="mb-3 text-3xl font-bold text-steel-light md:text-4xl">
              Aviso de privacidad
            </h1>
            <p className="text-sm text-industrial-500">Última actualización: 23 de mayo de 2026</p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-sm border border-industrial-800 bg-industrial-900/50 p-6">
            <p className="text-sm leading-relaxed text-industrial-300">
              Construcción y Mantenimientos FITA S.A. de C.V., responsable del servicio especializado
              Imperpre, con domicilio en Col. 16 de Septiembre, C.P. 89512, Ciudad Madero, Tamaulipas,
              y correo de contacto{" "}
              <a
                href="mailto:cmfitasadecv@gmail.com"
                className="text-steel-light underline decoration-industrial-600 underline-offset-2 hover:decoration-industrial-400"
              >
                cmfitasadecv@gmail.com
              </a>
              , es responsable del tratamiento de los datos personales que usted proporcione a través de
              este sitio web, formularios de contacto, formularios de Meta, WhatsApp, llamadas
              telefónicas, correo electrónico o cualquier otro medio de contacto relacionado con
              nuestros servicios.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-industrial-300">

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                1. Datos personales que podemos recabar
              </h2>
              <p className="mb-3">Podemos recabar los siguientes datos personales:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Nombre.",
                  "Teléfono.",
                  "Correo electrónico.",
                  "Municipio, colonia, zona o ubicación aproximada del inmueble.",
                  "Respuestas proporcionadas en formularios de contacto.",
                  "Información relacionada con el tipo de inmueble, superficie aproximada, prioridad del problema y autorización de contacto.",
                  "Fotografías, videos o descripciones que usted decida compartir sobre humedad, goteras, filtraciones, plafones, azoteas, muros, pasillos, salones u otras zonas afectadas.",
                  "Información necesaria para preparar una visita técnica, diagnóstico, cotización, propuesta, contrato, factura o seguimiento del servicio.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-industrial-400">
                No solicitamos datos personales sensibles a través de nuestros formularios comerciales.
                Le pedimos no enviar información sensible que no sea necesaria para la revisión del caso.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                2. Finalidades necesarias
              </h2>
              <p className="mb-3">Sus datos personales serán utilizados para las siguientes finalidades necesarias:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Revisar su solicitud de información.",
                  "Determinar si el inmueble se encuentra dentro de nuestra zona de cobertura.",
                  "Confirmar si el caso corresponde al alcance comercial de Imperpre.",
                  "Contactarle por WhatsApp, llamada telefónica, correo electrónico o mensaje para dar seguimiento a su solicitud.",
                  "Coordinar una visita técnica si el caso entra en cobertura.",
                  "Preparar diagnóstico, cotización, propuesta técnica o propuesta comercial.",
                  "Dar seguimiento a trabajos solicitados, contratados o ejecutados.",
                  "Atender dudas, aclaraciones, garantías, revisiones correctivas o solicitudes posteriores relacionadas con el servicio.",
                  "Cumplir obligaciones administrativas, fiscales, contractuales y legales aplicables.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                3. Finalidades secundarias
              </h2>
              <p className="mb-3">También podremos utilizar sus datos para finalidades secundarias, como:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Enviar información sobre servicios relacionados de Imperpre o CMFITA.",
                  "Dar seguimiento comercial posterior.",
                  "Medir la calidad de atención.",
                  "Mejorar nuestros procesos comerciales, publicitarios y de servicio.",
                  "Elaborar estadísticas internas sobre solicitudes recibidas.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-industrial-400">
                Si no desea que sus datos sean utilizados para finalidades secundarias, puede solicitarlo
                al correo{" "}
                <a
                  href="mailto:cmfitasadecv@gmail.com"
                  className="text-steel-light underline decoration-industrial-600 underline-offset-2 hover:decoration-industrial-400"
                >
                  cmfitasadecv@gmail.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                4. Transferencias de datos
              </h2>
              <p className="mb-3 text-industrial-400">
                Sus datos personales no serán vendidos a terceros.
              </p>
              <p className="mb-3">Podremos compartir sus datos únicamente cuando sea necesario con:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Personal autorizado de CMFITA/Imperpre.",
                  "Proveedores técnicos, administrativos, contables, legales o tecnológicos que apoyen la operación del servicio.",
                  "Plataformas de comunicación, formularios, publicidad, analítica o alojamiento web utilizadas para recibir y gestionar solicitudes.",
                  "Autoridades competentes cuando exista obligación legal.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-industrial-400">
                En todos los casos, el tratamiento se limitará a las finalidades descritas en este aviso.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                5. Uso de plataformas externas
              </h2>
              <p className="text-industrial-400">
                Este sitio y nuestros formularios pueden operar con herramientas de terceros, incluyendo,
                de forma enunciativa, Meta/Facebook/Instagram, WhatsApp, hosting web, analítica,
                formularios, CRM, correo electrónico o herramientas de medición publicitaria. El uso de
                dichas plataformas puede estar sujeto también a sus propios términos y políticas de
                privacidad. Imperpre/CMFITA solo tratará los datos que reciba para las finalidades
                descritas en este aviso.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                6. Derechos ARCO y revocación del consentimiento
              </h2>
              <p className="mb-4 text-industrial-400">
                Usted puede solicitar el acceso, rectificación, cancelación u oposición al tratamiento de
                sus datos personales, así como revocar su consentimiento o limitar el uso de sus datos,
                enviando una solicitud al correo:{" "}
                <a
                  href="mailto:cmfitasadecv@gmail.com"
                  className="text-steel-light underline decoration-industrial-600 underline-offset-2 hover:decoration-industrial-400"
                >
                  cmfitasadecv@gmail.com
                </a>
              </p>
              <p className="mb-3">La solicitud deberá incluir:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Nombre del titular.",
                  "Medio de contacto para responder.",
                  "Descripción clara de la solicitud.",
                  "Documentos que acrediten identidad o representación, cuando sea necesario.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                7. Conservación de datos
              </h2>
              <p className="text-industrial-400">
                Conservaremos sus datos personales durante el tiempo necesario para atender su solicitud,
                dar seguimiento comercial, cumplir obligaciones legales, administrativas, fiscales o
                contractuales, y proteger los intereses legítimos de CMFITA/Imperpre ante aclaraciones
                o reclamaciones.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                8. Medidas de seguridad
              </h2>
              <p className="text-industrial-400">
                Implementamos medidas administrativas, técnicas y organizativas razonables para proteger
                los datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o
                tratamiento no autorizado.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                9. Cambios al aviso de privacidad
              </h2>
              <p className="text-industrial-400">
                Este aviso de privacidad puede modificarse por cambios legales, operativos, comerciales o
                técnicos. La versión vigente estará disponible en:{" "}
                <span className="text-steel-light">
                  https://imperpre.cmfita.com/es/privacidad
                </span>
              </p>
            </section>

          </div>

          {/* Back link */}
          <div className="mt-14 border-t border-industrial-800 pt-8">
            <a
              href="/es"
              className="inline-flex items-center gap-2 text-sm text-industrial-400 transition-colors hover:text-steel-light"
            >
              ← Volver al inicio
            </a>
          </div>

        </div>
      </main>
      <ImperpreFooter />
    </>
  );
}
