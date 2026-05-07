import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { EStatus } from '@data/enums/EStatus';
import { getSentimentConfig } from '@hooks/useSentiment';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TSalesmanWithCompany } from '@services/models/SalesmanSchema';
import { useGetSalesmen } from '@services/queries/useSalesmen';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX } from 'react';
import { useMemo, useState } from 'react';

import { AddSalesmanModal } from '../AddSalesmanModal/AddSalesmanModal';
import {
  buildSalesmenColumns,
  formatAverageSentiment,
} from './salesmenColumns';

export const AdminSalesmenPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: salesmenData, isLoading } = useGetSalesmen(0, 20, {});
  const salesmen = useMemo(
    () => salesmenData?.content ?? [],
    [salesmenData?.content]
  );

  const filteredSalesmen = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return salesmen.filter((salesman) => {
      if (filterValue === 'true' && !salesman.active) return false;
      if (filterValue === 'false' && salesman.active) return false;
      if (query.length === 0) return true;
      const nameMatch = salesman.name.toLowerCase().includes(query);
      const emailMatch = salesman.email.toLowerCase().includes(query);
      const companyMatch = salesman.company.name.toLowerCase().includes(query);
      return nameMatch || emailMatch || companyMatch;
    });
  }, [salesmen, searchValue, filterValue]);

  const columns = useMemo(() => buildSalesmenColumns(palette), [palette]);

  const activeSalesmen = salesmen.filter((salesman) => salesman.active).length;
  const inactiveSalesmen = salesmen.filter(
    (salesman) => !salesman.active
  ).length;
  const sentimentSamples = salesmen
    .map((salesman) => salesman.average_sentiment)
    .filter((value): value is number => typeof value === 'number');
  const averageSentiment =
    sentimentSamples.length > 0
      ? sentimentSamples.reduce((sum, value) => sum + value, 0) /
        sentimentSamples.length
      : 0;

  const averageSentimentPercent =
    sentimentSamples.length > 0
      ? Math.round(averageSentiment * 100)
      : undefined;
  const averageSentimentConfig = getSentimentConfig(averageSentimentPercent);

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

        <Box display="flex" gap="1.5rem">
          <StatCard
            iconName="salesman"
            theme="salesmen"
            value={activeSalesmen}
            label={ECardLabel.ACTIVE_SALESMAN}
          />

          <StatCard
            iconName="salesman"
            theme="neutrals"
            value={inactiveSalesmen}
            label={ECardLabel.INACTIVE_SALESMAN}
          />

          <StatCard
            iconName={averageSentimentConfig.iconName}
            theme={averageSentimentConfig.theme}
            value={formatAverageSentiment(averageSentiment)}
            label={ECardLabel.AVERAGE_FEELING}
            valueColor={palette.neutrals[900]}
          />
        </Box>

        <DataTable
          data={filteredSalesmen}
          columns={columns}
          getRowId={(row: TSalesmanWithCompany) => row.id}
          loading={isLoading}
          sx={{ border: `1px solid ${palette.neutrals[200]}` }}
          onDetailsClick={(rowId) => {
            navigate({
              to: EPageRoutes.SALESMAN_DETAIL,
              params: { id: String(rowId) },
            });
          }}
          onSearchChange={setSearchValue}
          onFilterChange={setFilterValue}
          searchValue={searchValue}
          filterValue={filterValue}
          toolbarTitle="Lista de vendedores"
          searchPlaceholder="Buscar vendedor..."
          searchAriaLabel="Buscar vendedor"
          filterPlaceholder="Filtrar"
          filterAriaLabel="Filtrar vendedores"
          filterOptions={[
            { label: 'Todos', value: '' },
            { label: EStatus.ACTIVE, value: 'true' },
            { label: EStatus.INACTIVE, value: 'false' },
          ]}
        />
      </Stack>
      <AddSalesmanModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </PageContainter>
  );
};
