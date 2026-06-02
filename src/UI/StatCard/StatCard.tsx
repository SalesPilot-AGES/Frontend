import { ECardLabel } from '@data/enums/ECardLabel';
import type { TColorThemeOptions } from '@declarations/hooks';
import type { TIconName } from '@declarations/ui';
import type { SxProps } from '@mui/material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { IconBox } from '@UI/IconBox/IconBox';
import type { JSX } from 'react';

export interface IStatCardProps {
  iconName: TIconName;
  theme?: TColorThemeOptions;
  value: number | string;
  label: (typeof ECardLabel)[keyof typeof ECardLabel];
  valueColor?: string;
  sx?: SxProps;
}

export const StatCard = ({
  iconName,
  theme,
  value,
  label,
  valueColor,
  sx,
}: IStatCardProps): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Box
      gap="0.75rem"
      width="100%"
      height="fit-content"
      sx={{
        padding: '1.5rem',
        border: '1px solid',
        borderRadius: '0.75rem',
        borderColor: palette.neutrals[200],
        backgroundColor: palette.neutrals.baseWhite,
        ...sx,
      }}
    >
      <Stack gap="0.75rem" alignItems="left">
        <IconBox iconName={iconName} theme={theme} />

        <Typography
          fontSize="1.5rem"
          fontWeight="600"
          lineHeight="2rem"
          color={valueColor ?? palette.neutrals[900]}
        >
          {value}
        </Typography>

        <Typography
          fontSize="1rem"
          fontWeight="400"
          lineHeight="1.5rem"
          color={palette.neutrals[600]}
        >
          {label}
        </Typography>
      </Stack>
    </Box>
  );
};
