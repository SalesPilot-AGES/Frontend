import type { TPlan } from '@declarations/ui';

export interface CompanyInformationValues {
  id: string;
  name: string;
  tax_id: string;
  plan: TPlan;
  active: boolean;
  phone?: string | null;
  address?: string | null;
}

export interface CompanyInformationProps extends CompanyInformationValues {
  onSave?: (values: CompanyInformationValues) => void;
}
