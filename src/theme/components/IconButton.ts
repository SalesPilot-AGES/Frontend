import { primary } from '@theme/palettes/Primary';

export const MuiIconButton = {
  styleOverrides: {
    root: {
      color: primary[500],
      '&:hover': {
        backgroundColor: primary[100],
      },
    },
  },
};
