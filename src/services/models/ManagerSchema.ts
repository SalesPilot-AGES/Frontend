import z from 'zod';

import { PageableSchema } from './PageableSchema';

/**
 * @description Zod schema for a single manager.
 */
export const ManagerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company_id: z.string(),
  active: z.boolean(),
  preferences: z
    .object({
      theme: z.string(),
      default_model: z.string(),
    })
    .nullable(),
  created_at: z.string().optional(),
});

/**
//... existing code...
 * @description Zod schema for creating a new manager.
 */
export const ManagerCreatePayloadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company_id: z.string(),
  active: z.boolean(),
  preferences: z.object({
    theme: z.string(),
    default_model: z.string(),
  }),
});

/**
 * @description Zod schema for updating an existing manager.
 */
export const ManagerUpdatePayloadSchema = ManagerCreatePayloadSchema.pick({
  name: true,
  email: true,
  active: true,
  preferences: true,
}).partial();

/**
 * @description Zod schema for a paginated list of managers.
 */
export const ManagerListSchema = z.object({
  content: z.array(ManagerSchema),
  pageable: PageableSchema,
  total_elements: z.number().int().nonnegative(),
  total_pages: z.number().int().nonnegative(),
  last: z.boolean(),
  size: z.number().int().positive(),
  number: z.number().int().nonnegative(),
  number_of_elements: z.number().int().nonnegative(),
  first: z.boolean(),
  empty: z.boolean(),
  sort: z.object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
  }),
});

/**
 * @description Zod schema for manager filtering options.
 */
export const ManagerFiltersSchema = z.object({
  companyId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  active: z.boolean().optional(),
});

export type TManager = z.infer<typeof ManagerSchema>;
export type TManagerList = z.infer<typeof ManagerListSchema>;
export type TManagerCreatePayload = z.infer<typeof ManagerCreatePayloadSchema>;
export type TManagerUpdatePayload = z.infer<typeof ManagerUpdatePayloadSchema>;
export type TManagerFilters = z.infer<typeof ManagerFiltersSchema>;
