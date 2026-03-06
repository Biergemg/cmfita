# FITA Landing

Sitio corporativo bilingue (ES/EN) para Construccion y Mantenimientos FITA S.A. de C.V., construido con Next.js App Router, TypeScript y next-intl.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl
- GSAP

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Variables de entorno

```bash
NEXT_PUBLIC_SITE_URL=https://cmfita.com
GOOGLE_SITE_VERIFICATION=
```

`NEXT_PUBLIC_SITE_URL` permite generar canonicos, sitemap, robots y metadata absoluta.
`GOOGLE_SITE_VERIFICATION` habilita la etiqueta de verificacion para Google Search Console.

## Estructura principal

- `app/[locale]`: layout y pagina principal internacionalizada.
- `components/layout`: navbar, footer y cambio de idioma.
- `components/sections`: secciones de la landing.
- `messages`: textos por idioma (`en.json`, `es.json`).
- `i18n`: configuracion de routing y carga de mensajes.
- `proxy.ts`: manejo de rutas internacionalizadas en Next.js 16.

## Flujo de actualizacion de textos

1. Editar `messages/en.json` y `messages/es.json`.
2. Si se requiere regenerar mensajes base, usar `node scripts/update-i18n.js`.
3. Ejecutar `npm run lint` y `npm run build` antes de subir cambios.

## Calidad antes de despliegue

- Lint sin errores.
- Build de produccion exitoso.
- Revisar links de contacto (correo y WhatsApp).
- Verificar render en `en` y `es`.
