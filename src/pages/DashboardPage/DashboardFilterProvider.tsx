import type { TDashboardPeriodParams } from '@services/models/DashboardSchema';
import { type JSX, type PropsWithChildren, useMemo, useState } from 'react';

import {
  createDefaultDashboardPeriod,
  DashboardFilterContext,
} from './DashboardFilterContext';

export const DashboardFilterProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [period, setPeriod] = useState<TDashboardPeriodParams>(
    createDefaultDashboardPeriod()
  );

  const value = useMemo(
    () => ({
      period,
      setPeriod,
    }),
    [period]
  );

  return (
    <DashboardFilterContext.Provider value={value}>
      {children}
    </DashboardFilterContext.Provider>
  );
};
