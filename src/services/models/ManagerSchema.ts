import { z } from 'zod';

export const ManagerSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
  preferences: z.record(z.string(), z.unknown()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateManagerSchema = ManagerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateManagerSchema = CreateManagerSchema.partial();

export type TManager = z.infer<typeof ManagerSchema>;
export type TCreateManager = z.infer<typeof CreateManagerSchema>;
export type TUpdateManager = z.infer<typeof UpdateManagerSchema>;
