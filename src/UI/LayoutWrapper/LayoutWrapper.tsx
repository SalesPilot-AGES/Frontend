import { Layout } from '@pages/Layout/Layout';
import type { JSX } from 'react';

export const withLayout = <P extends object>(
  Component: React.ComponentType<P>
): ((props: P) => JSX.Element) => {
  const LayoutWrapper = (props: P): JSX.Element => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
  return LayoutWrapper;
};
