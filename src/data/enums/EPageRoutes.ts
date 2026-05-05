export const EPageRoutes = {
  LOGIN: '/login',
  DASHBOARD: '/painel',
  COMPANIES: '/empresas',
  COMPANY_DETAIL: '/empresas/$companyId',
  MANAGERS: '/gestores',
  MANAGER_DETAIL: '/gestores/$id',
  SALESMEN: '/vendedores',
  MEETINGS: '/reuniões',

  SALESMAN_MEETINGS_DETAIL: '/vendedores/reuniões/$meetingId',
} as const;
