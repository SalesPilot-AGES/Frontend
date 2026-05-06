import EditIcon from '@mui/icons-material/Edit';
import { Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import type { JSX } from 'react';

import { CompanyInformationView } from './CompanyInformationView/CompanyInformationView';
import type { CompanyInformationValues } from './CompanyInformationView/types';

export interface ICompanyInformationProps {
  viewValues: CompanyInformationValues;
  onEdit?: () => void;
}

export const CompanyInformation = ({
  viewValues,
  onEdit,
}: ICompanyInformationProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        width: '100%',
        border: `1px solid ${palette.neutrals[200]}`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1.5}
        sx={{ mb: 3 }}
      >
        <Typography variant="h2">Informações da empresa</Typography>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEdit}
          aria-label="Editar informações da empresa"
        >
          Editar
        </Button>
      </Stack>
      <CompanyInformationView {...viewValues} />
    </Paper>
  );
};
