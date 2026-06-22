import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { DataTableProps } from '@declarations/ui';
import { getSentimentConfig } from '@hooks/useSentiment';
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
import {
  formatMeetingDate,
  formatMeetingStatus,
  getClientSentimentPercent,
} from '@utils/meetingFormatters';
import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

export const SalesmanMeetingsPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [clientFilterValue, setClientFilterValue] = useState('');

  const filters = useMemo(
    () => ({
      ...(searchValue.trim() && { search: searchValue.trim() }),
    }),
    [searchValue]
  );

  // O filtro de cliente (clientFilterValue) é aplicado client-side abaixo porque
  // a API só suporta filtro por clientCompanyName, não por clientId individual.
  // Buscamos um tamanho de página maior para reduzir a chance do filtro
  // esconder reuniões que estão fora da primeira página.
  const { data, isLoading } = useGetMeetings(0, 100, filters);
  const meetings = useMemo(() => data?.content ?? [], [data?.content]);
  const summary = data?.summary;
  const filteredMeetings = useMemo(
    () =>
      clientFilterValue
        ? meetings.filter((meeting) => meeting.clientId === clientFilterValue)
        : meetings,
    [clientFilterValue, meetings]
  );
  const clientFilterOptions = useMemo(() => {
    const clients = Array.from(
      new Map(
        meetings.map((meeting) => [meeting.clientId, meeting.clientName])
      ).entries()
    ).sort(([, firstName], [, secondName]) =>
      firstName.localeCompare(secondName, 'pt-BR')
    );

    return [
      { label: 'Todos', value: '' },
      ...clients.map(([id, name]) => ({ label: name, value: id })),
    ];
  }, [meetings]);
  const successRatePercent =
    summary != null ? Math.round(summary.success_rate * 100) : undefined;
  const sentimentConfig = getSentimentConfig(successRatePercent);

  const columns: DataTableProps<TMeetingListItem>['columns'] = [
    {
      header: 'Reunião',
      accessor: (row) => row.title,
      render: (value: ReactNode) => (
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
      accessor: (row) => row.clientName,
      render: (value: ReactNode, row) => (
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
      accessor: (row) => formatMeetingStatus(row.status),
    },
    {
      header: 'Data',
      accessor: (row) => formatMeetingDate(row.date),
    },
    {
      header: 'Sentimento',
      accessor: (row) =>
        row.status === 'COMPLETED'
          ? getClientSentimentPercent(row.sentiment)
          : undefined,
      render: (value: ReactNode): ReactNode => {
        const percent = typeof value === 'number' ? value : undefined;
        const config = getSentimentConfig(percent);

        return percent == null ? (
          <Typography variant="body2">-</Typography>
        ) : (
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
            value={successRatePercent != null ? `${successRatePercent}%` : '0%'}
            label="Sentimento médio"
          />
        </Stack>

        <DataTable
          data={filteredMeetings}
          columns={columns}
          getRowId={(row) => row.id}
          loading={isLoading}
          onDetailsClick={(rowId) => {
            navigate({
              to: EPageRoutes.SALESMAN_MEETINGS_DETAIL,
              params: { meetingId: String(rowId) },
            });
          }}
          onSearchChange={setSearchValue}
          onFilterChange={setClientFilterValue}
          searchValue={searchValue}
          filterValue={clientFilterValue}
          toolbarTitle="Lista de reuniões"
          searchPlaceholder="Buscar reunião..."
          searchAriaLabel="Buscar reunião"
          filterPlaceholder="Selecionar cliente"
          filterAriaLabel="Filtrar reuniões por cliente"
          filterOptions={clientFilterOptions}
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
