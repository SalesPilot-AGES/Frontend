import { EPageRoutes } from '@data/enums/EPageRoutes';
import type { MenuItem } from '@declarations';
import type { UserRole } from '@store/authStore';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';

export const getMenuItems = (userRole: UserRole): MenuItem[] => {
  switch (userRole) {
    case 'admin':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.ADMIN_DASHBOARD,
          icon: GetAppIcon('dashboard'),
        },
        {
          label: 'Empresas',
          path: EPageRoutes.ADMIN_COMPANIES,
          icon: GetAppIcon('company'),
        },
        {
          label: 'Gestores',
          path: EPageRoutes.ADMIN_MANAGERS,
          icon: GetAppIcon('manager'),
        },
        {
          label: 'Vendedores',
          path: EPageRoutes.ADMIN_SALESMEN,
          icon: GetAppIcon('salesman'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.ADMIN_MEETINGS,
          icon: GetAppIcon('meeting'),
        },
      ];

    case 'manager':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.MANAGER_DASHBOARD,
          icon: GetAppIcon('dashboard'),
        },
        {
          label: 'Vendedores',
          path: EPageRoutes.MANAGER_SALESMEN,
          icon: GetAppIcon('salesman'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.MANAGER_MEETINGS,
          icon: GetAppIcon('meeting'),
        },
      ];

    case 'salesmen':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.SALESMAN_DASHBOARD,
          icon: GetAppIcon('dashboard'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.SALESMAN_MEETINGS,
          icon: GetAppIcon('meeting'),
        },
      ];

    default:
      return [];
  }
};
