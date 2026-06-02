import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Paper, Typography } from '@mui/material';
import type { JSX, ReactNode } from 'react';

export interface IEntityDetailsCardProps {
  title: string;
  children: ReactNode;
  onEdit?: () => void;
}

type TEntityDetailsCardProps = IEntityDetailsCardProps & {
  headerRight?: ReactNode;
};

export const EntityDetailsCard = ({
  title,
  children,
  onEdit,
  headerRight,
}: TEntityDetailsCardProps): JSX.Element => {
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

        {headerRight ??
          (onEdit && (
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={onEdit}
            >
              Editar
            </Button>
          ))}
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
