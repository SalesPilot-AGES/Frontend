import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { AdminSalesmenPage } from './AdminSalesmenPage';

describe('AdminSalesmenPage', () => {
  it('renders salesmen title', () => {
    render(<AdminSalesmenPage />);
    expect(screen.getByText(EPageTitles.SALESMEN)).toBeInTheDocument();
  });
});
