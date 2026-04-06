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
  | 'logout';

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

export interface ILayoutProps {
  children?: ReactNode;
}

export interface MenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}
