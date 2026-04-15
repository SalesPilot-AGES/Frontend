import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const StyledCompanyRegistrationInputControl = styled(FormControl)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.25rem',
  flex: '1 0 0',
  width: '100%',
});

export const StyledCompanyRegistrationInputLabel = styled(FormLabel)(
  ({ theme }) => ({
    ...theme.typography.subtitle1,
    margin: 0,
    color: theme.palette.neutrals[700],
    fontWeight: 500,
    '&.Mui-focused': {
      color: theme.palette.neutrals[700],
    },
  })
);

export const StyledCompanyRegistrationInputTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root': {
    height: '2.5rem',
  },
});
