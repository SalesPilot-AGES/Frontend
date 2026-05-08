import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { AdminDashboard } from './AdminDashboard';

describe('AdminDashboard', () => {
  it('renders admin dashboard title', () => {
    render(<AdminDashboard />);
    expect(screen.getByText(EPageTitles.ADMIN_DASHBOARD)).toBeInTheDocument();
  });
});
