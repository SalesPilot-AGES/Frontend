import { ECardLabel } from '@data/enums/ECardLabel';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('renders icon area, value, label and insight chip', () => {
    render(
      <MetricCard
        iconName="company"
        iconTheme="companies"
        label={ECardLabel.ACTIVE_COMPANIES}
        value={4}
        variationPercentage={12}
        trend="up"
      />
    );

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText(ECardLabel.ACTIVE_COMPANIES)).toBeInTheDocument();
    expect(screen.getByText('+12%')).toBeInTheDocument();
  });
});
