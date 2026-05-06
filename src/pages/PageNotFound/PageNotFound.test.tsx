import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

import { PageNotFound } from './PageNotFound';

describe('PageNotFound', () => {
  it('renders 404 text', () => {
    render(<PageNotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders "Page Not Found" heading', () => {
    render(<PageNotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<PageNotFound />);
    expect(
      screen.getByText(/the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();
  });

  it('renders a "Go to Login" button', () => {
    render(<PageNotFound />);
    expect(
      screen.getByRole('button', { name: /go to login/i })
    ).toBeInTheDocument();
  });
});
