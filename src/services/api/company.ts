import type { TCompany, TCompanyList } from '@services/models/CompanySchema';
import {
  CompanyListSchema,
  CompanySchema,
  type TCompanyCreatePayload,
  type TCompanyFilters,
  type TCompanyUpdatePayload,
} from '@services/models/CompanySchema';

import apiClient from './apiClient';

type TCompanyApiPayload = {
  name: string;
  tax_id: string;
  plan: string;
  active: boolean;
};

type TCompanyApiResponse = {
  id: string;
  name: string;
  tax_id: string;
  plan: string;
  active: boolean;
  created_at?: string;
};

const toCompanyApiPayload = (
  payload: TCompanyCreatePayload
): TCompanyApiPayload => ({
  name: payload.name,
  tax_id: payload.tax_id.replace(/\D/g, ''),
  plan: payload.plan,
  active: payload.active,
});

const toCompanyUpdateApiPayload = (
  payload: TCompanyUpdatePayload
): Record<string, unknown> => ({
  ...(payload.name && { name: payload.name }),
  ...(payload.tax_id && { tax_id: payload.tax_id.replace(/\D/g, '') }),
  ...(payload.plan && { plan: payload.plan }),
  ...(payload.active !== undefined && { active: payload.active }),
});

const normalizeCompanyResponse = (data: TCompanyApiResponse): TCompany => {
  return {
    id: data.id,
    name: data.name,
    tax_id: data.tax_id,
    plan: data.plan as 'BASIC' | 'PRO' | 'ENTERPRISE',
    active: data.active,
    created_at: data.created_at,
  };
};

/**
 * @description API service for company-related operations.
 */
export const companyApi = {
  /**
   * @description Get all companies with pagination and filtering.
   * @param {number} page - The page number to fetch.
   * @param {number} size - The number of items per page.
   * @param {TCompanyFilters} filters - Filters to apply to the query.
   * @returns {Promise<TCompanyList>} A promise that resolves to a paginated list of companies.
   */
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
    return CompanyListSchema.parse(response.data);
  },

  /**
   * @description Get a single company by its UUID.
   * @param {string} uuid - The UUID of the company to fetch.
   * @returns {Promise<TCompany>} A promise that resolves to the company data.
   */
  getCompanyById: async (uuid: string): Promise<TCompany> => {
    const response = await apiClient.get<TCompanyApiResponse>(
      `/api/companies/${uuid}`
    );
    return CompanySchema.parse(normalizeCompanyResponse(response.data));
  },

  /**
   * @description Create a new company.
   * @param {TCompanyCreatePayload} payload - The data for the new company.
   * @returns {Promise<TCompany>} A promise that resolves to the created company data.
   */
  createCompany: async (payload: TCompanyCreatePayload): Promise<TCompany> => {
    const response = await apiClient.post<TCompanyApiResponse>(
      '/api/companies',
      toCompanyApiPayload(payload)
    );
    return CompanySchema.parse(normalizeCompanyResponse(response.data));
  },

  /**
   * @description Update an existing company.
   * @param {string} uuid - The UUID of the company to update.
   * @param {TCompanyUpdatePayload} payload - The data to update the company with.
   * @returns {Promise<TCompany>} A promise that resolves to the updated company data.
   */
  updateCompany: async (
    uuid: string,
    payload: TCompanyUpdatePayload
  ): Promise<TCompany> => {
    const response = await apiClient.put<TCompanyApiResponse>(
      `/api/companies/${uuid}`,
      toCompanyUpdateApiPayload(payload)
    );
    return CompanySchema.parse(normalizeCompanyResponse(response.data));
  },
};
