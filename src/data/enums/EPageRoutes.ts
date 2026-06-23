export const EPageRoutes = {
  LOGIN: '/login',
  DASHBOARD: '/painel',
  COMPANIES: '/empresas',
  COMPANY_DETAIL: '/empresas/$companyId',
  MANAGERS: '/gestores',
  MANAGER_DETAIL: '/gestores/$id',
  SALESMEN: '/vendedores',
  SALESMAN_DETAIL: '/vendedores/$id',
  MEETINGS: '/reunioes',

  SALESMAN_MEETINGS_DETAIL: '/reunioes/$meetingId',
} as const;
