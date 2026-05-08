import { render, screen } from '@tests/testUtils';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { withLayout } from './LayoutWrapper';

// Mock the Layout component
vi.mock('@pages/Layout/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }): JSX.Element => (
    <div data-testid="mock-layout">
      <div data-testid="layout-content">{children}</div>
    </div>
  ),
}));

describe('LayoutWrapper HOC', () => {
  it('wraps component with Layout', () => {
    const TestComponent = (): JSX.Element => <div>Test Content</div>;
    const WrappedComponent = withLayout(TestComponent);

    render(<WrappedComponent />);

    expect(screen.getByTestId('mock-layout')).toBeInTheDocument();
    expect(screen.getByTestId('layout-content')).toBeInTheDocument();
  });

  it('passes props to wrapped component', () => {
    interface TestComponentProps {
      title: string;
      message: string;
    }

    const TestComponent = ({
      title,
      message,
    }: TestComponentProps): JSX.Element => (
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    );

    const WrappedComponent = withLayout(TestComponent);

    render(<WrappedComponent title="Test Title" message="Test Message" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders wrapped component inside layout', () => {
    const TestComponent = (): JSX.Element => (
      <span data-testid="wrapped-content">Wrapped</span>
    );
    const WrappedComponent = withLayout(TestComponent);

    render(<WrappedComponent />);

    const layout = screen.getByTestId('mock-layout');
    const content = screen.getByTestId('wrapped-content');

    expect(layout).toContainElement(content);
  });

  it('preserves component displayName for debugging', () => {
    const TestComponent = (): JSX.Element => <div>Test</div>;
    TestComponent.displayName = 'TestComponent';

    const WrappedComponent = withLayout(TestComponent);

    expect(WrappedComponent.name).toBe('LayoutWrapper');
  });
});
