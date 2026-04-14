import type { IStatCardProps } from '@declarations/ui';
import { Paper, Stack, Typography } from '@mui/material';
import { IconBox } from '@UI/IconBox/IconBox';
import type { JSX } from 'react';

export const StatCard = ({
  iconName,
  theme,
  value,
  label,
  sx,
}: IStatCardProps): JSX.Element => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        gap: 3,
        ...sx,
      }}
    >
      <IconBox iconName={iconName} theme={theme} />

      <Stack>
        <Typography fontSize={24} fontWeight={600} lineHeight="32px">
          {value}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </Paper>
  );
};
