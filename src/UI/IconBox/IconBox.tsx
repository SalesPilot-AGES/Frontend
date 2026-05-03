import type { TColorThemeOptions } from '@declarations/hooks';
import type { TIconName } from '@declarations/ui';
import type { SxProps } from '@mui/material';
import { Box } from '@mui/material';
import { useColorTheme } from '@theme/hooks/useColorTheme';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

export interface IIconBoxProps {
  iconName: TIconName;
  theme?: TColorThemeOptions;
  sx?: SxProps;
}

export const IconBox = ({
  iconName,
  theme,
  sx,
}: IIconBoxProps): JSX.Element => {
  const { color, backgroundColor } = useColorTheme(theme);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3rem',
        height: '3rem',
        borderRadius: '1rem',
        backgroundColor: backgroundColor,
        color: color,
        fontSize: '2rem',
        ...sx,
      }}
    >
      {GetAppIcon(iconName)}
    </Box>
  );
};
