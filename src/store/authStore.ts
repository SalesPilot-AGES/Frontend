import { mockUsers } from '@data/mocks/Users';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { User, UserRole } from '../types/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  loginUser: (email: string, password: string) => User | null;
  getCurrentUser: () => User | null;
  getCurrentUsername: () => string | null;
  getCurrentUserRole: () => UserRole | null;
}

const MOCK_PASSWORD = 'password';
const AUTH_STORAGE_KEY = 'salespilot-auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null): void => {
        set({ user, isAuthenticated: user !== null });
      },
      logout: (): void => {
        set({ user: null, isAuthenticated: false });
      },
      loginUser: (email: string, password: string): User | null => {
        if (password !== MOCK_PASSWORD) {
          return null;
        }

        const user = mockUsers.find((u) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return user;
        }

        return null;
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
    }
  )
);

export type { User, UserRole } from '@declarations';
export const selectUser = (state: AuthState): User | null => state.user;
export const selectIsAuthenticated = (state: AuthState): boolean =>
  state.isAuthenticated;
export const selectUsername = (state: AuthState): string =>
  state.user?.name ?? 'Guest';
export const selectUserRole = (state: AuthState): UserRole =>
  state.user?.role ?? 'salesmen';
