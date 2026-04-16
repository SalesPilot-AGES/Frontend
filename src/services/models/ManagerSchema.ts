import { z } from 'zod';

import { PageableSchema } from './CompanySchema';

export const ManagerSchema = z.object({
  id: z.guid(),
  companyId: z.guid(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
  preferences: z.record(z.string(), z.unknown()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ManagerListItemApiSchema = z.object({
  id: z.guid(),
  company_id: z.guid(),
  name: z.string(),
  role: z.string().optional(),
  email: z.string().email(),
  active: z.boolean(),
  preferences: z.record(z.string(), z.unknown()),
  created_at: z.string(),
  updated_at: z.string().optional(),
  company: z.object({
    id: z.guid(),
    name: z.string(),
    tax_id: z.string().optional(),
    plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
    active: z.boolean().optional(),
    created_at: z.string().optional(),
  }),
});

export const ManagersPagedResponseSchema = z.object({
  content: z.array(ManagerListItemApiSchema),
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

export type TManagerWithCompany = z.infer<typeof ManagerSchema> & {
  company: { id: string; name: string };
};

export const mapManagerListItemApiToTManagerWithCompany = (
  row: z.infer<typeof ManagerListItemApiSchema>
): TManagerWithCompany => {
  const createdAt = new Date(row.created_at).toISOString();
  const updatedAt = new Date(row.updated_at ?? row.created_at).toISOString();
  return {
    id: row.id,
    companyId: row.company_id,
    name: row.name,
    email: row.email,
    active: row.active,
    preferences: row.preferences,
    createdAt,
    updatedAt,
    company: { id: row.company.id, name: row.company.name },
  };
};

export const CreateManagerSchema = ManagerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateManagerSchema = CreateManagerSchema.partial();

export type TManager = z.infer<typeof ManagerSchema>;
export type TCreateManager = z.infer<typeof CreateManagerSchema>;
export type TUpdateManager = z.infer<typeof UpdateManagerSchema>;

/** Campos editáveis no PUT do detalhe admin (inclui troca de empresa). */
export type TManagerAdminDetailsEditFields = Pick<
  TManager,
  'name' | 'email' | 'active' | 'companyId'
>;
