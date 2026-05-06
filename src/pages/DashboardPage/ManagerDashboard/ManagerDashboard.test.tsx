import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { ManagerDashboard } from './ManagerDashboard';

describe('ManagerDashboard', () => {
  it('renders manager dashboard title', () => {
    render(<ManagerDashboard />);
    expect(screen.getByText(EPageTitles.MANAGER_DASHBOARD)).toBeInTheDocument();
  });
});
