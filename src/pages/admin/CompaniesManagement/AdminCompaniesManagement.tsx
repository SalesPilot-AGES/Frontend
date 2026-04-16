import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageTitles } from '@data/enums/EPageTitles';
import { EStatus } from '@data/enums/EStatus';
import type { MockCompany } from '@data/mocks/Companies';
import { mockCompanies } from '@data/mocks/Companies';
import type { DataTableProps } from '@declarations/ui';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventIcon from '@mui/icons-material/Event';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { StatCard } from '@UI/StatCard/StatCard';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';

export const AdminCompaniesManagement = (): JSX.Element => {
  const { palette } = useTheme();
  const companies = mockCompanies;

  const columns: DataTableProps<MockCompany>['columns'] = [
    {
      header: ECardLabel.COMPANY_NAME,
      accessor: (row: MockCompany) => row.company,
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
      accessor: (row: MockCompany) => row.managers,
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
      accessor: (row: MockCompany) => row.sellers,
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
      accessor: (row: MockCompany) => row.meetings,
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
      accessor: (row: MockCompany) => row.plan,
      render: (_value: ReactNode, row: MockCompany) => (
        <PlanBadge plan={row.plan} />
      ),
    },
    {
      header: 'Status',
      accessor: (row: MockCompany) => row.status,
      render: (_value: ReactNode, row: MockCompany) => (
        <StatusBadge active={row.status === EStatus.ACTIVE} />
      ),
    },
  ];

  const activeCompanies = companies.filter(
    (company) => company.status === EStatus.ACTIVE
  ).length;

  const inactiveCompanies = companies.filter(
    (company) => company.status === EStatus.INACTIVE
  ).length;

  const totalMeetings = companies.reduce(
    (acc, company) => acc + company.meetings,
    0
  );

  return (
    <PageContainter>
      <Stack spacing="2.5rem">
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <PageHeader
            title={EPageTitles.COMPANIES}
            subtitle={EpageDescriptions.COMPANIES}
          />

          <Button startIcon={<AddIcon />} variant="gradient">
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
          data={companies}
          columns={columns}
          getRowId={(row) => row.id}
          sx={{ border: `1px solid ${palette.neutrals[200]}` }}
          onDetailsClick={(rowId) => {
            console.log(rowId);
          }}
          onSearchChange={(value) => {
            console.log(value);
          }}
          onFilterChange={(value) => {
            console.log(value);
          }}
          searchValue=""
          filterValue=""
          toolbarTitle="Lista de empresas"
          searchPlaceholder="Buscar empresa..."
          searchAriaLabel="Buscar empresa"
          filterPlaceholder="Filtrar"
          filterAriaLabel="Filtrar empresas"
          filterOptions={[
            { label: 'Todos', value: '' },
            { label: EStatus.ACTIVE, value: EStatus.ACTIVE },
            { label: EStatus.INACTIVE, value: EStatus.INACTIVE },
          ]}
        />
      </Stack>
    </PageContainter>
  );
};
