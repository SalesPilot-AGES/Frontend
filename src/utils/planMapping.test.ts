import { EPlan } from '@data/enums/EPlan';
import { describe, expect, it } from 'vitest';

import {
  PLAN_API_CODES,
  planApiToUiLabel,
  planUiLabelToApi,
} from './planMapping';

describe('PLAN_API_CODES', () => {
  it('contains all three plan codes', () => {
    expect(PLAN_API_CODES).toContain('BASIC');
    expect(PLAN_API_CODES).toContain('PRO');
    expect(PLAN_API_CODES).toContain('ENTERPRISE');
    expect(PLAN_API_CODES).toHaveLength(3);
  });
});

describe('planApiToUiLabel', () => {
  it('maps BASIC to EPlan.BASIC', () => {
    expect(planApiToUiLabel.BASIC).toBe(EPlan.BASIC);
  });

  it('maps PRO to EPlan.PRO', () => {
    expect(planApiToUiLabel.PRO).toBe(EPlan.PRO);
  });

  it('maps ENTERPRISE to EPlan.ENTERPRISE', () => {
    expect(planApiToUiLabel.ENTERPRISE).toBe(EPlan.ENTERPRISE);
  });
});

describe('planUiLabelToApi', () => {
  it('maps EPlan.BASIC to BASIC', () => {
    expect(planUiLabelToApi[EPlan.BASIC]).toBe('BASIC');
  });

  it('maps EPlan.PRO to PRO', () => {
    expect(planUiLabelToApi[EPlan.PRO]).toBe('PRO');
  });

  it('maps EPlan.ENTERPRISE to ENTERPRISE', () => {
    expect(planUiLabelToApi[EPlan.ENTERPRISE]).toBe('ENTERPRISE');
  });

  it('is the inverse of planApiToUiLabel', () => {
    for (const code of PLAN_API_CODES) {
      const label = planApiToUiLabel[code];
      expect(planUiLabelToApi[label]).toBe(code);
    }
  });
});
