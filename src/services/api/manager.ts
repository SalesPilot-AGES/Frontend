import type { TManager, TManagerList } from '@services/models/ManagerSchema';
import {
  ManagerListSchema,
  ManagerSchema,
  type TManagerCreatePayload,
  type TManagerFilters,
  type TManagerUpdatePayload,
} from '@services/models/ManagerSchema';

import apiClient from './apiClient';

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

/**
 * @description API service for manager-related operations.
 */
export const managerApi = {
  /**
   * @description Get all managers with pagination and filtering.
   * @param {number} page - The page number to fetch.
   * @param {number} size - The number of items per page.
   * @param {TManagerFilters} filters - Filters to apply to the query.
   * @returns {Promise<TManagerList>} A promise that resolves to a paginated list of managers.
   */
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
    return ManagerListSchema.parse(response.data);
  },

  /**
   * @description Get a single manager by its UUID.
   * @param {string} uuid - The UUID of the manager to fetch.
   * @returns {Promise<TManager>} A promise that resolves to the manager data.
   */
  getManagerById: async (uuid: string): Promise<TManager> => {
    const response = await apiClient.get<TManager>(
      `/api/collaborators/managers/${uuid}`
    );
    return ManagerSchema.parse(response.data);
  },

  /**
   * @description Create a new manager.
   * @param {TManagerCreatePayload} payload - The data for the new manager.
   * @returns {Promise<TManager>} A promise that resolves to the created manager data.
   */
  createManager: async (payload: TManagerCreatePayload): Promise<TManager> => {
    const response = await apiClient.post<TManager>(
      '/api/collaborators/managers',
      normalizePayload(payload)
    );
    return ManagerSchema.parse(response.data);
  },

  /**
   * @description Update an existing manager.
   * @param {string} uuid - The UUID of the manager to update.
   * @param {TManagerUpdatePayload} payload - The data to update the manager with.
   * @returns {Promise<TManager>} A promise that resolves to the updated manager data.
   */
  updateManager: async (
    uuid: string,
    payload: TManagerUpdatePayload
  ): Promise<TManager> => {
    const response = await apiClient.put<TManager>(
      `/api/collaborators/managers/${uuid}`,
      normalizePayload(payload)
    );
    return ManagerSchema.parse(response.data);
  },
};
