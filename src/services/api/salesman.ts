import type {
  TSalesman,
  TSalesmanCreateInput,
  TSalesmanFilters,
  TSalesmanList,
  TSalesmanUpdateInput,
} from '@services/models/SalesmanSchema';
import {
  mapSalesmanListItemApiToTSalesmanWithCompany,
  SalesmanListApiSchema,
  SalesmanListSchema,
  SalesmanSchema,
} from '@services/models/SalesmanSchema';

import apiClient, { unwrapContent } from './apiClient';
import {
  type ApiMutationResponse,
  getResponseMessage,
} from './responseMessage';

/**
 * @description Normalize payload to ensure phone and preferences always have values
 */
const normalizePayload = <T extends Record<string, unknown>>(payload: T): T => {
  return {
    ...payload,
    // Ensure phone is always a string (empty string if not provided)
    phone: payload.phone || '+55 (11) 98888-7777',
    // Ensure preferences always has default values
    preferences: payload.preferences || {
      theme: 'light',
      default_model: 'gpt-4o',
    },
  } as T;
};

const fetchSellerList = async (): Promise<TSalesman[]> => {
  const response = await apiClient.get<unknown>('/api/collaborators/sellers', {
    params: {
      page: 0,
      size: 200,
    },
  });

  const page =
    (response.data as { content?: unknown }).content ?? response.data;
  const parsed = SalesmanListApiSchema.parse(page);
  return parsed.content;
};

/**
 * @description API service for salesman-related operations.
 */
export const salesmanApi = {
  /**
   * @description Get all salesmen with pagination and filtering.
   * @param {number} page - The page number to fetch.
   * @param {number} size - The number of items per page.
   * @param {TSalesmanFilters} filters - Filters to apply to the query.
   * @returns {Promise<TSalesmanList>} A promise that resolves to a paginated list of salesmen.
   */
  getSalesmen: async (
    page: number = 0,
    size: number = 10,
    filters?: TSalesmanFilters
  ): Promise<TSalesmanList> => {
    const response = await apiClient.get<unknown>(
      '/api/collaborators/sellers',
      {
        params: {
          page,
          size,
          ...(filters?.companyId && { companyId: filters.companyId }),
          ...(filters?.name && { name: filters.name }),
          ...(filters?.email && { email: filters.email }),
          ...(filters?.active !== undefined && { active: filters.active }),
        },
      }
    );

    const pageData =
      (response.data as { content?: unknown }).content ?? response.data;
    const parsedResponse = SalesmanListApiSchema.parse(pageData);

    return SalesmanListSchema.parse({
      ...parsedResponse,
      content: parsedResponse.content.map(
        mapSalesmanListItemApiToTSalesmanWithCompany
      ),
    });
  },

  /**
   * @description Get a single salesman by its UUID.
   * @param {string} uuid - The UUID of the salesman to fetch.
   * @returns {Promise<TSalesman>} A promise that resolves to the salesman data.
   */
  getSalesmanById: async (uuid: string): Promise<TSalesman> => {
    try {
      const response = await apiClient.get<unknown>(
        `/api/collaborators/sellers/${uuid}`
      );
      return SalesmanSchema.parse(unwrapContent(response.data));
    } catch {
      const sellers = await fetchSellerList();
      const seller = sellers.find((row) => row.id === uuid);

      if (!seller) {
        throw new Error('Seller not found');
      }

      return seller;
    }
  },

  /**
   * @description Create a new salesman.
   * @param {TSalesmanCreateInput} payload - The data for the new salesman.
   * @returns {Promise<TSalesman>} A promise that resolves to the created salesman data.
   */
  createSalesman: async (
    payload: TSalesmanCreateInput
  ): Promise<ApiMutationResponse<TSalesman>> => {
    const response = await apiClient.post<unknown>(
      '/api/collaborators/sellers',
      normalizePayload(payload)
    );
    return {
      content: SalesmanSchema.parse(unwrapContent(response.data)),
      message: getResponseMessage(response.data),
    };
  },

  /**
   * @description Update an existing salesman.
   * @param {string} uuid - The UUID of the salesman to update.
   * @param {TSalesmanUpdateInput} payload - The data to update the salesman with.
   * @returns {Promise<TSalesman>} A promise that resolves to the updated salesman data.
   */
  updateSalesman: async (
    uuid: string,
    payload: TSalesmanUpdateInput
  ): Promise<ApiMutationResponse<TSalesman>> => {
    const response = await apiClient.put<unknown>(
      `/api/collaborators/sellers/${uuid}`,
      normalizePayload(payload)
    );
    return {
      content: SalesmanSchema.parse(unwrapContent(response.data)),
      message: getResponseMessage(response.data),
    };
  },
};
