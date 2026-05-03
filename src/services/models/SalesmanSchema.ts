import z from 'zod';

import { PageableSchema } from './PageableSchema';

/**
 * @description Shared company shape used in salesman entities.
 */
export const SalesmanCompanySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Company name is required'),
});

/**
 * @description Zod schema for a single salesman entity.
 */
export const SalesmanSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: SalesmanCompanySchema,
  active: z.boolean(),
  average_sentiment: z.number().min(0).max(100).nullable().optional(),
  created_at: z.string().optional(),
});

/**
 * @description API shape for salesman list rows.
 */
export const SalesmanListItemApiSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company_id: z.string(),
  company_name: z.string().min(1, 'Company name is required'),
  active: z.boolean(),
  average_sentiment: z.number().min(0).max(100).nullable().optional(),
  created_at: z.string().optional(),
});

/**
 * @description Frontend shape used for salesman list rows.
 */
export const SalesmanListItemSchema = SalesmanSchema.pick({
  id: true,
  name: true,
  email: true,
  company: true,
  active: true,
  average_sentiment: true,
  created_at: true,
});

/**
 * @description Maps API list payload to the frontend list shape with company object.
 */
export const mapSalesmanListItemApiToTSalesmanWithCompany = (
  payload: z.infer<typeof SalesmanListItemApiSchema>
): z.infer<typeof SalesmanListItemSchema> => ({
  id: payload.id,
  name: payload.name,
  email: payload.email,
  company: {
    id: payload.company_id,
    name: payload.company_name,
  },
  active: payload.active,
  average_sentiment: payload.average_sentiment ?? null,
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
});

/**
 * @description Zod schema for updating an existing salesman.
 */
export const SalesmanUpdateInputSchema = SalesmanCreateInputSchema.pick({
  name: true,
  email: true,
  company_id: true,
  active: true,
}).partial();

/**
 * @description API schema for paginated salesman list responses.
 */
export const SalesmanListApiSchema = z.object({
  content: z.array(SalesmanListItemApiSchema),
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
export type TSalesmanListItem = z.infer<typeof SalesmanListItemSchema>;
export type TSalesmanListItemApi = z.infer<typeof SalesmanListItemApiSchema>;
export type TSalesmanCreateInput = z.infer<typeof SalesmanCreateInputSchema>;
export type TSalesmanUpdateInput = z.infer<typeof SalesmanUpdateInputSchema>;
export type TSalesmanList = z.infer<typeof SalesmanListSchema>;
export type TSalesmanFilters = z.infer<typeof SalesmanFiltersSchema>;
