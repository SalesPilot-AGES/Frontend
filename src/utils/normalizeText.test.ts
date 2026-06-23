import { describe, expect, it } from 'vitest';

import { normalizeText } from './normalizeText';

describe('normalizeText', () => {
  it('removes accents', () => {
    expect(normalizeText('João')).toBe('joao');
    expect(normalizeText('São Paulo')).toBe('sao paulo');
    expect(normalizeText('Indústria')).toBe('industria');
  });

  it('lowercases the text', () => {
    expect(normalizeText('MARIA')).toBe('maria');
  });

  it('keeps text without accents unchanged besides casing', () => {
    expect(normalizeText('Bruno Souza')).toBe('bruno souza');
  });

  it('handles empty string', () => {
    expect(normalizeText('')).toBe('');
  });
});
