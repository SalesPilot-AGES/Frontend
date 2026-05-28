import type { AxiosInstance } from 'axios';
import axios from 'axios';

import { tokenStorage } from './tokenStorage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const normalizedBaseUrl = API_URL.replace(/\/+$/, '').replace(/\/api$/, '');

const apiClient: AxiosInstance = axios.create({
  baseURL: normalizedBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const tokens = tokenStorage.get();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const axiosError = error as {
      config?: { _retry?: boolean };
      response?: { status: number };
    };
    const originalRequest = axiosError.config;

    if (
      axiosError.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      const tokens = tokenStorage.get();

      if (!tokens?.refreshToken) {
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((newToken: string) => {
            if (originalRequest && 'headers' in originalRequest) {
              (originalRequest as Record<string, unknown>).headers = {
                ...((originalRequest as Record<string, unknown>)
                  .headers as Record<string, unknown>),
                Authorization: `Bearer ${newToken}`,
              };
            }
            resolve(
              apiClient(originalRequest as Parameters<typeof apiClient>[0])
            );
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${normalizedBaseUrl}/api/auth/refresh`,
          {
            refreshToken: tokens.refreshToken,
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const newTokens = response.data as {
          access_token: string;
          refresh_token: string;
        };
        tokenStorage.set({
          accessToken: newTokens.access_token,
          refreshToken: newTokens.refresh_token,
        });

        refreshQueue.forEach((cb) => cb(newTokens.access_token));
        refreshQueue = [];

        if (originalRequest && 'headers' in originalRequest) {
          (originalRequest as Record<string, unknown>).headers = {
            ...((originalRequest as Record<string, unknown>).headers as Record<
              string,
              unknown
            >),
            Authorization: `Bearer ${newTokens.access_token}`,
          };
        }
        return apiClient(originalRequest as Parameters<typeof apiClient>[0]);
      } catch {
        tokenStorage.clear();
        window.dispatchEvent(new Event('auth:logout'));
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const unwrapContent = (data: unknown): unknown =>
  (data as { content?: unknown }).content ?? data;

export default apiClient;
