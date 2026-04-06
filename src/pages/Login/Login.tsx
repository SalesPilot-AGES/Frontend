import { Stack, useTheme } from '@mui/material';
import { type JSX } from 'react';

import { AppTitle } from './AppTitle/AppTitle';
import { LoginForm } from './LoginForm/LoginForm';

export const Login = (): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Stack
      sx={{
        display: 'flex',
        background: `linear-gradient(135deg, ${palette.companies[100]},  ${palette.neutrals[100]},  ${palette.primary[100]})`,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: '2rem',
      }}
    >
      <AppTitle />
      <LoginForm />
    </Stack>
  );
};
