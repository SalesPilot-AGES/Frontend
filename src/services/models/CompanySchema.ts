import z from 'zod';

export const CompanySchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  tax_id: z.string().min(1, 'Tax ID is required'),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  active: z.boolean(),
  created_at: z.string().optional(),
});

export const PageableSchema = z.object({
  sort: z.object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
  }),
  offset: z.number().int().nonnegative(),
  page_number: z.number().int().nonnegative(),
  page_size: z.number().int().positive(),
  paged: z.boolean(),
  unpaged: z.boolean(),
});

export const CompaniesResponseSchema = z.object({
  content: z.array(CompanySchema),
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

export const CompanyDetailSchema = z.object({
  id: z.string(),
  name: z.string(),
  tax_id: z.string(),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  active: z.boolean(),
  created_at: z.string().optional(),
});

export const CompanyCreateInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  tax_id: z.string().min(1, 'Tax ID is required'),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  active: z.boolean(),
});

export const CompanyUpdateInputSchema = CompanyCreateInputSchema.partial();

export const CompanyFiltersSchema = z.object({
  name: z.string().optional(),
  taxId: z.string().optional(),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
  active: z.boolean().optional(),
  sort: z.string().optional(),
});

export type Company = z.infer<typeof CompanySchema>;
export type CompanyDetail = z.infer<typeof CompanyDetailSchema>;
export type CompaniesResponse = z.infer<typeof CompaniesResponseSchema>;
export type CompanyCreateInput = z.infer<typeof CompanyCreateInputSchema>;
export type CompanyUpdateInput = z.infer<typeof CompanyUpdateInputSchema>;
export type CompanyFilters = z.infer<typeof CompanyFiltersSchema>;
