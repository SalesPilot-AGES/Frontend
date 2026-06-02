import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@services/api/auth', () => ({
  authApi: { login: vi.fn() },
}));
vi.mock('@services/api/tokenStorage', () => ({
  tokenStorage: { set: vi.fn(), get: vi.fn(() => null), clear: vi.fn() },
}));

import { authApi } from '@services/api/auth';

import { useAuthStore } from './authStore';

const makeToken = (claims: Record<string, unknown>) =>
  `h.${btoa(JSON.stringify(claims)).replace(/=/g, '')}.s`;

afterEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
  vi.clearAllMocks();
});

describe('authStore', () => {
  describe('loginUser', () => {
    it('returns user and sets state on valid credentials', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        access_token: makeToken({
          sub: 'u1',
          email: 'admin@example.com',
          role: 'SYSTEM_ADMIN',
        }),
        refresh_token: 'rt',
        token_type: 'Bearer',
        expires_in_seconds: 3600,
      });

      const user = await useAuthStore
        .getState()
        .loginUser('admin@example.com', 'password');
      expect(user).not.toBeNull();
      expect(user?.role).toBe('admin');
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().user?.email).toBe('admin@example.com');
    });

    it('returns null on failed login', async () => {
      vi.mocked(authApi.login).mockRejectedValue(new Error('Unauthorized'));
      const user = await useAuthStore
        .getState()
        .loginUser('admin@example.com', 'wrong');
      expect(user).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it('maps MANAGER role correctly', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        access_token: makeToken({
          sub: 'u2',
          email: 'mgr@example.com',
          role: 'MANAGER',
        }),
        refresh_token: 'rt',
        token_type: 'Bearer',
        expires_in_seconds: 3600,
      });
      const user = await useAuthStore
        .getState()
        .loginUser('mgr@example.com', 'pw');
      expect(user?.role).toBe('manager');
    });

    it('maps SELLER role correctly', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        access_token: makeToken({
          sub: 'u3',
          email: 'sell@example.com',
          role: 'SELLER',
        }),
        refresh_token: 'rt',
        token_type: 'Bearer',
        expires_in_seconds: 3600,
      });
      const user = await useAuthStore
        .getState()
        .loginUser('sell@example.com', 'pw');
      expect(user?.role).toBe('salesmen');
    });
  });

  describe('logout', () => {
    it('clears user and sets isAuthenticated to false', () => {
      useAuthStore.setState({
        user: {
          id: 'u1',
          name: 'Admin',
          email: 'admin@example.com',
          role: 'admin',
        },
        isAuthenticated: true,
      });
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
      useAuthStore.setState({
        user: { id: 'u1', name: 'Admin', email: 'a@a.com', role: 'admin' },
        isAuthenticated: true,
      });
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

    it('returns correct values after login', async () => {
      vi.mocked(authApi.login).mockResolvedValue({
        access_token: makeToken({
          sub: 'u1',
          email: 'admin@example.com',
          role: 'SYSTEM_ADMIN',
        }),
        refresh_token: 'rt',
        token_type: 'Bearer',
        expires_in_seconds: 3600,
      });
      await useAuthStore.getState().loginUser('admin@example.com', 'password');
      expect(useAuthStore.getState().getCurrentUser()?.email).toBe(
        'admin@example.com'
      );
      expect(useAuthStore.getState().getCurrentUsername()).toBe('admin');
      expect(useAuthStore.getState().getCurrentUserRole()).toBe('admin');
    });
  });
});
