import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { ManagerMeetingsPage } from './ManagerMeetingsPage';

describe('ManagerMeetingsPage', () => {
  it('renders meetings title', () => {
    render(<ManagerMeetingsPage />);
    expect(screen.getByText(EPageTitles.MEETINGS)).toBeInTheDocument();
  });
});
