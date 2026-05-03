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
