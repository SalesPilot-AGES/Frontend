import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { MeetingsByMonthChart } from './MeetingsByMonthChart';

const { mockUseGetMeetingsByMonth } = vi.hoisted(() => ({
  mockUseGetMeetingsByMonth: vi.fn(),
}));

vi.mock('@services/queries/useDashboard', () => ({
  useGetMeetingsByMonth: mockUseGetMeetingsByMonth,
}));

vi.mock('../../context/DashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    filters: {
      period: '30d',
    },
  }),
}));

vi.mock('@mui/x-charts/BarChart', () => ({
  BarChart: () => <div data-testid="meetings-by-month-bar-chart" />,
}));

describe('MeetingsByMonthChart', () => {
  it('renders chart when data exists', () => {
    mockUseGetMeetingsByMonth.mockReturnValue({
      data: [
        { month: '2026-01-01', monthLabel: 'Jan', total: 10 },
        { month: '2026-02-01', monthLabel: 'Fev', total: 12 },
      ],
      isLoading: false,
    });

    render(<MeetingsByMonthChart />);

    expect(screen.getByText('Total de reuniões')).toBeInTheDocument();
    expect(
      screen.getByTestId('meetings-by-month-bar-chart')
    ).toBeInTheDocument();
  });

  it('renders empty state when API returns an empty array', () => {
    mockUseGetMeetingsByMonth.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<MeetingsByMonthChart />);

    expect(screen.getByText('Nenhuma reunião encontrada')).toBeInTheDocument();
    expect(
      screen.getByText('Não há dados de reuniões para o período selecionado.')
    ).toBeInTheDocument();
  });
});
