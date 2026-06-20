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

const CLIENT_SECTOR_LABELS: Record<string, string> = {
  manufacturing: 'Indústria',
  technology: 'Tecnologia',
  education: 'Educação',
  logistics: 'Logística',
  retail: 'Varejo',
  'financial services': 'Serviços financeiros',
  consulting: 'Consultoria',
};

export const formatMeetingDate = (date: string): string =>
  new Intl.DateTimeFormat('pt-BR').format(new Date(date));

export const formatMeetingStatus = (status: string): string =>
  MEETING_STATUS_LABELS[status] ?? status;

export const formatMeetingType = (meetingType: string): string =>
  MEETING_TYPE_LABELS[meetingType] ?? meetingType;

export const formatSentimentLabel = (sentiment: string): string =>
  SENTIMENT_LABELS[sentiment.toLowerCase()] ?? sentiment;

export const formatClientSector = (sector?: string): string => {
  if (!sector?.trim()) return 'Não informado';

  return CLIENT_SECTOR_LABELS[sector.trim().toLowerCase()] ?? sector;
};

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
