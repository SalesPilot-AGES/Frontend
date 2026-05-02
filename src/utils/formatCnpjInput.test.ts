import { describe, expect, it } from 'vitest';

import { formatCnpjInput } from './formatCnpjInput';

describe('formatCnpjInput', () => {
  it('returns empty string for empty input', () => {
    expect(formatCnpjInput('')).toBe('');
  });

  it('returns digits only for 1-2 digits', () => {
    expect(formatCnpjInput('1')).toBe('1');
    expect(formatCnpjInput('12')).toBe('12');
  });

  it('formats up to 5 digits with first dot', () => {
    expect(formatCnpjInput('123')).toBe('12.3');
    expect(formatCnpjInput('12345')).toBe('12.345');
  });

  it('formats up to 8 digits with two dots', () => {
    expect(formatCnpjInput('123456')).toBe('12.345.6');
    expect(formatCnpjInput('12345678')).toBe('12.345.678');
  });

  it('formats up to 12 digits with slash', () => {
    expect(formatCnpjInput('123456789')).toBe('12.345.678/9');
    expect(formatCnpjInput('123456789012')).toBe('12.345.678/9012');
  });

  it('formats 14 digits as full CNPJ', () => {
    expect(formatCnpjInput('12345678901234')).toBe('12.345.678/9012-34');
  });

  it('strips non-digit characters from input', () => {
    // pre-formatted CNPJ round-trips correctly
    expect(formatCnpjInput('12.345.678/9012-34')).toBe('12.345.678/9012-34');
    // 8 stripped digits: 12345678 → 12.345.678
    expect(formatCnpjInput('ab12cd34ef56gh78')).toBe('12.345.678');
  });

  it('truncates input beyond 14 digits', () => {
    expect(formatCnpjInput('123456789012345')).toBe('12.345.678/9012-34');
  });
});
