import { neutrals } from '../palettes/Neutrals';
import { primary } from '../palettes/Primary';

export const MuiButton = {
  styleOverrides: {
    root: {
      width: 'fit-content',
      height: '3rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      gap: '0.5rem',
      textTransform: 'uppercase',
      fontWeight: 600,
      '& label': {
        fontSize: '1rem',
      },
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: `linear-gradient(90deg, ${primary[700]} 0%, ${primary[500]} 100%)`,
            color: neutrals[100],
            boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.15)`,
            '&:hover': {
              boxShadow: `0px 6px 6px rgba(0, 0, 0, 0.2)`,
            },
            '&:active': {
              boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.2)`,
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            background: primary[500],
            color: neutrals[100],
            '&:hover': {
              background: primary[400],
            },
            '&:active': {
              background: primary[600],
            },
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            borderColor: primary[500],
            color: primary[500],
            '&:hover': {
              borderColor: primary[400],
              background: primary[100],
            },
            '&:active': {
              borderColor: primary[600],
              background: primary[200], // 25% opacity
            },
          },
        },
      ],
    },
  },
};
