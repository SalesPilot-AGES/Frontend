import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack } from '@mui/material';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import type { JSX } from 'react';
import { useState } from 'react';

import { AddSalesmanModal } from './AddSalesmanModal/AddSalesmanModal';

export const AdminSalesmenManagement = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageContainter>
      <Stack spacing="2.5rem">
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <PageHeader
            title={EPageTitles.SALESMEN}
            subtitle={EpageDescriptions.SALESMEN}
          />
          <Button
            startIcon={<AddIcon />}
            variant="gradient"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar vendedor
          </Button>
        </Box>
      </Stack>

      <AddSalesmanModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </PageContainter>
  );
};
