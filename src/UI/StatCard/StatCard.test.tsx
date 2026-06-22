import { ECardLabel } from '@data/enums/ECardLabel';
import { render, screen } from '@tests/testUtils';
import { StatCard } from '@UI/StatCard/StatCard';
import { describe, expect, it } from 'vitest';

const defaultProps = {
  iconName: 'company' as const,
  theme: 'companies' as const,
  value: 4,
  label: ECardLabel.ACTIVE_COMPANIES,
};

describe('StatCard Component', () => {
  it('renders value and label', () => {
    render(<StatCard {...defaultProps} />);
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.ACTIVE_COMPANIES)).toBeInTheDocument();
  });

  it('renders string value', () => {
    render(
      <StatCard
        {...defaultProps}
        value="1.2k"
        label={ECardLabel.TOTAL_MEETINGS}
      />
    );
    expect(screen.getByText('1.2k')).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.TOTAL_MEETINGS)).toBeInTheDocument();
  });

  it('renders without optional theme', () => {
    render(
      <StatCard iconName="dashboard" value={0} label={ECardLabel.MANAGERS} />
    );
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.MANAGERS)).toBeInTheDocument();
  });

  it('renders with primary theme and logo icon', () => {
    render(
      <StatCard
        iconName="logo"
        theme="primary"
        value={10}
        label={ECardLabel.ACTIVE_SALESMAN}
      />
    );
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.ACTIVE_SALESMAN)).toBeInTheDocument();
  });

  it('merges custom sx on root box', () => {
    render(<StatCard {...defaultProps} sx={{ maxWidth: '18rem' }} />);
    const root = screen.getByText('4').closest('[class*="MuiBox"]');
    expect(root).toHaveStyle({ maxWidth: '18rem' });
  });

  it('renders stack with vertical gap', () => {
    const { container } = render(<StatCard {...defaultProps} />);
    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toBeInTheDocument();
    expect(stack).toHaveStyle({ gap: '0.75rem' });
  });
});
