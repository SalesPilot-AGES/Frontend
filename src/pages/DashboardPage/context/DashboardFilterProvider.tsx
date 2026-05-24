import {
  DashboardFilterContext,
  defaultDashboardFilters,
} from '@pages/DashboardPage/context/DashboardFilterContext';
import type { TDashboardFilters } from '@services/models/DashboardSchema';
import type { JSX, PropsWithChildren } from 'react';
import { useMemo, useState } from 'react';

type TDashboardFilterProviderProps = PropsWithChildren<{
  initialFilters?: TDashboardFilters;
}>;

export const DashboardFilterProvider = ({
  children,
  initialFilters = defaultDashboardFilters,
}: TDashboardFilterProviderProps): JSX.Element => {
  const [filters, setFilters] = useState<TDashboardFilters>(initialFilters);

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
