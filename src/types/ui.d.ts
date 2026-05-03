import type { EDataTableColumnAlignment } from '@data/enums/EDataTableColumnAlignment';
import type { EDataTableColumnVariant } from '@data/enums/EDataTableColumnVariant';
import type { EPlan } from '@data/enums/EPlan';
import type { EStatus } from '@data/enums/EStatus';
import type { ChipProps } from '@mui/material';
import type { ReactNode } from 'react';

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
  | 'sentimentSad'
  | 'sentimentNeutral'
  | 'sentimentHappy';

export type TStatus = (typeof EStatus)[keyof typeof EStatus];
export type TPlan = (typeof EPlan)[keyof typeof EPlan];

export type DataTableIconColorTuple = readonly [
  r: number,
  g: number,
  b: number,
];

export type DataTableBadgeColor = ChipProps['color'];

export type DataTableAccessor<T> = keyof T | ((row: T) => ReactNode);

export interface DataTableFilterOption {
  value: string;
  label: string;
}

export interface DataTableColumn<T> {
  header: string;
  accessor: DataTableAccessor<T>;
  icon?: ReactNode;
  iconColor?: DataTableIconColorTuple;
  variant?: EDataTableColumnVariant;
  badgeColor?:
    | DataTableBadgeColor
    | ((value: ReactNode, row: T) => DataTableBadgeColor);
  width?: number | string;
  align?: EDataTableColumnAlignment;
  render?: (value: ReactNode, row: T) => ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string | number;
  onDetailsClick: (id: string | number) => void;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  sx?: SxProps<Theme>;
  toolbarTitle?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: DataTableFilterOption[];
  filterPlaceholder?: string;
  filterAriaLabel?: string;
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

export type BadgeLook = { backgroundColor: string; color: string };

export interface ISentimentConfig {
  level: TSentimentLevel;
  iconName: TIconName;
  theme: TColorThemeOptions;
}
