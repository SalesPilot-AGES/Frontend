import type { TDashboardFilters } from '@services/models/DashboardSchema';
import type { Dispatch, SetStateAction } from 'react';
import { createContext, useContext } from 'react';

export type TDashboardFilterContextValue = {
  filters: TDashboardFilters;
  setFilters: Dispatch<SetStateAction<TDashboardFilters>>;
};

export const defaultDashboardFilters: TDashboardFilters = {
  period: 'custom',
  startDate: '2026-01-01',
  endDate: new Date().toISOString().split('T')[0],
};

export const DashboardFilterContext = createContext<
  TDashboardFilterContextValue | undefined
>(undefined);

export const useDashboardFilterContext = (): TDashboardFilterContextValue => {
  const context = useContext(DashboardFilterContext);

  if (!context) {
    throw new Error(
      'useDashboardFilterContext must be used within DashboardFilterProvider'
    );
  }

  return context;
};
