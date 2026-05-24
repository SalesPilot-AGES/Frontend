import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@pages/DashboardPage/context/DashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    filters: {
      period: '30d',
    },
  }),
}));

import { ManagerDashboard } from './ManagerDashboard';

describe('ManagerDashboard', () => {
  it('renders manager dashboard title', () => {
    render(<ManagerDashboard />);
    expect(screen.getByText(EPageTitles.MANAGER_DASHBOARD)).toBeInTheDocument();
  });
});
