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

import { SalesmanDashboard } from './SalesmanDashboard';

describe('SalesmanDashboard', () => {
  it('renders salesman dashboard title', () => {
    render(<SalesmanDashboard />);
    expect(
      screen.getByText(EPageTitles.SALESMAN_DASHBOARD)
    ).toBeInTheDocument();
  });
});
