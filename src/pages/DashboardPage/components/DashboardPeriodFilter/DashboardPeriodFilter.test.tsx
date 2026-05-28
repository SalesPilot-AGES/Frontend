import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { DashboardPeriodFilter } from './DashboardPeriodFilter';

const { mockSetFilters, mockUseDashboardFilterContext } = vi.hoisted(() => ({
  mockSetFilters: vi.fn(),
  mockUseDashboardFilterContext: vi.fn(),
}));

vi.mock('../../context/DashboardFilterContext', () => ({
  useDashboardFilterContext: mockUseDashboardFilterContext,
}));

describe('DashboardPeriodFilter', () => {
  it('renders quick period options', () => {
    mockUseDashboardFilterContext.mockReturnValue({
      filters: { period: '30d' },
      setFilters: mockSetFilters,
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
      filters: { period: '30d' },
      setFilters: mockSetFilters,
    });

    render(<DashboardPeriodFilter />);

    fireEvent.click(screen.getByRole('button', { name: '7 dias' }));

    expect(mockSetFilters).toHaveBeenCalledWith({ period: '7d' });
  });

  it('applies custom period with start and end dates', () => {
    mockUseDashboardFilterContext.mockReturnValue({
      filters: { period: '30d' },
      setFilters: mockSetFilters,
    });

    render(<DashboardPeriodFilter />);

    fireEvent.click(screen.getByRole('button', { name: /Personalizar/i }));

    const dateInputs = document.querySelectorAll('input[type="date"]');
    expect(dateInputs).toHaveLength(2);

    fireEvent.change(dateInputs[0], { target: { value: '2026-05-01' } });
    fireEvent.change(dateInputs[1], { target: { value: '2026-05-20' } });

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar' }));

    expect(mockSetFilters).toHaveBeenCalledWith({
      period: 'custom',
      startDate: '2026-05-01',
      endDate: '2026-05-20',
    });
  });
});
