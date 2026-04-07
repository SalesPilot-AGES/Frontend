import type { RenderOptions, RenderResult } from '@testing-library/react';
import {
  cleanup,
  fireEvent,
  render as rtlRender,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import type { ReactElement } from 'react';

import { TestProviders } from './TestProviders';

/**
 * Custom render function that wraps components with all necessary providers.
 * Use this instead of the default render from @testing-library/react.
 *
 * @param ui - The component to render
 * @param options - Additional render options
 * @returns Render result with all testing utilities
 *
 * @example
 * ```tsx
 * import { render, screen } from '@tests/testUtils';
 *
 * test('renders component', () => {
 *   render(<MyComponent />);
 *   expect(screen.getByText('Hello')).toBeInTheDocument();
 * });
 * ```
 */
function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return rtlRender(ui, { wrapper: TestProviders, ...options });
}

export { cleanup, fireEvent, render, screen, waitFor, within };
export type { RenderOptions, RenderResult };
