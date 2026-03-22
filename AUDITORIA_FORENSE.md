# AUDITORÍA FORENSE — FITA Landing Page
**Fecha:** 22 de marzo de 2026
**Proyecto:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4
**Auditor:** Claude Code (claude-sonnet-4-6)
**Rama:** `main`
**Último commit:** `c6aa330` — Clean repository by removing unused assets and orphan scripts

---

## RESUMEN EJECUTIVO

El sitio tiene una **base técnica impecable** (0 errores TypeScript, 0 errores ESLint, build de producción exitoso en 62s) pero es **comercialmente mínimo**. Es un MVP bien construido que carece de casi toda la funcionalidad de negocio necesaria para competir en el mercado de constructoras industriales.

| Dimensión | Puntuación |
|-----------|-----------|
| Calidad de código | 8/10 |
| SEO técnico | 6/10 |
| Performance | 5/10 |
| Accesibilidad | 6/10 |
| Mobile | 8/10 |
| Captura de leads | **1/10** |
| Funcionalidades de negocio | **3/10** |
| **Preparación para producción** | **4/10** |

---

## CHECKS TÉCNICOS EJECUTADOS

| Check | Resultado | Detalle |
|-------|-----------|---------|
| ESLint | ✅ 0 errores | Código limpio |
| TypeScript `tsc` | ✅ 0 errores | Tipado correcto |
| Build producción | ✅ Exitoso | Compila en 62s, 8 páginas |
| Tests unitarios | ❌ Ninguno | 0 archivos de prueba |
| Tests E2E | ❌ Ninguno | No existe Playwright/Cypress |
| Seguridad XSS | ✅ Sin riesgo | `dangerouslySetInnerHTML` solo en JSON-LD server-side |
| Archivos CSS huérfanos | ✅ Ninguno | Solo `globals.css` propio |
| Estructura de directorios | ✅ Correcta | Separación limpia de capas |

---

## INVENTARIO DEL PROYECTO

### Rutas generadas en build
```
○ /_not-found          (estática)
ƒ /[locale]            (dinámica — única página de contenido)
○ /apple-icon.png      (estática)
○ /icon.png            (estática)
○ /manifest.webmanifest (estática)
○ /robots.txt          (estática)
○ /sitemap.xml         (estática)
```
**Problema crítico:** Solo existe 1 ruta de contenido. No hay páginas de servicios, portfolio, blog, ni equipo.

### Componentes existentes
| Componente | Estado | Notas |
|-----------|--------|-------|
| Hero | ✅ OK | GSAP, CTA con tracking |
| Overview | ✅ OK | Imagen + overlay |
| Institutional | ✅ OK | Grid 3 columnas |
| Capabilities | ✅ OK | Grid 6 items |
| TeamModel | ✅ OK | Imagen + texto |
| ProjectExperience | ✅ OK | Lista animada |
| Methodology | ✅ OK | Timeline 6 pasos |
| SafetyCompliance | ✅ OK | Grid iconos circulares |
| ProcurementReady | ✅ OK | Tarjetas horizontales |
| VoiceSearchFaq | ✅ OK | FAQ para búsqueda por voz |
| Contact | ⚠️ INCOMPLETO | Solo botones mailto/WhatsApp. Sin formulario. |
| Navbar | ✅ OK | Responsive, language switcher |
| Footer | ✅ OK | Info empresa, RFC, links |

### Stack de dependencias
```json
"next": "16.1.6"        ✅
"react": "19.2.3"       ✅
"next-intl": "^4.8.3"  ✅
"gsap": "^3.14.2"       ✅
"lucide-react": "^0.576.0" ✅
"tailwind-merge": "^3.5.0" ✅
"clsx": "^2.1.1"        ✅
```
Sin dependencias innecesarias. Falta: form library, validación, email service, testing.

---

## HALLAZGOS POR SEVERIDAD

---

### 🔴 CRÍTICO — Bloquean ingresos o datos de negocio

#### C-01: No existe formulario de contacto
- **Componente:** `components/Contact.tsx`
- **Problema:** La sección de contacto solo tiene botones `mailto:` y `window.open("https://wa.me/...")`. No existe ningún formulario.
- **Impacto:** Imposible capturar leads de forma estructurada. Se pierde nombre, empresa, tipo de proyecto, presupuesto.
- **Fix:** Implementar formulario con `react-hook-form` + `zod` + endpoint `/api/contact`.

#### C-02: No existe ninguna ruta `/api`
- **Componente:** N/A — directorio inexistente
- **Problema:** Cero rutas de backend. No se puede procesar ninguna solicitud.
- **Impacto:** Sin formulario funcional, sin notificaciones por email, sin almacenamiento de inquiries.
- **Fix:** Crear `/app/api/contact/route.ts` con integración a servicio de email (Resend/SendGrid).

#### C-03: GA4 no está configurado
- **Archivo:** `lib/analytics.ts` + `components/GoogleAnalytics.tsx`
- **Problema:** `NEXT_PUBLIC_GA_ID` está vacío. La variable de entorno no tiene valor.
- **Impacto:** **Cero datos de analytics.** No se puede medir tráfico, conversiones, ni ROI de marketing.
- **Fix:** Crear cuenta GA4, obtener Measurement ID (`G-XXXXXXXXXX`), agregar a `.env.local` y variables de Vercel.

#### C-04: No existe portfolio ni casos de estudio
- **Problema:** Solo hay texto descriptivo en "Project Experience". Sin fotos, videos, ni métricas reales.
- **Impacto:** En B2B industrial, la prueba de trabajo ejecutado es el factor de decisión #1.
- **Fix:** Crear sección/página con galería de proyectos, fotos antes/después, métricas de entrega.

#### C-05: No existen testimonios de clientes
- **Problema:** Ninguna sección de validación social.
- **Impacto:** En compras industriales de alto valor, la referencia de pares es crítica.
- **Fix:** Sección de testimonios con logo de empresa cliente, nombre, cargo y cita.

---

### 🟠 ALTO — Degradan visibilidad y credibilidad significativamente

#### H-01: Imágenes sin optimizar — 4.8 MB total
- **Archivos:**
  - `public/hero.png` — 812 KB
  - `public/crane.png` — 748 KB
  - `public/capabilities.png` — 707 KB
  - `public/infrastructure.png` — 761 KB
  - `public/team.png` — 740 KB
  - `public/logo.png` — 1.3 MB ← **crítico**
- **Problema:** Se usan `<img>` HTML nativo en lugar del componente `<Image>` de Next.js. Sin WebP, sin lazy loading, sin responsive sizes.
- **Impacto estimado LCP:** 3-4s actual vs objetivo <2.5s. Penaliza directamente Core Web Vitals y ranking Google.
- **Fix:** Migrar a `<Image>` de Next.js, convertir a WebP, agregar `loading="lazy"` en imágenes below-fold.

#### H-02: Errores de codificación de caracteres en español
- **Archivo:** `messages/es.json`
- **Problema:** Faltan acentos en múltiples palabras clave:
  - `"Ubicacion de la empresa"` → debe ser `"Ubicación de la empresa"`
  - `"estan orientado"` → `"están orientados"`
  - `"electricas"` → `"eléctricas"`
  - `"Que"` → `"Qué"`
  - `"Donde"` → `"Dónde"`
  - `"Como"` → `"Cómo"`
- **Impacto:** Penalización SEO en búsquedas en español. Apariencia poco profesional para clientes hispanohablantes.
- **Fix:** Revisión completa de `es.json` con corrección ortográfica.

#### H-03: No existen páginas de servicio individuales
- **Problema:** Todo el contenido está en una sola ruta `/[locale]`. No hay:
  - `/servicios/fabricacion-estructural`
  - `/servicios/instalacion`
  - `/servicios/mantenimiento`
- **Impacto:** Imposible rankear para keywords de servicio específicas.
- **Fix:** Crear páginas de servicio con contenido dedicado, schema `Service`, y CTAs específicos.

#### H-04: No se muestran certificaciones ni calificaciones
- **Problema:** No hay badges de ISO 9001, ISO 45001, IMSS, seguros, ni ninguna credencial verificable.
- **Impacto:** En licitaciones y RFQs industriales, las certificaciones son requisito de precalificación.
- **Fix:** Sección "Certificaciones" con logos verificables y links a documentos.

#### H-05: Analytics incompleto (más allá de GA_ID vacío)
- **Archivo:** `lib/analytics.ts`
- **Problema:** Solo se rastrea: WhatsApp click, Email click, Proposal request.
- **Falta:** Scroll depth, tiempo en página, visibilidad de secciones, clics en portfolio, descargas de brochure.
- **Fix:** Implementar eventos GA4 para cada interacción significativa.

#### H-06: No existe sección de blog ni recursos
- **Problema:** Sin contenido actualizable para SEO de long-tail.
- **Impacto:** Sin blog, la única forma de rankear es con keywords de homepage. Imposible competir a largo plazo.
- **Fix:** Implementar `/blog` con CMS headless (Sanity, Contentlayer) o archivos MDX.

---

### 🟡 MEDIO — Reducen experiencia y confianza

#### M-01: Falta manejo de errores
- **Problema:** Sin `try/catch` en componentes async, sin Error Boundaries, sin páginas `404` / `500` personalizadas.
- **Fix:** Crear `app/[locale]/not-found.tsx` y `app/[locale]/error.tsx`.

#### M-02: Accesibilidad incompleta
- **Problema:**
  - Sin `aria-label` en botones de iconos
  - Sin `aria-expanded` en menú móvil
  - Sin `aria-current` en enlace de navegación activo
  - Sin "Skip to content" link
  - Sin gestión de foco visible (outline)
- **Fix:** Auditoría con axe-core, correcciones ARIA básicas.

#### M-03: Schema markup incompleto
- **Problema:** Falta:
  - Schema `Service` por cada capacidad
  - `openingHoursSpecification` en `LocalBusiness`
  - `AggregateRating` (cuando se tengan reseñas)
  - `BreadcrumbList`
  - `VideoObject` (si se agregan videos)
- **Fix:** Expandir `lib/schema.ts` con los schemas faltantes.

#### M-04: Imágenes de Hero con CSS background en lugar de `<img>`
- **Archivo:** `components/Hero.tsx`
- **Problema:** La imagen hero se carga como `backgroundImage` en CSS inline. Los bots de Google no pueden indexar imágenes de background CSS correctamente.
- **Fix:** Migrar a `<Image>` de Next.js con `fill` prop y z-index negativo.

#### M-05: Sin soporte de idiomas adicionales
- **Problema:** Solo ES/EN. No existe PT (portugués) para mercado latinoamericano extendido.
- **Fix:** Evaluar si hay mercado en Brasil o Portugal antes de implementar.

#### M-06: Stat objects vacíos en i18n
- **Archivo:** `messages/en.json` y `messages/es.json`
- **Problema:** Objeto `"stats"` en Overview está vacío en ambos idiomas.
- **Fix:** Agregar métricas reales (años de experiencia, proyectos completados, etc.).

#### M-07: Sin configuración de imágenes en `next.config.ts`
- **Problema:** No hay `images.formats`, `images.domains`, ni `images.sizes`.
- **Fix:** Agregar configuración de optimización de imágenes en `next.config.ts`.

---

### 🔵 BAJO — Mejoras de calidad y mantenimiento

#### L-01: Sin tests
- **Problema:** 0 archivos de prueba en todo el proyecto.
- **Fix:** Implementar Vitest para componentes críticos (formulario, analytics), Playwright para E2E.

#### L-02: Sin páginas legales
- **Problema:** Sin `/privacidad`, `/terminos`, sin banner de cookies.
- **Fix:** Crear páginas legales básicas, implementar CookieConsent para GA4.

#### L-03: Sin `CONTRIBUTING.md` ni documentación de desarrollo
- **Problema:** No hay guía para onboarding de nuevos desarrolladores.

#### L-04: Sin análisis de bundle
- **Problema:** No hay script `"analyze"` en `package.json` para monitorear tamaño de JS.
- **Fix:** Agregar `@next/bundle-analyzer`.

#### L-05: Target ES2017 en TypeScript
- **Problema:** `tsconfig.json` tiene `"target": "ES2017"`. Podría actualizarse a ES2020.

#### L-06: Sin prefetch de recursos críticos
- **Problema:** No hay `<link rel="preconnect">` ni `dns-prefetch` para Google Fonts en el `<head>`.

---

## MAPA DE RUTA DE IMPLEMENTACIÓN

---

### FASE 1 — Fundamentos de negocio (Semana 1-2)
**Objetivo: Activar la captura de leads y la medición**

| Tarea | Prioridad | Esfuerzo |
|-------|-----------|----------|
| 1. Configurar GA4 (obtener y setear `NEXT_PUBLIC_GA_ID`) | CRÍTICO | 1h |
| 2. Crear formulario de contacto con validación (react-hook-form + zod) | CRÍTICO | 1 día |
| 3. Crear `/api/contact/route.ts` con envío por email (Resend) | CRÍTICO | 1 día |
| 4. Corregir todos los acentos en `es.json` | ALTO | 2h |
| 5. Crear página `/[locale]/not-found.tsx` personalizada | MEDIO | 2h |
| 6. Configurar variables de entorno en Vercel | CRÍTICO | 30min |

**Resultado esperado:** El sitio puede capturar y recibir leads. Se tienen datos reales de analytics.

---

### FASE 2 — Prueba social y credibilidad (Semana 3-4)
**Objetivo: Generar confianza en compradores B2B industriales**

| Tarea | Prioridad | Esfuerzo |
|-------|-----------|----------|
| 1. Crear sección Portfolio/Casos de estudio con fotos reales | CRÍTICO | 3 días |
| 2. Crear sección Testimonios con logos de clientes | CRÍTICO | 2 días |
| 3. Crear sección Certificaciones con badges verificables | ALTO | 1 día |
| 4. Optimizar todas las imágenes → WebP + Next.js `<Image>` | ALTO | 1 día |
| 5. Agregar métricas reales al objeto `stats` (años, proyectos, etc.) | ALTO | 2h |
| 6. Corregir imagen Hero (CSS background → `<Image>` Next.js) | MEDIO | 2h |

**Resultado esperado:** Un visitante B2B puede validar la experiencia y capacidad de FITA sin llamar.

---

### FASE 3 — SEO y arquitectura de contenido (Semana 5-8)
**Objetivo: Visibilidad orgánica sostenible**

| Tarea | Prioridad | Esfuerzo |
|-------|-----------|----------|
| 1. Crear páginas de servicio individuales (`/servicios/[slug]`) | ALTO | 4 días |
| 2. Implementar schema `Service` por capacidad | MEDIO | 1 día |
| 3. Crear sección/página de Equipo con bios y fotos | MEDIO | 2 días |
| 4. Implementar blog con MDX o CMS headless | MEDIO | 1 semana |
| 5. Crear formulario RFQ estructurado (tipo de proyecto, presupuesto, plazo) | ALTO | 2 días |
| 6. Agregar `BreadcrumbList` schema | BAJO | 2h |
| 7. Implementar `@next/bundle-analyzer` | BAJO | 1h |

**Resultado esperado:** El sitio rankea para keywords de servicio específicas. Captura RFQs calificados.

---

### FASE 4 — Excelencia técnica (Semana 9+)
**Objetivo: Core Web Vitals perfectos y operaciones escalables**

| Tarea | Prioridad | Esfuerzo |
|-------|-----------|----------|
| 1. Agregar tests unitarios con Vitest | MEDIO | 3 días |
| 2. Agregar tests E2E con Playwright | MEDIO | 2 días |
| 3. Implementar banner de cookies + páginas legales | MEDIO | 1 día |
| 4. Mejorar ARIA labels y accesibilidad | MEDIO | 2 días |
| 5. Agregar Service Worker para offline básico | BAJO | 1 día |
| 6. Crear página de equipamiento/instalaciones | BAJO | 2 días |
| 7. Implementar biblioteca de recursos descargables (PDF brochures) | BAJO | 2 días |

---

## MÉTRICAS OBJETIVO

### Core Web Vitals
| Métrica | Estado actual (est.) | Objetivo |
|---------|---------------------|---------|
| LCP (Largest Contentful Paint) | ~3-4s | < 2.5s |
| FID (First Input Delay) | ~50ms | < 100ms |
| CLS (Cumulative Layout Shift) | ~0.05 | < 0.1 |
| Bundle JS | ~80-100 KB | < 75 KB |

### Métricas de negocio (post-Fase 1)
| Métrica | Objetivo 3 meses |
|---------|-----------------|
| Tasa de conversión (visita → lead) | > 3% |
| Tiempo hasta propuesta (desde lead) | < 48h |
| Leads calificados/mes | > 5 |
| Posición Google para keyword principal | Top 10 |

---

## DEUDA TÉCNICA PRIORIZADA

```
INMEDIATA (esta semana):
├── GA4 ID → configurar variable de entorno
├── es.json → corregir acentos
└── Formulario → implementar con API

CORTO PLAZO (este mes):
├── Imágenes → migrar a Next.js Image + WebP
├── Portfolio → agregar fotos y casos reales
├── Testimonios → conseguir y agregar
└── Certificaciones → agregar badges

MEDIO PLAZO (próximo trimestre):
├── Páginas de servicio → crear rutas individuales
├── Blog → implementar con MDX
├── Tests → Vitest + Playwright
└── Accesibilidad → ARIA completo

LARGO PLAZO (6+ meses):
├── Idiomas adicionales (PT)
├── Service Worker
├── CRM integration
└── Video testimonials
```

---

## RIESGOS IDENTIFICADOS

| Riesgo | Severidad | Probabilidad | Mitigación |
|--------|-----------|--------------|-----------|
| Cero datos de analytics en producción | CRÍTICO | ALTA (ya ocurre) | Configurar GA_ID inmediatamente |
| Perder leads por falta de formulario | CRÍTICO | ALTA (ya ocurre) | Implementar formulario Fase 1 |
| Penalización SEO por imágenes pesadas | ALTO | MEDIA | Migrar a Next.js Image |
| Perder deals por falta de portfolio | ALTO | ALTA | Agregar casos reales Fase 2 |
| Penalización ortográfica (tildes) en SEO ES | ALTO | ALTA (ya ocurre) | Fix inmediato en es.json |

---

## CONCLUSIÓN

FITA tiene el mejor punto de partida técnico posible: código limpio, arquitectura moderna, build sin errores, y una identidad visual industrial sólida. El problema es **comercial, no técnico**.

El sitio actual puede generar tráfico pero **no puede convertirlo en negocio** porque:
1. No tiene formulario para capturar datos del lead
2. No tiene backend para procesar ese formulario
3. No tiene analytics para saber qué funciona
4. No tiene prueba de trabajo (portfolio) para justificar la compra

Con la Fase 1 implementada (1-2 semanas de trabajo), el sitio pasa de ser una tarjeta de presentación a una **máquina de generación de leads**. Con la Fase 2 (testimonios + portfolio), se convierte en un argumento de venta autónomo que trabaja 24/7.

---

*Documento generado el 22 de marzo de 2026 · Claude Code auditoría forense · Proyecto FITA*
