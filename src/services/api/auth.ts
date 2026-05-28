import type { TAuthTokens } from '@services/models/AuthSchema';
import { AuthTokensSchema } from '@services/models/AuthSchema';

import apiClient from './apiClient';

export const authApi = {
  login: async (email: string, password: string): Promise<TAuthTokens> => {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password,
    });
    return AuthTokensSchema.parse(response.data);
  },

  refresh: async (refreshToken: string): Promise<TAuthTokens> => {
    const response = await apiClient.post('/api/auth/refresh', {
      refresh_token: refreshToken,
    });
    return AuthTokensSchema.parse(response.data);
  },
};
