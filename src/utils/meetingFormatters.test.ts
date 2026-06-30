import { describe, expect, it } from 'vitest';

import {
  formatClientSector,
  formatMeetingStatus,
  formatMeetingType,
  formatSentimentLabel,
  getAnalysisSentimentPercent,
  getClientSentimentPercent,
} from './meetingFormatters';

describe('meetingFormatters', () => {
  it('formats API meeting values for display', () => {
    expect(formatMeetingStatus('COMPLETED')).toBe('Finalizada');
    expect(formatMeetingType('IN_PERSON')).toBe('Presencial');
    expect(formatSentimentLabel('positive')).toBe('Positivo');
    expect(formatClientSector('Manufacturing')).toBe('Indústria');
    expect(formatClientSector('Technology')).toBe('Tecnologia');
    expect(formatClientSector('Education')).toBe('Educação');
    expect(formatClientSector('Logistics')).toBe('Logística');
    expect(formatClientSector('Retail')).toBe('Varejo');
    expect(formatClientSector('Financial Services')).toBe(
      'Serviços financeiros'
    );
    expect(formatClientSector('Consulting')).toBe('Consultoria');
  });

  it('normalizes sentiment scales returned by the API', () => {
    expect(getClientSentimentPercent(8.6)).toBe(86);
    expect(getAnalysisSentimentPercent(0.86)).toBe(86);
  });
});
