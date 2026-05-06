import { EPlan } from '@data/enums/EPlan';
import { act, renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@tests/TestProviders';
import { describe, expect, it, vi } from 'vitest';

import type { CompanyInformationValues } from '../CompanyInformationView/types';

vi.mock('@services/queries/useCompanies', () => ({
  useUpdateCompany: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
  })),
}));

import { useCompanyInformationEdit } from './useCompanyInformationEdit';

const draft: CompanyInformationValues = {
  id: 'co-1',
  name: 'Acme',
  tax_id: '12.345.678/0001-99',
  plan: EPlan.PRO,
  active: true,
};

const wrapper = TestProviders;

describe('useCompanyInformationEdit', () => {
  it('initialises form with draft values', () => {
    const { result } = renderHook(
      () => useCompanyInformationEdit({ draft, setDraft: vi.fn() }),
      { wrapper }
    );
    act(() => {
      expect(result.current.isValid).toBeDefined();
      expect(result.current.isSubmitting).toBe(false);
    });
  });

  it('returns palette, labelColor, valueColor', () => {
    const { result } = renderHook(
      () => useCompanyInformationEdit({ draft, setDraft: vi.fn() }),
      { wrapper }
    );
    act(() => {
      expect(result.current.palette).toBeDefined();
      expect(result.current.labelColor).toBeTypeOf('string');
      expect(result.current.valueColor).toBeTypeOf('string');
    });
  });

  it('calls onSaveSuccess after successful submit', async () => {
    const onSaveSuccess = vi.fn();
    const setDraft = vi.fn();
    const { result } = renderHook(
      () => useCompanyInformationEdit({ draft, setDraft, onSaveSuccess }),
      { wrapper }
    );

    await act(async () => {
      await result.current.onSubmit({
        name: 'New Name',
        plan: 'PRO',
        active: true,
      });
    });

    await waitFor(() => expect(onSaveSuccess).toHaveBeenCalledOnce());
  });

  it('exposes control and handleSubmit for react-hook-form', () => {
    const { result } = renderHook(
      () => useCompanyInformationEdit({ draft, setDraft: vi.fn() }),
      { wrapper }
    );
    act(() => {
      expect(result.current.control).toBeDefined();
      expect(result.current.handleSubmit).toBeTypeOf('function');
    });
  });
});
