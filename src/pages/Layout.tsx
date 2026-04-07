import type { ILayoutProps } from '@declarations';
import { Box } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { Sidebar } from '@UI/Sidebar/Sidebar';
import type { JSX } from 'react';

export const Layout = ({ children }: ILayoutProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          overflow: 'auto',
          width: '100%',
          height: '100vh',
        }}
      >
        {children || <Outlet />}
      </Box>
    </Box>
  );
};
