import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { JSX } from 'react';

export interface IEmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({
  title,
  description,
}: IEmptyStateProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={1.5}
      sx={{ height: '100%' }}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: palette.neutrals[200],
          borderRadius: '999px',
          color: palette.neutrals[500],
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
};
