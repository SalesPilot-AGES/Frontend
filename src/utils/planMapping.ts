import { EPlan } from '@data/enums/EPlan';
import type { TPlan } from '@declarations/ui';
import type { TCompany } from '@services/models/CompanySchema';

export type CompanyPlanCode = TCompany['plan'];

export const PLAN_API_CODES: readonly CompanyPlanCode[] = [
  'BASIC',
  'PRO',
  'ENTERPRISE',
] as const;

export const planApiToUiLabel: Record<CompanyPlanCode, TPlan> = {
  BASIC: EPlan.BASIC,
  PRO: EPlan.PRO,
  ENTERPRISE: EPlan.ENTERPRISE,
};

export const planUiLabelToApi: Record<TPlan, CompanyPlanCode> = {
  [EPlan.BASIC]: 'BASIC',
  [EPlan.PRO]: 'PRO',
  [EPlan.ENTERPRISE]: 'ENTERPRISE',
};
