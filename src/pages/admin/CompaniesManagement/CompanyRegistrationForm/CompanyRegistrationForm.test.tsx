import userEvent from '@testing-library/user-event';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { CompanyRegistrationForm } from './CompanyRegistrationForm';

describe('CompanyRegistrationForm', () => {
  it('renders all sections', () => {
    render(<CompanyRegistrationForm />);

    expect(screen.getByText('Nome da empresa')).toBeInTheDocument();
    expect(screen.getByText('Plano')).toBeInTheDocument();
    expect(screen.getByText('CNPJ')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Telefone')).toBeInTheDocument();
    expect(screen.getByText('Endereço')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(
      screen.getByRole('checkbox', { name: 'status da empresa' })
    ).toBeChecked();
  });

  it('toggles status switch', async () => {
    const user = userEvent.setup();

    render(<CompanyRegistrationForm />);

    const statusSwitch = screen.getByRole('checkbox', {
      name: 'status da empresa',
    });

    await user.click(statusSwitch);

    expect(statusSwitch).not.toBeChecked();
    expect(screen.getByText('Desativo')).toBeInTheDocument();
  });
});
