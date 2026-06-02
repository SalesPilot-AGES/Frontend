export const MuiTextField = {
  styleOverrides: {
    root: {
      '& .MuiInputBase-root': {
        height: '3rem',
        borderRadius: '0.75rem',
      },
      '& .MuiInputLabel-root': {
        transform: 'translate(14px, 11px) scale(1)',
      },
      '& .MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
      '& .MuiInputLabel-root.Mui-error': {
        color: '#5B2520',
      },
      '& .MuiOutlinedInput-root.Mui-error': {
        '& fieldset': {
          borderColor: '#5B2520',
        },
        '&:hover fieldset': {
          borderColor: '#5B2520',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#5B2520',
        },
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: '#5B2520',
      },
    },
  },
};
