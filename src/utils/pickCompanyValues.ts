import type {
  CompanyInformationProps,
  CompanyInformationValues,
} from '@pages/CompaniesPage/CompanyDetail/CompanyInformation/CompanyInformationView/types';
import type { TCompany } from '@services/models/CompanySchema';

import { type CompanyPlanCode, planApiToUiLabel } from './planMapping';

const isApiPlanCode = (plan: string): plan is CompanyPlanCode =>
  plan === 'BASIC' || plan === 'PRO' || plan === 'ENTERPRISE';

/** Aceita valores de tela (`TPlan`) ou resposta da API (`BASIC` / `PRO` / `ENTERPRISE`). */
export const pickCompanyValues = (
  props:
    | CompanyInformationProps
    | Pick<TCompany, 'id' | 'name' | 'tax_id' | 'plan' | 'active'>
): CompanyInformationValues => ({
  id: props.id,
  name: props.name,
  tax_id: props.tax_id,
  plan: isApiPlanCode(props.plan) ? planApiToUiLabel[props.plan] : props.plan,
  active: props.active,
});
