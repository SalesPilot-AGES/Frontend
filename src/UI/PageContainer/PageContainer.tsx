import { Box, useTheme } from '@mui/material';
import type { JSX, ReactNode } from 'react';

export interface IPageContainerProps {
  children: ReactNode;
}

export const PageContainter = ({
  children,
}: IPageContainerProps): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: '2rem',
        backgroundColor: palette.neutrals[100],
      }}
    >
      {children}
    </Box>
  );
};
