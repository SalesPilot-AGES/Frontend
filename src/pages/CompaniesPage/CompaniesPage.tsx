import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { EPlan } from '@data/enums/EPlan';
import type { DataTableProps, TPlan } from '@declarations/ui';
import { useFilterOptions } from '@hooks/useFilterOptions';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventIcon from '@mui/icons-material/Event';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TCompany } from '@services/models/CompanySchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { StatCard } from '@UI/StatCard/StatCard';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';
import React, { useMemo, useState } from 'react';

import { AddCompanyModal } from './AddCompanyModal/AddCompanyModal';

const planLabelMap: Record<TCompany['plan'], TPlan> = {
  BASIC: EPlan.BASIC,
  PRO: EPlan.PRO,
  ENTERPRISE: EPlan.ENTERPRISE,
};

type CompanyWithStats = TCompany & {
  managers: number;
  sellers: number;
  meetings: number;
};

const filterGroupConfig = [
  {
    id: 'status',
    label: 'Status',
    accessor: (company: CompanyWithStats): string =>
      company.active ? 'Ativo' : 'Inativo',
    formatter: (value: string): string => value,
  },
  {
    id: 'plan',
    label: 'Plano',
    accessor: (company: CompanyWithStats): string => company.plan,
    formatter: (value: string): string => {
      const map: Record<string, string> = {
        BASIC: 'Básico',
        PRO: 'Profissional',
        ENTERPRISE: 'Enterprise',
      };
      return map[value] || value;
    },
  },
];

export const CompaniesPage = (): JSX.Element => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetCompanies();
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const navigate = useNavigate();

  const companies: CompanyWithStats[] = (data?.content ?? []).map(
    (company, index) => ({
      ...company,
      managers: (index % 4) + 1,
      sellers: (index % 8) + 5,
      meetings: (index % 10) * 12 + 50,
    })
  );

  const filterGroups = useFilterOptions({
    data: companies,
    groups: filterGroupConfig,
  });

  const filteredCompanies = useMemo((): CompanyWithStats[] => {
    const query = searchValue.trim().toLowerCase();
    return companies.filter((company) => {
      if (query.length > 0) {
        const nameMatch = company.name.toLowerCase().includes(query);
        const taxIdMatch = company.tax_id.toLowerCase().includes(query);
        if (!nameMatch && !taxIdMatch) return false;
      }
      const statusFilters = selectedFilters.status || [];
      if (statusFilters.length > 0) {
        const companyStatus = company.active ? 'Ativo' : 'Inativo';
        if (!statusFilters.includes(companyStatus)) return false;
      }
      const planFilters = selectedFilters.plan || [];
      if (planFilters.length > 0 && !planFilters.includes(company.plan))
        return false;
      const managerFilters = selectedFilters.managers || [];
      if (managerFilters.length > 0) {
        const managerCount = String(company.managers);
        if (!managerFilters.includes(managerCount)) return false;
      }
      return true;
    });
  }, [companies, searchValue, selectedFilters]);

  const handleFilterChange = (
    groupId: string,
    selectedValues: string[]
  ): void => {
    setSelectedFilters((prev) => ({ ...prev, [groupId]: selectedValues }));
  };

  const handleClearFilters = (): void => setSelectedFilters({});

  const handleDetailsClick = (rowId: string | number): void => {
    void navigate({
      to: EPageRoutes.COMPANY_DETAIL,
      params: { companyId: String(rowId) },
    });
  };

  const renderCompanyName = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <ApartmentIcon
        sx={{ color: palette.companies[500], fontSize: '1.5rem' }}
      />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const renderManagers = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <ManageAccountsIcon
        sx={{ color: palette.managers[500], fontSize: '1.5rem' }}
      />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const renderSellers = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <PersonIcon sx={{ color: palette.salesmen[500], fontSize: '1.5rem' }} />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const renderMeetings = (value: ReactNode): JSX.Element => (
    <Stack direction="row" alignItems="center" spacing="0.5rem">
      <EventIcon sx={{ color: palette.meetings[500], fontSize: '1.5rem' }} />
      <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
        {value ?? '-'}
      </Typography>
    </Stack>
  );

  const columns: DataTableProps<CompanyWithStats>['columns'] = [
    {
      header: ECardLabel.COMPANY_NAME,
      accessor: (row: CompanyWithStats): string => row.name,
      render: renderCompanyName,
    },
    {
      header: ECardLabel.MANAGERS,
      accessor: (row: CompanyWithStats): number => row.managers,
      render: renderManagers,
    },
    {
      header: ECardLabel.SALESMAN,
      accessor: (row: CompanyWithStats): number => row.sellers,
      render: renderSellers,
    },
    {
      header: ECardLabel.TOTAL_MEETINGS,
      accessor: (row: CompanyWithStats): number => row.meetings,
      render: renderMeetings,
    },
    {
      header: 'Plano',
      accessor: (row: CompanyWithStats): string => row.plan,
      render: (_: ReactNode, row: CompanyWithStats): JSX.Element => (
        <PlanBadge plan={planLabelMap[row.plan]} />
      ),
    },
    {
      header: 'Status',
      accessor: (row: CompanyWithStats): boolean => row.active,
      render: (_: ReactNode, row: CompanyWithStats): JSX.Element => (
        <StatusBadge active={row.active} />
      ),
    },
  ];

  const activeCompanies = companies.filter((c) => c.active).length;
  const inactiveCompanies = companies.filter((c) => !c.active).length;
  const totalMeetings = companies.reduce((acc, c) => acc + c.meetings, 0);

  return (
    <PageContainter>
      <AddCompanyModal
        open={openAddModal}
        handleClose={(): void => setOpenAddModal(false)}
      />
      <Stack spacing="2.5rem" sx={{ height: '100%' }}>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <PageHeader
            title={EPageTitles.COMPANIES}
            subtitle={EpageDescriptions.COMPANIES}
          />
          <Button
            startIcon={<AddIcon />}
            variant="gradient"
            onClick={(): void => setOpenAddModal(true)}
          >
            Adicionar empresa
          </Button>
        </Box>
        <Box display="flex" gap="1.5rem">
          <StatCard
            iconName="company"
            theme="companies"
            value={activeCompanies}
            label={ECardLabel.ACTIVE_COMPANIES}
          />
          <StatCard
            iconName="company"
            theme="neutrals"
            value={inactiveCompanies}
            label={ECardLabel.INACTIVE_COMPANIES}
          />
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={totalMeetings}
            label={ECardLabel.TOTAL_MEETINGS}
          />
        </Box>
        <DataTable
          data={filteredCompanies}
          columns={columns}
          getRowId={(row: CompanyWithStats): string => row.id}
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
          filterPlaceholderAdvanced="Filtrar empresas"
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          searchPlaceholder="Buscar empresa..."
          searchAriaLabel="Buscar empresa"
          toolbarTitle="Lista de empresas"
        />
      </Stack>
    </PageContainter>
  );
};
