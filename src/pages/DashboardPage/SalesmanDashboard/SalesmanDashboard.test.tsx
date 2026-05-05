import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { SalesmanDashboard } from './SalesmanDashboard';

describe('SalesmanDashboard', () => {
  it('renders salesman dashboard title', () => {
    render(<SalesmanDashboard />);
    expect(
      screen.getByText(EPageTitles.SALESMAN_DASHBOARD)
    ).toBeInTheDocument();
  });
});
