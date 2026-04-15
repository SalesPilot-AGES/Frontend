import type { IItemDetailProps } from '@declarations/ui';
import { Box, Typography } from '@mui/material';
import type { JSX } from 'react';

export const ItemDetail = ({
  label,
  value,
  icon,
  children,
  sx,
}: IItemDetailProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minWidth: 0,
        ...sx,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>

      {children ? (
        children
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            minWidth: 0,
          }}
        >
          {icon}
          <Typography
            variant="h6"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
