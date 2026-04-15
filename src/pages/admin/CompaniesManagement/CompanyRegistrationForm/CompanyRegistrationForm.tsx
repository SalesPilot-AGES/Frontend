import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { PlanComponent } from '@UI/PlanComponent/PlanComponent';
import type { JSX } from 'react';
import { useState } from 'react';

import { CompanyRegistrationInput } from '../CompanyRegistrationInput/CompanyRegistrationInput';
import {
  StyledCompanyRegistrationForm,
  StyledCompanyRegistrationRow,
  StyledCompanyStatusContainer,
  StyledCompanyStatusContent,
  StyledCompanyStatusLabel,
} from './CompanyRegistrationForm.style';

export const CompanyRegistrationForm = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <StyledCompanyRegistrationForm>
      <StyledCompanyRegistrationRow>
        <CompanyRegistrationInput
          name="companyName"
          label="Nome da empresa"
          placeholder="Digite o nome da empresa"
          sx={{
            width: { xs: '100%', md: '20rem' },
            flex: { xs: '1 0 0', md: '0 0 20rem' },
          }}
        />

        <PlanComponent name="plan" />
      </StyledCompanyRegistrationRow>

      <StyledCompanyRegistrationRow>
        <CompanyRegistrationInput
          name="cnpj"
          label="CNPJ"
          placeholder="00.000.000/0000-00"
          sx={{
            width: { xs: '100%', md: '20rem' },
            flex: { xs: '1 0 0', md: '0 0 20rem' },
          }}
        />

        <StyledCompanyStatusContainer>
          <StyledCompanyStatusLabel>Status</StyledCompanyStatusLabel>
          <StyledCompanyStatusContent>
            <Typography variant="body2">
              {isActive ? 'Ativo' : 'Desativo'}
            </Typography>

            <Switch
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              sx={(theme) => ({
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: theme.palette.success[300],
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: theme.palette.success[300],
                },
              })}
              slotProps={{
                input: {
                  'aria-label': 'status da empresa',
                },
              }}
            />
          </StyledCompanyStatusContent>
        </StyledCompanyStatusContainer>
      </StyledCompanyRegistrationRow>

      <Box sx={{ width: { xs: '100%', md: '20rem' } }}>
        <CompanyRegistrationInput
          name="phone"
          label="Telefone"
          placeholder="(00) 00000-0000"
        />
      </Box>

      <Box sx={{ width: { xs: '100%', md: '20rem' } }}>
        <CompanyRegistrationInput
          name="address"
          label="Endereço"
          placeholder="Rua, número e bairro"
        />
      </Box>
    </StyledCompanyRegistrationForm>
  );
};
