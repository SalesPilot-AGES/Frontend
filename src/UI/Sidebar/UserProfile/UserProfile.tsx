import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material';
import { useRequireUser } from '@store/hooks/useCurrentUser';
import { getAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

import { useUserProfile } from './UseUserProfile';

export const UserProfile = (): JSX.Element => {
  const { handleLogout } = useUserProfile();
  const user = useRequireUser();
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.5rem',
      }}
    >
      <Avatar
        sx={{
          background: `linear-gradient(135deg, ${palette.managers[500]}, ${palette.primary[500]})`,
          width: '2.5rem',
          height: '2.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        {user.name.charAt(0).toUpperCase() + user.name.charAt(1).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {user.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#aaa',
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {user.email}
        </Typography>
      </Box>
      <IconButton
        onClick={handleLogout}
        sx={{
          width: '2.5rem',
          height: '2.5rem',
        }}
      >
        {getAppIcon('logout')}
      </IconButton>
    </Box>
  );
};
