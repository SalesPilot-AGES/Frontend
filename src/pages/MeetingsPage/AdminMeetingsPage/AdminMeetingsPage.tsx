import { EPageRoutes } from '@data/enums/EPageRoutes';
import { EPageTitles } from '@data/enums/EPageTitles';
import type { DataTableProps } from '@declarations/ui';
import { getSentimentConfig } from '@hooks/useSentiment';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { TMeetingListItem } from '@services/models/MeetingSchema';
import { useGetCompanies } from '@services/queries/useCompanies';
import { useGetMeetings } from '@services/queries/useMeetings';
import { useNavigate } from '@tanstack/react-router';
import { DataTable } from '@UI/DataTable/DataTable';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { StatCard } from '@UI/StatCard/StatCard';
import type { JSX, ReactNode } from 'react';
import { useMemo, useState } from 'react';

const formatMeetingDate = (date: string): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

const formatDuration = (minutes: number): string => {
  return `${minutes} min`;
};

export const AdminMeetingsPage = (): JSX.Element => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const filters = useMemo(
    () => ({
      ...(searchValue.trim() && { search: searchValue.trim() }),
      ...(filterValue && { companies: filterValue }),
    }),
    [searchValue, filterValue]
  );

  const { data: companiesPage } = useGetCompanies(0, 100);
  const { data, isLoading } = useGetMeetings(0, 20, filters);

  const meetings = useMemo(() => data?.content ?? [], [data?.content]);
  const summary = data?.summary;

  const filteredMeetings = useMemo(() => {
    if (!filterValue) {
      return meetings;
    }

    return meetings.filter((meeting) => meeting.companyName === filterValue);
  }, [meetings, filterValue]);

  const companyFilterOptions = useMemo(() => {
    const companyNames = Array.from(
      new Set((companiesPage?.content ?? []).map((company) => company.name))
    )
      .filter((name) => name.trim().length > 0)
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));

    return [
      { label: 'Todas', value: '' },
      ...companyNames.map((name) => ({ label: name, value: name })),
    ];
  }, [companiesPage]);

  const sentimentConfig = getSentimentConfig(summary?.success_rate);

  const columns: DataTableProps<TMeetingListItem>['columns'] = [
    {
      header: 'Reunião',
      accessor: (row: TMeetingListItem) => row.title,
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
      header: 'Vendedor',
      accessor: (row: TMeetingListItem) => row.sellerName,
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
      header: 'Empresa',
      accessor: (row: TMeetingListItem) => row.companyName,
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
      header: 'Data',
      accessor: (row: TMeetingListItem) => row.date,
      render: (value: ReactNode) => (
        <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
          {typeof value === 'string' ? formatMeetingDate(value) : '-'}
        </Typography>
      ),
    },
    {
      header: 'Duração',
      accessor: (row: TMeetingListItem) => row.durationMinutes,
      render: (value: ReactNode) => (
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
          subtitle="Gerencie todas reuniões da plataforma"
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
            value={
              summary
                ? `${summary.success_rate.toFixed(1).replace('.', ',')}%`
                : '0,0%'
            }
            label="Sentimento médio"
          />
        </Box>

        <DataTable
          data={filteredMeetings}
          columns={columns}
          getRowId={(row: TMeetingListItem) => row.id}
          loading={isLoading}
          sx={{
            border: `1px solid ${palette.neutrals[200]}`,
            flex: 1,
            minHeight: 0,
          }}
          onDetailsClick={(rowId) => {
            navigate({
              to: EPageRoutes.SALESMAN_MEETINGS_DETAIL,
              params: { meetingId: String(rowId) },
            });
          }}
          onSearchChange={setSearchValue}
          onFilterChange={setFilterValue}
          searchValue={searchValue}
          filterValue={filterValue}
          toolbarTitle="Lista de reuniões"
          searchPlaceholder="Buscar reunião..."
          searchAriaLabel="Buscar reunião"
          filterPlaceholder="Filtrar"
          filterAriaLabel="Filtrar reuniões por empresa"
          filterOptions={companyFilterOptions}
        />
      </Stack>
    </PageContainter>
  );
};
