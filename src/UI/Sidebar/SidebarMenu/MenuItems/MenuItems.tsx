import { EPageRoutes } from '@data/enums/EPageRoutes';
import type { MenuItem } from '@declarations';
import type { UserRole } from '@store/authStore';
import { getAppIcon } from '@UI/AppIcon/AppIcon';

export const getMenuItems = (userRole: UserRole): MenuItem[] => {
  switch (userRole) {
    case 'admin':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.ADMIN_DASHBOARD,
          icon: getAppIcon('dashboard'),
        },
        {
          label: 'Empresas',
          path: EPageRoutes.ADMIN_COMPANIES,
          icon: getAppIcon('company'),
        },
        {
          label: 'Gerentes',
          path: EPageRoutes.ADMIN_MANAGERS,
          icon: getAppIcon('manager'),
        },
        {
          label: 'Vendedores',
          path: EPageRoutes.ADMIN_SALESMEN,
          icon: getAppIcon('salesman'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.ADMIN_MEETINGS,
          icon: getAppIcon('meeting'),
        },
      ];

    case 'manager':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.MANAGER_DASHBOARD,
          icon: getAppIcon('dashboard'),
        },
        {
          label: 'Vendedores',
          path: EPageRoutes.MANAGER_SALESMEN,
          icon: getAppIcon('salesman'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.MANAGER_MEETINGS,
          icon: getAppIcon('meeting'),
        },
      ];

    case 'salesmen':
      return [
        {
          label: 'Painel',
          path: EPageRoutes.SALESMAN_DASHBOARD,
          icon: getAppIcon('dashboard'),
        },
        {
          label: 'Reuniões',
          path: EPageRoutes.SALESMAN_MEETINGS,
          icon: getAppIcon('meeting'),
        },
      ];

    default:
      return [];
  }
};
