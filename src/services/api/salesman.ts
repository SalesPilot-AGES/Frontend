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

import apiClient from './apiClient';

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
      '/api/collaborators/salesmen',
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

    const parsedResponse = SalesmanListApiSchema.parse(response.data);

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
    const response = await apiClient.get<unknown>(
      `/api/collaborators/salesmen/${uuid}`
    );
    return SalesmanSchema.parse(response.data);
  },

  /**
   * @description Create a new salesman.
   * @param {TSalesmanCreateInput} payload - The data for the new salesman.
   * @returns {Promise<TSalesman>} A promise that resolves to the created salesman data.
   */
  createSalesman: async (payload: TSalesmanCreateInput): Promise<TSalesman> => {
    const response = await apiClient.post<unknown>(
      '/api/collaborators/salesmen',
      payload
    );
    return SalesmanSchema.parse(response.data);
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
  ): Promise<TSalesman> => {
    const response = await apiClient.put<unknown>(
      `/api/collaborators/salesmen/${uuid}`,
      payload
    );
    return SalesmanSchema.parse(response.data);
  },
};
