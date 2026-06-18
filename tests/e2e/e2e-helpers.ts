import { expect, type Page } from '@playwright/test';

export const PASSWORD = 'password';

export const USERS = {
  admin: {
    email: 'ana@digitalsales.com',
    dashboardTitle: 'Painel do Administrador',
  },
  manager: {
    email: 'gabriel@digitalsales.com',
    dashboardTitle: 'Painel do Gerente',
  },
  salesman: {
    email: 'saulo@digitalsales.com',
    dashboardTitle: 'Painel do Vendedor',
  },
} as const;

export const SEED_IDS = {
  sauloSalesman: 'e5f6a7b8-c9d0-1234-5678-90abcdef1234',
  proposalMeeting: 'aaaaaaaa-1111-2222-3333-444444444444',
  discoveryMeeting: '99999999-8888-7777-6666-555555555555',
} as const;

export const login = async (page: Page, email: string): Promise<void> => {
  await page.goto('/login');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(PASSWORD);
  await page.getByRole('button', { name: /login/i }).click();
  await page.waitForURL('**/painel');
};

export const expectSidebarItems = async (
  page: Page,
  visibleItems: string[],
  hiddenItems: string[] = []
): Promise<void> => {
  const sidebar = page.locator('.MuiDrawer-paper');

  for (const item of visibleItems) {
    await expect(sidebar.getByText(item, { exact: true })).toBeVisible();
  }

  for (const item of hiddenItems) {
    await expect(sidebar.getByText(item, { exact: true })).toHaveCount(0);
  }
};

export const expectLogoutClearsAuthState = async (
  page: Page
): Promise<void> => {
  await page.locator('.MuiDrawer-paper button').click();
  await page.waitForURL('**/login');
  await expect(page).toHaveURL(/\/login/);

  const auth = await page.evaluate(() =>
    localStorage.getItem('salespilot-auth')
  );
  const parsed = auth ? JSON.parse(auth) : null;
  expect(parsed?.state?.isAuthenticated).toBeFalsy();
};

type TMeetingDetailAssertion = {
  id: string;
  title: string;
  seller: string;
  clientCompany: string;
  objective: string;
  insight: RegExp;
  actionItem: string;
};

export const PROPOSAL_MEETING_ASSERTION: TMeetingDetailAssertion = {
  id: SEED_IDS.proposalMeeting,
  title: 'Apresentação de proposta',
  seller: 'Marcos Pereira',
  clientCompany: 'BetaTech',
  objective: 'Apresentar solução customizada',
  insight: /Cliente rejeitou Concorrente Y/,
  actionItem: 'Ajustar cronograma de entrega para 45 dias',
};

export const DISCOVERY_MEETING_ASSERTION: TMeetingDetailAssertion = {
  id: SEED_IDS.discoveryMeeting,
  title: 'Reunião de descoberta',
  seller: 'Saulo Souza',
  clientCompany: 'Alfa Industrial',
  objective: 'Entender dores e objetivos',
  insight: /Cliente mencionou necessidade de integração/,
  actionItem: 'Enviar proposta revisada',
};

export const assertMeetingDetail = async (
  page: Page,
  meeting: TMeetingDetailAssertion
): Promise<void> => {
  await page.goto(`/reuni%C3%B5es/${meeting.id}`);
  await page.waitForURL(new RegExp(meeting.id));

  await expect(
    page.getByRole('heading', { name: meeting.title, level: 1 })
  ).toBeVisible();
  await expect(page.getByText(meeting.seller)).toBeVisible();
  await expect(page.getByText(meeting.clientCompany)).toBeVisible();

  await expect(
    page.getByRole('tab', { name: /CONTEXTO DA REUNIÃO/i })
  ).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByText(meeting.objective)).toBeVisible();

  await page.getByRole('tab', { name: /INSIGHTS NA REUNIÃO/i }).click();
  await expect(page).toHaveURL(/tab=insights/);
  await expect(page.getByText(meeting.insight)).toBeVisible();

  await page.getByRole('tab', { name: /PLANO DE AÇÃO/i }).click();
  await expect(page).toHaveURL(/tab=action-plan/);
  await expect(page.getByText(meeting.actionItem)).toBeVisible();
};
