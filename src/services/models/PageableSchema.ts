import z from 'zod';

/**
 * @description Zod schema for pageable information from the API.
 */
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
