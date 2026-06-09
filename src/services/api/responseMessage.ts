type ResponseEnvelope = {
  content?: unknown;
  detail?: unknown;
  message?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const readString = (value: unknown): string | null => {
  return typeof value === 'string' && value.trim() ? value : null;
};

export type ApiMutationResponse<T> = {
  content: T;
  message: string | null;
};

export const getResponseMessage = (data: unknown): string | null => {
  if (!isRecord(data)) {
    return null;
  }

  const envelope = data as ResponseEnvelope;

  const directMessage = readString(envelope.message);
  if (directMessage) {
    return directMessage;
  }

  const detailMessage = readString(envelope.detail);
  if (detailMessage) {
    return detailMessage;
  }

  if (isRecord(envelope.content)) {
    return readString(envelope.content.message);
  }

  return null;
};
