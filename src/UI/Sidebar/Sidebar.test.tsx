import { render, screen } from '@tests/testUtils';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Sidebar } from './Sidebar';

// Mock the child components to isolate testing
vi.mock('./SidebarHeader/SidebarHeader', () => ({
  SidebarHeader: (): JSX.Element => (
    <div data-testid="sidebar-header">Sidebar Header</div>
  ),
}));

vi.mock('./SidebarMenu/SidebarMenu', () => ({
  SidebarMenu: (): JSX.Element => (
    <div data-testid="sidebar-menu">Sidebar Menu</div>
  ),
}));

vi.mock('./UserProfile/UserProfile', () => ({
  UserProfile: (): JSX.Element => (
    <div data-testid="user-profile">User Profile</div>
  ),
}));

describe('Sidebar Component', () => {
  it('renders sidebar drawer', () => {
    const { container } = render(<Sidebar />);
    const drawer = container.querySelector('[class*="MuiDrawer"]');
    expect(drawer).toBeInTheDocument();
  });

  it('renders sidebar header component', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('sidebar-header')).toBeInTheDocument();
  });

  it('renders sidebar menu component', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
  });

  it('renders user profile component', () => {
    render(<Sidebar />);
    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('renders dividers between sections', () => {
    const { container } = render(<Sidebar />);
    const dividers = container.querySelectorAll('[class*="MuiDivider"]');
    expect(dividers.length).toBeGreaterThanOrEqual(2);
  });

  it('has permanent drawer variant', () => {
    const { container } = render(<Sidebar />);
    const drawer = container.querySelector('[class*="MuiDrawer"]');
    // Material-UI uses MuiDrawer-docked for permanent variant with relative positioning
    expect(drawer).toHaveClass('MuiDrawer-docked');
  });

  it('has proper width styling', () => {
    const { container } = render(<Sidebar />);
    const paper = container.querySelector('.MuiDrawer-paper') as HTMLElement;
    expect(paper).toHaveStyle({ width: '16rem' });
  });
});
