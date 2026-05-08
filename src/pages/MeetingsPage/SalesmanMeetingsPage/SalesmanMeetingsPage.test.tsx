import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { SalesmanMeetingsPage } from './SalesmanMeetingsPage';

describe('SalesmanMeetingsPage', () => {
  it('renders meetings title', () => {
    render(<SalesmanMeetingsPage />);
    expect(screen.getByText(EPageTitles.MEETINGS)).toBeInTheDocument();
  });
});
