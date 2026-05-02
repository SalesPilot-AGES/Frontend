import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  validationErrors?: Record<string, string[]>;
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An error occurred'
    );
  }

  if (error instanceof ZodError) {
    const errors = error.issues
      .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
      .join('; ');
    return errors || 'Validation error';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

export const getApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    return {
      message: getErrorMessage(error),
      status: error.response?.status,
      code: error.code,
    };
  }

  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string[]> = {};
    error.issues.forEach((issue) => {
      const path = issue.path.join('.');
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(issue.message);
    });

    return {
      message: getErrorMessage(error),
      validationErrors: fieldErrors,
    };
  }

  return {
    message: getErrorMessage(error),
  };
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !error.response;
  }
  return false;
};

export const isValidationError = (error: unknown): boolean => {
  return error instanceof ZodError;
};
