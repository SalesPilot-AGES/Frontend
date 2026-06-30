import type { EPlan } from '@data/enums/EPlan';
import type { EStatus } from '@data/enums/EStatus';
import type { ChipProps } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { ReactNode } from 'react';
// src/types/ui.d.ts
import type { ReactNode } from 'react';

export interface DataTableFilterOption {
  id?: string;
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: DataTableFilterOption[];
}

export type FilterType = 'simple' | 'advanced';

export interface DataTableColumn<T = Record<string, unknown>> {
  header: string;
  render?: (value: ReactNode, row: T) => ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  icon?: ReactNode;
  iconColor?: [number, number, number];
  variant?: 'text' | 'badge' | 'currency' | 'date';
  accessor: DataTableAccessor<T>;
  badgeColor?:
    | DataTableBadgeColor
    | ((value: ReactNode, row: T) => DataTableBadgeColor);
  badgeLook?: { backgroundColor: string; color: string };
  tooltip?: string;
  sortable?: boolean;
  sortAccessor?: keyof T | ((row: T) => ReactNode);
  filterable?: boolean;
  filterAccessor?: keyof T | ((row: T) => ReactNode);
  filterOptions?: DataTableFilterOption[];
  filterPlaceholder?: string;
  filterAriaLabel?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string | number;
  onDetailsClick?: (id: string | number) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  sx?: SxProps<Theme>;
  toolbarTitle?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  filterType?: FilterType;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: DataTableFilterOption[];
  filterPlaceholder?: string;
  filterAriaLabel?: string;
  filterGroups?: FilterGroup[];
  selectedFilters?: Record<string, string[]>;
  onFilterChangeAdvanced?: (groupId: string, selectedValues: string[]) => void;
  onClearFilters?: () => void;
  filterLabel?: string;
  filterPlaceholderAdvanced?: string;
  companyFilterValue?: string;
  onCompanyFilterChange?: (value: string) => void;
  companyFilterOptions?: DataTableFilterOption[];
  companyFilterPlaceholder?: string;
  companyFilterAriaLabel?: string;
  infiniteScroll?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export interface ColumnDef<T> {
  id: string;
  label: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}

export type TIconName =
  | 'logo'
  | 'clock'
  | 'dashboard'
  | 'company'
  | 'manager'
  | 'salesman'
  | 'meeting'
  | 'login'
  | 'logout'
  | 'close'
  | 'save'
  | 'duration'
  | 'sentimentSad'
  | 'sentimentNeutral'
  | 'sentimentHappy'
  | 'real_estate_agent';

export type TStatus = (typeof EStatus)[keyof typeof EStatus];
export type TPlan = (typeof EPlan)[keyof typeof EPlan];

export type DataTableIconColorTuple = readonly [
  r: number,
  g: number,
  b: number,
];

export type DataTableBadgeColor = ChipProps['color'];

export type DataTableAccessor<T> = keyof T | ((row: T) => ReactNode);

export type BadgeLook = { backgroundColor: string; color: string };

export interface ISentimentConfig {
  level: TSentimentLevel;
  iconName: TIconName;
  theme: TColorThemeOptions;
}
