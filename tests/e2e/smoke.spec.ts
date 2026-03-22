import { expect, test } from '@playwright/test';

test('home, services and blog render', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  await page.goto('/en/services');
  await expect(page.getByRole('heading', { name: /execution services/i })).toBeVisible();

  await page.goto('/en/blog');
  await expect(page.getByRole('heading', { name: /insights and resources/i })).toBeVisible();
});
