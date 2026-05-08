import { EPlan } from '@data/enums/EPlan';
import type { TPlan } from '@declarations/ui';
import { Chip, styled } from '@mui/material';

export const StyledPlanBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'plan',
})<{ plan: TPlan }>(({ theme, plan }) => ({
  background:
    plan === EPlan.BASIC
      ? theme.palette.neutrals[200]
      : plan === EPlan.PRO
        ? theme.palette.primary[100]
        : `linear-gradient(90deg, ${theme.palette.primary[700]} 0%, ${theme.palette.primary[500]} 100%)`,
  color:
    plan === EPlan.BASIC
      ? theme.palette.neutrals[600]
      : plan === EPlan.PRO
        ? theme.palette.primary[500]
        : theme.palette.neutrals[100],
  fontWeight: 600,
  borderRadius: '1rem',
}));
