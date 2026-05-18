import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { AvgDurationLineChart } from './AvgDurationLineChart';
import { formatDuration, formatMonthLabel } from './AvgDurationLineChart.utils';

const mockUseDashboardAvgDuration = vi.fn();

vi.mock('@store/hooks/useDashboardAvgDuration', () => ({
  useDashboardAvgDuration: () => mockUseDashboardAvgDuration(),
}));

describe('AvgDurationLineChart', () => {
  it('formats month labels to full month names in portuguese', () => {
    expect(formatMonthLabel('Jan')).toBe('Janeiro');
    expect(formatMonthLabel('Mai')).toBe('Maio');
    expect(formatMonthLabel('Jun')).toBe('Junho');
    expect(formatMonthLabel('Xyz')).toBe('Xyz');
  });

  it('formats durations with singular/plural and hour conversion', () => {
    expect(formatDuration(1)).toBe('1 minuto');
    expect(formatDuration(2)).toBe('2 minutos');
    expect(formatDuration(60)).toBe('1 hora');
    expect(formatDuration(61)).toBe('1 hora e 1 minuto');
    expect(formatDuration(120)).toBe('2 horas');
    expect(formatDuration(158)).toBe('2 horas e 38 minutos');
    expect(formatDuration(38.4)).toBe('38 minutos');
    expect(formatDuration(38.6)).toBe('39 minutos');
  });

  it('renders loading state', () => {
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    render(<AvgDurationLineChart />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders empty state when there is no data', () => {
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    });

    render(<AvgDurationLineChart />);

    expect(
      screen.getByText('Sem dados de duração média no momento')
    ).toBeInTheDocument();
  });

  it('renders error state when request fails', () => {
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<AvgDurationLineChart />);

    expect(
      screen.getByText('Não foi possível carregar o gráfico')
    ).toBeInTheDocument();
  });

  it('renders chart with API data', () => {
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [
        { month: '2024-05-01T00:00:00Z', monthLabel: 'Mai', avgMinutes: 42.5 },
        { month: '2024-06-01T00:00:00Z', monthLabel: 'Jun', avgMinutes: 38.2 },
      ],
      isLoading: false,
      isError: false,
    });

    render(<AvgDurationLineChart />);

    expect(screen.getByText('Duração média das reuniões')).toBeInTheDocument();
    expect(
      document.querySelector('[data-series-id="avg-duration"]')
    ).toBeTruthy();
  });
});
