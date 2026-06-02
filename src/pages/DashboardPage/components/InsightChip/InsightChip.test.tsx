import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { InsightChip } from './InsightChip';

describe('InsightChip', () => {
  it('renders positive variation with plus sign', () => {
    render(<InsightChip variationPercentage={12} trend="up" />);

    expect(screen.getByText('+12%')).toBeInTheDocument();
  });

  it('renders negative variation with minus sign', () => {
    render(<InsightChip variationPercentage={25} trend="down" />);

    expect(screen.getByText('-25%')).toBeInTheDocument();
  });

  it('renders neutral variation without plus or minus', () => {
    render(<InsightChip variationPercentage={0} trend="neutral" />);

    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
