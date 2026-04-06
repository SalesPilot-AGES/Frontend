import { useCurrentUser } from '@store/hooks/useCurrentUser';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { type JSX, useEffect } from 'react';

import { Layout } from './Layout';

// Root route - renders Layout for app routes, or direct component for login
export const RootComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const user = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    // redirect to login if not authenticated and not already on login page
    if (!user) {
      navigate({ to: '/login', replace: true });
    }
  }, [user, navigate]);

  const isLoginPage = location.pathname === '/login';

  return isLoginPage ? (
    <Outlet />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
};
