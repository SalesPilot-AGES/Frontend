import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { queryClient } from '@services/config/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import theme from '@theme/Theme';
import type { JSX, PropsWithChildren } from 'react';

/**
 * Test provider wrapper that includes all necessary context providers
 * for testing components that depend on theme, routing, and data fetching.
 *
 * Providers included:
 * - QueryClientProvider: For React Query
 * - ThemeProvider: For Material-UI theme
 * - CssBaseline: For consistent styling
 *
 * Note: For tests that require routing, wrap the test with the actual router
 * or mock the router hooks/context as needed.
 */
export function TestProviders({ children }: PropsWithChildren): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
