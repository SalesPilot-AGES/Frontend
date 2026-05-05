import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { AdminMeetingsPage } from './AdminMeetingsPage';

describe('AdminMeetingsPage', () => {
  it('renders meetings title', () => {
    render(<AdminMeetingsPage />);
    expect(screen.getByText(EPageTitles.MEETINGS)).toBeInTheDocument();
  });
});
