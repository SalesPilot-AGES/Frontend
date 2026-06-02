import { z } from 'zod';

export const AuthTokensSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in_seconds: z.number(),
});

export type TAuthTokens = z.infer<typeof AuthTokensSchema>;
