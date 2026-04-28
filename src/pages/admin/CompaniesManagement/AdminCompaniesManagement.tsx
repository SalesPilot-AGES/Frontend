import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { EPlan } from '@data/enums/EPlan';
import { EStatus } from '@data/enums/EStatus';
import type { DataTableProps, TPlan } from '@declarations/ui';
import AddIcon from '@mui/icons-material/Add';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TCompany, TCompanyFilters } from '@services/models/CompanySchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { StatCard } from '@UI/StatCard/StatCard';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';
import React, { useState } from 'react';

import { AddCompanyModal } from './AddCompanyModal/AddCompanyModal';

const planLabelMap: Record<TCompany['plan'], TPlan> = {
  BASIC: EPlan.BASIC,
  PRO: EPlan.PRO,
  ENTERPRISE: EPlan.ENTERPRISE,
};

export const AdminCompaniesManagement = (): JSX.Element => {
  const { palette } = useTheme();
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [filters, setFilters] = useState<TCompanyFilters>({});

  const { data, isLoading } = useGetCompanies(0, 10, filters);
  const navigate = useNavigate();

  const companies = data?.content ?? [];

  const columns: DataTableProps<TCompany>['columns'] = [
    {
      header: ECardLabel.COMPANY_NAME,
      accessor: (row: TCompany) => row.name,
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
      header: 'CNPJ',
      accessor: (row: TCompany) => row.tax_id,
    },
    {
      header: 'Plano',
      accessor: (row: TCompany) => row.plan,
      render: (_value: ReactNode, row: TCompany) => (
        <PlanBadge plan={planLabelMap[row.plan]} />
      ),
    },
    {
      header: 'Status',
      accessor: (row: TCompany) => row.active,
      render: (_value: ReactNode, row: TCompany) => (
        <StatusBadge active={row.active} />
      ),
    },
  ];

  const activeCompanies = data?.content.filter(
    (company) => company.active
  ).length;
  const inactiveCompanies = data?.content.filter(
    (company) => !company.active
  ).length;

  return (
    <PageContainter>
      <AddCompanyModal
        open={openAddModal}
        handleClose={() => setOpenAddModal(false)}
      />
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
            value={String(activeCompanies)}
            label={ECardLabel.ACTIVE_COMPANIES}
          />

          <StatCard
            iconName="company"
            theme="neutrals"
            value={String(inactiveCompanies)}
            label={ECardLabel.INACTIVE_COMPANIES}
          />
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={'placeholder'}
            label={ECardLabel.TOTAL_MEETINGS}
          />
        </Box>

        <DataTable
          data={companies}
          columns={columns}
          getRowId={(row: TCompany) => row.id}
          loading={isLoading}
          sx={{ border: `1px solid ${palette.neutrals[200]}` }}
          onDetailsClick={(rowId) => {
            navigate({
              to: EPageRoutes.COMPANY_DETAIL,
              params: { companyId: String(rowId) },
            });
          }}
          onSearchChange={(value) => setFilters({ ...filters, name: value })}
          onFilterChange={(value) =>
            setFilters({
              ...filters,
              active: value ? value === 'true' : undefined,
            })
          }
          searchValue={filters.name}
          filterValue={filters.active == null ? '' : String(filters.active)}
          toolbarTitle="Lista de empresas"
          searchPlaceholder="Buscar empresa..."
          searchAriaLabel="Buscar empresa"
          filterPlaceholder="Filtrar por status"
          filterAriaLabel="Filtrar empresas"
          filterOptions={[
            { label: 'Todos os status', value: '' },
            { label: EStatus.ACTIVE, value: 'true' },
            { label: EStatus.INACTIVE, value: 'false' },
          ]}
        />
      </Stack>
    </PageContainter>
  );
};
