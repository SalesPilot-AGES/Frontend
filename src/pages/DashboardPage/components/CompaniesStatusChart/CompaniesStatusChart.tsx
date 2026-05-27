import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import { useGetCompaniesStatus } from '@services/queries/useDashboard';
import { EmptyState } from '@UI/EmptyState/EmptyState';
import type { JSX } from 'react';
import { useMemo } from 'react';

const CHART_TITLE = 'Empresas ativas';
const EMPTY_STATE_TITLE = 'Nenhuma empresa encontrada';
const EMPTY_STATE_DESCRIPTION = 'Não há dados de empresas para exibir.';
const LABEL_ACTIVE = 'Ativas';
const LABEL_INACTIVE = 'Inativas';

export const CompaniesStatusChart = (): JSX.Element => {
  const { palette } = useTheme();
  const { data, isLoading } = useGetCompaniesStatus();

  const activeColor = palette.success[300];
  const inactiveColor = palette.neutrals[400];

  const total = useMemo(
    () => (data?.active ?? 0) + (data?.inactive ?? 0),
    [data]
  );

  const isEmpty = !isLoading && total === 0;

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: '1rem',
        border: '1px solid',
        borderColor: palette.neutrals[200],
        backgroundColor: palette.neutrals.baseWhite,
        p: '1.5rem 1.5rem 0.0625rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {CHART_TITLE}
      </Typography>

      <Box sx={{ width: '100%', height: '20rem', overflow: 'hidden' }}>
        {isLoading ? (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Carregando gráfico...
            </Typography>
          </Box>
        ) : isEmpty ? (
          <EmptyState
            title={EMPTY_STATE_TITLE}
            description={EMPTY_STATE_DESCRIPTION}
          />
        ) : (
          <Stack alignItems="center" sx={{ height: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <PieChart
                height={264}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: data?.active ?? 0,
                        label: `${LABEL_ACTIVE}: ${data?.active ?? 0}`,
                        color: activeColor,
                      },
                      {
                        id: 1,
                        value: data?.inactive ?? 0,
                        label: `${LABEL_INACTIVE}: ${data?.inactive ?? 0}`,
                        color: inactiveColor,
                      },
                    ],
                    innerRadius: 60,
                    outerRadius: 110,
                    valueFormatter: (item): string => {
                      const percentage =
                        total > 0 ? Math.round((item.value / total) * 100) : 0;
                      return `${item.value} (${percentage}%)`;
                    },
                  },
                ]}
                slots={{ legend: () => null }}
              />
            </Box>

            <Stack direction="row" spacing={3} sx={{ pb: '1rem' }}>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: activeColor,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {`${LABEL_ACTIVE}: ${data?.active ?? 0}`}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: inactiveColor,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {`${LABEL_INACTIVE}: ${data?.inactive ?? 0}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>
    </Paper>
  );
};
