import type { TSalesman } from '@services/models/SalesmanSchema';
import {
  SalesmanListSchema,
  SalesmanSchema,
} from '@services/models/SalesmanSchema';

import apiClient from './apiClient';

const fetchSellerList = async (): Promise<TSalesman[]> => {
  const response = await apiClient.get('/api/collaborators/sellers', {
    params: {
      page: 0,
      size: 200,
    },
  });

  const parsed = SalesmanListSchema.parse(response.data);
  return parsed.content;
};

/**
 * @description API service for salesman-related operations.
 */
export const salesmanApi = {
  /**
   * @description Get a single salesman by its UUID.
   * @param {string} uuid - The UUID of the salesman to fetch.
   * @returns {Promise<TSalesman>} A promise that resolves to the salesman data.
   */
  getSalesmanById: async (uuid: string): Promise<TSalesman> => {
    try {
      const response = await apiClient.get<TSalesman>(
        `/api/collaborators/sellers/${uuid}`
      );
      return SalesmanSchema.parse(response.data);
    } catch {
      const sellers = await fetchSellerList();
      const seller = sellers.find((row) => row.id === uuid);

      if (!seller) {
        throw new Error('Seller not found');
      }

      return seller;
    }
  },
};
