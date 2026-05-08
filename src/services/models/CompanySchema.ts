import z from 'zod';

import { PageableSchema } from './PageableSchema';

/**
 * @description Zod schema for a single company.
 */
export const CompanySchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, 'Informe o nome da empresa para continuar.'),
  tax_id: z
    .string()
    .trim()
    .min(1, 'Informe o CNPJ da empresa para continuar.')
    .refine((value) => value.replace(/\D/g, '').length === 14, {
      message: 'CNPJ invalido. Digite os 14 digitos.',
    }),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  active: z.boolean(),
  created_at: z.string().optional(),
});

/**
 * @description Zod schema for a paginated list of companies.
 */
export const CompanyListSchema = z.object({
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

/**
 * @description Zod schema for creating a new company.
 */
export const CompanyCreatePayloadSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome da empresa para continuar.'),
  tax_id: z
    .string()
    .trim()
    .min(1, 'Informe o CNPJ da empresa para continuar.')
    .refine((value) => value.replace(/\D/g, '').length === 14, {
      message: 'CNPJ invalido. Digite os 14 digitos.',
    }),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  active: z.boolean(),
});

/**
 * @description Zod schema for updating an existing company.
 */
export const CompanyUpdatePayloadSchema = CompanyCreatePayloadSchema.pick({
  name: true,
  plan: true,
  active: true,
}).partial();

/**
 * @description Zod schema for company filtering options.
 */
export const CompanyFiltersSchema = z.object({
  name: z.string().optional(),
  taxId: z.string().optional(),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
  active: z.boolean().optional(),
  sort: z.string().optional(),
});

export type TCompany = z.infer<typeof CompanySchema>;
export type TCompanyList = z.infer<typeof CompanyListSchema>;
export type TCompanyCreatePayload = z.infer<typeof CompanyCreatePayloadSchema>;
export type TCompanyUpdatePayload = z.infer<typeof CompanyUpdatePayloadSchema>;
export type TCompanyFilters = z.infer<typeof CompanyFiltersSchema>;
