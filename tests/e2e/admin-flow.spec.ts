import { expect, test } from '@playwright/test';

// ─── Seeded by ../backend V4__seed_data.sql ───────────────────────────────────
const ADMIN_EMAIL = 'ana@digitalsales.com';
const ADMIN_PASSWORD = 'password';

const DIGITAL_SALES_ID = 'b1c2d3e4-f5a6-7890-2345-67890abcdef1';
const GABRIEL_MANAGER_ID = 'c3d4e5f6-a7b8-9012-3456-7890abcdef12';
const SAULO_SALESMAN_ID = 'e5f6a7b8-c9d0-1234-5678-90abcdef1234';
const PROPOSAL_MEETING_ID = 'aaaaaaaa-1111-2222-3333-444444444444';

test.describe('Admin functionality — real backend @backend', () => {
  test('admin can browse all platform areas with real data @backend', async ({
    page,
  }) => {
    await test.step('Login as admin via real API', async () => {
      await page.goto('/login');
      await page.locator('input[name="email"]').fill(ADMIN_EMAIL);
      await page.locator('input[name="password"]').fill(ADMIN_PASSWORD);
      await page.getByRole('button', { name: /login/i }).click();
      await page.waitForURL('**/painel');
    });

    await test.step('Dashboard renders for admin', async () => {
      await expect(page.getByText('Painel do Administrador')).toBeVisible();
      const sidebar = page.locator('.MuiDrawer-paper');
      await expect(sidebar.getByText('Painel')).toBeVisible();
      await expect(sidebar.getByText('Empresas')).toBeVisible();
      await expect(sidebar.getByText('Gestores')).toBeVisible();
      await expect(sidebar.getByText('Vendedores')).toBeVisible();
      await expect(sidebar.getByText('Reuniões')).toBeVisible();
    });

    await test.step('Companies list shows seeded companies', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Empresas').click();
      await page.waitForURL(/\/empresas/);

      // Scoped to the table — company names are also rendered (hidden) by
      // chart label measurement left over from other pages.
      const companiesTable = page.getByRole('table');
      await expect(companiesTable.getByText('Digital Sales')).toBeVisible();
      await expect(companiesTable.getByText('InovaCorp')).toBeVisible();
      await expect(
        companiesTable.getByText('Tech Solutions Ltda')
      ).toBeVisible();
      await expect(page.getByText('Empresas ativas')).toBeVisible();
      await expect(page.getByText('Empresas inativas')).toBeVisible();
    });

    await test.step('Company detail shows real data for Digital Sales', async () => {
      await page
        .getByRole('button', { name: `Ver detalhes de ${DIGITAL_SALES_ID}` })
        .click();
      await page.waitForURL(new RegExp(`/empresas/${DIGITAL_SALES_ID}`));

      await expect(
        page.getByRole('heading', { name: 'Digital Sales', level: 1 })
      ).toBeVisible();
      await expect(page.getByText('12.345.678/0001-90')).toBeVisible();

      await page.goBack();
      await page.waitForURL(/\/empresas$/);
    });

    await test.step('Managers list and detail show real data', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Gestores').click();
      await page.waitForURL(/\/gestores/);

      const managersTable = page.getByRole('table');
      await expect(managersTable.getByText('Gabriel Ribeiro')).toBeVisible();
      await expect(
        managersTable.getByText('gabriel@digitalsales.com')
      ).toBeVisible();
      await expect(page.getByText('Gestores ativos')).toBeVisible();
      await expect(page.getByText('Gestores inativos')).toBeVisible();

      await page
        .getByRole('button', { name: `Ver detalhes de ${GABRIEL_MANAGER_ID}` })
        .click();
      await page.waitForURL(new RegExp(`/gestores/${GABRIEL_MANAGER_ID}`));
      await expect(
        page.getByRole('heading', { name: 'Gabriel Ribeiro', level: 1 })
      ).toBeVisible();
      await expect(page.getByText('Voltar para gestores')).toBeVisible();

      await page.getByText('Voltar para gestores').click();
      await page.waitForURL(/\/gestores$/);
    });

    await test.step('Salesmen list and detail show real data', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Vendedores').click();
      await page.waitForURL(/\/vendedores/);

      const salesmenTable = page.getByRole('table');
      await expect(salesmenTable.getByText('Saulo Souza')).toBeVisible();
      await expect(salesmenTable.getByText('Marcos Pereira')).toBeVisible();
      await expect(salesmenTable.getByText('Julia Fernandes')).toBeVisible();
      // Laura Silva is seeded as inactive — should still be listed
      await expect(salesmenTable.getByText('Laura Silva')).toBeVisible();
      await expect(page.getByText('Vendedores ativos')).toBeVisible();
      await expect(page.getByText('Vendedores inativos')).toBeVisible();

      await page
        .getByRole('button', { name: `Ver detalhes de ${SAULO_SALESMAN_ID}` })
        .click();
      await page.waitForURL(new RegExp(`/vendedores/${SAULO_SALESMAN_ID}`));
      await expect(
        page.getByRole('heading', { name: 'Saulo Souza', level: 1 })
      ).toBeVisible();
      await expect(page.getByText('Voltar para vendedores')).toBeVisible();

      await page.getByText('Voltar para vendedores').click();
      await page.waitForURL(/\/vendedores$/);
    });

    await test.step('Meetings list and detail tabs show real data', async () => {
      await page.locator('.MuiDrawer-paper').getByText('Reuniões').click();
      await page.waitForURL(/reuni/);

      const meetingsTable = page.getByRole('table');
      await expect(
        meetingsTable.getByText('Reunião de descoberta')
      ).toBeVisible();
      await expect(
        meetingsTable.getByText('Apresentação de proposta')
      ).toBeVisible();
      await expect(page.getByText('Total de reuniões')).toBeVisible();

      await page
        .getByRole('button', { name: `Ver detalhes de ${PROPOSAL_MEETING_ID}` })
        .click();
      await page.waitForURL(new RegExp(PROPOSAL_MEETING_ID));

      // Context tab — info filled in by the salesperson before the meeting
      await expect(
        page.getByRole('tab', { name: /CONTEXTO DA REUNIÃO/i })
      ).toHaveAttribute('aria-selected', 'true');
      await expect(
        page.getByText('Apresentar solução customizada')
      ).toBeVisible();

      // Insights tab — realtime insights generated during the meeting
      await page.getByRole('tab', { name: /INSIGHTS NA REUNIÃO/i }).click();
      await expect(page).toHaveURL(/tab=insights/);
      await expect(
        page.getByText(/Cliente rejeitou Concorrente Y/)
      ).toBeVisible();

      // Action plan tab — items from the post-meeting analysis
      await page.getByRole('tab', { name: /PLANO DE AÇÃO/i }).click();
      await expect(page).toHaveURL(/tab=action-plan/);
      await expect(
        page.getByText('Ajustar cronograma de entrega para 45 dias')
      ).toBeVisible();
    });

    await test.step('Logout clears auth state', async () => {
      await page.locator('.MuiDrawer-paper button').click();
      await page.waitForURL('**/login');
      await expect(page).toHaveURL(/\/login/);

      const auth = await page.evaluate(() =>
        localStorage.getItem('salespilot-auth')
      );
      const parsed = auth ? JSON.parse(auth) : null;
      expect(parsed?.state?.isAuthenticated).toBeFalsy();
    });
  });
});
