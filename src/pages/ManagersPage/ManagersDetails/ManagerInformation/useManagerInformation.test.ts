import type { TManager } from '@services/models/ManagerSchema';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@services/queries/useCompanies', () => ({
  useGetCompanies: vi.fn(() => ({ data: undefined })),
}));

vi.mock('@services/queries/useManagers', () => ({
  useUpdateManager: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));

import { useManagerInformation } from './useManagerInformation';

const manager: TManager = {
  id: 'mgr-1',
  name: 'Ana Lima',
  email: 'ana@example.com',
  company: { id: 'co-1', name: 'Tech Corp' },
  active: true,
  preferences: null,
};

describe('useManagerInformation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with isEditing false', () => {
    const { result } = renderHook(() => useManagerInformation(manager));
    expect(result.current.isEditing).toBe(false);
  });

  it('starts with editForm null', () => {
    const { result } = renderHook(() => useManagerInformation(manager));
    expect(result.current.editForm).toBeNull();
  });

  it('sets isEditing to true and initialises editForm on handleEdit', () => {
    const { result } = renderHook(() => useManagerInformation(manager));
    act(() => result.current.handleEdit());
    expect(result.current.isEditing).toBe(true);
    expect(result.current.editForm?.name).toBe('Ana Lima');
    expect(result.current.editForm?.companyId).toBe('co-1');
  });

  it('resets isEditing on handleCancelEdit', () => {
    const { result } = renderHook(() => useManagerInformation(manager));
    act(() => result.current.handleEdit());
    act(() => result.current.handleCancelEdit());
    expect(result.current.isEditing).toBe(false);
  });

  it('handleFieldChange updates editForm field', async () => {
    const { result } = renderHook(() => useManagerInformation(manager));
    act(() => result.current.handleEdit());
    act(() => result.current.handleFieldChange('name', 'New Name'));
    await waitFor(() => {
      expect(result.current.editForm?.name).toBe('New Name');
    });
  });

  it('handleStatusChange updates active field', async () => {
    const { result } = renderHook(() => useManagerInformation(manager));
    act(() => result.current.handleEdit());
    act(() => result.current.handleStatusChange(false));
    await waitFor(() => {
      expect(result.current.editForm?.active).toBe(false);
    });
  });

  it('handles null manager gracefully', () => {
    const { result } = renderHook(() => useManagerInformation(null));
    expect(result.current.isEditing).toBe(false);
    act(() => result.current.handleEdit());
    expect(result.current.isEditing).toBe(false);
  });
});
