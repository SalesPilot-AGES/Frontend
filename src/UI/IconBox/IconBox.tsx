import type { IIconBoxProps } from '@declarations';
import { useColorTheme } from '@hooks/useColorTheme';
import { Box } from '@mui/material';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

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
