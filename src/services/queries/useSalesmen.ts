import { salesmanApi } from '@services/api/salesman';
import type {
  TSalesman,
  TSalesmanCreateInput,
  TSalesmanFilters,
  TSalesmanList,
  TSalesmanUpdateInput,
} from '@services/models/SalesmanSchema';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * @description Query keys for salesmen.
 * @property {string[]} all - All salesmen.
 * @property {function} lists - All salesmen lists.
 * @property {function} list - A specific salesmen list with pagination and filters.
 * @property {function} details - All salesman details.
 * @property {function} detail - A specific salesman detail by id.
 */
export const salesmenQueryKeys = {
  all: ['salesmen'] as const,
  lists: () => [...salesmenQueryKeys.all, 'list'] as const,
  list: (page: number, size: number, filters?: TSalesmanFilters) =>
    [...salesmenQueryKeys.lists(), { page, size, filters }] as const,
  details: () => [...salesmenQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...salesmenQueryKeys.details(), id] as const,
};

/**
 * @description A helper function to get query options for the salesmen list query.
 * @param {number} page - The page number to fetch.
 * @param {number} size - The number of items per page.
 * @param {TSalesmanFilters} filters - Filters to apply to the query.
 * @returns {Pick<UseQueryOptions<TSalesmanList, Error>, 'queryKey' | 'queryFn' | 'staleTime'>} The query options.
 */
const getSalesmenListQueryOptions = (
  page: number = 0,
  size: number = 20,
  filters?: TSalesmanFilters
): Pick<
  UseQueryOptions<TSalesmanList, Error>,
  'queryKey' | 'queryFn' | 'staleTime'
> => ({
  queryKey: salesmenQueryKeys.list(page, size, filters),
  queryFn: (): Promise<TSalesmanList> =>
    salesmanApi.getSalesmen(page, size, filters),
  staleTime: 0,
});

/**
 * @description A query to get a paginated and filtered list of salesmen.
 * @param {number} page - The page number to fetch.
 * @param {number} size - The number of items per page.
 * @param {TSalesmanFilters} filters - Filters to apply to the query.
 * @param {UseQueryOptions<TSalesmanList>} options - Additional query options.
 * @returns {ReturnType<typeof useQuery<TSalesmanList, Error>>} The query result.
 */
export const useGetSalesmen = (
  page: number = 0,
  size: number = 20,
  filters?: TSalesmanFilters,
  options?: UseQueryOptions<TSalesmanList>
): ReturnType<typeof useQuery<TSalesmanList, Error>> => {
  return useQuery<TSalesmanList, Error>({
    ...getSalesmenListQueryOptions(page, size, filters),
    ...options,
  });
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

/**
 * @description A mutation to create a new salesman.
 * @param {UseMutationOptions<TSalesman, Error, TSalesmanCreateInput>} options - Mutation options.
 * @returns {ReturnType<typeof useMutation<TSalesman, Error, TSalesmanCreateInput>>} The mutation result.
 */
export const useCreateSalesman = (
  options?: UseMutationOptions<TSalesman, Error, TSalesmanCreateInput>
): ReturnType<typeof useMutation<TSalesman, Error, TSalesmanCreateInput>> => {
  const queryClient = useQueryClient();

  return useMutation<TSalesman, Error, TSalesmanCreateInput>({
    ...options,
    mutationFn: salesmanApi.createSalesman,
    onSuccess: (newSalesman, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: salesmenQueryKeys.lists() });
      queryClient.setQueryData(
        salesmenQueryKeys.detail(newSalesman.id),
        newSalesman
      );
      options?.onSuccess?.(newSalesman, variables, onMutateResult, context);
    },
  });
};

/**
 * @description A mutation to update an existing salesman.
 * @param {UseMutationOptions<TSalesman, Error, { uuid: string; data: TSalesmanUpdateInput }>} options - Mutation options.
 * @returns {ReturnType<typeof useMutation<TSalesman, Error, { uuid: string; data: TSalesmanUpdateInput }>>} The mutation result.
 */
export const useUpdateSalesman = (
  options?: UseMutationOptions<
    TSalesman,
    Error,
    { uuid: string; data: TSalesmanUpdateInput }
  >
): ReturnType<
  typeof useMutation<
    TSalesman,
    Error,
    { uuid: string; data: TSalesmanUpdateInput }
  >
> => {
  const queryClient = useQueryClient();

  return useMutation<
    TSalesman,
    Error,
    { uuid: string; data: TSalesmanUpdateInput }
  >({
    ...options,
    mutationFn: ({ uuid, data }) => salesmanApi.updateSalesman(uuid, data),
    onSuccess: (updatedSalesman, variables, onMutateResult, context) => {
      queryClient.setQueryData(
        salesmenQueryKeys.detail(updatedSalesman.id),
        updatedSalesman
      );
      queryClient.invalidateQueries({ queryKey: salesmenQueryKeys.lists() });
      options?.onSuccess?.(updatedSalesman, variables, onMutateResult, context);
    },
  });
};
