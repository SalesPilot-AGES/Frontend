import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { UserProfile } from './UserProfile';

// Mock the hooks
vi.mock('@store/hooks/useCurrentUser', () => ({
  useRequireUser: vi.fn(() => ({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
  })),
}));

vi.mock('./UseUserProfile', () => ({
  useUserProfile: vi.fn(() => ({
    handleLogout: vi.fn(),
  })),
}));

describe('UserProfile Component', () => {
  it('renders user avatar with initials', () => {
    render(<UserProfile />);
    expect(screen.getByText('JO')).toBeInTheDocument();
  });

  it('renders user name', () => {
    render(<UserProfile />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders user email', () => {
    render(<UserProfile />);
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('renders logout button', () => {
    const { container } = render(<UserProfile />);
    const iconButton = container.querySelector('[class*="MuiIconButton"]');
    expect(iconButton).toBeInTheDocument();
  });

  it('displays avatar with proper dimensions', () => {
    const { container } = render(<UserProfile />);
    const avatar = container.querySelector(
      '[class*="MuiAvatar"]'
    ) as HTMLElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveStyle({
      width: '2.5rem',
      height: '2.5rem',
    });
  });

  it('renders user profile box with proper layout', () => {
    const { container } = render(<UserProfile />);
    const box = container.querySelector('[class*="MuiBox"]');
    expect(box).toHaveStyle({
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1.5rem',
    });
  });
});
