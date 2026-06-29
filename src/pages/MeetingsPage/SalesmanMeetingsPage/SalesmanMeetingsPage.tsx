import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { DataTableProps } from '@declarations/ui';
import { useFilterOptions } from '@hooks/useFilterOptions';
import {
  getSentimentConfig,
  getSentimentPercent,
  getSentimentRange,
} from '@hooks/useSentimental';
import EventIcon from '@mui/icons-material/Event';
import RealEstateAgentOutlinedIcon from '@mui/icons-material/RealEstateAgentOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TMeetingListItem } from '@services/models/MeetingSchema';
import { useGetMeetings } from '@services/queries/useMeetings';
import { useNavigate } from '@tanstack/react-router';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import { getFilterDateRange } from '@utils/getFilterDateRange';
import {
  formatMeetingDate,
  formatMeetingStatus,
} from '@utils/meetingFormatters';
import { normalizeText } from '@utils/normalizeText';
import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

type MeetingWithDate = TMeetingListItem & {
  dateRange: string;
  sentimentRange: string;
  clientName: string;
  companyName: string;
  sentimentValue: number | null;
};

const filterGroupConfig = [
  {
    id: 'client',
    label: 'Cliente',
    accessor: (m: MeetingWithDate): string => m.clientName,
    formatter: (v: string): string => v,
  },
  {
    id: 'status',
    label: 'Status',
    accessor: (m: MeetingWithDate): string => formatMeetingStatus(m.status),
    formatter: (v: string): string => v,
  },
  {
    id: 'dateRange',
    label: 'Período',
    accessor: (m: MeetingWithDate): string => m.dateRange,
    formatter: (v: string): string => v,
  },
  {
    id: 'sentiment',
    label: 'Sentimento Médio',
    accessor: (m: MeetingWithDate): string => m.sentimentRange,
    formatter: (v: string): string => v,
  },
];

export const SalesmanMeetingsPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const { data, isLoading } = useGetMeetings(0, 100, {});
  const meetings = useMemo(() => data?.content ?? [], [data?.content]);
  const summary = data?.summary;

  const meetingsWithDate: MeetingWithDate[] = useMemo(
    () =>
      meetings.map((m) => ({
        ...m,
        clientName: m.clientName || '-',
        companyName: m.companyName || '-',
        sentimentValue: m.sentiment ?? null,
        dateRange: getFilterDateRange(m.date),
        sentimentRange: getSentimentRange(m.sentiment),
      })),
    [meetings]
  );

  const filterGroups = useFilterOptions({
    data: meetingsWithDate,
    groups: filterGroupConfig,
  });

  const filteredMeetings = useMemo((): MeetingWithDate[] => {
    const query = normalizeText(searchValue.trim());
    return meetingsWithDate.filter((m) => {
      // Filtro de busca
      if (query.length > 0) {
        const title = normalizeText(m.title).includes(query);
        const client = normalizeText(m.clientName).includes(query);
        const company = normalizeText(m.companyName).includes(query);
        if (!title && !client && !company) return false;
      }

      // Filtro de Cliente
      const clientFilters = selectedFilters.client || [];
      if (clientFilters.length > 0 && !clientFilters.includes(m.clientName))
        return false;

      // Filtro de Status
      const statusFilters = selectedFilters.status || [];
      if (statusFilters.length > 0) {
        const status = formatMeetingStatus(m.status);
        if (!statusFilters.includes(status)) return false;
      }

      // Filtro de Data
      const dateFilters = selectedFilters.dateRange || [];
      if (dateFilters.length > 0) {
        const dateRange = getFilterDateRange(m.date);
        if (!dateFilters.includes(dateRange)) return false;
      }

      // Filtro de Sentimento
      const sentimentFilters = selectedFilters.sentiment || [];
      if (sentimentFilters.length > 0) {
        const sentimentRange = getSentimentRange(m.sentimentValue);
        if (!sentimentFilters.includes(sentimentRange)) return false;
      }

      return true;
    });
  }, [meetingsWithDate, searchValue, selectedFilters]);

  const handleFilterChange = (groupId: string, values: string[]): void => {
    setSelectedFilters((prev) => ({ ...prev, [groupId]: values }));
  };

  const handleClearFilters = (): void => setSelectedFilters({});

  const handleDetailsClick = (id: string | number): void => {
    void navigate({
      to: EPageRoutes.SALESMAN_MEETINGS_DETAIL,
      params: { meetingId: String(id) },
    });
  };

  const successRate =
    summary != null ? Math.round(summary.success_rate * 100) : undefined;
  const sentimentConfig = getSentimentConfig(successRate);

  const getSentimentForRow = (row: MeetingWithDate): number | undefined => {
    if (row.status !== 'COMPLETED') return undefined;
    return getSentimentPercent(row.sentimentValue);
  };

  const columns: DataTableProps<MeetingWithDate>['columns'] = [
    {
      header: 'Reunião',
      accessor: (row: MeetingWithDate): string => row.title,
      render: (value: ReactNode): JSX.Element => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <EventIcon
            sx={{ color: palette.meetings[500], fontSize: '1.25rem' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {value ?? '-'}
          </Typography>
        </Stack>
      ),
    },
    {
      header: 'Cliente',
      accessor: (row: MeetingWithDate): string => row.clientName,
      render: (value: ReactNode, row: MeetingWithDate): JSX.Element => (
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
      header: 'Status',
      accessor: (row: MeetingWithDate): string =>
        formatMeetingStatus(row.status),
    },
    {
      header: 'Data',
      accessor: (row: MeetingWithDate): string => formatMeetingDate(row.date),
    },
    {
      header: 'Sentimento',
      accessor: getSentimentForRow,
      render: (value: ReactNode): ReactNode => {
        const percent = typeof value === 'number' ? value : undefined;
        const config = getSentimentConfig(percent);
        if (percent == null) return <Typography variant="body2">-</Typography>;
        return (
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Box
              sx={{
                color:
                  config.theme === 'success'
                    ? palette.success.main
                    : config.theme === 'error'
                      ? palette.error.main
                      : palette.warning.main,
                display: 'flex',
              }}
            >
              {GetAppIcon(config.iconName)}
            </Box>
            <Typography variant="body2" fontWeight={500}>
              {percent}%
            </Typography>
          </Stack>
        );
      },
    },
  ];

  return (
    <PageContainter>
      <Stack spacing="2.5rem" sx={{ height: '100%' }}>
        <PageHeader
          title={EPageTitles.MEETINGS}
          subtitle="Gerencie todas reuniões da plataforma"
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing="1.5rem">
          <StatCard
            iconName="meeting"
            theme="meetings"
            value={data?.totalElements ?? 0}
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
            value={successRate != null ? `${successRate}%` : '0%'}
            label="Sentimento médio"
          />
        </Stack>
        <DataTable
          data={filteredMeetings}
          columns={columns}
          getRowId={(row: MeetingWithDate): string => row.id}
          loading={isLoading}
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
          sx={{
            border: `1px solid ${palette.neutrals[200]}`,
            flex: 1,
            minHeight: 0,
          }}
        />
      </Stack>
    </PageContainter>
  );
};
