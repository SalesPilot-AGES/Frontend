import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import type { JSX } from 'react';

import { CompanyInformationEdit } from './CompanyInformationEdit';
import { CompanyInformationView } from './CompanyInformationView';
import type { CompanyInformationProps } from './types';
import { useCompanyInformation } from './useCompanyInformation';

export type { CompanyInformationProps } from './types';

export const CompanyInformation = (
  props: CompanyInformationProps
): JSX.Element => {
  const { palette } = useTheme();
  const {
    isEditing,
    viewValues,
    draft,
    setDraft,
    startEdit,
    cancelEdit,
    saveEdit,
  } = useCompanyInformation(props);

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
        {isEditing ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<CloseIcon />}
              onClick={cancelEdit}
              aria-label="Cancelar edição das informações da empresa"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveEdit}
              aria-label="Salvar informações da empresa"
            >
              Salvar
            </Button>
          </Stack>
        ) : (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={startEdit}
            aria-label="Editar informações da empresa"
          >
            Editar
          </Button>
        )}
      </Stack>

      {isEditing ? (
        <CompanyInformationEdit draft={draft} setDraft={setDraft} />
      ) : (
        <CompanyInformationView viewValues={viewValues} />
      )}
    </Paper>
  );
};
