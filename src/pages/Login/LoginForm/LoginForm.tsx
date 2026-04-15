import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

import { DemoAccountsInfo } from './DemoAccountsInfo/DemoAccountsInfo';
import { useLoginForm } from './UseLoginForm';

export const LoginForm = (): JSX.Element => {
  const { register, handleSubmit, errors, onSubmit, setValue } = useLoginForm();

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <Card sx={{ boxShadow: 3, width: '28rem' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
        }}
      >
        <Typography variant="h4">Entrar</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="Insira seu email"
            margin="normal"
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
          />

          <TextField
            fullWidth
            label="Senha"
            type="password"
            placeholder="Insira sua senha"
            margin="normal"
            variant="outlined"
            sx={{ mb: 3 }}
            error={!!errors.password || !!errors.root}
            helperText={errors.password?.message || errors.root?.message}
            {...register('password')}
          />

          <Button type="submit" variant="gradient" sx={{ width: '100%' }}>
            {GetAppIcon('login')}
            Login
          </Button>
        </form>
        <DemoAccountsInfo setValue={setValue} onSubmit={handleFormSubmit} />
      </CardContent>
    </Card>
  );
};
