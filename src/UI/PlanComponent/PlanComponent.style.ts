import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';

export const StyledPlanFormControl = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.25rem',
  flex: '1 1 0',
  width: '100%',
  minWidth: 0,
  overflow: 'visible',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const StyledPlanFormLabel = styled(FormLabel)(({ theme }) => ({
  ...theme.typography.subtitle1,
  margin: 0,
  color: theme.palette.neutrals[700],
  fontWeight: 500,
  '&.Mui-focused': {
    color: theme.palette.neutrals[700],
  },
}));

export const StyledPlanRadioGroup = styled(RadioGroup)({
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'nowrap',
  gap: '0.875rem',
  width: '100%',
  overflow: 'visible',
});

export const StyledPlanOption = styled(FormControlLabel)(() => ({
  margin: 0,
  alignItems: 'center',
  columnGap: 0,
  '& .MuiFormControlLabel-label': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiTypography-root': {
    display: 'flex',
    alignItems: 'center',
  },
}));
