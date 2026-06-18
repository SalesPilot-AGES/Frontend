import type { AlertColor } from '@mui/material/Alert';
import { createContext, useContext } from 'react';

export type ToastContextValue = {
  showToast: (message: string, severity?: AlertColor) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
