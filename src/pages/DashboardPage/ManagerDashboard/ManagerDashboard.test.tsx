import { ECardLabel } from '@data/enums/ECardLabel';
import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen, within } from '@tests/testUtils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@pages/DashboardPage/context/DashboardFilterContext', () => ({
  useDashboardFilterContext: () => ({
    filters: {
      period: 'custom',
      startDate: '2026-01-01',
      endDate: new Date().toISOString().split('T')[0],
    },
  }),
}));

vi.mock('@services/queries/useDashboard', () => ({
  useGetDashboardMetrics: vi.fn(),
  useGetMeetingsBySalesman: vi.fn(),
  useGetMeetingsByMonth: vi.fn(),
  useGetSalesmenStatus: vi.fn(),
}));

vi.mock('@store/hooks/useDashboardAvgDuration', () => ({
  useDashboardAvgDuration: vi.fn(),
}));

import {
  useGetDashboardMetrics,
  useGetMeetingsByMonth,
  useGetMeetingsBySalesman,
  useGetSalesmenStatus,
} from '@services/queries/useDashboard';
import { useDashboardAvgDuration } from '@store/hooks/useDashboardAvgDuration';

import { ManagerDashboard } from './ManagerDashboard';

const mockUseGetDashboardMetrics = vi.mocked(useGetDashboardMetrics);
const mockUseGetMeetingsBySalesman = vi.mocked(useGetMeetingsBySalesman);
const mockUseGetMeetingsByMonth = vi.mocked(useGetMeetingsByMonth);
const mockUseGetSalesmenStatus = vi.mocked(useGetSalesmenStatus);
const mockUseDashboardAvgDuration = vi.mocked(useDashboardAvgDuration);

describe('ManagerDashboard', () => {
  beforeEach(() => {
    mockUseGetDashboardMetrics.mockReturnValue({
      data: {
        active_companies: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        inactive_companies: {
          value: 0,
          variationPercentage: 0,
          trend: 'neutral',
        },
        total_meetings: {
          value: 42,
          variationPercentage: -5,
          trend: 'down',
        },
      },
      isError: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetDashboardMetrics>);
    mockUseGetMeetingsBySalesman.mockReturnValue({
      data: [],
      isError: false,
      isLoading: false,
    } as unknown as ReturnType<typeof useGetMeetingsBySalesman>);
    mockUseGetMeetingsByMonth.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetMeetingsByMonth>);
    mockUseGetSalesmenStatus.mockReturnValue({
      data: { active: 8, inactive: 2 },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useGetSalesmenStatus>);
    mockUseDashboardAvgDuration.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useDashboardAvgDuration>);
  });

  it('renders manager dashboard title', () => {
    render(<ManagerDashboard />);
    expect(screen.getByText(EPageTitles.MANAGER_DASHBOARD)).toBeInTheDocument();
  });

  it('renders manager metric cards', () => {
    render(<ManagerDashboard />);

    expect(
      within(
        screen.getByTestId('manager-dashboard-metric-card-active-salesmen')
      ).getByText(ECardLabel.ACTIVE_SALESMAN)
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByTestId('manager-dashboard-metric-card-inactive-salesmen')
      ).getByText(ECardLabel.INACTIVE_SALESMAN)
    ).toBeInTheDocument();
    expect(
      within(
        screen.getByTestId('manager-dashboard-metric-card-total-meetings')
      ).getByText(ECardLabel.TOTAL_MEETINGS)
    ).toBeInTheDocument();
  });
});
