import { Layout } from '@pages/Layout';
import type { JSX } from 'react';

export function withLayout<P extends object>(
  Component: React.ComponentType<P>
) {
  return function LayoutWrapper(props: P): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
}
