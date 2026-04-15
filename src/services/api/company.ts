import type {
  CompaniesResponse,
  CompanyDetail,
} from '@services/models/CompanySchema';
import {
  CompaniesResponseSchema,
  type CompanyCreateInput,
  CompanyDetailSchema,
  type CompanyFilters,
  type CompanyUpdateInput,
} from '@services/models/CompanySchema';

import apiClient from './apiClient';

export const companyApi = {
  // Get all companies with pagination and filtering
  getCompanies: async (
    page: number = 0,
    size: number = 10,
    filters?: CompanyFilters
  ): Promise<CompaniesResponse> => {
    const response = await apiClient.get<CompaniesResponse>('/api/companies', {
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
    return CompaniesResponseSchema.parse(response.data);
  },

  // Get single company by UUID
  getCompanyById: async (uuid: string): Promise<CompanyDetail> => {
    const response = await apiClient.get<CompanyDetail>(
      `/api/companies/${uuid}`
    );
    return CompanyDetailSchema.parse(response.data);
  },

  // Create company
  createCompany: async (
    company: CompanyCreateInput
  ): Promise<CompanyDetail> => {
    const response = await apiClient.post<CompanyDetail>(
      '/api/companies',
      company
    );
    return CompanyDetailSchema.parse(response.data);
  },

  // Update company
  updateCompany: async (
    uuid: string,
    company: CompanyUpdateInput
  ): Promise<CompanyDetail> => {
    const response = await apiClient.put<CompanyDetail>(
      `/api/companies/${uuid}`,
      company
    );
    return CompanyDetailSchema.parse(response.data);
  },
};
