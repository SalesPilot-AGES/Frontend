import z from 'zod';

/**
 * @description Zod schema for a single salesman.
 */
export const SalesmanSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  company: z.object({ id: z.string(), name: z.string() }),
  active: z.boolean(),
  preferences: z
    .object({
      theme: z.string().nullable(),
      default_model: z.string().nullable(),
    })
    .nullable()
    .optional(),
  created_at: z.string().optional(),
});

/**
 * @description Zod schema for a paginated list of salesmen.
 */
export const SalesmanListSchema = z.object({
  content: z.array(SalesmanSchema),
});

export type TSalesman = z.infer<typeof SalesmanSchema>;
export type TSalesmanList = z.infer<typeof SalesmanListSchema>;
