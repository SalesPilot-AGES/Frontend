import { EPageTitles } from '@data/enums/EPageTitles';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { EntityDetailsCard } from '@UI/EntityDetailsCard/EntityDetailsCard';
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
}: ICompanyInformationProps): JSX.Element => (
  <EntityDetailsCard
    title={EPageTitles.COMPANY_INFORMATION}
    headerRight={
      onEdit ? (
        <Button variant="contained" startIcon={<EditIcon />} onClick={onEdit}>
          Editar
        </Button>
      ) : undefined
    }
  >
    <CompanyInformationView {...viewValues} />
  </EntityDetailsCard>
);
