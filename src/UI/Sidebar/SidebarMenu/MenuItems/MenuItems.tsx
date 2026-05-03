import { EPageRoutes } from '@data/enums/EPageRoutes';
import type { UserRole } from '@store/authStore';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

export interface IMenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
}

export const getMenuItems = (userRole: UserRole): IMenuItem[] => {
  switch (userRole) {
    case 'admin':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.DASHBOARD,
          icon: GetAppIcon('dashboard'),
        },
        {
          label: 'Empresas',
          path: EPageRoutes.COMPANIES,
          icon: GetAppIcon('company'),
        },
        {
          label: 'Gestores',
          path: EPageRoutes.MANAGERS,
          icon: GetAppIcon('manager'),
        },
        {
          label: 'Vendedores',
          path: EPageRoutes.SALESMEN,
          icon: GetAppIcon('salesman'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.MEETINGS,
          icon: GetAppIcon('meeting'),
        },
      ];

    case 'manager':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.DASHBOARD,
          icon: GetAppIcon('dashboard'),
        },
        {
          label: 'Vendedores',
          path: EPageRoutes.SALESMEN,
          icon: GetAppIcon('salesman'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.MEETINGS,
          icon: GetAppIcon('meeting'),
        },
      ];

    case 'salesmen':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.DASHBOARD,
          icon: GetAppIcon('dashboard'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.MEETINGS,
          icon: GetAppIcon('meeting'),
        },
      ];

    default:
      return [];
  }
};
