import { render, screen } from '@tests/testUtils';
import { Header } from '@UI/Header/Header';
import { describe, expect, it } from 'vitest';

describe('Header Component', () => {
  it('renders title correctly', () => {
    render(<Header title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders title and subtitle', () => {
    render(<Header title="Main Title" subtitle="Sub Title" />);
    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Sub Title')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<Header title="Only Title" />);
    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText(/Sub|subtitle/i)).not.toBeInTheDocument();
  });

  it('renders with different alignment', () => {
    const { container } = render(
      <Header title="Centered" alignment="center" />
    );
    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toHaveStyle({ alignItems: 'center' });
  });

  it('renders with left alignment by default', () => {
    const { container } = render(<Header title="Left Aligned" />);
    const stack = container.querySelector('[class*="MuiStack"]');
    expect(stack).toHaveStyle({ alignItems: 'left' });
  });
});
