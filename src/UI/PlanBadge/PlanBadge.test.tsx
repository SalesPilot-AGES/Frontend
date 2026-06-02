import { EPlan } from '@data/enums/EPlan';
import { render, screen } from '@tests/testUtils';
import { PlanBadge } from '@UI/PlanBadge/PlanBadge';
import { describe, expect, it } from 'vitest';

describe('PlanBadge Component', () => {
  it('renders basic plan badge', () => {
    render(<PlanBadge plan={EPlan.BASIC} />);
    expect(screen.getByText('Básico')).toBeInTheDocument();
  });

  it('renders pro plan badge', () => {
    render(<PlanBadge plan={EPlan.PRO} />);
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('renders enterprise plan badge', () => {
    render(<PlanBadge plan={EPlan.ENTERPRISE} />);
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
  });

  it('renders a chip component', () => {
    const { container } = render(<PlanBadge plan={EPlan.BASIC} />);
    const chip = container.querySelector('[class*="MuiChip"]');
    expect(chip).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <PlanBadge plan={EPlan.BASIC} sx={{ borderRadius: '1rem' }} />
    );

    const chip = container.querySelector('[class*="MuiChip"]') as HTMLElement;

    expect(chip).toHaveStyle({
      borderRadius: '1rem',
    });
  });
});
