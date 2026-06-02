import type { TPlan } from '@declarations/ui';

export interface CompanyInformationValues {
  id: string;
  name: string;
  tax_id: string;
  plan: TPlan;
  active: boolean;
}

export interface CompanyInformationProps extends CompanyInformationValues {
  onSave?: (values: CompanyInformationValues) => void;
}
