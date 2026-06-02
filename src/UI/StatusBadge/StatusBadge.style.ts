import { Chip, styled } from '@mui/material';

export const StyledStatusBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  backgroundColor: active
    ? theme.palette.success[100]
    : theme.palette.neutrals[200],
  color: active ? theme.palette.success[400] : theme.palette.neutrals[600],
  fontWeight: 600,
  borderRadius: '1rem',
}));
