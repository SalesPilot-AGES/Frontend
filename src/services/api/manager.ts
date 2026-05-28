import type { TManager, TManagerList } from '@services/models/ManagerSchema';
import {
  ManagerListSchema,
  ManagerSchema,
  type TManagerCreatePayload,
  type TManagerFilters,
  type TManagerUpdatePayload,
} from '@services/models/ManagerSchema';

import apiClient, { unwrapContent } from './apiClient';

const normalizePayload = <T extends Record<string, unknown>>(payload: T): T => {
  return {
    ...payload,
    phone: payload.phone || '+55 (11) 98888-7777',
    preferences: payload.preferences || {
      theme: 'light',
      default_model: 'gpt-4o',
    },
  } as T;
};

export const managerApi = {
  getManagers: async (
    page: number = 0,
    size: number = 10,
    filters: TManagerFilters
  ): Promise<TManagerList> => {
    const response = await apiClient.get<TManagerList>(
      '/api/collaborators/managers',
      {
        params: {
          page,
          size,
          companyId: filters.companyId,
          ...(filters.name && { name: filters.name }),
          ...(filters.email && { email: filters.email }),
          ...(filters.active !== undefined && { active: filters.active }),
        },
      }
    );
    return ManagerListSchema.parse(unwrapContent(response.data));
  },

  getManagerById: async (uuid: string): Promise<TManager> => {
    const response = await apiClient.get<TManager>(
      `/api/collaborators/managers/${uuid}`
    );
    return ManagerSchema.parse(unwrapContent(response.data));
  },

  createManager: async (payload: TManagerCreatePayload): Promise<TManager> => {
    const response = await apiClient.post<TManager>(
      '/api/collaborators/managers',
      normalizePayload(payload)
    );
    return ManagerSchema.parse(unwrapContent(response.data));
  },

  updateManager: async (
    uuid: string,
    payload: TManagerUpdatePayload
  ): Promise<TManager> => {
    const response = await apiClient.put<TManager>(
      `/api/collaborators/managers/${uuid}`,
      normalizePayload(payload)
    );
    return ManagerSchema.parse(unwrapContent(response.data));
  },
};
