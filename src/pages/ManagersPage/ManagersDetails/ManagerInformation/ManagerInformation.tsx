import { EPageTitles } from '@data/enums/EPageTitles';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button } from '@mui/material';
import type { TManager } from '@services/models/ManagerSchema';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
import { type JSX } from 'react';

import { ManagerInformationEdit } from './ManagerInformationEdit/ManagerInformationEdit';
import { ManagerInformationView } from './ManagerInformationView/ManagerInformationView';
import { useManagerInformation } from './useManagerInformation';

type IManagerInformationProps = {
  manager: TManager;
};

export const ManagerInformation = ({
  manager,
}: IManagerInformationProps): JSX.Element => {
  const {
    companyOptions,
    isCompanyValid,
    isEditFormValid,
    isEditing,
    editForm,
    updateManagerMutation,
    handleEdit,
    handleCancelEdit,
    handleSaveEdit,
    handleFieldChange,
    handleStatusChange,
  } = useManagerInformation(manager);

  return (
    <EntityDetailsCard
      title={EPageTitles.MANAGER_INFORMATION}
      onEdit={isEditing ? undefined : handleEdit}
      headerRight={
        isEditing ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={handleCancelEdit}
              disabled={updateManagerMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveEdit}
              disabled={!isEditFormValid || updateManagerMutation.isPending}
            >
              Salvar
            </Button>
          </Box>
        ) : undefined
      }
    >
      {isEditing && editForm ? (
        <ManagerInformationEdit
          managerId={manager.id}
          editForm={editForm}
          isCompanyValid={isCompanyValid}
          companyOptions={companyOptions}
          onFieldChange={handleFieldChange}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <ManagerInformationView manager={manager} />
      )}
    </EntityDetailsCard>
  );
};
