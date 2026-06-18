import type {
  TCompany,
  TCompanyCreatePayload,
  TCompanyFilters,
  TCompanyList,
  TCompanyUpdatePayload,
} from '@services/models/CompanySchema';
import {
  CompanyListSchema,
  CompanySchema,
} from '@services/models/CompanySchema';

import apiClient, { unwrapContent } from './apiClient';
import {
  type ApiMutationResponse,
  getResponseMessage,
} from './responseMessage';

export const companyApi = {
  getCompanies: async (
    page: number = 0,
    size: number = 10,
    filters?: TCompanyFilters
  ): Promise<TCompanyList> => {
    const response = await apiClient.get<TCompanyList>('/api/companies', {
      params: {
        page,
        size,
        ...(filters?.name && { name: filters.name }),
        ...(filters?.taxId && { taxId: filters.taxId }),
        ...(filters?.plan && { plan: filters.plan }),
        ...(filters?.active !== undefined && { active: filters.active }),
        ...(filters?.sort && { sort: filters.sort }),
      },
    });
    return CompanyListSchema.parse(unwrapContent(response.data));
  },

  getCompanyById: async (uuid: string): Promise<TCompany> => {
    const response = await apiClient.get(`/api/companies/${uuid}`);
    return CompanySchema.parse(unwrapContent(response.data));
  },

  createCompany: async (
    payload: TCompanyCreatePayload
  ): Promise<ApiMutationResponse<TCompany>> => {
    const response = await apiClient.post('/api/companies', {
      ...payload,
      tax_id: payload.tax_id.replace(/\D/g, ''),
    });
    return {
      content: CompanySchema.parse(unwrapContent(response.data)),
      message: getResponseMessage(response.data),
    };
  },

  updateCompany: async (
    uuid: string,
    payload: TCompanyUpdatePayload
  ): Promise<ApiMutationResponse<TCompany>> => {
    const response = await apiClient.put(`/api/companies/${uuid}`, payload);
    return {
      content: CompanySchema.parse(unwrapContent(response.data)),
      message: getResponseMessage(response.data),
    };
  },
};
