import { Box } from '@mui/material';
import { useCurrentUserRole } from '@store/hooks/useCurrentUser';
import { Header } from '@UI/Header/Header';
import { IconBox } from '@UI/IconBox/IconBox';
import type { JSX } from 'react';

export const SidebarHeader = (): JSX.Element => {
  const userRole = useCurrentUserRole();
  return (
    <Box display={'flex'} gap={'1rem'} alignItems={'center'} padding={'1.5rem'}>
      <IconBox iconName="logo" sx={{ height: '2.8rem', width: '2.8rem' }} />
      <Header
        title="Sales Pilot"
        subtitle={
          userRole == 'manager'
            ? 'Gestor'
            : userRole == 'salesmen'
              ? 'Vendedor'
              : (userRole ?? '')
        }
      />
    </Box>
  );
};
