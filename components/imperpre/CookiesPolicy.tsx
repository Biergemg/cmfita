import Link from "next/link";

import { ImperpreFooter } from "@/components/imperpre/Footer";
import { ImperpreNavbar } from "@/components/imperpre/Navbar";
import { CookiePrefsButton } from "@/components/imperpre/CookiePrefsButton";

// Política de cookies de Imperpre: describe solo lo que el sitio usa realmente (consentimiento en almacenamiento local
// y Google Analytics 4 tras aceptar). No hay Meta Pixel ni otras etiquetas de seguimiento instaladas.
export const imperpreCookiesMeta = {
  title: "Política de cookies | Imperpre",
  description:
    "Qué tecnologías de almacenamiento y medición usa el sitio de Imperpre, servicio de Construcción y Mantenimientos FITA, S.A. de C.V., y cómo cambiar tu decisión.",
  path: "/es/cookies",
};

const rows = [
  {
    name: "fita-analytics-consent",
    kind: "Almacenamiento local del navegador (propio)",
    purpose: "Recordar si aceptaste o rechazaste la medición. Es necesario para respetar tu decisión.",
    when: "Siempre que eliges una opción en el aviso.",
  },
  {
    name: "_ga y _ga_<ID> (Google Analytics 4)",
    kind: "Cookies de terceros (Google LLC)",
    purpose: "Medir visitas y clics en los botones de contacto de forma agregada, para mejorar el sitio.",
    when: "Solo después de que pulses «Aceptar». Si rechazas, no se cargan.",
  },
];

export function ImperpreCookiesPolicy() {
  return (
    <>
      <ImperpreNavbar />
      <main id="main-content" className="min-h-screen bg-industrial-950 pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 border-b border-industrial-800 pb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-industrial-500">Legal</p>
            <h1 className="mb-3 text-3xl font-bold text-steel-light md:text-4xl">Política de cookies</h1>
            <p className="text-sm text-industrial-500">Última actualización: 15 de noviembre de 2026</p>
          </div>

          <div className="space-y-10 text-sm leading-relaxed text-industrial-300">
            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">1. Responsable</h2>
              <p className="text-industrial-400">
                Este sitio es operado por Construcción y Mantenimientos FITA, S.A. de C.V. (RFC CMF140509C49), con domicilio en
                Paseo de los Mexicas 126-D, Col. 16 de Septiembre, C.P. 89512, Ciudad Madero, Tamaulipas. Imperpre es un
                servicio de FITA, no una sociedad independiente.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">2. Qué usamos</h2>
              <div className="space-y-4">
                {rows.map((r) => (
                  <div key={r.name} className="rounded-sm border border-industrial-800 p-4">
                    <p className="font-semibold text-steel-light" style={{ overflowWrap: "anywhere" }}>
                      {r.name}
                    </p>
                    <p className="text-industrial-400">{r.kind}</p>
                    <p className="mt-2 text-industrial-400">
                      <span className="text-industrial-300">Para qué: </span>
                      {r.purpose}
                    </p>
                    <p className="text-industrial-400">
                      <span className="text-industrial-300">Cuándo: </span>
                      {r.when}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-industrial-400">
                El sitio no tiene instalado Meta Pixel ni otras etiquetas publicitarias. El formulario de revisión no envía tus
                datos a nuestro servidor: arma un mensaje en tu navegador y solo se comparte si decides abrirlo y enviarlo por
                WhatsApp, servicio que se rige por sus propias condiciones y aviso de privacidad.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">3. Cómo cambiar tu decisión</h2>
              <p className="mb-3 text-industrial-400">
                Puedes aceptar o rechazar la medición cuando quieras. Al rechazarla dejamos de enviar datos a Google Analytics;
                las cookies que ya existan se pueden borrar desde la configuración de tu navegador.
              </p>
              <p className="text-steel-light underline underline-offset-4">
                <CookiePrefsButton />
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-base font-semibold text-amber-400">4. Más información</h2>
              <p className="text-industrial-400">
                El tratamiento de datos personales se describe en el{" "}
                <Link href="/es/privacidad" className="text-steel-light underline underline-offset-2">
                  aviso de privacidad
                </Link>
                . Para cualquier duda escribe a{" "}
                <a href="mailto:cmfitasadecv@gmail.com" className="text-steel-light underline underline-offset-2">
                  cmfitasadecv@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <ImperpreFooter />
    </>
  );
}
