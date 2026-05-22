import type { TDashboardPeriodParams } from '@services/models/DashboardSchema';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type TDashboardFilterContextValue = {
  period: TDashboardPeriodParams;
  setPeriod: Dispatch<SetStateAction<TDashboardPeriodParams>>;
};

const buildDefaultPeriod = (): TDashboardPeriodParams => {
  return {
    period: '90d',
  };
};

const fallbackContextValue: TDashboardFilterContextValue = {
  period: buildDefaultPeriod(),
  setPeriod: () => undefined,
};

export const DashboardFilterContext =
  createContext<TDashboardFilterContextValue>(fallbackContextValue);

export const createDefaultDashboardPeriod = buildDefaultPeriod;
