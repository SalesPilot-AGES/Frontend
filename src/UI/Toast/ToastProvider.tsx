import Alert, { type AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import type { JSX, ReactNode, SyntheticEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { ToastContext } from './useToast';

type ToastState = {
  id: number;
  message: string;
  severity: AlertColor;
};

export interface IToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({
  children,
}: IToastProviderProps): JSX.Element => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback(
    (message: string, severity: AlertColor = 'success') => {
      setToast({
        id: Date.now(),
        message,
        severity,
      });
    },
    []
  );

  const handleClose = useCallback(
    (_event?: Event | SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setToast(null);
    },
    []
  );

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Snackbar
        key={toast?.id}
        open={Boolean(toast)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={toast?.severity ?? 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
