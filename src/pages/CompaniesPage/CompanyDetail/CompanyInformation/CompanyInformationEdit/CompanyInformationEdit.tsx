import { Button, Paper, Stack, Typography } from '@mui/material';
import { useCompanyInformationEditForm } from '@pages/CompaniesPage/hooks/useCompanyInformationEditForm';
import type { Dispatch, JSX, SetStateAction } from 'react';

import type { CompanyInformationValues } from '../CompanyInformationView/types';
import { CompanyInformationEditFields } from './CompanyInformationEditFields/CompanyInformationEditFields';

export interface CompanyInformationEditProps {
  draft: CompanyInformationValues;
  setDraft: Dispatch<SetStateAction<CompanyInformationValues>>;
  onSaveSuccess?: () => void;
  onCancel?: () => void;
}

export const CompanyInformationEdit = ({
  draft,
  setDraft,
  onSaveSuccess,
  onCancel,
}: CompanyInformationEditProps): JSX.Element => {
  const {
    palette,
    control,
    handleSubmit,
    onSubmit,
    isValid,
    isSubmitting,
    labelColor,
    valueColor,
  } = useCompanyInformationEditForm({
    draft,
    setDraft,
    onSaveSuccess,
  });

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
        <Typography variant="h2">Editar informações da empresa</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="text" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          >
            Salvar
          </Button>
        </Stack>
      </Stack>

      <CompanyInformationEditFields
        draft={draft}
        setDraft={setDraft}
        control={control}
        labelColor={labelColor}
        valueColor={valueColor}
        palette={palette}
      />
    </Paper>
  );
};
