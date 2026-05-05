import { EPageRoutes } from '@data/enums/EPageRoutes';
import type { LoginFormData, UseLoginFormReturn } from '@declarations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@store/authStore';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import z from 'zod';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const useLoginForm = (): UseLoginFormReturn => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData): void => {
    clearErrors('root');
    const user = loginUser(data.email, data.password);

    if (user) {
      // Navigate to role-specific dashboard
      const dashboardRoute = EPageRoutes.DASHBOARD;

      navigate({ to: dashboardRoute });
    } else {
      setError('root', {
        message: 'Invalid email or password',
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
  };
};
