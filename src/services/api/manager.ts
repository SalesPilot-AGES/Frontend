import type {
  TCreateManager,
  TManager,
  TManagerWithCompany,
  TUpdateManager,
} from '@services/models/ManagerSchema';
import {
  ManagerListItemApiSchema,
  ManagersPagedResponseSchema,
  mapManagerListItemApiToTManagerWithCompany,
} from '@services/models/ManagerSchema';

import apiClient from './apiClient';

const preferencesToApi = (
  prefs: Record<string, unknown>
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(prefs)) {
    if (key === 'defaultModel') {
      out.default_model = value;
    } else {
      out[key] = value;
    }
  }
  return out;
};

const createManagerToApiBody = (
  data: TCreateManager
): Record<string, unknown> => ({
  company_id: data.companyId,
  name: data.name,
  email: data.email,
  active: data.active,
  preferences: preferencesToApi(data.preferences ?? {}),
});

const updateManagerToApiBody = (
  data: TUpdateManager
): Record<string, unknown> => {
  const body: Record<string, unknown> = {};
  if (data.companyId !== undefined) {
    body.company_id = data.companyId;
  }
  if (data.name !== undefined) {
    body.name = data.name;
  }
  if (data.email !== undefined) {
    body.email = data.email;
  }
  if (data.active !== undefined) {
    body.active = data.active;
  }
  if (data.preferences !== undefined) {
    body.preferences = preferencesToApi(data.preferences);
  }
  return body;
};

const parseManagerResponse = (data: unknown): TManagerWithCompany => {
  const row = ManagerListItemApiSchema.parse(data);
  return mapManagerListItemApiToTManagerWithCompany(row);
};

export const managerApi = {
  getManagerById: async (id: string): Promise<TManager> => {
    const response = await apiClient.get<unknown>(
      `/api/collaborators/managers/${id}`
    );
    return parseManagerResponse(response.data);
  },

  getManagers: async (): Promise<TManagerWithCompany[]> => {
    const response = await apiClient.get<unknown>(
      '/api/collaborators/managers'
    );
    const page = ManagersPagedResponseSchema.parse(response.data);
    return page.content.map(mapManagerListItemApiToTManagerWithCompany);
  },

  createManager: async (data: TCreateManager): Promise<TManager> => {
    const response = await apiClient.post<unknown>(
      '/api/collaborators/managers',
      createManagerToApiBody(data)
    );
    return parseManagerResponse(response.data);
  },

  updateManager: async (
    id: string,
    data: TUpdateManager
  ): Promise<TManager> => {
    const response = await apiClient.put<unknown>(
      `/api/collaborators/managers/${id}`,
      updateManagerToApiBody(data)
    );
    return parseManagerResponse(response.data);
  },
};
