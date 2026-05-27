import { beforeEach, describe, expect, it, vi } from 'vitest';

import apiClient from './apiClient';
import { dashboardApi } from './dashboard';

vi.mock('./apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('dashboardApi', () => {
  const mockedGet = vi.mocked(apiClient.get);

  beforeEach(() => {
    mockedGet.mockReset();
  });

  it('sends quick period params when fetching meetings by month', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [
          {
            month: '2026-05-01',
            month_label: 'Mai',
            total: 42,
          },
        ],
      },
    });

    await dashboardApi.getMeetingsByMonth({ period: '7d' });

    expect(mockedGet).toHaveBeenCalledWith('/api/dashboard/meetings-by-month', {
      params: { period: '7d' },
    });
  });

  it('sends custom range params when fetching meetings by month', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [
          {
            month: '2026-05-01',
            month_label: 'Mai',
            total: 42,
          },
        ],
      },
    });

    await dashboardApi.getMeetingsByMonth({
      period: 'custom',
      startDate: '2026-05-01',
      endDate: '2026-05-20',
    });

    expect(mockedGet).toHaveBeenCalledWith('/api/dashboard/meetings-by-month', {
      params: {
        period: 'custom',
        start_date: '2026-05-01',
        end_date: '2026-05-20',
      },
    });
  });

  it('sends period params when fetching dashboard metrics', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: {
          active_companies: { value: 4, variation: 12, trend: 'up' },
          inactive_companies: { value: 1, variation: -25, trend: 'down' },
          salesmen: { value: 76, variation: 8, trend: 'up' },
          total_meetings: { value: 502, variation: 15, trend: 'up' },
        },
      },
    });

    await dashboardApi.getMetrics({ period: '30d' });

    expect(mockedGet).toHaveBeenCalledWith('/api/painel/metricas', {
      params: {
        period: '30d',
      },
    });
  });

  it('sends custom range params when fetching avg duration', async () => {
    mockedGet.mockResolvedValue({
      data: {
        data: [
          {
            month: '2026-05-01',
            month_label: 'Mai',
            avg_minutes: 42,
          },
        ],
      },
    });

    await dashboardApi.getAvgDuration({
      period: 'custom',
      startDate: '2026-05-01',
      endDate: '2026-05-20',
    });

    expect(mockedGet).toHaveBeenCalledWith('/api/dashboard/avg-duration', {
      params: {
        period: 'custom',
        start_date: '2026-05-01',
        end_date: '2026-05-20',
      },
    });
  });
});
