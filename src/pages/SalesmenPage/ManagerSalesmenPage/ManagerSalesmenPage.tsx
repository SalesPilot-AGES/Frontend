import { ECardLabel } from '@data/enums/ECardLabel';
import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import { useFilterOptions } from '@hooks/useFilterOptions';
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
import { normalizeText } from '@utils/normalizeText';
import type { JSX } from 'react';
import { useMemo, useState } from 'react';

import { AddSalesmanModal } from '../AddSalesmanModal/AddSalesmanModal';
import { formatAverageSentiment } from '../AdminSalesmenPage/salesmenColumns';
import { buildManagerSalesmenColumns } from './salesmenColumns';

type SalesmanWithCompany = TSalesmanWithCompany & {
  sentimentRange: string;
};

const getSentimentRange = (sentiment: number | null | undefined): string => {
  if (sentiment === null || sentiment === undefined) return 'Sem dados';
  const percent = sentiment * 100;
  if (percent <= 40) return '0% a 40%';
  if (percent <= 60) return '41% a 60%';
  return '61% a 100%';
};

const filterGroupConfig = [
  {
    id: 'status',
    label: 'Status',
    accessor: (salesman: SalesmanWithCompany): string =>
      salesman.active ? 'Ativo' : 'Inativo',
    formatter: (value: string): string => value,
  },
  {
    id: 'sentiment',
    label: 'Sentimento Médio',
    accessor: (salesman: SalesmanWithCompany): string =>
      getSentimentRange(salesman.average_sentiment),
    formatter: (value: string): string => value,
  },
];

export const ManagerSalesmenPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate({ from: EPageRoutes.SALESMEN });
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: salesmenData, isLoading } = useGetSalesmen(0, 20, {});

  const salesmen: SalesmanWithCompany[] = useMemo(
    () =>
      (salesmenData?.content ?? []).map((salesman) => ({
        ...salesman,
        sentimentRange: getSentimentRange(salesman.average_sentiment),
      })),
    [salesmenData?.content]
  );

  const filterGroups = useFilterOptions({
    data: salesmen,
    groups: filterGroupConfig,
  });

  const filteredSalesmen = useMemo((): SalesmanWithCompany[] => {
    const query = normalizeText(searchValue.trim());
    return salesmen.filter((salesman) => {
      // Filtro de busca
      if (query.length > 0) {
        const nameMatch = normalizeText(salesman.name).includes(query);
        const emailMatch = normalizeText(salesman.email).includes(query);
        if (!nameMatch && !emailMatch) return false;
      }

      // Filtro de Status
      const statusFilters = selectedFilters.status || [];
      if (statusFilters.length > 0) {
        const salesmanStatus = salesman.active ? 'Ativo' : 'Inativo';
        if (!statusFilters.includes(salesmanStatus)) return false;
      }

      // Filtro de Sentimento
      const sentimentFilters = selectedFilters.sentiment || [];
      if (sentimentFilters.length > 0) {
        const sentimentRange = getSentimentRange(salesman.average_sentiment);
        if (!sentimentFilters.includes(sentimentRange)) return false;
      }

      return true;
    });
  }, [salesmen, searchValue, selectedFilters]);

  const handleFilterChange = (
    groupId: string,
    selectedValues: string[]
  ): void => {
    setSelectedFilters((prev) => ({ ...prev, [groupId]: selectedValues }));
  };

  const handleClearFilters = (): void => setSelectedFilters({});

  const handleDetailsClick = (rowId: string | number): void => {
    void navigate({
      to: EPageRoutes.SALESMAN_DETAIL,
      params: { id: String(rowId) },
    });
  };

  const columns = useMemo(
    () => buildManagerSalesmenColumns(palette),
    [palette]
  );

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
      <Stack spacing="2.5rem" sx={{ height: '100%' }}>
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
            onClick={(): void => setIsModalOpen(true)}
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
          getRowId={(row: SalesmanWithCompany): string => row.id}
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
          filterPlaceholderAdvanced="Filtrar vendedores"
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          searchPlaceholder="Buscar vendedor..."
          searchAriaLabel="Buscar vendedor"
          toolbarTitle="Lista de vendedores"
        />
      </Stack>
      <AddSalesmanModal
        open={isModalOpen}
        handleClose={(): void => setIsModalOpen(false)}
        variant="manager"
      />
    </PageContainter>
  );
};
