import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { DemoAccountsInfo } from './DemoAccountsInfo';

describe('DemoAccountsInfo', () => {
  it('renders three demo account buttons', () => {
    render(<DemoAccountsInfo setValue={vi.fn()} onSubmit={vi.fn()} />);
    expect(screen.getByText(/Admin/)).toBeInTheDocument();
    expect(screen.getByText(/Manager/)).toBeInTheDocument();
    expect(screen.getByText(/Salesmen/)).toBeInTheDocument();
  });

  it('calls setValue and onSubmit when Admin button is clicked', () => {
    const setValue = vi.fn();
    const onSubmit = vi.fn();
    render(<DemoAccountsInfo setValue={setValue} onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /admin/i }));

    expect(setValue).toHaveBeenCalledWith(
      'email',
      'admin@example.com',
      expect.any(Object)
    );
    expect(setValue).toHaveBeenCalledWith(
      'password',
      'password',
      expect.any(Object)
    );
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('calls setValue with manager email when Manager button is clicked', () => {
    const setValue = vi.fn();
    render(<DemoAccountsInfo setValue={setValue} onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /manager/i }));
    expect(setValue).toHaveBeenCalledWith(
      'email',
      'manager@example.com',
      expect.any(Object)
    );
  });

  it('calls setValue with salesmen email when Salesmen button is clicked', () => {
    const setValue = vi.fn();
    render(<DemoAccountsInfo setValue={setValue} onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /salesmen/i }));
    expect(setValue).toHaveBeenCalledWith(
      'email',
      'salesmen@example.com',
      expect.any(Object)
    );
  });
});
