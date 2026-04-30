import { Stack, Typography, useTheme } from '@mui/material';
import type { JSX } from 'react';

export interface IHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export const Header = ({
  title,
  subtitle,
  alignment = 'left',
}: IHeaderProps): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Stack alignItems={alignment}>
      <Typography variant="h3">{title}</Typography>
      {subtitle && (
        <Typography
          variant="subtitle2"
          color={palette.neutrals[600]}
          textTransform={'capitalize'}
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};
