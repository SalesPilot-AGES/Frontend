# SalesPilot — Playwright E2E Test Suite

This guide covers everything you need to run, debug, and extend the end-to-end test suite.

---

## Table of contents

1. [Quick start](#1-quick-start)
2. [Prerequisites](#2-prerequisites)
3. [Project structure](#3-project-structure)
4. [What the test covers](#4-what-the-test-covers)
5. [Running tests](#5-running-tests)
6. [Understanding the test output](#6-understanding-the-test-output)
7. [How to write a new test](#7-how-to-write-a-new-test)
8. [Debugging failing tests](#8-debugging-failing-tests)
9. [CI setup (GitHub Actions)](#9-ci-setup-github-actions)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Quick start

```bash
# Install dependencies (already done if you ran pnpm install)
pnpm install

# 1. Start the backend (from the ../backend directory)
cd ../backend && docker compose up --build

# 2. Run the e2e suite against it (from the frontend directory)
pnpm test:e2e

# Or let Playwright start everything for you (dev server + Docker backend):
pnpm test:e2e:full
```

---

## 2. Prerequisites

- **Node.js 20+** and **pnpm 10+**
- Chromium browser — installed automatically by Playwright. Re-run if it ever gets corrupted:
  ```bash
  pnpm exec playwright install chromium
  ```
- **Docker and Docker Compose** — the suite runs entirely against the real backend
  and seeded Postgres data, so a backend API at `http://localhost:8080` must be
  reachable:
  ```bash
  # From the ../backend directory
  docker compose up --build
  ```
- A local `.env.local` file in the frontend root with:
  ```
  VITE_API_URL=http://localhost:8080
  ```
  This is also the default in `src/services/api/apiClient.ts`, so it's optional
  unless your backend runs on a different host/port.

---

## 3. Project structure

```
tests/e2e/
├── README.md                    ← this file
├── e2e-helpers.ts               ← shared seeded users, ids, login/logout helpers
├── admin-flow.spec.ts           ← end-to-end admin journey against the real backend
├── manager-flow.spec.ts         ← manager journey and permission checks
└── salesman-flow.spec.ts        ← salesman journey and permission checks
```

Configuration lives at the project root:

```
playwright.config.ts             ← base Playwright configuration (single "backend" project)
playwright.full.config.ts        ← adds webServer entries to spin up the dev server + Docker backend
playwright.globalSetup.ts         ← pre-warms the Vite dev server before tests run
```

---

## 4. What the test covers

Each spec contains one `test()` tagged `@backend`, split into named
`test.step()` blocks that play through the app exactly as a real user would,
using data seeded by `../backend/bootstrap/src/main/resources/db/seed/V4__seed_data.sql`.

`admin-flow.spec.ts` covers the full platform surface:

| Step | What happens                                                                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | Login via the real form — `POST /api/auth/login` against the seeded admin (`ana@digitalsales.com`)               |
| 2    | Dashboard — verify admin heading and sidebar items                                                               |
| 3    | Companies list — verify seeded companies and active/inactive stat cards                                          |
| 4    | Company detail — heading and CNPJ for "Digital Sales"                                                            |
| 5    | Managers list and detail — seeded manager "Gabriel Ribeiro"                                                      |
| 6    | Salesmen list and detail — seeded salesmen, including inactive "Laura Silva"                                     |
| 7    | Meetings list and detail — all three tabs (Contexto → Insights → Plano de Ação) with real pre/post-analysis data |
| 8    | Logout — verify auth state is cleared from `localStorage`                                                        |

Because everything runs against the real API, there is no route mocking and no
pre-authentication helper — the test logs in through the actual login form and
every assertion reflects real data from the seeded database.

`manager-flow.spec.ts` verifies the middle access level:

| Step | What happens                                                                 |
| ---- | ---------------------------------------------------------------------------- |
| 1    | Login via the real form — seeded manager (`gabriel@digitalsales.com`)        |
| 2    | Dashboard — verify manager heading and sidebar items                         |
| 3    | Permission redirects — `/empresas` and `/gestores` return to `/painel`       |
| 4    | Salesmen area — manager can access `/vendedores` and seller detail data      |
| 5    | Meetings area — manager can access `/reuniões` and real meeting detail tabs  |
| 6    | Logout — verify auth state is cleared from `localStorage`                    |

`salesman-flow.spec.ts` verifies the lowest access level:

| Step | What happens                                                                       |
| ---- | ---------------------------------------------------------------------------------- |
| 1    | Login via the real form — seeded seller (`saulo@digitalsales.com`)                 |
| 2    | Dashboard — verify salesman heading and sidebar items                              |
| 3    | Permission redirects — admin/manager-only routes return to `/painel`               |
| 4    | Meetings area — seller can access `/reuniões`                                      |
| 5    | Meeting detail — seller sees real own meeting data and completed analysis tab data |
| 6    | Logout — verify auth state is cleared from `localStorage`                          |

### Handling routes with special characters

The meetings route is `/reuniões` (contains `ã`). Use regex in `waitForURL` and
`toHaveURL` to avoid encoding ambiguity:

```typescript
// Do this
await page.waitForURL(/reuni/);

// Not this — encoding can differ between environments
await page.waitForURL('/reuni%C3%B5es');
```

### Preferred selectors (most to least stable)

```typescript
// Best — ARIA roles with accessible names
page.getByRole('button', { name: /login/i });
page.getByRole('tab', { name: /CONTEXTO DA REUNIÃO/i });
page.getByRole('heading', { name: 'Digital Sales', level: 1 });

// Good — visible text, scoped to a table to avoid hidden chart-label duplicates
page.getByRole('table').getByText('Digital Sales');

// Acceptable — DataTable's "details" button uses an aria-label with the row id
page.getByRole('button', { name: `Ver detalhes de ${rowId}` });

// Avoid — CSS classes from MUI (can change between MUI versions)
page.locator('.MuiButton-root'); // fragile
```

The one existing exception is `.MuiDrawer-paper button` for the logout icon button
and `.MuiDrawer-paper` for scoping sidebar navigation. If the logout button ever
gets an `aria-label`, prefer that instead.

> **Note on strict-mode violations:** company/manager/salesman names rendered in a
> DataTable can also be present (hidden) as leftover SVG `<text>` elements from MUI
> X Charts label measurement on the dashboard. Scope `getByText()` to
> `page.getByRole('table')` for row-data assertions to avoid matching both.

---

## 5. Running tests

### Run the suite (requires the backend already running)

```bash
pnpm test:e2e
```

This runs `playwright test --project=backend --headed`. Make sure
`docker compose up --build` is running in `../backend` first, and that the
frontend dev server is reachable (Playwright will start it via `webServer` if needed).

### Let Playwright start everything for you

```bash
pnpm test:e2e:full
```

This uses `playwright.full.config.ts`, which spins up both the frontend dev server and
the backend (`db` + `api` via Docker Compose with `--build`) before running the test.
Both are stopped automatically when the run finishes.
`reuseExistingServer` is enabled in non-CI mode, so if they are already running they
will be reused instead of rebuilt.

### Run a single test by name

```bash
pnpm exec playwright test -g "admin can browse all platform areas"
```

### Headed vs headless

```bash
pnpm exec playwright test --project=backend
```

Drop `--headed` to run without opening a browser window. Add `--slowmo=500` to
slow each step down by 500ms when watching headed runs.

### Open the HTML report

```bash
pnpm test:e2e:report
```

The report is generated automatically after every run at `playwright-report/`.

---

## 6. Understanding the test output

```
Running 1 test using 1 worker

  ✓  admin-flow.spec.ts:13 › Admin functionality — real backend @backend › admin can browse all platform areas with real data @backend (3.5s)

  1 passed (4.9s)
```

A `✗` failure includes:

- **Error message** — what assertion failed, including which `test.step()` it was in.
- **Trace file** — a recorded timeline of every action (captured on retry, or
  always in CI). Open traces with:
  ```bash
  pnpm exec playwright show-trace path/to/trace.zip
  ```
- **Screenshot** — automatically captured on failure.

---

## 7. How to write a new test

### Extending the admin flow

The most common case is adding a new step to the existing journey. Add a
`test.step()` block at the appropriate point in `admin-flow.spec.ts`. If the step
relies on specific data, find or add a fixture row in
`../backend/bootstrap/src/main/resources/db/migration/V4__seed_data.sql` and
reference its id/name as a `const` near the top of the spec, following the existing
pattern (`DIGITAL_SALES_ID`, `GABRIEL_MANAGER_ID`, etc.).

```typescript
await test.step('New feature interaction', async () => {
  await page.locator('.MuiDrawer-paper').getByText('Nova Página').click();
  await page.waitForURL(/\/nova-pagina/);
  await expect(
    page.getByRole('table').getByText('Conteúdo esperado')
  ).toBeVisible();
});
```

### Adding a new spec file

All specs in `tests/e2e` are tagged `@backend` and run against the real API, so a
new spec just needs to log in through the real form and tag the test name:

```typescript
import { expect, test } from '@playwright/test';

test.describe('My feature — real backend @backend', () => {
  test('does the thing I expect @backend', async ({ page }) => {
    await page.goto('/login');
    await page.locator('input[name="email"]').fill('ana@digitalsales.com');
    await page.locator('input[name="password"]').fill('password');
    await page.getByRole('button', { name: /login/i }).click();
    await page.waitForURL('**/painel');

    await page.locator('.MuiDrawer-paper').getByText('Empresas').click();
    await expect(page.getByText('Empresas ativas')).toBeVisible();
  });
});
```

---

## 8. Debugging failing tests

### Step 1 — Run in headed mode

Watch the browser as the test executes:

```bash
pnpm exec playwright test --project=backend --headed --slowmo=500
```

### Step 2 — Inspect the trace

If a test failed in CI or during a retry, a `.zip` trace file is saved:

```bash
pnpm exec playwright show-trace test-results/<test-name>/trace.zip
```

The trace shows every action, DOM snapshot before and after, and console logs.

### Step 3 — Add a `page.pause()`

```typescript
test('debug this @backend', async ({ page }) => {
  await page.goto('/login');
  await page.pause(); // opens the Playwright inspector
});
```

Run with `--headed` for this to work. Remove `page.pause()` before committing.

### Common failure patterns

| Symptom                                       | Likely cause                                                           | Fix                                                                                                  |
| --------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `waitForURL` timeout                          | Backend not running or seed data missing                               | Confirm `docker compose up --build` in `../backend` is healthy and the migration ran                 |
| `strict mode violation` on `getByText`        | Hidden duplicate (e.g. chart label SVG `<text>`) matches the same name | Scope the locator to `page.getByRole('table')` or another container                                  |
| Redirect to `/login` when expecting `/painel` | Login credentials don't match a seeded user, or backend is unreachable | Check `V4__seed_data.sql` for valid email/password and that `VITE_API_URL` points at the running API |
| Flaky tab assertion                           | Backend response slower than expected                                  | Use `await expect(tab).toHaveAttribute('aria-selected', 'true')`, which auto-retries                 |

---

## 9. CI setup (GitHub Actions)

Because every test requires the real backend, a CI job needs to start the Docker
stack before running Playwright:

```yaml
name: E2E Tests

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v3
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Start backend
        run: docker compose -f ../backend/docker-compose.yml up --build -d db api

      - name: Run E2E tests
        run: pnpm test:e2e:full

      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

---

## 10. Troubleshooting

### `pnpm test:e2e` exits immediately with no tests found

The config expects tests in `./tests/e2e`. Make sure you run the command from
the `frontend/` directory, not from the repo root.

### The dev server doesn't start before tests

Playwright's `webServer` config starts `pnpm dev` and waits for `localhost:5173`
to respond. If it times out, start the server manually in a separate terminal
and re-run — Playwright will reuse the existing server because `reuseExistingServer`
is `true` in non-CI mode.

### Chromium not found

```bash
pnpm exec playwright install chromium
```

### `waitForURL('**/painel')` times out after login

The backend is either not running or not reachable at `VITE_API_URL`. Check:

```bash
docker compose -f ../backend/docker-compose.yml ps
curl http://localhost:8080/api/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"ana@digitalsales.com","password":"password"}'
```

### Tests pass locally but fail in CI with `ECONNREFUSED`

The `webServer` config is set to `reuseExistingServer: !process.env.CI`. In CI
(`process.env.CI=true`), Playwright always starts a fresh server. If port 5173
is already in use from a previous workflow step, the server fails to bind. Make
sure no other step starts the dev server before the test job.
