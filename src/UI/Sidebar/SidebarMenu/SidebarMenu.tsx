import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useCurrentUser } from '@store/hooks/useCurrentUser';
import { Link, useLocation } from '@tanstack/react-router';
import type { JSX } from 'react';

import { getMenuItems } from './MenuItems/MenuItems';

export const SidebarMenu = (): JSX.Element | null => {
  const user = useCurrentUser();
  const location = useLocation();
  if (!user) return null;
  const menuItems = getMenuItems(user.role);

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        gap: '1rem',
        height: '100%',
      }}
    >
      {menuItems.map((item) => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '2rem' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
