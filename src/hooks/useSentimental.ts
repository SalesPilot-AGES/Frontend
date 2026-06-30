import { ESentiment, ESentimentThreshold } from '@data/enums/ESentiment';

import type { ISentimentConfig } from '../types/ui';

export const getSentimentConfig = (value?: number): ISentimentConfig => {
  if (value === undefined) {
    return {
      level: ESentiment.NEUTRAL,
      iconName: 'sentimentNeutral',
      theme: 'neutrals',
    };
  }

  if (value < ESentimentThreshold.NEGATIVE_MAX) {
    return {
      level: ESentiment.NEGATIVE,
      iconName: 'sentimentSad',
      theme: 'error',
    };
  }

  if (value < ESentimentThreshold.NEUTRAL_MAX) {
    return {
      level: ESentiment.NEUTRAL,
      iconName: 'sentimentNeutral',
      theme: 'warning',
    };
  }

  return {
    level: ESentiment.POSITIVE,
    iconName: 'sentimentHappy',
    theme: 'success',
  };
};

export const getSentimentPercent = (
  sentiment: number | null | undefined
): number | undefined => {
  if (sentiment === null || sentiment === undefined) return undefined;
  return Math.round((sentiment / 10) * 100);
};

export const getSentimentRange = (
  sentiment: number | null | undefined
): string => {
  if (sentiment === null || sentiment === undefined) return 'Sem dados';
  const percent = getSentimentPercent(sentiment);
  if (percent === undefined) return 'Sem dados';
  if (percent <= 40) return '0% a 40%';
  if (percent <= 60) return '41% a 60%';
  return '61% a 100%';
};
