import type { TIconName } from '@declarations/ui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

export interface IModalHeaderProps {
  modalName: string;
  handleClose: () => void;
}

interface IHeaderButtonProps {
  icon: TIconName;
  onClick: () => void;
}

export const ModalHeader = ({
  modalName,
  handleClose,
}: IModalHeaderProps): JSX.Element => {
  return (
    <Box
      display="flex"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography id="modal-modal-title" variant="h5">
        {modalName}
      </Typography>
      <HeaderButton icon="close" onClick={handleClose} />
    </Box>
  );
};

const HeaderButton = ({ icon, onClick }: IHeaderButtonProps): JSX.Element => {
  return (
    <Button
      sx={{
        minWidth: '2.25rem',
        width: '2.25rem',
        height: '2.25rem',
        padding: 0,
        '& svg': {
          width: '1.75rem',
          height: '1.75rem',
        },
        color: 'black',
      }}
      onClick={onClick}
    >
      {GetAppIcon(icon)}
    </Button>
  );
};
