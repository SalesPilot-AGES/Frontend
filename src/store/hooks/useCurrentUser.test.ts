import { useAuthStore } from '@store/authStore';
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import {
  useCurrentUser,
  useCurrentUsername,
  useCurrentUserRole,
  useIsAuthenticated,
} from './useCurrentUser';

afterEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
});

const loginAdmin = () =>
  useAuthStore.getState().loginUser('admin@example.com', 'password');

describe('useCurrentUser', () => {
  it('returns null when not logged in', () => {
    const { result } = renderHook(() => useCurrentUser());
    expect(result.current).toBeNull();
  });

  it('returns user after login', () => {
    act(() => {
      loginAdmin();
    });
    const { result } = renderHook(() => useCurrentUser());
    expect(result.current?.email).toBe('admin@example.com');
  });
});

describe('useCurrentUsername', () => {
  it('returns Guest when not logged in', () => {
    const { result } = renderHook(() => useCurrentUsername());
    expect(result.current).toBe('Guest');
  });

  it('returns user name after login', () => {
    act(() => {
      loginAdmin();
    });
    const { result } = renderHook(() => useCurrentUsername());
    expect(result.current).toBe('Admin User');
  });
});

describe('useCurrentUserRole', () => {
  it('returns salesmen default when not logged in', () => {
    const { result } = renderHook(() => useCurrentUserRole());
    expect(result.current).toBe('salesmen');
  });

  it('returns admin role after admin login', () => {
    act(() => {
      loginAdmin();
    });
    const { result } = renderHook(() => useCurrentUserRole());
    expect(result.current).toBe('admin');
  });
});

describe('useIsAuthenticated', () => {
  it('returns false when not logged in', () => {
    const { result } = renderHook(() => useIsAuthenticated());
    expect(result.current).toBe(false);
  });

  it('returns true after login', () => {
    act(() => {
      loginAdmin();
    });
    const { result } = renderHook(() => useIsAuthenticated());
    expect(result.current).toBe(true);
  });
});
