export const EPageRoutes = {
  LOGIN: '/login',

  // Admin Routes
  ADMIN_DASHBOARD: '/admin',
  ADMIN_COMPANIES: '/admin/empresas',
  /** Detalhe de empresa; use com parâmetro `companyId` nas rotas. */
  ADMIN_COMPANY_DETAIL: '/admin/empresas/$companyId',
  ADMIN_MANAGERS: '/admin/gestores',
  ADMIN_MANAGERS_DETAILS: '/admin/gestores/$id',
  ADMIN_SALESMEN: '/admin/vendedores',
  ADMIN_MEETINGS: '/admin/reuniões',
  ADMIN_MEETING_DETAIL: '/admin/reuniões/$meetingId',

  // Manager Routes
  MANAGER_DASHBOARD: '/gestor',
  MANAGER_SALESMEN: '/gestor/vendedores',
  MANAGER_MEETINGS: '/gestor/reuniões',

  // Salesman Routes
  SALESMAN_DASHBOARD: '/vendedores',
  SALESMAN_MEETINGS: '/vendedores/reuniões',
} as const;
