import { afterEach, describe, expect, it } from 'vitest';

import { useAuthStore } from './authStore';

afterEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
});

describe('authStore', () => {
  describe('loginUser', () => {
    it('returns user and sets state on valid credentials', () => {
      const user = useAuthStore
        .getState()
        .loginUser('admin@example.com', 'password');
      expect(user).not.toBeNull();
      expect(user?.role).toBe('admin');
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.email).toBe('admin@example.com');
    });

    it('returns null on wrong password', () => {
      const user = useAuthStore
        .getState()
        .loginUser('admin@example.com', 'wrong');
      expect(user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it('returns null for unknown email', () => {
      const user = useAuthStore
        .getState()
        .loginUser('unknown@example.com', 'password');
      expect(user).toBeNull();
    });

    it('logs in manager role', () => {
      const user = useAuthStore
        .getState()
        .loginUser('manager@example.com', 'password');
      expect(user?.role).toBe('manager');
    });

    it('logs in salesmen role', () => {
      const user = useAuthStore
        .getState()
        .loginUser('salesmen@example.com', 'password');
      expect(user?.role).toBe('salesmen');
    });
  });

  describe('logout', () => {
    it('clears user and sets isAuthenticated to false', () => {
      useAuthStore.getState().loginUser('admin@example.com', 'password');
      useAuthStore.getState().logout();
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe('setUser', () => {
    it('sets user and isAuthenticated true', () => {
      const mockUser = {
        id: '99',
        name: 'Test',
        email: 't@t.com',
        role: 'admin' as const,
        company: 'X',
      };
      useAuthStore.getState().setUser(mockUser);
      expect(useAuthStore.getState().user).toEqual(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });

    it('clears user when called with null', () => {
      useAuthStore.getState().loginUser('admin@example.com', 'password');
      useAuthStore.getState().setUser(null);
      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe('getCurrentUser / getCurrentUsername / getCurrentUserRole', () => {
    it('returns null when no user is logged in', () => {
      expect(useAuthStore.getState().getCurrentUser()).toBeNull();
      expect(useAuthStore.getState().getCurrentUsername()).toBeNull();
      expect(useAuthStore.getState().getCurrentUserRole()).toBeNull();
    });

    it('returns correct values after login', () => {
      useAuthStore.getState().loginUser('admin@example.com', 'password');
      expect(useAuthStore.getState().getCurrentUser()?.email).toBe(
        'admin@example.com'
      );
      expect(useAuthStore.getState().getCurrentUsername()).toBe('Admin User');
      expect(useAuthStore.getState().getCurrentUserRole()).toBe('admin');
    });
  });
});
