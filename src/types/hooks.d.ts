import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export type TColorThemeOptions =
  | 'primary'
  | 'companies'
  | 'managers'
  | 'salesmen'
  | 'meetings'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'neutrals';

export type TColorThemeResult = {
  color: string;
  backgroundColor: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type UseLoginFormReturn = {
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onSubmit: (data: LoginFormData) => Promise<void>;
  setValue: UseFormSetValue<LoginFormData>;
};
