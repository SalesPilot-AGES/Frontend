import { useMemo } from 'react';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface UseFilterOptionsProps<T> {
  data: T[];
  groups: {
    id: string;
    label: string;
    accessor: (item: T) => string | boolean | number | null | undefined;
    formatter?: (value: string) => string;
  }[];
}

export const useFilterOptions = <T>({
  data,
  groups,
}: UseFilterOptionsProps<T>): FilterGroup[] => {
  return useMemo(() => {
    return groups.map((group) => {
      // Extrair valores únicos do grupo
      const uniqueValues = new Set<string>();

      data.forEach((item) => {
        const value = group.accessor(item);
        if (value !== null && value !== undefined && value !== '') {
          const stringValue = String(value);
          uniqueValues.add(stringValue);
        }
      });

      // Criar opções a partir dos valores únicos
      const options = Array.from(uniqueValues)
        .sort() // Ordenar alfabeticamente
        .map((value) => ({
          id: `${group.id}-${value}`,
          label: group.formatter ? group.formatter(value) : value,
          value: value,
        }));

      return {
        id: group.id,
        label: group.label,
        options,
      };
    });
  }, [data, groups]);
};
