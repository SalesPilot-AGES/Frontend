import type { User, UserRole } from '@store/authStore';
import {
  selectIsAuthenticated,
  selectUser,
  selectUsername,
  selectUserRole,
  useAuthStore,
} from '@store/authStore';

export const useCurrentUser = (): User | null => {
  return useAuthStore(selectUser);
};

export const useCurrentUsername = (): string => {
  return useAuthStore(selectUsername);
};

export const useCurrentUserRole = (): UserRole => {
  return useAuthStore(selectUserRole);
};

export const useIsAuthenticated = (): boolean => {
  return useAuthStore(selectIsAuthenticated);
};
