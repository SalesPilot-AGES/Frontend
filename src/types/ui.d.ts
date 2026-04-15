import type { ECardLabel } from '@data/enums/ECardLabel';
import type { SxProps } from '@mui/material';
import type { JSX, ReactNode } from 'react';

import type { TColorThemeOptions } from './hooks';

export type TIconName =
  | 'logo'
  | 'dashboard'
  | 'company'
  | 'manager'
  | 'salesman'
  | 'meeting'
  | 'login'
  | 'logout'
  | 'close'
  | 'save';

export interface IHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface IPageHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface IPageContainerProps {
  children: React.ReactNode;
}

export interface IIconBoxProps {
  iconName: TIconName;
  theme?: TColorThemeOptions;
  sx?: SxProps;
}

export interface IStatCardProps {
  iconName: TIconName;
  theme?: TColorThemeOptions;
  value: number | string;
  label: ECardLabel;
  sx?: SxProps;
}

export interface ILayoutProps {
  children?: ReactNode;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

export type TStatus = (typeof EStatus)[keyof typeof EStatus];
export type TPlan = (typeof EPlan)[keyof typeof EPlan];

export interface IStatusBadgeProps {
  active: boolean;
  sx?: SxProps;
}

export interface IPlanBadgeProps {
  plan: TPlan;
  sx?: SxProps;
}

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
}

export type BadgeLook = { backgroundColor: string; color: string };
export interface IBasicModalProps {
  modalName: string;
  handleClose?: () => void;
  open: boolean;
  children: JSX.Element;
}

export interface IEntityDetailsCardProps {
  title: string;
  children: React.ReactNode;
  onEdit?: () => void;
}

export interface IItemDetailProps {
  label: string;
  value?: string;
  icon?: JSX.Element;
  children?: ReactNode;
  sx?: SxProps;
}
