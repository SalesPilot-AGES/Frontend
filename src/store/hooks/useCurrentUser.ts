import type { User, UserRole } from '@store/authStore';
import {
  selectIsAuthenticated,
  selectUser,
  selectUsername,
  selectUserRole,
  useAuthStore,
} from '@store/authStore';
import { useNavigate } from '@tanstack/react-router';

export const useCurrentUser = (): User | null => {
  return useAuthStore(selectUser);
};

export const useRequireUser = (): User => {
  const user = useAuthStore(selectUser);
  const navigate = useNavigate({ from: '/' });
  if (!user) {
    navigate({ to: '/login' });
    throw new Error('User not authenticated');
  }
  return user;
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
