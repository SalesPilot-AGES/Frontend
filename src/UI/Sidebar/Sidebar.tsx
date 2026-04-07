import { Divider, Drawer, useTheme } from '@mui/material';
import type { JSX } from 'react';

import { SidebarHeader } from './SidebarHeader/SidebarHeader';
import { SidebarMenu } from './SidebarMenu/SidebarMenu';
import { UserProfile } from './UserProfile/UserProfile';

const DRAWER_WIDTH = '16rem';

export const Sidebar = (): JSX.Element => {
  const { palette } = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          backgroundColor: palette.neutrals.baseWhite,
          position: 'relative',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '0',
          boxShadow: 'none',
        },
      }}
    >
      <SidebarHeader />
      <Divider />
      <SidebarMenu />
      <Divider />
      <UserProfile />
    </Drawer>
  );
};
