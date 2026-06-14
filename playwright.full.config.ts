import { defineConfig } from '@playwright/test';

import baseConfig from './playwright.config';

export default defineConfig({
  ...baseConfig,
  webServer: [
    {
      command: 'pnpm dev',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'docker compose -f ../backend/docker-compose.yml up --build db api',
      url: 'http://localhost:8080',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
});
