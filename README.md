# FITA Landing

Sitio corporativo bilingüe (ES/EN) para Construcción y Mantenimientos FITA S.A. de C.V., construido con Next.js App Router, TypeScript y next-intl.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl
- GSAP
- React Hook Form + Zod
- Resend
- MDX en repo
- Vitest + Playwright

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run test:e2e
npm run build
npm run start
npm run analyze
```

## Variables de entorno

```bash
NEXT_PUBLIC_SITE_URL=https://cmfita.com
NEXT_PUBLIC_GA_ID=
GOOGLE_SITE_VERIFICATION=
RESEND_API_KEY=
CONTACT_TO_EMAIL=cmfitasadecv@gmail.com
CONTACT_FROM_EMAIL=FITA Leads <leads@cmfita.com>
```

## Estructura principal

- `app/[locale]`: homepage, blog, servicios, equipo y páginas legales.
- `app/api/contact/route.ts`: endpoint de leads con validación, honeypot y rate limiting best-effort.
- `content/blog` y `content/services`: contenido MDX por idioma.
- `components/sections`: secciones comerciales y formularios.
- `data`: placeholders tipados para portfolio, testimonios, certificaciones y equipo.
- `messages`: textos por idioma.

## Flujo de calidad

1. Editar contenido en `messages/`, `data/` o `content/`.
2. Ejecutar `npm run lint`, `npm run test` y `npm run build`.
3. Configurar variables de entorno en Vercel antes de activar el formulario real.
