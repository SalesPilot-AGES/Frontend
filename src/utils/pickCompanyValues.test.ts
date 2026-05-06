import { EPlan } from '@data/enums/EPlan';
import { describe, expect, it } from 'vitest';

import { pickCompanyValues } from './pickCompanyValues';

describe('pickCompanyValues', () => {
  it('maps API plan code BASIC to UI label', () => {
    const result = pickCompanyValues({
      id: '1',
      name: 'Acme',
      tax_id: '12.345.678/0001-99',
      plan: 'BASIC',
      active: true,
    });
    expect(result.plan).toBe(EPlan.BASIC);
  });

  it('maps API plan code PRO to UI label', () => {
    const result = pickCompanyValues({
      id: '1',
      name: 'Acme',
      tax_id: '12.345.678/0001-99',
      plan: 'PRO',
      active: true,
    });
    expect(result.plan).toBe(EPlan.PRO);
  });

  it('maps API plan code ENTERPRISE to UI label', () => {
    const result = pickCompanyValues({
      id: '1',
      name: 'Acme',
      tax_id: '12.345.678/0001-99',
      plan: 'ENTERPRISE',
      active: false,
    });
    expect(result.plan).toBe(EPlan.ENTERPRISE);
  });

  it('preserves UI plan label when already converted', () => {
    const result = pickCompanyValues({
      id: '1',
      name: 'Acme',
      tax_id: '12.345.678/0001-99',
      plan: EPlan.PRO,
      active: true,
    });
    expect(result.plan).toBe(EPlan.PRO);
  });

  it('copies all fields correctly', () => {
    const result = pickCompanyValues({
      id: 'abc-123',
      name: 'Test Corp',
      tax_id: '11.222.333/0001-44',
      plan: 'BASIC',
      active: false,
    });
    expect(result.id).toBe('abc-123');
    expect(result.name).toBe('Test Corp');
    expect(result.tax_id).toBe('11.222.333/0001-44');
    expect(result.active).toBe(false);
  });
});
