import type { JSX } from 'react';
import type { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps): JSX.Element => {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <pre>{error instanceof Error ? error.message : 'Unknown error'}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
