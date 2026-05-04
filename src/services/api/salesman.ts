import type {
  TSalesman,
  TSalesmanWithCompany,
} from '@services/models/SalesmanSchema';
import {
  mapSalesmanListItemApiToTSalesmanWithCompany,
  SalesmanSchema,
  SalesmenPagedResponseSchema,
  type TCreateSalesman,
} from '@services/models/SalesmanSchema';

import apiClient from './apiClient';

export const salesmanApi = {
  getSalesmen: async (): Promise<TSalesmanWithCompany[]> => {
    const response = await apiClient.get('/api/salesmen');
    const parsed = SalesmenPagedResponseSchema.parse(response.data);
    return parsed.content.map(mapSalesmanListItemApiToTSalesmanWithCompany);
  },

  createSalesman: async (data: TCreateSalesman): Promise<TSalesman> => {
    const response = await apiClient.post<TSalesman>('/api/salesmen', data);
    return SalesmanSchema.parse(response.data);
  },
};
