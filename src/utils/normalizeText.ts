const DIACRITICS_REGEX = /[̀-ͯ]/g;

/** Remove acentos e normaliza para minúsculas, para comparações de busca. */
export const normalizeText = (value: string): string =>
  value.toLowerCase().normalize('NFD').replace(DIACRITICS_REGEX, '');
