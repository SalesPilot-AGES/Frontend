import type { IBasicModalProps } from '@declarations/ui';
import { Box, Button, Stack, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import ModalHeader from '@UI/AppModal/ModalHeader/ModalHeader';
import type { JSX } from 'react';

export default function AppModal({
  modalName,
  open,
  children,
  handleClose,
  handleSubmit,
  isSaveButtonDisabled,
}: IBasicModalProps): JSX.Element {
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
          >
            <Typography variant="body1">{'Cancelar'}</Typography>
          </Button>
          <Button
            startIcon={GetAppIcon('save')}
            variant="contained"
            disabled={isSaveButtonDisabled}
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            <Typography variant="body1">{'Salvar'}</Typography>
          </Button>
        </Box>
      </Stack>
    </Modal>
  );
}
