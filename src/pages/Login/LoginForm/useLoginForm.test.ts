import { useAuthStore } from '@store/authStore';
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

import { authApi } from '@services/api/auth';
vi.mock('@services/api/auth', () => ({
  authApi: {
    login: vi.fn(),
  },
}));

import { useLoginForm } from './useLoginForm';

afterEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
  vi.clearAllMocks();
});

describe('useLoginForm', () => {
  it('returns register, handleSubmit, errors, onSubmit, setValue', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.register).toBeTypeOf('function');
    expect(result.current.handleSubmit).toBeTypeOf('function');
    expect(result.current.onSubmit).toBeTypeOf('function');
    expect(result.current.setValue).toBeTypeOf('function');
    expect(result.current.errors).toBeDefined();
  });

  it('logs in user on valid credentials', async () => {
    // Generate a simple fake JWT that can be decoded by atob
    const payload = JSON.stringify({
      sub: '123',
      email: 'admin@example.com',
      role: 'SYSTEM_ADMIN',
    });
    const encodedPayload = btoa(payload);
    const fakeToken = `header.${encodedPayload}.signature`;

    vi.mocked(authApi.login).mockResolvedValue({
      access_token: fakeToken,
      refresh_token: 'refresh',
      token_type: 'Bearer',
      expires_in_seconds: 3600,
    });

    const { result } = renderHook(() => useLoginForm());
    await act(async () => {
      await result.current.onSubmit({
        email: 'admin@example.com',
        password: 'password',
      });
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe('admin@example.com');
    expect(mockNavigate).toHaveBeenCalled();
  });
});
