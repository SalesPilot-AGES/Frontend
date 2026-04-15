import type { IStatCardProps } from '@declarations/ui';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { IconBox } from '@UI/IconBox/IconBox';
import type { JSX } from 'react';

export const StatCard = ({
  iconName,
  theme,
  value,
  label,
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
          color={palette.neutrals[900]}
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
