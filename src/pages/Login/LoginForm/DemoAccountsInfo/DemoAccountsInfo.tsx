import LoginIcon from '@mui/icons-material/Login';
import { Box, Button, Typography } from '@mui/material';
import type { JSX } from 'react';
import type { UseFormSetValue } from 'react-hook-form';

export interface IDemoAccountsInfoProps {
  setValue: UseFormSetValue<{ email: string; password: string }>;
  onSubmit: () => void;
}

const demoAccounts = [
  { label: 'Admin', email: 'ana@digitalsales.com' },
  { label: 'Manager', email: 'gabriel@digitalsales.com' },
  { label: 'Salesmen', email: 'saulo@digitalsales.com' },
];

const PASSWORD = 'password';

export const DemoAccountsInfo = ({
  setValue,
  onSubmit,
}: IDemoAccountsInfoProps): JSX.Element => {
  const handleFillCredentials = (email: string): void => {
    setValue('email', email, { shouldDirty: true, shouldValidate: true });
    setValue('password', PASSWORD, { shouldDirty: true, shouldValidate: true });
    onSubmit();
  };

  return (
    <Box sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mb: 1.5,
          color: '#666',
          fontWeight: 'bold',
        }}
      >
        Demo Accounts:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {demoAccounts.map((account) => (
          <Button
            key={account.email}
            variant="outlined"
            size="small"
            onClick={() => handleFillCredentials(account.email)}
            startIcon={<LoginIcon />}
            sx={{
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: '#666',
              borderColor: '#ddd',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderColor: '#999',
              },
            }}
          >
            <Typography variant="caption">
              • {account.label}: <strong>{account.email}</strong>
            </Typography>
          </Button>
        ))}
      </Box>
    </Box>
  );
};
