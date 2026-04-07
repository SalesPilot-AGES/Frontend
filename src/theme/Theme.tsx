import type { PaletteColorOptions } from '@declarations';
import { createTheme } from '@mui/material';

import { MuiButton } from './components/Button';
import { MuiDivider } from './components/Divider';
import { MuiIconButton } from './components/IconButton';
import { MuiListItemButton } from './components/ListItemButton';
import { MuiPaper } from './components/Paper';
import { MuiTextField } from './components/TextField';
import { companies } from './palettes/Companies';
import { error } from './palettes/Error';
import { info } from './palettes/Info';
import { managers } from './palettes/Managers';
import { meetings } from './palettes/Meetings';
import { neutrals } from './palettes/Neutrals';
import { primary } from './palettes/Primary';
import { salesmen } from './palettes/Salesmen';
import { success } from './palettes/Sucess';
import { warning } from './palettes/Warning';
import { typography } from './typography/Typography';

declare module '@mui/material/styles' {
  // Extend the Palette and PaletteOptions interfaces to include custom color categories
  interface SimplePaletteColorOptions {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface Palette {
    companies: PaletteColorOptions;
    managers: PaletteColorOptions;
    salesmen: PaletteColorOptions;
    meetings: PaletteColorOptions;
    neutrals: PaletteColorOptions;
  }

  interface PaletteOptions {
    companies?: PaletteColorOptions;
    managers?: PaletteColorOptions;
    salesmen?: PaletteColorOptions;
    meetings?: PaletteColorOptions;
    neutrals?: PaletteColorOptions;
  }
}

// Extend the ButtonPropsVariantOverrides to include only the custom 'gradient' variant, 'contained' and 'outlined'
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    gradient?: true;
    contained: true;
    outlined: true;
  }
}

// Define the custom theme using createTheme, incorporating the custom color palettes, components and typography
export const theme = createTheme({
  palette: {
    primary,
    neutrals,
    companies,
    managers,
    salesmen,
    meetings,
    success,
    info,
    warning,
    error,
  },
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          width: '100%',
        },
        body: {
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
        },
        '#root': {
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiButton,
    MuiPaper,
    MuiTextField,
    MuiDivider,
    MuiListItemButton,
    MuiIconButton,
  },
});

export default theme;
