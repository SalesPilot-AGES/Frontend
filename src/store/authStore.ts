import { authApi } from '@services/api/auth';
import { tokenStorage } from '@services/api/tokenStorage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User, UserRole } from '../types/index';

const ROLE_MAP: Record<string, UserRole> = {
  SYSTEM_ADMIN: 'admin',
  MANAGER: 'manager',
  SELLER: 'salesmen',
};

const decodeJwtPayload = (token: string): Record<string, unknown> => {
  const payload = token.split('.')[1];
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    '='
  );
  return JSON.parse(atob(padded)) as Record<string, unknown>;
};

const userFromAccessToken = (accessToken: string): User => {
  const claims = decodeJwtPayload(accessToken);
  const email = claims.email as string;

  // Extrai company_id do token
  const companyId = claims.company_id as string | undefined;

  return {
    id: claims.sub as string,
    name: email.split('@')[0],
    email,
    role: ROLE_MAP[claims.role as string] ?? 'salesmen',
    company_id: companyId, // Adiciona company_id ao objeto User
    company_name: '', // Inicializa vazio, será preenchido posteriormente se necessário
  };
};

const AUTH_STORAGE_KEY = 'salespilot-auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  loginUser: (email: string, password: string) => Promise<User | null>;
  getCurrentUser: () => User | null;
  getCurrentUsername: () => string | null;
  getCurrentUserRole: () => UserRole | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null): void => {
        set({ user, isAuthenticated: user !== null });
      },
      logout: (): void => {
        tokenStorage.clear();
        set({ user: null, isAuthenticated: false });
      },
      loginUser: async (
        email: string,
        password: string
      ): Promise<User | null> => {
        try {
          const tokens = await authApi.login(email, password);
          tokenStorage.set({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          });
          const user = userFromAccessToken(tokens.access_token);
          set({ user, isAuthenticated: true });
          return user;
        } catch {
          return null;
        }
      },
      getCurrentUser: (): User | null => get().user,
      getCurrentUsername: (): string | null => get().user?.name || null,
      getCurrentUserRole: (): UserRole | null => get().user?.role || null,
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage:
        () =>
        (state): void => {
          if (state?.isAuthenticated && !tokenStorage.get()) {
            state.logout();
          }
        },
    }
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('auth:logout', () => {
    useAuthStore.getState().logout();
  });
}

export type { User, UserRole } from '@declarations';
export const selectUser = (state: AuthState): User | null => state.user;
export const selectIsAuthenticated = (state: AuthState): boolean =>
  state.isAuthenticated;
export const selectUsername = (state: AuthState): string =>
  state.user?.name ?? 'Guest';
export const selectUserRole = (state: AuthState): UserRole =>
  state.user?.role ?? 'salesmen';
