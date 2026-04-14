import { render, screen } from '@tests/testUtils';
import { StatusBadge } from '@UI/StatusBadge/StatusBadge';
import { describe, expect, it } from 'vitest';

describe('StatusBadge Component', () => {
  it('renders active status badge', () => {
    render(<StatusBadge active />);

    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('renders inactive status badge', () => {
    render(<StatusBadge active={false} />);

    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('renders a chip component', () => {
    const { container } = render(<StatusBadge active />);

    const chip = container.querySelector('[class*="MuiChip"]');
    expect(chip).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <StatusBadge active sx={{ borderRadius: '1rem' }} />
    );

    const chip = container.querySelector('[class*="MuiChip"]') as HTMLElement;

    expect(chip).toHaveStyle({
      borderRadius: '1rem',
    });
  });

  it('applies active status styles', () => {
    const { container } = render(<StatusBadge active />);

    const chip = container.querySelector('[class*="MuiChip"]') as HTMLElement;

    expect(chip).toHaveStyle({
      fontWeight: '600',
      borderRadius: '1rem',
    });
  });
});
