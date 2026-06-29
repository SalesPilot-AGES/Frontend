import { EpageDescriptions } from '@data/enums/EpageDescriptions';
import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { DataTableProps } from '@declarations/ui';
import { useFilterOptions } from '@hooks/useFilterOptions';
import { getSentimentConfig } from '@hooks/useSentiment';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import RealEstateAgentOutlinedIcon from '@mui/icons-material/RealEstateAgentOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { MeetingWithDate } from '@services/api/meeting';
import { useGetMeetings } from '@services/queries/useMeetings';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import { getFilterDateRange } from '@utils/getFilterDateRange';
import { normalizeText } from '@utils/normalizeText';
import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

const formatMeetingDate = (date: string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

const formatDuration = (minutes: number): string => {
  return `${minutes} min`;
};

const filterGroupConfig = [
  {
    id: 'seller',
    label: 'Vendedor',
    accessor: (meeting: MeetingWithDate): string => meeting.sellerName,
    formatter: (value: string): string => value,
  },
  {
    id: 'client',
    label: 'Cliente',
    accessor: (meeting: MeetingWithDate): string => meeting.clientName,
    formatter: (value: string): string => value,
  },
  {
    id: 'dateRange',
    label: 'Período',
    accessor: (meeting: MeetingWithDate): string => meeting.dateRange,
    formatter: (value: string): string => value,
  },
];

export const ManagerMeetingsPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const { data, isLoading } = useGetMeetings(0, 100, {});

  const meetings: MeetingWithDate[] = useMemo(
    () =>
      (data?.content ?? []).map((meeting) => ({
        ...meeting,
        dateRange: getFilterDateRange(meeting.date),
      })),
    [data?.content]
  );

  const filterGroups = useFilterOptions({
    data: meetings,
    groups: filterGroupConfig,
  });

  const filteredMeetings = useMemo((): MeetingWithDate[] => {
    const query = normalizeText(searchValue.trim());
    return meetings.filter((meeting) => {
      // Filtro de busca
      if (query.length > 0) {
        const titleMatch = normalizeText(meeting.title).includes(query);
        const sellerMatch = normalizeText(meeting.sellerName).includes(query);
        const clientMatch = normalizeText(meeting.clientName).includes(query);
        if (!titleMatch && !sellerMatch && !clientMatch) return false;
      }

      // Filtro de Vendedor
      const sellerFilters = selectedFilters.seller || [];
      if (sellerFilters.length > 0) {
        if (!sellerFilters.includes(meeting.sellerName)) return false;
      }

      // Filtro de Cliente
      const clientFilters = selectedFilters.client || [];
      if (clientFilters.length > 0) {
        if (!clientFilters.includes(meeting.clientName)) return false;
      }

      // Filtro de Data
      const dateFilters = selectedFilters.dateRange || [];
      if (dateFilters.length > 0) {
        const dateRange = getFilterDateRange(meeting.date);
        if (!dateFilters.includes(dateRange)) return false;
      }

      return true;
    });
  }, [meetings, searchValue, selectedFilters]);

  const handleFilterChange = (
    groupId: string,
    selectedValues: string[]
  ): void => {
    setSelectedFilters((prev) => ({ ...prev, [groupId]: selectedValues }));
  };

  const handleClearFilters = (): void => setSelectedFilters({});

  const handleDetailsClick = (rowId: string | number): void => {
    void navigate({
      to: EPageRoutes.SALESMAN_MEETINGS_DETAIL,
      params: { meetingId: String(rowId) },
    });
  };

  const summary = data?.summary;

  const successRatePercent =
    summary != null ? Math.round(summary.success_rate * 100) : undefined;
  const sentimentConfig = getSentimentConfig(successRatePercent);

  const columns: DataTableProps<MeetingWithDate>['columns'] = [
    {
      header: 'Reunião',
      accessor: (row: MeetingWithDate): string => row.title,
      render: (value: ReactNode): JSX.Element => (
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
      header: 'Vendedor',
      accessor: (row: MeetingWithDate): string => row.sellerName,
      render: (value: ReactNode): JSX.Element => (
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
      header: 'Cliente',
      accessor: (row: MeetingWithDate): string => row.clientName,
      render: (value: ReactNode, row): JSX.Element => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <RealEstateAgentOutlinedIcon
            sx={{ color: palette.primary[300], fontSize: '1.25rem' }}
          />
          <Stack spacing={0}>
            <Typography variant="body2" fontWeight={500}>
              {value ?? '-'}
            </Typography>
            <Typography variant="caption" color={palette.neutrals[500]}>
              {row.companyName}
            </Typography>
          </Stack>
        </Stack>
      ),
    },
    {
      header: 'Data',
      accessor: (row: MeetingWithDate): string => row.date,
      render: (value: ReactNode): JSX.Element => (
        <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
          {typeof value === 'string' ? formatMeetingDate(value) : '-'}
        </Typography>
      ),
    },
    {
      header: 'Duração',
      accessor: (row: MeetingWithDate): number => row.durationMinutes,
      render: (value: ReactNode): JSX.Element => (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <ScheduleIcon
            sx={{ color: palette.primary[500], fontSize: '1.5rem' }}
          />
          <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
            {typeof value === 'number' ? formatDuration(value) : '-'}
          </Typography>
        </Stack>
      ),
    },
  ];

  return (
    <PageContainter>
      <Stack spacing="2.5rem" sx={{ height: '100%' }}>
        <PageHeader
          title={EPageTitles.MEETINGS}
          subtitle={EpageDescriptions.MEETINGS}
        />

        <Box display="flex" gap="1.5rem">
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={summary?.total_meetings ?? 0}
            label="Total de reuniões"
          />
          <StatCard
            iconName="duration"
            theme="neutrals"
            value={
              summary
                ? `${Math.round(summary.average_duration_seconds / 60)} min`
                : '0 min'
            }
            label="Duração média"
          />
          <StatCard
            iconName={sentimentConfig.iconName}
            theme={sentimentConfig.theme}
            value={successRatePercent != null ? `${successRatePercent}%` : '0%'}
            label="Sentimento médio"
          />
        </Box>

        <DataTable
          data={filteredMeetings}
          columns={columns}
          getRowId={(row: MeetingWithDate): string => row.id}
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
          filterPlaceholderAdvanced="Filtrar reuniões"
          onSearchChange={setSearchValue}
          searchValue={searchValue}
          searchPlaceholder="Buscar reunião..."
          searchAriaLabel="Buscar reunião"
          toolbarTitle="Lista de reuniões"
        />
      </Stack>
    </PageContainter>
  );
};
