import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { ManagerSalesmenPage } from './ManagerSalesmenPage';

describe('ManagerSalesmenPage', () => {
  it('renders salesmen title', () => {
    render(<ManagerSalesmenPage />);
    expect(screen.getByText(EPageTitles.SALESMEN)).toBeInTheDocument();
  });
});
