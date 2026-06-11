import { EPageTitles } from '@data/enums/EPageTitles';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button } from '@mui/material';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import type { Dispatch, JSX, SetStateAction } from 'react';

import type { CompanyInformationValues } from '../CompanyInformationView/types';
import { CompanyInformationEditFields } from './CompanyInformationEditFields/CompanyInformationEditFields';
import { useCompanyInformationEdit } from './useCompanyInformationEdit';

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
  } = useCompanyInformationEdit({
    draft,
    setDraft,
    onSaveSuccess,
  });

  return (
    <EntityDetailsCard
      title={EPageTitles.COMPANY_INFORMATION}
      headerRight={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          >
            Salvar
          </Button>
        </Box>
      }
    >
      <CompanyInformationEditFields
        draft={draft}
        setDraft={setDraft}
        control={control}
        labelColor={labelColor}
        valueColor={valueColor}
        palette={palette}
      />
    </EntityDetailsCard>
  );
};
