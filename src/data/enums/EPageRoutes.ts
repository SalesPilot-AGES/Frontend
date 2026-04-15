export const EPageRoutes = {
  LOGIN: '/login',

  // Admin Routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_COMPANIES: '/admin/empresas',
  /** Detalhe de empresa; use com parâmetro `companyId` nas rotas. */
  ADMIN_COMPANY_DETAIL: '/admin/empresas/$companyId',
  ADMIN_MANAGERS: '/admin/gerentes',
  ADMIN_SALESMEN: '/admin/vendedores',
  ADMIN_MEETINGS: '/admin/reuniões',

  // Manager Routes
  MANAGER_DASHBOARD: '/gerente',
  MANAGER_SALESMEN: '/gerente/vendedores',
  MANAGER_MEETINGS: '/gerente/reuniões',

  // Salesman Routes
  SALESMAN_DASHBOARD: '/vendedores',
  SALESMAN_MEETINGS: '/vendedores/reuniões',
} as const;
