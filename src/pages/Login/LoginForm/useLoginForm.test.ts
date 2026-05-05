import { useAuthStore } from '@store/authStore';
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, useNavigate: () => vi.fn() };
});

import { useLoginForm } from './useLoginForm';

afterEach(() => {
  useAuthStore.setState({ user: null, isAuthenticated: false });
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
    const { result } = renderHook(() => useLoginForm());
    await act(async () => {
      result.current.onSubmit({
        email: 'admin@example.com',
        password: 'password',
      });
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });
});
