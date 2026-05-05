import type { TColorThemeOptions, TColorThemeResult } from '@declarations';
import { useTheme } from '@mui/material/styles';

export const useColorTheme = (
  theme: TColorThemeOptions | undefined
): TColorThemeResult => {
  const { palette } = useTheme();
  switch (theme) {
    case 'primary':
      return {
        color: palette.primary[500],
        backgroundColor: palette.primary[200],
      };
    case 'companies':
      return {
        color: palette.companies[500],
        backgroundColor: palette.companies[200],
      };
    case 'managers':
      return {
        color: palette.managers[500],
        backgroundColor: palette.managers[200],
      };
    case 'salesmen':
      return {
        color: palette.salesmen[500],
        backgroundColor: palette.salesmen[200],
      };
    case 'meetings':
      return {
        color: palette.meetings[500],
        backgroundColor: palette.meetings[200],
      };
    case 'neutrals':
      return {
        color: palette.neutrals[400],
        backgroundColor: palette.neutrals[200],
      };
    default:
      return {
        color: palette.neutrals[100],
        backgroundColor: palette.primary[500],
      };
  }
};
