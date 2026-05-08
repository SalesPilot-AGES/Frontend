import type { AxiosInstance } from 'axios';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const normalizedBaseUrl = API_URL.replace(/\/+$/, '').replace(/\/api$/, '');

const apiClient: AxiosInstance = axios.create({
  baseURL: normalizedBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
