import { render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./useLoginForm', () => ({
  useLoginForm: () => ({
    register: vi.fn(() => ({})),
    handleSubmit: (fn: unknown) => fn,
    errors: {},
    onSubmit: vi.fn(),
    setValue: vi.fn(),
    watch: vi.fn(() => ''),
  }),
}));

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders email input', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('renders Login button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders the card title', () => {
    render(<LoginForm />);
    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
});
