import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import { ModalHeader } from '@UI/AppModal/ModalHeader/ModalHeader';
import type { JSX } from 'react';

export interface IAppModalProps {
  modalName: string;
  handleClose: () => void;
  open: boolean;
  handleSubmit: () => void;
  children: JSX.Element;
  isSaveButtonDisabled?: boolean;
  isSubmitting?: boolean;
}

export const AppModal = ({
  modalName,
  open,
  children,
  handleClose,
  handleSubmit,
  isSaveButtonDisabled,
  isSubmitting,
}: IAppModalProps): JSX.Element => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Stack
        sx={{
          borderRadius: '1rem',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          width: '50rem',
          outline: 'none',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <ModalHeader modalName={modalName} handleClose={handleClose} />

        {children}

        <Box
          display="flex"
          sx={{
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '1.5rem',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            startIcon={GetAppIcon('close')}
            disabled={isSubmitting}
          >
            <Typography variant="body1">{'Cancelar'}</Typography>
          </Button>
          <Button
            startIcon={
              isSubmitting ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                GetAppIcon('save')
              )
            }
            variant="contained"
            disabled={isSaveButtonDisabled || isSubmitting}
            onClick={() => {
              if (isSubmitting) return;
              void handleSubmit();
            }}
          >
            <Typography variant="body1">{'Salvar'}</Typography>
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
};
