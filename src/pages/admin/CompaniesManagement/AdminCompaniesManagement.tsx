import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { Box, Button } from '@mui/material';
import AppModal from '@UI/AppModal/AppModal';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';
import { useState } from 'react';

import { CompanyRegistrationForm } from './CompanyRegistrationForm/CompanyRegistrationForm';

export const AdminCompaniesManagement = (): JSX.Element => {
  const [isRegisterCompanyModalOpen, setIsRegisterCompanyModalOpen] =
    useState(false);

  const handleOpenRegisterCompanyModal = (): void => {
    setIsRegisterCompanyModalOpen(true);
  };

  const handleCloseRegisterCompanyModal = (): void => {
    setIsRegisterCompanyModalOpen(false);
  };

  return (
    <PageContainter>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        <PageHeader
          title={EPageTitles.COMPANIES}
          subtitle={EpageDescriptions.COMPANIES}
        />

        <Button
          variant="contained"
          onClick={handleOpenRegisterCompanyModal}
          sx={{
            width: 'fit-content',
            textTransform: 'none',
          }}
        >
          Abrir modal temporário
        </Button>

        <AppModal
          modalName="Adicionar empresa"
          open={isRegisterCompanyModalOpen}
          handleClose={handleCloseRegisterCompanyModal}
        >
          <CompanyRegistrationForm />
        </AppModal>
      </Box>
    </PageContainter>
  );
};
