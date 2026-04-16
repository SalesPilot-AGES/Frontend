import type { TPlan } from '@declarations/ui';

export interface CompanyInformationValues {
  displayId: string;
  name: string;
  cnpj: string;
  phone: string;
  address: string;
  plan: TPlan;
  active: boolean;
}

export interface CompanyInformationProps extends CompanyInformationValues {
  onSave?: (values: CompanyInformationValues) => void;
}
