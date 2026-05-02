import { useAuthStore } from '@store/authStore';
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

const mockNavigate = vi.fn();

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

import { useUserProfile } from './useUserProfile';

afterEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
  mockNavigate.mockClear();
});

describe('useUserProfile', () => {
  it('returns handleLogout function', () => {
    const { result } = renderHook(() => useUserProfile());
    expect(result.current.handleLogout).toBeTypeOf('function');
  });

  it('clears auth state on logout', () => {
    useAuthStore.getState().loginUser('admin@example.com', 'password');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    const { result } = renderHook(() => useUserProfile());
    act(() => result.current.handleLogout());

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('navigates to login after logout', () => {
    const { result } = renderHook(() => useUserProfile());
    act(() => result.current.handleLogout());
    expect(mockNavigate).toHaveBeenCalledWith({ to: '/login' });
  });
});
