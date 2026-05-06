import { ECardLabel } from '@data/enums/ECardLabel';
import type { DataTableProps } from '@declarations/ui';
import { getSentimentConfig } from '@hooks/useSentiment';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';
import SentimentSatisfiedAltRoundedIcon from '@mui/icons-material/SentimentSatisfiedAltRounded';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import { Box, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { TSalesmanWithCompany } from '@services/models/SalesmanSchema';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import type { JSX, ReactNode } from 'react';

const formatSentimentPercentage = (value: number): string =>
  `${Math.round(value)}%`;

export const formatAverageSentiment = (value: number): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${formatter.format(value)}%`;
};

const getSentimentIcon = (value: number): JSX.Element => {
  const config = getSentimentConfig(value);

  if (config.iconName === 'sentimentHappy') {
    return <SentimentSatisfiedAltRoundedIcon />;
  }

  if (config.iconName === 'sentimentSad') {
    return <SentimentVeryDissatisfiedRoundedIcon />;
  }

  return <SentimentNeutralRoundedIcon />;
};

const getSentimentColor = (
  theme: string,
  palette: Theme['palette']
): string => {
  if (theme === 'success') return palette.success[300];
  if (theme === 'warning') return palette.warning[400];
  if (theme === 'error') return palette.error[300];
  return palette.neutrals[500];
};

export const buildSalesmenColumns = (
  palette: Theme['palette']
): DataTableProps<TSalesmanWithCompany>['columns'] => [
  {
    header: 'Nome do vendedor',
    accessor: (row: TSalesmanWithCompany) => row.name,
    render: (value: ReactNode): JSX.Element => (
      <Stack direction="row" alignItems="center" spacing="0.5rem">
        <PersonIcon sx={{ color: palette.salesmen[500], fontSize: '1.5rem' }} />
        <Typography fontWeight={500} fontSize="1rem" lineHeight="1.375rem">
          {value ?? '-'}
        </Typography>
      </Stack>
    ),
  },
  {
    header: ECardLabel.COMPANY_NAME,
    accessor: (row: TSalesmanWithCompany) => row.company.name,
    render: (value: ReactNode): JSX.Element => (
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
    header: 'Status',
    accessor: (row: TSalesmanWithCompany) => row.active,
    render: (_value: ReactNode, row: TSalesmanWithCompany): JSX.Element => (
      <StatusBadge active={row.active} />
    ),
  },
  {
    header: 'Sentimento medio',
    accessor: (row: TSalesmanWithCompany) => row.average_sentiment ?? 0,
    render: (_value: ReactNode, row: TSalesmanWithCompany): JSX.Element => {
      const sentimentValue = row.average_sentiment;
      const hasSentiment = typeof sentimentValue === 'number';
      const config = getSentimentConfig(sentimentValue ?? undefined);

      return (
        <Stack direction="row" alignItems="center" spacing="0.5rem">
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: getSentimentColor(config.theme, palette),
            }}
          >
            {hasSentiment ? (
              getSentimentIcon(sentimentValue)
            ) : (
              <SentimentNeutralRoundedIcon />
            )}
          </Box>
          <Typography
            fontWeight={500}
            fontSize="1rem"
            lineHeight="1.375rem"
            color={getSentimentColor(config.theme, palette)}
          >
            {hasSentiment ? formatSentimentPercentage(sentimentValue) : '-'}
          </Typography>
        </Stack>
      );
    },
  },
];
