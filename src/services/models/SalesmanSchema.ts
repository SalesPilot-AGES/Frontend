import { z } from 'zod/v4';

import { PageableSchema } from './PageableSchema';

export const SalesmanSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const SalesmanListItemApiSchema = z.object({
  id: z.string().uuid(),
  company_id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  company: z.object({
    id: z.string().uuid(),
    name: z.string(),
    tax_id: z.string().optional(),
    plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
    active: z.boolean().optional(),
    created_at: z.string().optional(),
  }),
});

export const SalesmenPagedResponseSchema = z.object({
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

export const CreateSalesmanSchema = SalesmanSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateSalesmanSchema = CreateSalesmanSchema.partial();

export type TSalesman = z.infer<typeof SalesmanSchema>;
export type TCreateSalesman = z.infer<typeof CreateSalesmanSchema>;
export type TUpdateSalesman = z.infer<typeof UpdateSalesmanSchema>;

export type TSalesmanWithCompany = z.infer<typeof SalesmanSchema> & {
  company: { id: string; name: string };
};

export const mapSalesmanListItemApiToTSalesmanWithCompany = (
  row: z.infer<typeof SalesmanListItemApiSchema>
): TSalesmanWithCompany => {
  const createdAt = new Date(row.created_at).toISOString();
  const updatedAt = new Date(row.updated_at ?? row.created_at).toISOString();
  return {
    id: row.id,
    companyId: row.company_id,
    name: row.name,
    email: row.email,
    active: row.active,
    createdAt,
    updatedAt,
    company: { id: row.company.id, name: row.company.name },
  };
};
