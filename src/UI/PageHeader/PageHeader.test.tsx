import { render, screen } from '@tests/testUtils';
import { PageHeader } from '@UI/PageHeader/PageHeader';
import { describe, expect, it } from 'vitest';

describe('PageHeader Component', () => {
  it('renders title correctly', () => {
    render(<PageHeader title="Page Title" />);
    expect(screen.getByText('Page Title')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(<PageHeader title="Main Page" subtitle="Page Description" />);
    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.getByText('Page Description')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<PageHeader title="Title Only" />);
    expect(screen.getByText('Title Only')).toBeInTheDocument();
    expect(screen.queryByText(/Description|subtitle/i)).not.toBeInTheDocument();
  });

  it('renders with center alignment', () => {
    const { container } = render(
      <PageHeader title="Centered Page" alignment="center" />
    );
    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toHaveStyle({ alignItems: 'center' });
  });

  it('renders with left alignment by default', () => {
    const { container } = render(<PageHeader title="Left Page" />);
    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toHaveStyle({ alignItems: 'left' });
  });

  it('renders with proper gap between title and subtitle', () => {
    const { container } = render(
      <PageHeader title="Title" subtitle="Subtitle" />
    );
    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toHaveStyle({ gap: '0.5rem' });
  });
});
