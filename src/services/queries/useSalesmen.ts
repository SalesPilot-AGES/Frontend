import { salesmanApi } from '@services/api/salesman';
import type { TSalesman } from '@services/models/SalesmanSchema';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

/**
 * @description Query keys for salesmen details.
 */
export const salesmenQueryKeys = {
  all: ['salesmen'] as const,
  details: () => [...salesmenQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...salesmenQueryKeys.details(), id] as const,
};

/**
 * @description A query to get a salesman by its ID.
 * @param {string | null} uuid - The ID of the salesman to fetch.
 * @param {UseQueryOptions<TSalesman>} options - Additional query options.
 * @returns {ReturnType<typeof useQuery<TSalesman, Error>>} The query result.
 */
export const useGetSalesmanById = (
  uuid: string | null,
  options?: UseQueryOptions<TSalesman>
): ReturnType<typeof useQuery<TSalesman, Error>> => {
  return useQuery<TSalesman, Error>({
    queryKey: salesmenQueryKeys.detail(uuid || ''),
    queryFn: () => salesmanApi.getSalesmanById(uuid!),
    enabled: !!uuid,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
