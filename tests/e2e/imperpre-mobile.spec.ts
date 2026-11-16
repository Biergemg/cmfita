import { expect, test, type Page } from '@playwright/test';

// Host de Imperpre: `isImperpreHost` acepta cualquier host que empiece por "imperpre.".
// Chromium resuelve *.localhost a loopback, así que no hace falta tocar DNS ni cabeceras.
// IMPERPRE_URL permite apuntar a la URL pública (https://imperpre.cmfita.com/es).
const PORT = new URL(process.env.PW_BASE_URL ?? 'http://127.0.0.1:3000').port || '3000';
const IMPERPRE_URL = process.env.IMPERPRE_URL ?? `http://imperpre.localhost:${PORT}/es`;
const IMPERPRE_ORIGIN = new URL(IMPERPRE_URL).origin;
const FITA_URL = process.env.FITA_URL ?? `http://127.0.0.1:${PORT}/es`;

// Sin decisión de cookies previa salvo que la prueba la necesite; el aviso se cierra para no tapar controles.
async function open(page: Page, url = IMPERPRE_URL) {
  await page.addInitScript(() => {
    try {
      if (!sessionStorage.getItem('pw-keep')) localStorage.setItem('fita-analytics-consent', 'denied');
    } catch {}
  });
  await page.goto(url, { waitUntil: 'networkidle' });
}

test.describe('Imperpre responsive: sin desbordamientos reales', () => {
  for (const width of [320, 360, 375, 390, 414, 768]) {
    test(`${width}px: ningún elemento ensancha la página en todo el recorrido`, async ({ page }) => {
      await page.setViewportSize({ width, height: 760 });
      await open(page);
      // Ni html, ni body, ni la raíz de Imperpre recortan el eje X: si algo se sale, scrollWidth lo delata.
      const clips = await page.evaluate(() => [document.documentElement, document.body, document.querySelector('main')!.parentElement!].map((el) => getComputedStyle(el).overflowX));
      expect(clips).toEqual(['visible', 'visible', 'visible']);
      const height = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < height; y += 500) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        await page.waitForTimeout(60);
        const sw = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(sw, `scrollWidth en y=${y}`).toBeLessThanOrEqual(width);
      }
    });
  }
});

test.describe('Imperpre móvil (<=760px)', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('el hero sticky permanece visible durante todo su recorrido', async ({ page }) => {
    await open(page);
    const hero = page.locator('section[aria-labelledby="imp-h1"]');
    const stage = hero.locator('> div').first();
    const heroHeight = await hero.evaluate((el) => el.getBoundingClientRect().height);
    const heroTop = await hero.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
    expect(heroHeight).toBeGreaterThan(1500);
    for (const offset of [100, 600, 900, 1400, 2000]) {
      const y = Math.min(heroTop + offset, heroTop + heroHeight - 844 - 20);
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(150);
      const top = await stage.evaluate((el) => el.getBoundingClientRect().top);
      expect(top, `stage.top en scrollY=${y}`).toBeGreaterThanOrEqual(60);
      expect(top, `stage.top en scrollY=${y}`).toBeLessThanOrEqual(76);
    }
  });

  test('primera pantalla: botón y «la ficha se queda» visibles, sin que el rollo los tape', async ({ page }) => {
    await open(page);
    await page.waitForTimeout(2200);
    const cta = page.locator('#imp-h1 ~ div a', { hasText: 'Solicitar revisión técnica' });
    const note = page.getByText('La ficha se queda en tu escuela, contrates o no.');
    await expect(cta).toBeInViewport();
    await expect(note).toBeInViewport();
    const n = await note.boundingBox();
    const roll = await page.locator('section[aria-labelledby="imp-h1"] [class*="roll"]').boundingBox();
    expect(n && roll && n.y + n.height <= roll.y + 1).toBeTruthy();
  });

  test('la barra fija no aparece sobre el formulario', async ({ page }) => {
    await open(page);
    await page.locator('#valoracion a[href*="wa.me"]').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('[class*="mobileBar"]')).toHaveAttribute('data-hidden', 'true');
  });
});

test.describe('Imperpre: oferta, calificación y conversión', () => {
  test('la Ficha de Hallazgos y la condición «se queda en la escuela» están publicadas', async ({ page }) => {
    await open(page);
    await expect(page.getByRole('heading', { name: 'Ficha de Hallazgos de la Azotea' })).toBeVisible();
    await expect(page.getByText('Se queda contigo, contrates o no.')).toBeVisible();
  });

  test('sin las respuestas de calificación no se abre WhatsApp y se indica qué falta', async ({ page }) => {
    await open(page);
    const send = page.locator('#valoracion a[href*="wa.me"]');
    const popup = page.waitForEvent('popup', { timeout: 1500 }).catch(() => null);
    await send.click();
    expect(await popup).toBeNull();
    const alert = page.locator('#valoracion [role="alert"]');
    await expect(alert).toContainText('nombre de la escuela');
    await expect(alert).toContainText('tipo de azotea');
    await expect(alert).toContainText('superficie aproximada');
  });

  test('mensaje de WhatsApp calificado al número de FITA', async ({ page }) => {
    await open(page);
    await page.fill('#imp-school', 'Colegio Prueba');
    await page.fill('#imp-who', 'Ana, directora');
    for (const id of ['#imp-t-0', '#imp-m-0', '#imp-r-0', '#imp-z-1', '#imp-a-0']) await page.check(id, { force: true });
    await expect(page.locator('#valoracion [role="status"]')).toHaveCount(0);
    const href = await page.locator('#valoracion a[href*="wa.me"]').getAttribute('href');
    expect(href).toContain('https://wa.me/528335181171?text=');
    const msg = decodeURIComponent(href!.split('text=')[1]);
    expect(msg).toContain('Soy Ana, directora, de la escuela Colegio Prueba (privada) en Tampico.');
    expect(msg).toContain('Azotea: losa de concreto. Superficie aproximada: 100 m² o más. Goteras: hay goteras ahora.');
  });

  test('casos fuera de alcance reciben una nota clara (sin bloquear el envío)', async ({ page }) => {
    await open(page);
    await page.check('#imp-r-1', { force: true });
    await expect(page.locator('#valoracion [role="status"]')).toContainText('losa de concreto');
  });

  test('pie: aviso de independencia respecto de Meta debajo de los enlaces legales', async ({ page }) => {
    await open(page);
    const footer = page.locator('footer');
    const notice = footer.getByText(/No forma parte de Facebook ni Instagram/);
    await expect(notice).toContainText('Construcción y Mantenimientos FITA, S.A. de C.V.');
    await expect(notice).toContainText('Meta Platforms, Inc.');
    const legal = await footer.getByRole('link', { name: 'Política de cookies' }).boundingBox();
    const n = await notice.boundingBox();
    expect(n!.y).toBeGreaterThan(legal!.y);
    await expect(footer.locator('img[alt*="Meta" i], img[alt*="Facebook" i], img[alt*="Instagram" i]')).toHaveCount(0);
  });
});

test.describe('Imperpre: consentimiento, legal y SEO', () => {
  test('GA no se carga sin consentimiento y el aviso puede reabrirse', async ({ page }) => {
    await page.goto(IMPERPRE_URL, { waitUntil: 'networkidle' });
    await expect(page.getByRole('button', { name: /rechazar/i })).toBeVisible();
    expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
    await page.getByRole('button', { name: /rechazar/i }).click();
    expect(await page.locator('script[src*="googletagmanager"]').count()).toBe(0);
    await page.getByRole('button', { name: 'Preferencias de cookies' }).first().click();
    await expect(page.getByRole('button', { name: /aceptar/i })).toBeVisible();
  });

  test('páginas legales de Imperpre con su canonical y su pie', async ({ page }) => {
    for (const path of ['/es/privacidad', '/es/terminos', '/es/cookies']) {
      const res = await page.goto(`${IMPERPRE_ORIGIN}${path}`);
      expect(res?.status(), path).toBe(200);
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical, path).toMatch(new RegExp(`${path}$`));
      await expect(page.locator('footer').getByText('Operado por FITA')).toBeVisible();
    }
  });

  test('sitemap anuncia las URL legales que enlaza el pie y las antiguas redirigen', async ({ request }) => {
    // Node no resuelve *.localhost: en local se llama a 127.0.0.1 con la cabecera Host de Imperpre.
    const local = new URL(IMPERPRE_ORIGIN).hostname.endsWith('.localhost');
    const get = (path: string, opts: { maxRedirects?: number } = {}) =>
      local
        ? request.get(`http://127.0.0.1:${PORT}${path}`, { ...opts, headers: { host: new URL(IMPERPRE_ORIGIN).host } })
        : request.get(`${IMPERPRE_ORIGIN}${path}`, opts);
    const xml = await (await get('/sitemap.xml')).text();
    for (const p of ['/es/privacidad', '/es/terminos', '/es/cookies']) expect(xml).toContain(p);
    expect(xml).not.toMatch(/\/es\/(privacy|terms)</);
    for (const [from, to] of [['/es/privacy', '/es/privacidad'], ['/es/terms', '/es/terminos']]) {
      const r = await get(from, { maxRedirects: 0 });
      expect(r.status(), from).toBe(308);
      expect(r.headers()['location']).toMatch(new RegExp(`${to}$`));
    }
  });
});

test('FITA conserva overflow-x-hidden en el body', async ({ page }) => {
  await page.goto(FITA_URL, { waitUntil: 'domcontentloaded' });
  const overflowX = await page.evaluate(() => getComputedStyle(document.body).overflowX);
  expect(overflowX).toBe('hidden');
});
