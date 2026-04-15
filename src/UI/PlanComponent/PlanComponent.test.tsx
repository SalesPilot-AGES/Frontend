import { EPlan } from '@data/enums/EPlan';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@tests/testUtils';
import { PlanComponent } from '@UI/PlanComponent/PlanComponent';
import { describe, expect, it, vi } from 'vitest';

describe('PlanComponent', () => {
  it('renders the title and all plans', () => {
    render(<PlanComponent />);

    expect(screen.getByText('Plano')).toBeInTheDocument();
    expect(screen.getByText('Básico')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('selects basic plan by default', () => {
    render(<PlanComponent />);

    expect(screen.getByRole('radio', { name: 'Básico' })).toBeChecked();
  });

  it('calls onChange when selecting another plan', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<PlanComponent onChange={onChange} />);

    await user.click(screen.getByRole('radio', { name: 'Enterprise' }));

    expect(onChange).toHaveBeenCalledWith(EPlan.ENTERPRISE);
  });
});
