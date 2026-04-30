import { EPageRoutes } from '@data/enums/EPageRoutes';
import { useAuthStore } from '@store/authStore';
import { useNavigate } from '@tanstack/react-router';

export const useUserProfile = (): {
  handleLogout: () => void;
} => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const handleLogout = (): void => {
    logout();
    navigate({ to: EPageRoutes.LOGIN });
  };

  return {
    handleLogout,
  };
};
