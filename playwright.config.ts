import { defineConfig } from '@playwright/test';

// PW_BASE_URL permite probar contra un servidor ya levantado en otro puerto (p. ej. `next start --port 3100`).
const baseURL = process.env.PW_BASE_URL ?? 'http://127.0.0.1:3000';
const port = new URL(baseURL).port || '3000';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL,
    trace: 'on-first-retry',
    launchOptions: process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {},
  },
  webServer: {
    command: `node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 240000,
  },
});
