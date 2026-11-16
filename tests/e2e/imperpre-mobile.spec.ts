import { expect, test } from '@playwright/test';

// Host de Imperpre: `isImperpreHost` acepta cualquier host que empiece por "imperpre.".
// Chromium resuelve *.localhost a loopback, así que no hace falta tocar DNS ni cabeceras.
const PORT = new URL(process.env.PW_BASE_URL ?? 'http://127.0.0.1:3000').port || '3000';
const IMPERPRE_URL = `http://imperpre.localhost:${PORT}/es`;
const FITA_URL = `http://127.0.0.1:${PORT}/es`;

test.use({ viewport: { width: 390, height: 844 } });

test.describe('Imperpre móvil (<=760px)', () => {
  test('el body no crea un contenedor de scroll y el hero sticky permanece visible', async ({ page }) => {
    await page.goto(IMPERPRE_URL, { waitUntil: 'networkidle' });

    const overflowX = await page.evaluate(() => getComputedStyle(document.body).overflowX);
    expect(overflowX).toBe('clip');

    const hero = page.locator('section[aria-labelledby="imp-h1"]');
    const stage = hero.locator('> div').first();
    const heroHeight = await hero.evaluate((el) => el.getBoundingClientRect().height);
    const heroTop = await hero.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    expect(heroHeight).toBeGreaterThan(1500);

    // Recorre el hero: el stage debe quedarse pegado bajo la cabecera (top ≈ 68px), nunca salir de pantalla.
    for (const offset of [100, 600, 900, 1400, 2000]) {
      const y = Math.min(heroTop + offset, heroTop + heroHeight - 844 - 20);
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(150);
      const top = await stage.evaluate((el) => el.getBoundingClientRect().top);
      expect(top, `stage.top en scrollY=${y}`).toBeGreaterThanOrEqual(60);
      expect(top, `stage.top en scrollY=${y}`).toBeLessThanOrEqual(76);
    }
  });

  test('el título del hero sigue visible durante el scroll (sin pantalla en blanco)', async ({ page }) => {
    await page.goto(IMPERPRE_URL, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(200);
    const h1 = page.locator('#imp-h1');
    const box = await h1.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom };
    });
    expect(box.bottom).toBeGreaterThan(0);
    expect(box.top).toBeLessThan(844);
  });

  test('no hay desbordamiento horizontal', async ({ page }) => {
    await page.goto(IMPERPRE_URL, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe('Imperpre: oferta y conversión', () => {
  test('el botón del hero se ve sin scroll y no lo tapa el rollo', async ({ page }) => {
    await page.goto(IMPERPRE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2200);
    const cta = page.locator('#imp-h1 ~ div a', { hasText: 'Solicitar revisión técnica' });
    await expect(cta).toBeInViewport();
    const box = await cta.boundingBox();
    const roll = await page.locator('section[aria-labelledby="imp-h1"] [class*="roll"]').boundingBox();
    expect(box && roll && box.y + box.height <= roll.y + 1).toBeTruthy();
  });

  test('la Ficha de Hallazgos y la condición «se queda en la escuela» están publicadas', async ({ page }) => {
    await page.goto(IMPERPRE_URL);
    await expect(page.getByRole('heading', { name: 'Ficha de Hallazgos de la Azotea' })).toBeVisible();
    await expect(page.getByText('Se queda contigo, contrates o no.')).toBeVisible();
  });

  test('el mensaje de WhatsApp lleva los datos del formulario al número de FITA', async ({ page }) => {
    await page.goto(IMPERPRE_URL);
    await page.fill('#imp-school', 'Colegio Prueba');
    await page.fill('#imp-who', 'Ana, directora');
    await page.check('#imp-m-0', { force: true });
    const href = await page.locator('#valoracion a[href*="wa.me"]').getAttribute('href');
    expect(href).toContain('https://wa.me/528335181171?text=');
    const msg = decodeURIComponent(href!.split('text=')[1]);
    expect(msg).toContain('Soy Ana, directora, de la escuela Colegio Prueba en Tampico.');
    expect(msg).toContain('revisión técnica de la azotea');
  });

  test('la barra fija no aparece sobre el formulario', async ({ page }) => {
    await page.goto(IMPERPRE_URL);
    await page.locator('#valoracion a[href*="wa.me"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('[class*="mobileBar"]')).toHaveAttribute('data-hidden', 'true');
  });
});

test('FITA conserva overflow-x-hidden en el body', async ({ page }) => {
  await page.goto(FITA_URL, { waitUntil: 'domcontentloaded' });
  const overflowX = await page.evaluate(() => getComputedStyle(document.body).overflowX);
  expect(overflowX).toBe('hidden');
});
