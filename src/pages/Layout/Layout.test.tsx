import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@UI/Sidebar/Sidebar', () => ({
  Sidebar: () => <nav data-testid="sidebar" />,
}));
vi.mock('@tanstack/react-router', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@tanstack/react-router')>();
  return { ...actual, Outlet: () => <div data-testid="outlet" /> };
});

import { Layout } from './Layout';

describe('Layout', () => {
  it('renders Sidebar', () => {
    render(<Layout />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('renders Outlet when no children', () => {
    render(<Layout />);
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('renders children instead of Outlet when provided', () => {
    render(
      <Layout>
        <div data-testid="custom-child">Custom Content</div>
      </Layout>
    );
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.queryByTestId('outlet')).not.toBeInTheDocument();
  });
});
