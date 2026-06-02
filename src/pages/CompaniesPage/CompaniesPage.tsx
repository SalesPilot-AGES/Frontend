import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { EPlan } from '@data/enums/EPlan';
import { EStatus } from '@data/enums/EStatus';
import type { DataTableProps, TPlan } from '@declarations/ui';
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

// TODO: remover quando a API retornar esses campos
type CompanyWithStats = TCompany & {
  managers: number;
  sellers: number;
  meetings: number;
};

export const CompaniesPage = (): JSX.Element => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetCompanies();
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const navigate = useNavigate();

  // TODO: remover mock quando a API retornar managers, sellers e meetings
  const companies: CompanyWithStats[] = (data?.content ?? []).map(
    (company, index) => ({
      ...company,
      managers: (index % 4) + 1,
      sellers: (index % 8) + 5,
      meetings: (index % 10) * 12 + 50,
    })
  );

  const filteredCompanies = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return companies.filter((company) => {
      if (filterValue === 'true' && !company.active) return false;
      if (filterValue === 'false' && company.active) return false;
      if (query.length === 0) return true;
      const nameMatch = company.name.toLowerCase().includes(query);
      const taxIdMatch = company.tax_id.toLowerCase().includes(query);
      return nameMatch || taxIdMatch;
    });
  }, [companies, searchValue, filterValue]);

  const columns: DataTableProps<CompanyWithStats>['columns'] = [
    {
      header: ECardLabel.COMPANY_NAME,
      accessor: (row: CompanyWithStats) => row.name,
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
      header: ECardLabel.MANAGERS,
      accessor: (row: CompanyWithStats) => row.managers,
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
      header: ECardLabel.SALESMAN,
      accessor: (row: CompanyWithStats) => row.sellers,
      render: (value: ReactNode) => (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <PersonIcon
            sx={{ color: palette.salesmen[500], fontSize: '1.5rem' }}
          />
          <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
            {value ?? '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      header: ECardLabel.TOTAL_MEETINGS,
      accessor: (row: CompanyWithStats) => row.meetings,
      render: (value: ReactNode) => (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <EventIcon
            sx={{ color: palette.meetings[500], fontSize: '1.5rem' }}
          />
          <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
            {value ?? '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      header: 'Plano',
      accessor: (row: CompanyWithStats) => row.plan,
      render: (_value: ReactNode, row: CompanyWithStats) => (
        <PlanBadge plan={planLabelMap[row.plan]} />
      ),
    },
    {
      header: 'Status',
      accessor: (row: CompanyWithStats) => row.active,
      render: (_value: ReactNode, row: CompanyWithStats) => (
        <StatusBadge active={row.active} />
      ),
    },
  ];

  const activeCompanies = companies.filter((company) => company.active).length;
  const inactiveCompanies = companies.filter(
    (company) => !company.active
  ).length;
  const totalMeetings = companies.reduce(
    (acc, company) => acc + company.meetings,
    0
  );

  return (
    <PageContainter>
      <AddCompanyModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
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
            onClick={() => setOpenAddModal(true)}
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
          getRowId={(row: CompanyWithStats) => row.id}
          loading={isLoading}
          sx={{
            border: `1px solid ${palette.neutrals[200]}`,
            flex: 1,
            minHeight: 0,
          }}
          onDetailsClick={(rowId) => {
            navigate({
              to: EPageRoutes.COMPANY_DETAIL,
              params: { companyId: String(rowId) },
            });
          }}
          onSearchChange={setSearchValue}
          onFilterChange={setFilterValue}
          searchValue={searchValue}
          filterValue={filterValue}
          toolbarTitle="Lista de empresas"
          searchPlaceholder="Buscar empresa..."
          searchAriaLabel="Buscar empresa"
          filterPlaceholder="Filtrar"
          filterAriaLabel="Filtrar empresas"
          filterOptions={[
            { label: 'Todos', value: '' },
            { label: EStatus.ACTIVE, value: 'true' },
            { label: EStatus.INACTIVE, value: 'false' },
          ]}
        />
      </Stack>
    </PageContainter>
  );
};
