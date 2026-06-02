import { AxiosError } from 'axios';
import { describe, expect, it } from 'vitest';
import z from 'zod';

import {
  getApiError,
  getErrorMessage,
  isNetworkError,
  isValidationError,
} from './errorHandler';

const makeAxiosError = (
  message: string,
  status?: number,
  data?: Record<string, unknown>
): AxiosError => {
  const err = new AxiosError(message);
  if (status !== undefined) {
    err.response = {
      data: data ?? {},
      status,
      statusText: '',
      headers: {},
      config: {} as never,
    };
  }
  return err;
};

describe('getErrorMessage', () => {
  it('returns response data message from AxiosError', () => {
    const err = makeAxiosError('network', 400, { message: 'Bad request' });
    expect(getErrorMessage(err)).toBe('Bad request');
  });

  it('returns response data error field if no message', () => {
    const err = makeAxiosError('network', 422, { error: 'Unprocessable' });
    expect(getErrorMessage(err)).toBe('Unprocessable');
  });

  it('falls back to AxiosError.message when no response data', () => {
    const err = makeAxiosError('Connection refused');
    expect(getErrorMessage(err)).toBe('Connection refused');
  });

  it('returns a non-empty string for ZodError', () => {
    const schema = z.object({ email: z.string().email() });
    const result = schema.safeParse({ email: 'bad' });
    expect(result.success).toBe(false);
    const msg = getErrorMessage((result as { error: z.ZodError }).error);
    expect(msg).toBeTypeOf('string');
    expect(msg.length).toBeGreaterThan(0);
  });

  it('returns error.message for generic Error', () => {
    expect(getErrorMessage(new Error('oops'))).toBe('oops');
  });

  it('returns fallback for unknown type', () => {
    expect(getErrorMessage('string error')).toBe(
      'An unexpected error occurred'
    );
    expect(getErrorMessage(null)).toBe('An unexpected error occurred');
  });
});

describe('getApiError', () => {
  it('returns structured ApiError from AxiosError', () => {
    const err = makeAxiosError('fail', 500, { message: 'Server error' });
    const result = getApiError(err);
    expect(result.message).toBe('Server error');
    expect(result.status).toBe(500);
  });

  it('returns validationErrors from ZodError', () => {
    const schema = z.object({ name: z.string().min(1) });
    const parsed = schema.safeParse({ name: '' });
    expect(parsed.success).toBe(false);
    const result = getApiError((parsed as { error: z.ZodError }).error);
    expect(result.validationErrors).toBeDefined();
    const keys = Object.keys(result.validationErrors ?? {});
    expect(keys.length).toBeGreaterThan(0);
  });

  it('returns message for generic Error', () => {
    const result = getApiError(new Error('generic'));
    expect(result.message).toBe('generic');
  });
});

describe('isNetworkError', () => {
  it('returns true for AxiosError without response', () => {
    expect(isNetworkError(makeAxiosError('timeout'))).toBe(true);
  });

  it('returns false for AxiosError with response', () => {
    expect(isNetworkError(makeAxiosError('bad', 400))).toBe(false);
  });

  it('returns false for non-Axios error', () => {
    expect(isNetworkError(new Error('other'))).toBe(false);
  });
});

describe('isValidationError', () => {
  it('returns true for ZodError', () => {
    const schema = z.object({ x: z.string() });
    const result = schema.safeParse({ x: 1 });
    expect(result.success).toBe(false);
    expect(isValidationError((result as { error: z.ZodError }).error)).toBe(
      true
    );
  });

  it('returns false for other errors', () => {
    expect(isValidationError(new Error('other'))).toBe(false);
  });
});
