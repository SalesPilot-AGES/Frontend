import z from 'zod';

import { PageableSchema } from './PageableSchema';

export const SalesmanCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
});

/**
 * @description Zod schema for a single salesman entity returned by API.
 */
export const SalesmanSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: SalesmanCompanySchema,
  active: z.boolean(),
  role: z.string().optional(),
  phone: z.string().nullable().optional(),
  average_feeling: z.number().min(0).max(100).nullable().optional(),
  average_sentiment: z.number().min(0).max(100).nullable().optional(),
  total_meetings: z.number().int().nonnegative().optional(),
  preferences: z
    .object({
      theme: z.string().nullable(),
      default_model: z.string().nullable(),
    })
    .nullable()
    .optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

/**
 * @description Frontend shape for salesman list rows in admin table.
 */
export const SalesmanListItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: SalesmanCompanySchema,
  active: z.boolean(),
  average_sentiment: z.number().min(0).max(100).nullable().optional(),
  created_at: z.string().optional(),
});

/**
 * @description Normalizes salesman API item to table shape.
 */
export const mapSalesmanListItemApiToTSalesmanWithCompany = (
  payload: z.infer<typeof SalesmanSchema>
): z.infer<typeof SalesmanListItemSchema> => ({
  id: payload.id,
  name: payload.name,
  email: payload.email,
  company: payload.company,
  active: payload.active,
  average_sentiment:
    payload.average_sentiment ?? payload.average_feeling ?? null,
  created_at: payload.created_at,
});

/**
 * @description Zod schema for creating a new salesman.
 */
export const SalesmanCreateInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company_id: z.string().min(1, 'Company is required'),
  active: z.boolean(),
  preferences: z
    .object({
      theme: z.string().nullable(),
      default_model: z.string().nullable(),
    })
    .nullable()
    .optional(),
});

/**
 * @description Zod schema for updating an existing salesman.
 */
export const SalesmanUpdateInputSchema = SalesmanCreateInputSchema.pick({
  name: true,
  email: true,
  company_id: true,
  active: true,
  preferences: true,
}).partial();

/**
 * @description API schema for paginated salesman list responses.
 */
export const SalesmanListApiSchema = z.object({
  content: z.array(SalesmanSchema),
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
 * @description Frontend schema for paginated salesman list responses.
 */
export const SalesmanListSchema = SalesmanListApiSchema.extend({
  content: z.array(SalesmanListItemSchema),
});

/**
 * @description Zod schema for salesman filtering options.
 */
export const SalesmanFiltersSchema = z.object({
  companyId: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  active: z.boolean().optional(),
});

export type TSalesman = z.infer<typeof SalesmanSchema>;
export type TSalesmanWithCompany = z.infer<typeof SalesmanListItemSchema>;
export type TSalesmanCreateInput = z.infer<typeof SalesmanCreateInputSchema>;
export type TSalesmanUpdateInput = z.infer<typeof SalesmanUpdateInputSchema>;
export type TSalesmanList = z.infer<typeof SalesmanListSchema>;
export type TSalesmanFilters = z.infer<typeof SalesmanFiltersSchema>;
