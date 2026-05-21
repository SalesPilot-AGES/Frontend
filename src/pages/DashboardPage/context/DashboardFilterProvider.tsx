import {
  DashboardFilterContext,
  defaultDashboardFilters,
  type TDashboardFilterParams,
} from '@pages/DashboardPage/context/DashboardFilterContext';
import type { JSX, PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';

type TDashboardFilterProviderProps = PropsWithChildren<{
  initialFilters?: TDashboardFilterParams;
}>;

export const DashboardFilterProvider = ({
  children,
  initialFilters = defaultDashboardFilters,
}: TDashboardFilterProviderProps): JSX.Element => {
  const [filters, setFilters] =
    useState<TDashboardFilterParams>(initialFilters);

  const value = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters]
  );

  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
};
