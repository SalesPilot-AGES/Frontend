const FULL_MONTH_LABELS: Record<string, string> = {
  Jan: 'Janeiro',
  Fev: 'Fevereiro',
  Mar: 'Março',
  Abr: 'Abril',
  Mai: 'Maio',
  Jun: 'Junho',
  Jul: 'Julho',
  Ago: 'Agosto',
  Set: 'Setembro',
  Out: 'Outubro',
  Nov: 'Novembro',
  Dez: 'Dezembro',
};

export const formatMonthLabel = (monthLabel: string): string => {
  return FULL_MONTH_LABELS[monthLabel] ?? monthLabel;
};

const pluralize = (
  value: number,
  singularLabel: string,
  pluralLabel: string
): string => {
  return `${value} ${value === 1 ? singularLabel : pluralLabel}`;
};

export const formatDuration = (value: number): string => {
  const roundedMinutes = Math.max(0, Math.round(value));

  if (roundedMinutes < 60) {
    return pluralize(roundedMinutes, 'minuto', 'minutos');
  }

  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  const hourText = pluralize(hours, 'hora', 'horas');

  if (minutes === 0) {
    return hourText;
  }

  return `${hourText} e ${pluralize(minutes, 'minuto', 'minutos')}`;
};

export const formatDurationSecondsAsMinutes = (
  durationSeconds: number
): string => {
  const roundedMinutes = Math.max(0, Math.round(durationSeconds / 60));

  return `${roundedMinutes} min`;
};
