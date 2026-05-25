import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { SalesmenStatusChart } from './SalesmenStatusChart';

const { mockUseGetSalesmenStatus } = vi.hoisted(() => ({
  mockUseGetSalesmenStatus: vi.fn(),
}));

vi.mock('@services/queries/useDashboard', () => ({
  useGetSalesmenStatus: mockUseGetSalesmenStatus,
}));

vi.mock('@mui/x-charts/PieChart', () => ({
  PieChart: () => <div data-testid="salesmen-status-pie-chart" />,
}));

describe('SalesmenStatusChart', () => {
  it('renders chart when data exists', () => {
    mockUseGetSalesmenStatus.mockReturnValue({
      data: { active: 6, inactive: 3 },
      isLoading: false,
    });

    render(<SalesmenStatusChart />);

    expect(screen.getByText('Vendedores ativos')).toBeInTheDocument();
    expect(screen.getByTestId('salesmen-status-pie-chart')).toBeInTheDocument();
  });

  it('renders empty state when data has no salesmen', () => {
    mockUseGetSalesmenStatus.mockReturnValue({
      data: { active: 0, inactive: 0 },
      isLoading: false,
    });

    render(<SalesmenStatusChart />);

    expect(screen.getByText('Nenhum vendedor encontrado')).toBeInTheDocument();
    expect(
      screen.getByText('Não há dados de vendedores para exibir.')
    ).toBeInTheDocument();
  });
});
