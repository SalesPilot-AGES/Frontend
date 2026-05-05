import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./AppTitle/AppTitle', () => ({
  AppTitle: () => <div data-testid="app-title" />,
}));
vi.mock('./LoginForm/LoginForm', () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));

import { Login } from './Login';

describe('Login', () => {
  it('renders AppTitle', () => {
    render(<Login />);
    expect(screen.getByTestId('app-title')).toBeInTheDocument();
  });

  it('renders LoginForm', () => {
    render(<Login />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
