import type {
  TCreateManager,
  TManager,
  TUpdateManager,
} from '@services/models/ManagerSchema';
import { ManagerSchema } from '@services/models/ManagerSchema';

import apiClient from './apiClient';

export const managerApi = {
  getManagerById: async (id: string): Promise<TManager> => {
    const response = await apiClient.get<TManager>(
      `/api/collaborators/managers/${id}`
    );
    return ManagerSchema.parse(response.data);
  },

  createManager: async (data: TCreateManager): Promise<TManager> => {
    const response = await apiClient.post<TManager>(
      '/api/collaborators/managers',
      data
    );
    return ManagerSchema.parse(response.data);
  },

  updateManager: async (
    id: string,
    data: TUpdateManager
  ): Promise<TManager> => {
    const response = await apiClient.put<TManager>(
      `/api/collaborators/managers/${id}`,
      data
    );
    return ManagerSchema.parse(response.data);
  },
};
