import { expect, test } from '@playwright/test';

import {
  assertMeetingDetail,
  DISCOVERY_MEETING_ASSERTION,
  expectLogoutClearsAuthState,
  expectSidebarItems,
  login,
  USERS,
} from './e2e-helpers';

test.describe('Salesman functionality — real backend @backend', () => {
  test('salesman can browse allowed platform areas with real data @backend', async ({
    page,
  }) => {
    await test.step('Login as salesman via real API', async () => {
      await login(page, USERS.salesman.email);
    });

    await test.step('Dashboard renders for salesman with restricted sidebar', async () => {
      await expect(page.getByText(USERS.salesman.dashboardTitle)).toBeVisible();
      await expectSidebarItems(
        page,
        ['Painel', 'Reuniões'],
        ['Empresas', 'Gestores', 'Vendedores']
      );
    });

    await test.step('Admin and manager routes redirect salesman to dashboard', async () => {
      for (const restrictedRoute of ['/empresas', '/gestores', '/vendedores']) {
        await page.goto(restrictedRoute);
        await page.waitForURL('**/painel');
        await expect(page.getByText(USERS.salesman.dashboardTitle)).toBeVisible();
      }
    });

    await test.step('Meetings area is available to salesman', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Reuniões').click();
      await page.waitForURL(/reuni/);
      await expect(
        page.getByRole('heading', { name: 'Reuniões', level: 1 })
      ).toBeVisible();
    });

    await test.step('Own meeting detail tabs render real seeded data', async () => {
      await assertMeetingDetail(page, DISCOVERY_MEETING_ASSERTION);
    });

    await test.step('Logout clears auth state', async () => {
      await expectLogoutClearsAuthState(page);
    });
  });
});
