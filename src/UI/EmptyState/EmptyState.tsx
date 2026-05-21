import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import type { SxProps, Theme } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';
import type { JSX } from 'react';

export interface IEmptyStateProps {
  title: string;
  description: string;
  iconBg?: string;
  iconColor?: string;
  sx?: SxProps<Theme>;
}

export const EmptyState = ({
  title,
  description,
  iconBg,
  iconColor,
  sx,
}: IEmptyStateProps): JSX.Element => (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={1.5}
    sx={{ width: '100%', height: '100%', minHeight: 240, ...sx }}
  >
    <Box
      sx={{
        alignItems: 'center',
        borderRadius: '999px',
        color: iconColor ?? 'text.secondary',
        backgroundColor: iconBg ?? 'action.hover',
        display: 'inline-flex',
        height: 56,
        justifyContent: 'center',
        width: 56,
      }}
    >
      <InboxOutlinedIcon />
    </Box>
    <Typography variant="subtitle1" fontWeight={700} color="text.primary">
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" textAlign="center">
      {description}
    </Typography>
  </Stack>
);
