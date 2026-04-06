import { neutrals } from '@theme/palettes/Neutrals';
import { primary } from '@theme/palettes/Primary';

export const MuiListItemButton = {
  styleOverrides: {
    root: {
      backgroundColor: neutrals.baseWhite,
      color: neutrals[800],
      height: '3rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      gap: '0.5rem',
      '&.Mui-selected': {
        backgroundColor: primary[100],
        color: primary[500],
      },
    },
  },
};
