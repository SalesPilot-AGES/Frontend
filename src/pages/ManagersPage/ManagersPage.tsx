import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { DataTableProps } from '@declarations/ui';
import { useFilterOptions } from '@hooks/useFilterOptions';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TManager } from '@services/models/ManagerSchema';
import { useGetManagers } from '@services/queries/useManagers';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import { normalizeText } from '@utils/normalizeText';
import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { AddManagerModal } from './AddManagerModal/AddManagerModal';

type ManagerWithCompany = TManager & {
  companyName: string;
};

const filterGroupConfig = [
  {
    id: 'status',
    label: 'Status',
    accessor: (manager: ManagerWithCompany): string =>
      manager.active ? 'Ativo' : 'Inativo',
    formatter: (value: string): string => value,
  },
  {
    id: 'company',
    label: 'Empresa',
    accessor: (manager: ManagerWithCompany): string => manager.companyName,
    formatter: (value: string): string => value,
  },
];

export const ManagersPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const { data: managersData, isLoading } = useGetManagers(0, 20, {});

  const managers: ManagerWithCompany[] = useMemo(
    () =>
      (managersData?.content ?? []).map((manager) => ({
        ...manager,
        companyName: manager.company.name,
      })),
    [managersData?.content]
  );

  const filterGroups = useFilterOptions({
    data: managers,
    groups: filterGroupConfig,
  });

  const filteredManagers = useMemo((): ManagerWithCompany[] => {
    const query = normalizeText(searchValue.trim());
    return managers.filter((manager) => {
      // Filtro de busca
      if (query.length > 0) {
        const nameMatch = normalizeText(manager.name).includes(query);
        const emailMatch = normalizeText(manager.email).includes(query);
        const companyMatch = normalizeText(manager.companyName).includes(query);
        if (!nameMatch && !emailMatch && !companyMatch) return false;
      }

      // Filtro de Status
      const statusFilters = selectedFilters.status || [];
      if (statusFilters.length > 0) {
        const managerStatus = manager.active ? 'Ativo' : 'Inativo';
        if (!statusFilters.includes(managerStatus)) return false;
      }

      // Filtro de Empresa
      const companyFilters = selectedFilters.company || [];
      if (companyFilters.length > 0) {
        if (!companyFilters.includes(manager.companyName)) return false;
      }

      return true;
    });
  }, [managers, searchValue, selectedFilters]);

  const handleFilterChange = (
    groupId: string,
    selectedValues: string[]
  ): void => {
    setSelectedFilters((prev) => ({ ...prev, [groupId]: selectedValues }));
  };

  const handleClearFilters = (): void => setSelectedFilters({});

  const handleDetailsClick = (rowId: string | number): void => {
    void navigate({
      to: EPageRoutes.MANAGER_DETAIL,
      params: { id: String(rowId) },
    });
  };

  const renderManagerName = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <ManageAccountsIcon
        sx={{ color: palette.managers[500], fontSize: '1.5rem' }}
      />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const renderEmail = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <MailIcon sx={{ color: palette.neutrals[300], fontSize: '1.5rem' }} />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const renderCompany = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <ApartmentIcon
        sx={{ color: palette.companies[500], fontSize: '1.5rem' }}
      />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const columns: DataTableProps<ManagerWithCompany>['columns'] = [
    {
      header: 'Nome do gestor',
      accessor: (row: ManagerWithCompany): string => row.name,
      render: renderManagerName,
    },
    {
      header: 'E-mail',
      accessor: (row: ManagerWithCompany): string => row.email,
      render: renderEmail,
    },
    {
      header: ECardLabel.COMPANY_NAME,
      accessor: (row: ManagerWithCompany): string => row.companyName,
      render: renderCompany,
    },
    {
      header: 'Status',
      accessor: (row: ManagerWithCompany): boolean => row.active,
      render: (_: ReactNode, row: ManagerWithCompany): JSX.Element => (
        <StatusBadge active={row.active} />
      ),
    },
  ];

  const activeManagers = managers.filter((m) => m.active).length;
  const inactiveManagers = managers.filter((m) => !m.active).length;

  return (
    <PageContainter>
      <Stack spacing="2.5rem" sx={{ height: '100%' }}>
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
            onClick={(): void => setIsModalOpen(true)}
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
          getRowId={(row: ManagerWithCompany): string => row.id}
          loading={isLoading}
          sx={{
            border: `1px solid ${palette.neutrals[200]}`,
            flex: 1,
            minHeight: 0,
          }}
          onDetailsClick={handleDetailsClick}
          filterType="advanced"
          filterGroups={filterGroups}
          selectedFilters={selectedFilters}
          onFilterChangeAdvanced={handleFilterChange}
          onClearFilters={handleClearFilters}
          filterLabel="Filtros"
          filterPlaceholderAdvanced="Filtrar gestores"
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          searchPlaceholder="Buscar gestor..."
          searchAriaLabel="Buscar gestor"
          toolbarTitle="Lista de gestores"
        />
      </Stack>

      <AddManagerModal
        open={isModalOpen}
        handleClose={(): void => setIsModalOpen(false)}
      />
    </PageContainter>
  );
};
