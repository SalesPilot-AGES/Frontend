import { chromium, type FullConfig } from '@playwright/test';

/**
 * Pre-warms the Vite dev server before any tests run.
 *
 * Playwright considers the webServer "ready" as soon as localhost:5173 responds
 * to HTTP — but Vite lazily compiles the JS bundle on the first real browser
 * request, which can take 20-30 seconds. Without this warm-up, the first test
 * times out waiting for React to mount.
 *
 * This setup navigates to /login and waits for the login button to appear,
 * which confirms the bundle has been compiled and React has mounted. All
 * subsequent tests then start with a warm Vite cache.
 */
export default async function globalSetup(config: FullConfig): Promise<void> {
  const baseURL =
    config.projects[0]?.use?.baseURL ?? 'http://localhost:5173';

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`${baseURL}/login`, { timeout: 90_000 });
    // Wait for the LOGIN button — confirms React has fully mounted
    await page.waitForSelector('button[type="submit"]', { timeout: 90_000 });
  } finally {
    await browser.close();
  }
}
