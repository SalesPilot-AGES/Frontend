import { useContext } from 'react';

import {
  DashboardFilterContext,
  type TDashboardFilterContextValue,
} from './DashboardFilterContext';

export const useDashboardFilterContext = (): TDashboardFilterContextValue =>
  useContext(DashboardFilterContext);
