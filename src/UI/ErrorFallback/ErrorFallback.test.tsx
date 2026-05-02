import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  const resetErrorBoundary = vi.fn();

  it('renders the heading', () => {
    render(
      <ErrorFallback
        error={new Error('test error')}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('displays the error message', () => {
    render(
      <ErrorFallback
        error={new Error('Something broke')}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });

  it('displays fallback message for non-Error objects', () => {
    render(
      <ErrorFallback
        error="a plain string error"
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    expect(screen.getByText('Unknown error')).toBeInTheDocument();
  });

  it('renders a "Try again" button', () => {
    render(
      <ErrorFallback
        error={new Error('err')}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when "Try again" is clicked', () => {
    render(
      <ErrorFallback
        error={new Error('err')}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(resetErrorBoundary).toHaveBeenCalledOnce();
  });

  it('has role="alert" for accessibility', () => {
    render(
      <ErrorFallback
        error={new Error('err')}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
