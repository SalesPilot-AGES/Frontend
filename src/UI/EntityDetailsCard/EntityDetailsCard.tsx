import type { IEntityDetailsCardProps } from '@declarations/ui';
import { Edit } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import type { JSX } from 'react';

export const EntityDetailsCard = ({
  title,
  children,
  onEdit,
}: IEntityDetailsCardProps): JSX.Element => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        borderRadius: '1.5rem',
        border: '1px solid',
        borderColor: 'divider',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          width: '100%',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        {onEdit && (
          <Button variant="contained" startIcon={<Edit />} onClick={onEdit}>
            Editar
          </Button>
        )}
      </Box>

      <Box
        sx={{
          width: '100%',
        }}
      >
        {children}
      </Box>
    </Paper>
  );
};
