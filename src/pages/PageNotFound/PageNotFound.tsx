import { Home as HomeIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import type { JSX } from 'react';

export const PageNotFound = (): JSX.Element => {
  const navigate = useNavigate({ from: '/' });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: '120px',
              fontWeight: 'bold',
              color: '#1976d2',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Page Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate({ to: '/login' })}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
