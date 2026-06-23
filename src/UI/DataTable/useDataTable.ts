import { EDataTableBgShade } from '@data/enums/EDataTableBgShade';
import { EDataTableFgShade } from '@data/enums/EDataTableFgShade';
import { EDataTableScaleBgFg } from '@data/enums/EDataTableScaleBgFg';
import type {
  BadgeLook,
  DataTableAccessor,
  DataTableBadgeColor,
  DataTableColumn,
  DataTableIconColorTuple,
} from '@declarations/ui';
import type { Palette } from '@mui/material/styles';
import { alpha, useTheme } from '@mui/material/styles';
import { normalizeText } from '@utils/normalizeText';
import type { ReactNode } from 'react';
import { useMemo } from 'react';

export const ROWS_PER_PAGE = 5;

export const HEADER_FIRST_LINE_MAX_LEN = 8;

export const iconTupleToCss = (tuple: DataTableIconColorTuple): string =>
  `rgb(${tuple[0]}, ${tuple[1]}, ${tuple[2]})`;

export const formatHeaderMultiline = (header: string): string => {
  const trimmed = header.trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 1) {
    return trimmed;
  }

  let line1 = words[0];
  if (line1.length > HEADER_FIRST_LINE_MAX_LEN) {
    return `${line1}\n${words.slice(1).join(' ')}`;
  }

  let index = 1;
  while (index < words.length) {
    const candidate = `${line1} ${words[index]}`;
    if (candidate.length >= HEADER_FIRST_LINE_MAX_LEN + 1) {
      break;
    }
    line1 = candidate;
    index += 1;
  }

  if (index >= words.length) {
    return trimmed;
  }

  return `${line1}\n${words.slice(index).join(' ')}`;
};

export const resolveCellIconColor = (
  palette: Palette,
  tuple: DataTableIconColorTuple | undefined
): string => (tuple ? iconTupleToCss(tuple) : palette.neutrals[500]);

export const resolveCellValue = <T>(
  row: T,
  accessor: DataTableAccessor<T>
): ReactNode =>
  typeof accessor === 'function' ? accessor(row) : (row[accessor] as ReactNode);

export const resolveBadgeColor = <T>(
  value: ReactNode,
  row: T,
  column: DataTableColumn<T>
): DataTableBadgeColor => {
  if (typeof column.badgeColor === 'function') {
    return column.badgeColor(value, row);
  }

  if (column.badgeColor) {
    return column.badgeColor;
  }

  const normalizedValue =
    typeof value === 'string'
      ? value.toLowerCase()
      : String(value ?? '').toLowerCase();

  if (/^ativo|active|enabled/.test(normalizedValue)) {
    return 'success';
  }

  if (/^inativo|inactive|disabled/.test(normalizedValue)) {
    return 'default';
  }

  if (/pendente|pending/.test(normalizedValue)) {
    return 'warning';
  }

  return 'primary';
};

const scaleBgFg = (
  palette: Palette,
  key: (typeof EDataTableScaleBgFg)[keyof typeof EDataTableScaleBgFg],
  bgShade: (typeof EDataTableBgShade)[keyof typeof EDataTableBgShade],
  fgShade: (typeof EDataTableFgShade)[keyof typeof EDataTableFgShade]
): BadgeLook => {
  const tone = palette[key as keyof Palette] as unknown as
    | Record<string, string>
    | undefined;
  return {
    backgroundColor: tone?.[String(bgShade)] ?? palette.neutrals[100],
    color: tone?.[String(fgShade)] ?? palette.neutrals[700],
  };
};

export const chipLookFromValue = (
  value: ReactNode,
  badgeColor: DataTableBadgeColor,
  palette: Palette
): BadgeLook => {
  const raw = String(value ?? '').trim();
  const normalized = normalizeText(raw);

  if (/^ativo|active|enabled/.test(normalized)) {
    return scaleBgFg(
      palette,
      EDataTableScaleBgFg.SUCCESS,
      EDataTableBgShade.LIGHT,
      EDataTableFgShade.DARK
    );
  }
  if (/^inativo|inactive|disabled/.test(normalized)) {
    return {
      backgroundColor: palette.neutrals[100],
      color: palette.neutrals[500],
    };
  }
  if (/pendente|pending/.test(normalized)) {
    return scaleBgFg(palette, EDataTableScaleBgFg.WARNING, 100, 500);
  }
  if (normalized.includes('enterprise')) {
    return {
      backgroundColor: palette.primary[500],
      color: palette.neutrals.baseWhite ?? '#fff',
    };
  }
  if (normalized === 'pro') {
    return {
      backgroundColor: palette.primary[100],
      color: palette.primary[700],
    };
  }
  if (normalized.includes('basico')) {
    return {
      backgroundColor: palette.neutrals[100],
      color: palette.neutrals[500],
    };
  }

  switch (badgeColor) {
    case 'success':
      return scaleBgFg(
        palette,
        EDataTableScaleBgFg.SUCCESS,
        EDataTableBgShade.LIGHT,
        EDataTableFgShade.DARK
      );
    case 'warning':
      return scaleBgFg(
        palette,
        EDataTableScaleBgFg.WARNING,
        EDataTableBgShade.LIGHT,
        EDataTableFgShade.DARK
      );
    case 'error':
      return scaleBgFg(
        palette,
        EDataTableScaleBgFg.ERROR,
        EDataTableBgShade.LIGHT,
        EDataTableFgShade.LIGHT
      );
    case 'default':
      return {
        backgroundColor: palette.neutrals[100],
        color: palette.neutrals[500],
      };
    default:
      return {
        backgroundColor: palette.primary[100],
        color: palette.primary[600],
      };
  }
};

export const buildSkeletonWidths = (columns: number): string[] =>
  Array.from({ length: columns }, (_, index) => `${68 - ((index * 9) % 20)}%`);

/** Cores derivadas do tema para layout da tabela (bordas, fundos, texto). */
export interface DataTableSurfaceColors {
  divider: string;
  headerBg: string;
  headerText: string;
  bodyText: string;
  rowHoverBg: string;
  detailsAction: string;
  filterMuted: string;
  paperBorder: string;
  tableCellBorder: string;
  emptyStateIconBg: string;
  emptyStateIconFg: string;
}

export const getDataTableSurfaceColors = (
  palette: Palette
): DataTableSurfaceColors => ({
  divider: palette.neutrals[200],
  headerBg: palette.neutrals[100],
  headerText: palette.neutrals[500],
  bodyText: palette.neutrals[800],
  rowHoverBg: palette.neutrals[100],
  detailsAction: palette.primary[500],
  filterMuted: palette.neutrals[400],
  paperBorder: palette.neutrals[200],
  tableCellBorder: palette.neutrals[200],
  emptyStateIconBg: alpha(palette.primary[100], 0.7),
  emptyStateIconFg: palette.primary[500],
});

export interface UseDataTableResult {
  palette: Palette;
  surfaceColors: DataTableSurfaceColors;
}

export const useDataTable = (): UseDataTableResult => {
  const { palette } = useTheme();
  const surfaceColors = useMemo(
    () => getDataTableSurfaceColors(palette),
    [palette]
  );

  return { palette, surfaceColors };
};
