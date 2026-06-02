import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { CompaniesStatusChart } from './CompaniesStatusChart';

const { mockUseGetCompaniesStatus } = vi.hoisted(() => ({
  mockUseGetCompaniesStatus: vi.fn(),
}));

vi.mock('@services/queries/useDashboard', () => ({
  useGetCompaniesStatus: mockUseGetCompaniesStatus,
}));

vi.mock('@mui/x-charts/PieChart', () => ({
  PieChart: () => <div data-testid="companies-status-pie-chart" />,
}));

describe('CompaniesStatusChart', () => {
  it('renders chart when data exists', () => {
    mockUseGetCompaniesStatus.mockReturnValue({
      data: { active: 4, inactive: 1 },
      isLoading: false,
    });

    render(<CompaniesStatusChart />);

    expect(screen.getByText('Empresas ativas')).toBeInTheDocument();
    expect(
      screen.getByTestId('companies-status-pie-chart')
    ).toBeInTheDocument();
  });

  it('renders empty state when data has no companies', () => {
    mockUseGetCompaniesStatus.mockReturnValue({
      data: { active: 0, inactive: 0 },
      isLoading: false,
    });

    render(<CompaniesStatusChart />);

    expect(screen.getByText('Nenhuma empresa encontrada')).toBeInTheDocument();
    expect(
      screen.getByText('Não há dados de empresas para exibir.')
    ).toBeInTheDocument();
  });
});
