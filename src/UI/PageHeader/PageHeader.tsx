import type { IPageHeaderProps } from '@declarations';
import { Stack, Typography, useTheme } from '@mui/material';
import type { JSX } from 'react';

export const PageHeader = ({
  title,
  subtitle,
  alignment = 'left',
}: IPageHeaderProps): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Stack gap={'0.5rem'} alignItems={alignment}>
      <Typography variant="h1">{title}</Typography>
      {subtitle && (
        <Typography variant="subtitle1" color={palette.neutrals[600]}>
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
