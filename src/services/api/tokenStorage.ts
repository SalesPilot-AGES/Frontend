const KEY = 'salespilot-tokens';

interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

export const tokenStorage = {
  get: (): StoredTokens | null => {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredTokens) : null;
  },
  set: (tokens: StoredTokens): void => {
    localStorage.setItem(KEY, JSON.stringify(tokens));
  },
  clear: (): void => {
    localStorage.removeItem(KEY);
  },
};
