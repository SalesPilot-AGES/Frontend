import { render } from '@tests/testUtils';
import { IconBox } from '@UI/IconBox/IconBox';
import { describe, expect, it } from 'vitest';

function getIconBoxRoot(container: HTMLElement): HTMLElement {
  const svg = container.querySelector('svg');
  if (!svg) {
    throw new Error('Expected IconBox to render an SVG');
  }
  let el: HTMLElement | null = svg.parentElement as HTMLElement | null;
  while (el && el !== container) {
    const className = typeof el.className === 'string' ? el.className : '';
    if (className.includes('MuiBox-root')) {
      return el;
    }
    el = el.parentElement;
  }
  throw new Error('Expected IconBox root MuiBox');
}

describe('IconBox Component', () => {
  it('renders with logo icon', () => {
    const { container } = render(<IconBox iconName="logo" theme="primary" />);
    const iconBox = container.querySelector('[class*="MuiBox"]');
    expect(iconBox).toBeInTheDocument();
  });

  it('renders with dashboard icon and primary theme', () => {
    const { container } = render(
      <IconBox iconName="dashboard" theme="primary" />
    );
    const iconBox = container.querySelector('[class*="MuiBox"]');
    expect(iconBox).toBeInTheDocument();
  });

  it('renders with company icon and companies theme', () => {
    const { container } = render(
      <IconBox iconName="company" theme="companies" />
    );
    const iconBox = container.querySelector('[class*="MuiBox"]');
    expect(iconBox).toBeInTheDocument();
  });

  it('renders with manager icon and managers theme', () => {
    const { container } = render(
      <IconBox iconName="manager" theme="managers" />
    );
    const iconBox = container.querySelector('[class*="MuiBox"]');
    expect(iconBox).toBeInTheDocument();
  });

  it('renders with salesman icon and salesmen theme', () => {
    const { container } = render(
      <IconBox iconName="salesman" theme="salesmen" />
    );
    const iconBox = container.querySelector('[class*="MuiBox"]');
    expect(iconBox).toBeInTheDocument();
  });

  it('renders with meeting icon and meetings theme', () => {
    const { container } = render(
      <IconBox iconName="meeting" theme="meetings" />
    );
    const iconBox = container.querySelector('[class*="MuiBox"]');
    expect(iconBox).toBeInTheDocument();
  });

  it('applies custom sx styles', () => {
    const { container } = render(
      <IconBox
        iconName="logo"
        theme="primary"
        sx={{ width: '4rem', height: '4rem' }}
      />
    );
    const iconBox = getIconBoxRoot(container);
    expect(iconBox).toHaveStyle({
      width: '4rem',
      height: '4rem',
    });
  });

  it('has proper box styling', () => {
    const { container } = render(
      <IconBox iconName="dashboard" theme="primary" />
    );
    const iconBox = getIconBoxRoot(container);
    const computed = getComputedStyle(iconBox);
    expect(computed.display).toBe('flex');
    expect(computed.alignItems).toBe('center');
    expect(computed.justifyContent).toBe('center');
    expect(['48px', '3rem']).toContain(computed.width);
    expect(['48px', '3rem']).toContain(computed.height);
  });
});
