import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { EStatus } from '@data/enums/EStatus';
import type { DataTableProps } from '@declarations/ui';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TManagerWithCompany } from '@services/models/ManagerSchema';
import { useGetManagers } from '@services/queries/useManagers';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { AddManagerModal } from './AddManagerModal/AddManagerModal';

export const AdminManagersManagement = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const { data: managers = [], isLoading } = useGetManagers();

  const filteredManagers = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return managers.filter((manager) => {
      if (filterValue === 'true' && !manager.active) {
        return false;
      }
      if (filterValue === 'false' && manager.active) {
        return false;
      }
      if (query.length === 0) {
        return true;
      }
      const nameMatch = manager.name.toLowerCase().includes(query);
      const emailMatch = manager.email.toLowerCase().includes(query);
      const companyMatch = manager.company.name.toLowerCase().includes(query);
      return nameMatch || emailMatch || companyMatch;
    });
  }, [managers, searchValue, filterValue]);

  const columns: DataTableProps<TManagerWithCompany>['columns'] = [
    {
      header: 'Nome do gestor',
      accessor: (row: TManagerWithCompany) => row.name,
      render: (value: ReactNode) => (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <ManageAccountsIcon
            sx={{ color: palette.managers[500], fontSize: '1.5rem' }}
          />
          <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
            {value ?? '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      header: 'E-mail',
      accessor: (row: TManagerWithCompany) => row.email,
      render: (value: ReactNode) => (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <MailIcon sx={{ color: palette.neutrals[300], fontSize: '1.5rem' }} />
          <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
            {value ?? '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      header: ECardLabel.COMPANY_NAME,
      accessor: (row: TManagerWithCompany) => row.company.name,
      render: (value: ReactNode) => (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <ApartmentIcon
            sx={{ color: palette.companies[500], fontSize: '1.5rem' }}
          />
          <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
            {value ?? '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      header: 'Status',
      accessor: (row: TManagerWithCompany) => row.active,
      render: (_value: ReactNode, row: TManagerWithCompany) => (
        <StatusBadge active={row.active} />
      ),
    },
  ];

  const activeManagers = managers.filter((manager) => manager.active).length;
  const inactiveManagers = managers.filter((manager) => !manager.active).length;

  return (
    <PageContainter>
      <Stack spacing="2.5rem">
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <PageHeader
            title={EPageTitles.MANAGERS}
            subtitle={EpageDescriptions.MANAGERS}
          />

          <Button
            startIcon={<AddIcon />}
            variant="gradient"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar gestor
          </Button>
        </Box>

        <Box display="flex" gap="1.5rem">
          <StatCard
            iconName="manager"
            theme="managers"
            value={activeManagers}
            label={ECardLabel.ACTIVE_MANAGERS}
          />

          <StatCard
            iconName="manager"
            theme="neutrals"
            value={inactiveManagers}
            label={ECardLabel.INACTIVE_MANAGERS}
          />
        </Box>

        <DataTable
          data={filteredManagers}
          columns={columns}
          getRowId={(row: TManagerWithCompany) => row.id}
          loading={isLoading}
          sx={{ border: `1px solid ${palette.neutrals[200]}` }}
          onDetailsClick={(rowId) => {
            navigate({
              to: EPageRoutes.ADMIN_MANAGERS_DETAILS,
              params: { id: String(rowId) },
            });
          }}
          onSearchChange={setSearchValue}
          onFilterChange={setFilterValue}
          searchValue={searchValue}
          filterValue={filterValue}
          toolbarTitle="Lista de gestores"
          searchPlaceholder="Buscar gestor..."
          searchAriaLabel="Buscar gestor"
          filterPlaceholder="Filtrar"
          filterAriaLabel="Filtrar gestores"
          filterOptions={[
            { label: 'Todos', value: '' },
            { label: EStatus.ACTIVE, value: 'true' },
            { label: EStatus.INACTIVE, value: 'false' },
          ]}
        />
      </Stack>

      <AddManagerModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </PageContainter>
  );
};
