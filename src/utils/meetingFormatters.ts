const MEETING_STATUS_LABELS: Record<string, string> = {
  SCHEDULED: 'Agendada',
  IN_PROGRESS: 'Em andamento',
  COMPLETED: 'Finalizada',
  CANCELLED: 'Cancelada',
};

const MEETING_TYPE_LABELS: Record<string, string> = {
  ONLINE: 'Online',
  IN_PERSON: 'Presencial',
};

const SENTIMENT_LABELS: Record<string, string> = {
  positive: 'Positivo',
  neutral: 'Neutro',
  negative: 'Negativo',
};

export const formatMeetingDate = (date: string): string =>
  new Intl.DateTimeFormat('pt-BR').format(new Date(date));

export const formatMeetingStatus = (status: string): string =>
  MEETING_STATUS_LABELS[status] ?? status;

export const formatMeetingType = (meetingType: string): string =>
  MEETING_TYPE_LABELS[meetingType] ?? meetingType;

export const formatSentimentLabel = (sentiment: string): string =>
  SENTIMENT_LABELS[sentiment.toLowerCase()] ?? sentiment;

export const getClientSentimentPercent = (
  sentiment?: number
): number | undefined => {
  if (sentiment == null) return undefined;

  return Math.round(sentiment <= 10 ? sentiment * 10 : sentiment);
};

export const getAnalysisSentimentPercent = (
  sentiment?: number
): number | undefined => {
  if (sentiment == null) return undefined;

  return Math.round(sentiment <= 1 ? sentiment * 100 : sentiment);
};
