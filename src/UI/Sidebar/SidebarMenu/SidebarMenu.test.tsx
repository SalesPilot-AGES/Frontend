import { render, screen } from '@tests/testUtils';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SidebarMenu } from './SidebarMenu';

// Mock the user hook
vi.mock('@store/hooks/useCurrentUser', () => ({
  useCurrentUser: vi.fn(() => ({
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin',
  })),
}));

// Mock react-router hooks
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual('@tanstack/react-router');
  return {
    ...actual,
    useLocation: vi.fn(() => ({
      pathname: '/admin/dashboard',
    })),
    Link: ({
      to,
      children,
      ...props
    }: {
      to: string;
      children: React.ReactNode;
      [key: string]: unknown;
    }): JSX.Element => (
      <a href={to} data-testid={`link-${to}`} {...props}>
        {children}
      </a>
    ),
  };
});

// Mock MenuItems
vi.mock('./MenuItems/MenuItems', () => ({
  getMenuItems: vi.fn((role) => {
    if (role === 'admin') {
      return [
        {
          label: 'Painel',
          path: '/admin/dashboard',
          icon: <span>DashboardIcon</span>,
        },
        {
          label: 'Empresas',
          path: '/admin/companies',
          icon: <span>CompanyIcon</span>,
        },
      ];
    }
    return [];
  }),
}));

describe('SidebarMenu Component', () => {
  it('renders menu items for user role', () => {
    render(<SidebarMenu />);
    expect(screen.getByText('Painel')).toBeInTheDocument();
    expect(screen.getByText('Empresas')).toBeInTheDocument();
  });

  it('renders a list', () => {
    const { container } = render(<SidebarMenu />);
    const list = container.querySelector('[class*="MuiList"]');
    expect(list).toBeInTheDocument();
  });

  it('creates links for each menu item', () => {
    render(<SidebarMenu />);
    expect(screen.getByTestId('link-/admin/dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('link-/admin/companies')).toBeInTheDocument();
  });

  it('renders menu items with icons', () => {
    const { container } = render(<SidebarMenu />);
    const listItems = container.querySelectorAll('[class*="MuiListItem"]');
    expect(listItems.length).toBeGreaterThan(0);
  });
});
