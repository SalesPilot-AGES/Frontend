import { expect, test } from '@playwright/test';

import {
  assertMeetingDetail,
  expectLogoutClearsAuthState,
  expectSidebarItems,
  login,
  PROPOSAL_MEETING_ASSERTION,
  SEED_IDS,
  USERS,
} from './e2e-helpers';

test.describe('Manager functionality — real backend @backend', () => {
  test('manager can browse allowed platform areas with real data @backend', async ({
    page,
  }) => {
    await test.step('Login as manager via real API', async () => {
      await login(page, USERS.manager.email);
    });

    await test.step('Dashboard renders for manager with restricted sidebar', async () => {
      await expect(page.getByText(USERS.manager.dashboardTitle)).toBeVisible();
      await expectSidebarItems(
        page,
        ['Painel', 'Vendedores', 'Reuniões'],
        ['Empresas', 'Gestores']
      );
    });

    await test.step('Admin-only routes redirect manager to dashboard', async () => {
      await page.goto('/empresas');
      await page.waitForURL('**/painel');
      await expect(page.getByText(USERS.manager.dashboardTitle)).toBeVisible();

      await page.goto('/gestores');
      await page.waitForURL('**/painel');
      await expect(page.getByText(USERS.manager.dashboardTitle)).toBeVisible();
    });

    await test.step('Salesmen area is available to manager', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Vendedores').click();
      await page.waitForURL(/\/vendedores/);

      await expect(
        page.getByRole('heading', { name: 'Vendedores', level: 1 })
      ).toBeVisible();
      await expect(
        page.getByRole('button', { name: /adicionar vendedor/i })
      ).toBeVisible();
    });

    await test.step('Salesman detail shows seeded seller data to manager', async () => {
      await page.goto(`/vendedores/${SEED_IDS.sauloSalesman}`);
      await page.waitForURL(new RegExp(`/vendedores/${SEED_IDS.sauloSalesman}`));

      await expect(
        page.getByRole('heading', { name: 'Saulo Souza', level: 1 })
      ).toBeVisible();
      await expect(page.getByText('saulo@digitalsales.com')).toBeVisible();
      await expect(page.getByText('Digital Sales')).toBeVisible();
      await expect(page.getByText('Voltar para vendedores')).toBeVisible();
    });

    await test.step('Meetings area and detail are available to manager', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Reuniões').click();
      await page.waitForURL(/reuni/);
      await expect(
        page.getByRole('heading', { name: 'Reuniões', level: 1 })
      ).toBeVisible();

      await assertMeetingDetail(page, PROPOSAL_MEETING_ASSERTION);
    });

    await test.step('Logout clears auth state', async () => {
      await expectLogoutClearsAuthState(page);
    });
  });
});
