import { EPageTitles } from '@data/enums/EPageTitles';
import { render, screen } from '@tests/testUtils';
import { describe, expect, it } from 'vitest';

import { AppTitle } from './AppTitle';

describe('AppTitle', () => {
  it('renders SalesPilot title', () => {
    render(<AppTitle />);
    expect(screen.getByText(EPageTitles.LOGIN)).toBeInTheDocument();
  });

  it('renders logo icon box', () => {
    const { container } = render(<AppTitle />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
