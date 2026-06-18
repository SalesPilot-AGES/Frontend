import { describe, expect, it } from 'vitest';

import {
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
  });

  it('normalizes sentiment scales returned by the API', () => {
    expect(getClientSentimentPercent(8.6)).toBe(86);
    expect(getAnalysisSentimentPercent(0.86)).toBe(86);
  });
});
