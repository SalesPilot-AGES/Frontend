import { fireEvent, render, screen } from '@tests/testUtils';
import { describe, expect, it, vi } from 'vitest';

import { CompanyRegistrationInput } from './CompanyRegistrationInput';

describe('CompanyRegistrationInput', () => {
  it('renders label and input', () => {
    render(<CompanyRegistrationInput label="Nome da empresa" />);

    expect(screen.getByText('Nome da empresa')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Nome da empresa' })
    ).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();

    render(
      <CompanyRegistrationInput
        label="Nome da empresa"
        value=""
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'Nome da empresa' }), {
      target: { value: 'SalesPilot' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
