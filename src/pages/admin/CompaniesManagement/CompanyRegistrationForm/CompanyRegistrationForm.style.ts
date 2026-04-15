import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';

export const StyledCompanyRegistrationForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',
  width: '100%',
  padding: '3rem',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem',
  },
}));

export const StyledCompanyRegistrationRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '3rem',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '1rem',
  },
}));

export const StyledCompanyStatusContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.25rem',
  flex: '1 0 0',
});

export const StyledCompanyStatusLabel = styled(FormLabel)(({ theme }) => ({
  ...theme.typography.subtitle1,
  margin: 0,
  color: theme.palette.neutrals[700],
  fontWeight: 500,
}));

export const StyledCompanyStatusContent = styled(Box)({
  minHeight: '2.5rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.75rem',
});
