import type { Metadata } from "next";

import { ImperpreNavbar } from "@/components/imperpre/Navbar";
import { ImperpreFooter } from "@/components/imperpre/Footer";

export const metadata: Metadata = {
  title: "Términos y condiciones | Imperpre",
  description:
    "Términos y condiciones de uso del sitio Imperpre y criterios generales para solicitudes, visitas técnicas, cotizaciones y servicios de impermeabilización para escuelas privadas.",
  alternates: { canonical: "/es/terminos" },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <>
      <ImperpreNavbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">

          {/* Header */}
          <div className="mb-10 border-b border-industrial-800 pb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-industrial-500">Legal</p>
            <h1 className="mb-3 text-3xl font-bold text-steel-light md:text-4xl">
              Términos y condiciones
            </h1>
            <p className="text-sm text-industrial-500">Última actualización: 23 de mayo de 2026</p>
          </div>

          {/* Intro */}
          <div className="mb-8 rounded-sm border border-industrial-800 bg-industrial-900/50 p-6">
            <p className="text-sm leading-relaxed text-industrial-300">
              Estos términos regulan el uso del sitio web de Imperpre y la solicitud de información,
              diagnóstico, visita técnica, cotización o propuesta relacionada con servicios de
              impermeabilización para escuelas privadas, planteles e inmuebles institucionales o
              comerciales dentro de la zona de atención de Construcción y Mantenimientos FITA S.A. de
              C.V., responsable del servicio especializado Imperpre.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-industrial-400">
              Al utilizar este sitio, enviar un formulario, contactarnos por WhatsApp, llamada o correo
              electrónico, usted acepta estos términos en lo aplicable.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10 text-sm leading-relaxed text-industrial-300">

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                1. Naturaleza del servicio
              </h2>
              <p className="mb-3 text-industrial-400">
                Imperpre es un servicio especializado de Construcción y Mantenimientos FITA S.A. de C.V.,
                enfocado principalmente en impermeabilización para escuelas privadas y planteles con
                azotea o losa de concreto en Tampico, Ciudad Madero, Altamira o cerca de la región.
              </p>
              <p className="mb-3">El servicio puede incluir, según diagnóstico y propuesta formal:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Revisión visual inferior y superior de zonas afectadas.",
                  "Revisión de losa, pretiles, bajantes pluviales, grietas, chaflanes, bases, domos, tuberías, equipos y puntos críticos.",
                  "Medición de superficies.",
                  "Preparación de propuesta técnica y comercial.",
                  "Retiro de material existente, demolición, limpieza, sellado de grietas, corrección de pendientes, chaflanes, sellado o instalación de sistema prefabricado, únicamente cuando esté contemplado en la propuesta aprobada.",
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
                2. La información del sitio no constituye cotización
              </h2>
              <p className="mb-3 text-industrial-400">
                La información publicada en este sitio es informativa y comercial. No constituye
                diagnóstico técnico definitivo, cotización, contrato, garantía ni compromiso de
                ejecución.
              </p>
              <p className="text-industrial-400">
                Cualquier precio, alcance, recomendación técnica, tiempo de ejecución o condición de
                servicio deberá quedar documentada en una cotización, propuesta o contrato específico.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                3. Visita técnica
              </h2>
              <p className="mb-3">La visita técnica gratuita está sujeta a:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Zona de cobertura.",
                  "Disponibilidad de agenda.",
                  "Accesibilidad al inmueble.",
                  "Condiciones de seguridad.",
                  "Tipo de inmueble.",
                  "Superficie y alcance potencial del proyecto.",
                  "Que el caso corresponda al enfoque comercial de Imperpre.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-industrial-400">
                El envío de un formulario o mensaje no garantiza automáticamente que se realice una
                visita. Imperpre/CMFITA podrá aceptar, rechazar o redirigir solicitudes según cobertura,
                volumen, seguridad, viabilidad técnica o enfoque comercial.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                4. No cotización a ciegas
              </h2>
              <p className="mb-3 text-industrial-400">
                Imperpre no está obligado a cotizar por fotografías, mensajes, llamadas, estimaciones
                verbales o información incompleta.
              </p>
              <p className="mb-3">El costo real depende, entre otros factores, de:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Estado de la losa o superficie.",
                  "Superficie aproximada y superficie real.",
                  "Sistema existente.",
                  "Puntos críticos.",
                  "Grietas.",
                  "Pendientes.",
                  "Bajantes pluviales.",
                  "Pretiles.",
                  "Chaflanes.",
                  "Bases de equipos.",
                  "Accesos.",
                  "Retiro de material existente.",
                  "Mano de obra, materiales, seguridad y logística.",
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
                5. Alcance del servicio
              </h2>
              <p className="mb-3 text-industrial-400">
                El alcance exacto de cada trabajo será únicamente el establecido en la propuesta formal
                aprobada por el cliente.
              </p>
              <p className="text-industrial-400">
                Cualquier trabajo adicional, modificación, reparación no prevista, ampliación de
                superficie, cambio de material, trabajo de albañilería adicional, intervención
                estructural, retiro extra, reparación de instalaciones o servicio no contemplado deberá
                cotizarse por separado.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                6. Exclusiones generales
              </h2>
              <p className="mb-3">
                Salvo que una propuesta formal indique expresamente lo contrario, el servicio no incluye:
              </p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Reparaciones estructurales mayores.",
                  "Corrección de daños estructurales de losa, trabes, columnas o cimentación.",
                  "Instalaciones eléctricas, hidráulicas, sanitarias, pluviales o mecánicas no relacionadas directamente con el alcance aprobado.",
                  "Reparación o sustitución de equipos de aire acondicionado, tinacos, domos, antenas, tuberías, bases o instalaciones de terceros.",
                  "Trabajos en techos de lámina, salvo aceptación específica por escrito.",
                  "Reparaciones en zonas no contratadas.",
                  "Daños derivados de perforaciones, modificaciones o trabajos realizados por terceros después de la entrega.",
                  "Daños derivados de falta de mantenimiento, bajantes obstruidas, basura acumulada, uso inadecuado o eventos extraordinarios.",
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
                7. Garantías y revisiones correctivas
              </h2>
              <p className="mb-3 text-industrial-400">
                Cualquier garantía, revisión correctiva o responsabilidad posterior deberá estar
                establecida por escrito en la propuesta, contrato o documento de entrega correspondiente.
              </p>
              <p className="mb-3 text-industrial-400">
                En términos generales, cualquier revisión correctiva estará limitada a:
              </p>
              <ul className="mb-4 ml-4 space-y-1.5 text-industrial-400">
                {[
                  "La zona intervenida.",
                  "El alcance contratado.",
                  "La causa atribuible al trabajo ejecutado por Imperpre/CMFITA.",
                  "Las condiciones específicas pactadas por escrito.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-industrial-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-industrial-400">
                No se entenderá como garantía general cualquier filtración, humedad, daño o problema que
                provenga de zonas no intervenidas, modificaciones posteriores, daños estructurales,
                obstrucción de bajantes, instalaciones de terceros, eventos extraordinarios o falta de
                mantenimiento.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                8. Fotografías, videos y evidencia
              </h2>
              <p className="mb-3 text-industrial-400">
                Durante visitas o ejecución de trabajos, Imperpre/CMFITA podrá tomar fotografías o videos
                de las zonas técnicas, azoteas, superficies, puntos críticos, avances y resultados con
                fines de diagnóstico, evidencia de trabajo, control interno, entrega de reporte, garantía
                o documentación.
              </p>
              <p className="text-industrial-400">
                Cuando se utilicen imágenes para fines publicitarios o de portafolio, se procurará no
                mostrar menores de edad, información sensible, rostros identificables o datos internos del
                plantel sin autorización correspondiente.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                9. Responsabilidad del cliente
              </h2>
              <p className="mb-3">El cliente deberá:</p>
              <ul className="ml-4 space-y-1.5 text-industrial-400">
                {[
                  "Proporcionar información veraz.",
                  "Permitir acceso seguro a las zonas a revisar.",
                  "Informar restricciones de acceso, horarios, riesgos o condiciones especiales.",
                  "Contar con autorización interna para solicitar revisión, visita o cotización.",
                  "Revisar y aprobar por escrito el alcance antes de iniciar cualquier trabajo.",
                  "Evitar modificaciones posteriores por terceros sin informar a Imperpre/CMFITA cuando exista garantía o revisión pendiente.",
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
                10. Pagos, anticipos y liquidación
              </h2>
              <p className="mb-3 text-industrial-400">
                Los pagos, anticipos, formas de pago, fechas, retenciones, facturación, liquidación y
                condiciones comerciales serán los establecidos en la propuesta formal aprobada.
              </p>
              <p className="text-industrial-400">
                Ninguna publicación del sitio implica precio fijo, descuento obligatorio, promoción
                permanente o compromiso de mantener condiciones comerciales indefinidamente.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                11. Limitación de responsabilidad
              </h2>
              <p className="text-industrial-400">
                Imperpre/CMFITA no será responsable por daños indirectos, lucro cesante, pérdida de
                ingresos, interrupciones operativas, pérdida de información, daños a equipos,
                afectaciones de terceros o consecuencias no previstas, salvo que exista disposición legal
                aplicable o pacto expreso por escrito.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                12. Propiedad intelectual
              </h2>
              <p className="text-industrial-400">
                Los textos, diseño, fotografías, gráficos, nombres comerciales, estructura de oferta y
                elementos visuales del sitio pertenecen a sus respectivos titulares. No está permitido
                copiarlos, reproducirlos o utilizarlos sin autorización.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                13. Relación con Meta, Facebook, Instagram y WhatsApp
              </h2>
              <p className="text-industrial-400">
                Este sitio no forma parte de Meta Platforms, Inc., Facebook, Instagram o WhatsApp, ni
                está respaldado, administrado o asociado con dichas plataformas. Facebook, Instagram y
                WhatsApp son marcas registradas de sus respectivos titulares.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">
                14. Cambios en los términos
              </h2>
              <p className="text-industrial-400">
                Imperpre/CMFITA podrá modificar estos términos por cambios operativos, legales, técnicos
                o comerciales. La versión vigente estará disponible en:{" "}
                <span className="text-steel-light">
                  https://imperpre.cmfita.com/es/terminos
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
