import type { TColorThemeOptions, TColorThemeResult } from '@declarations';
import { useTheme } from '@mui/material/styles';

export const useColorTheme = (
  theme: TColorThemeOptions | undefined
): TColorThemeResult => {
  const { palette } = useTheme();
  switch (theme) {
    case 'primary':
      return {
        color: palette.primary[200],
        backgroundColor: palette.primary[500],
      };
    case 'companies':
      return {
        color: palette.companies[200],
        backgroundColor: palette.companies[500],
      };
    case 'managers':
      return {
        color: palette.managers[200],
        backgroundColor: palette.managers[500],
      };
    case 'salesmen':
      return {
        color: palette.salesmen[200],
        backgroundColor: palette.salesmen[500],
      };
    case 'meetings':
      return {
        color: palette.meetings[200],
        backgroundColor: palette.meetings[500],
      };
    default:
      return {
        color: palette.neutrals[100],
        backgroundColor: palette.primary[500],
      };
  }
};
