import type { UseFormSetValue } from 'react-hook-form';

export interface DemoAccountsInfoProps {
  setValue: UseFormSetValue<{ email: string; password: string }>;
  onSubmit: () => void;
}
