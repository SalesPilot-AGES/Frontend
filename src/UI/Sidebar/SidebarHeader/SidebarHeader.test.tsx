import { render, screen } from '@tests/testUtils';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SidebarHeader } from './SidebarHeader';

// Mock the hook
vi.mock('@store/hooks/useCurrentUser', () => ({
  useCurrentUserRole: vi.fn(() => 'admin'),
}));

// Mock child components
vi.mock('@UI/Header/Header', () => ({
  Header: ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }): JSX.Element => (
    <div data-testid="header">
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  ),
}));

vi.mock('@UI/IconBox/IconBox', () => ({
  IconBox: ({ iconName }: { iconName: string }): JSX.Element => (
    <div data-testid="icon-box">{iconName}</div>
  ),
}));

describe('SidebarHeader Component', () => {
  it('renders header with application title', () => {
    render(<SidebarHeader />);
    expect(screen.getByText('Sales Pilot')).toBeInTheDocument();
  });

  it('renders user role from hook', () => {
    render(<SidebarHeader />);
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('renders logo icon box', () => {
    render(<SidebarHeader />);
    expect(screen.getByTestId('icon-box')).toBeInTheDocument();
    expect(screen.getByText('logo')).toBeInTheDocument();
  });

  it('renders header component', () => {
    render(<SidebarHeader />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
