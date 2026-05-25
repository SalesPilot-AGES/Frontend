import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { DashboardPeriodFilter } from './DashboardPeriodFilter';

const { mockSetPeriod, mockUseDashboardFilterContext } = vi.hoisted(() => ({
  mockSetPeriod: vi.fn(),
  mockUseDashboardFilterContext: vi.fn(),
}));

vi.mock('../../useDashboardFilterContext', () => ({
  useDashboardFilterContext: mockUseDashboardFilterContext,
}));

describe('DashboardPeriodFilter', () => {
  it('renders quick period options', () => {
    mockUseDashboardFilterContext.mockReturnValue({
      period: { period: '30d' },
      setPeriod: mockSetPeriod,
    });

    render(<DashboardPeriodFilter />);

    expect(screen.getByRole('button', { name: 'Todas' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '7 dias' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '30 dias' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Personalizar/i })
    ).toBeInTheDocument();
  });

  it('updates period when quick option is clicked', () => {
    mockUseDashboardFilterContext.mockReturnValue({
      period: { period: '30d' },
      setPeriod: mockSetPeriod,
    });

    render(<DashboardPeriodFilter />);

    fireEvent.click(screen.getByRole('button', { name: '7 dias' }));

    expect(mockSetPeriod).toHaveBeenCalledWith({ period: '7d' });
  });

  it('applies custom period with start and end dates', () => {
    mockUseDashboardFilterContext.mockReturnValue({
      period: { period: '30d' },
      setPeriod: mockSetPeriod,
    });

    render(<DashboardPeriodFilter />);

    fireEvent.click(screen.getByRole('button', { name: /Personalizar/i }));

    const dateInputs = document.querySelectorAll('input[type="date"]');
    expect(dateInputs).toHaveLength(2);

    fireEvent.change(dateInputs[0], { target: { value: '2026-05-01' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-05-20' } });

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(mockSetPeriod).toHaveBeenCalledWith({
      period: 'custom',
      startDate: '2026-05-01',
      endDate: '2026-05-20',
    });
  });
});
