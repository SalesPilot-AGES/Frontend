import { render, screen } from '@tests/testUtils';
import { PageContainter } from '@UI/PageContainer/PageContainer';
import { describe, expect, it } from 'vitest';

describe('PageContainer Component', () => {
  it('renders children correctly', () => {
    render(
      <PageContainter>
        <div>Test Content</div>
      </PageContainter>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <PageContainter>
        <div>First Child</div>
        <div>Second Child</div>
      </PageContainter>
    );
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('applies proper styling to container', () => {
    const { container } = render(
      <PageContainter>
        <div>Content</div>
      </PageContainter>
    );
    const box = container.querySelector('[class*="MuiBox"]') as HTMLElement;
    expect(box).toHaveStyle({
      display: 'flex',
      height: '100%',
      width: '100%',
      padding: '2rem',
    });
  });

  it('renders as full width and height', () => {
    const { container } = render(
      <PageContainter>
        <div>Full Size</div>
      </PageContainter>
    );
    const box = container.querySelector('[class*="MuiBox"]') as HTMLElement;
    expect(box).toHaveStyle({
      width: '100%',
      height: '100%',
    });
  });
});
