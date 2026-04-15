import type { TIconName } from '@declarations/ui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GetAppIcon } from '@UI/AppIcon/AppIcon';
import type { JSX } from 'react';

export default function ModalFooter({
  handleClose,
}: {
  handleClose?: () => void;
}): JSX.Element {
  return (
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
      <FooterButton
        icon="close"
        content="Cancelar"
        variant="outlined"
        onClick={handleClose}
      />
      <FooterButton icon="save" content="Salvar" variant="contained" />
    </Box>
  );
}

function FooterButton({
  icon,
  content,
  variant,
  onClick,
}: {
  icon: TIconName;
  content: string;
  variant: 'outlined' | 'contained';
  onClick?: () => void;
}): JSX.Element {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      sx={{
        borderRadius: '0.75rem',
        gap: '0.5rem',
        width: '15.625rem',
        height: '3.125rem',
        textTransform: 'none',
        '& svg': {
          width: '1.5rem',
          height: '1.5rem',
        },
      }}
    >
      {GetAppIcon(icon)}
      <Typography variant="body1">{content}</Typography>
    </Button>
  );
}
