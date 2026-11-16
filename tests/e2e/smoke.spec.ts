import { expect, test } from '@playwright/test';

// Regresión funcional de FITA (cmfita.com) en inglés y español. Los títulos esperados son los publicados hoy en
// producción; la versión anterior de esta prueba buscaba textos que el sitio ya no usa.
const pages = [
  { path: '/en/services', h1: /^Execution lines$/i },
  { path: '/en/blog', h1: /^Notes and insights$/i },
  { path: '/es/services', h1: /^Líneas de ejecución$/i },
  { path: '/es/blog', h1: /^Notas y perspectivas$/i },
];

test('home de FITA en inglés y español', async ({ page }) => {
  for (const path of ['/en', '/es']) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

for (const p of pages) {
  test(`FITA ${p.path} responde y muestra su título`, async ({ page }) => {
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: p.h1 })).toBeVisible();
  });
}
