import type { SxProps, Theme } from '@mui/material';
import type { ChangeEvent, JSX } from 'react';
import { useId } from 'react';

import {
  StyledCompanyRegistrationInputControl,
  StyledCompanyRegistrationInputLabel,
  StyledCompanyRegistrationInputTextField,
} from './CompanyRegistrationInput.style';

interface ICompanyRegistrationInputProps {
  label: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
}

export const CompanyRegistrationInput = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  sx,
}: ICompanyRegistrationInputProps): JSX.Element => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <StyledCompanyRegistrationInputControl sx={sx}>
      <StyledCompanyRegistrationInputLabel htmlFor={inputId}>
        {label}
      </StyledCompanyRegistrationInputLabel>

      <StyledCompanyRegistrationInputTextField
        id={inputId}
        name={name}
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </StyledCompanyRegistrationInputControl>
  );
};
