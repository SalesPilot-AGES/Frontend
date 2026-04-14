import type { IBasicModalProps } from '@declarations/ui';
import { Stack } from '@mui/material';
import Modal from '@mui/material/Modal';
import ModalFooter from '@UI/ModalFooter/ModalFooter';
import ModalHeader from '@UI/ModalHeader/ModalHeader';
import type { JSX } from 'react';

export default function BasicModal({
  modalName,
  handleClose,
  open,
  children,
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
        <ModalHeader modalName={modalName} />

        {children}

        <ModalFooter />
      </Stack>
    </Modal>
  );
}
