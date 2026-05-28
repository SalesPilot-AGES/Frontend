import { getErrorMessage } from '@services/api/errorHandler';
import { type ApiMutationResponse } from '@services/api/responseMessage';
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
import { useToast } from '@UI/Toast/useToast';

/**
 * @description Query keys for salesmen.
 */
export const salesmenQueryKeys = {
  all: ['salesmen'] as const,
  lists: () => [...salesmenQueryKeys.all, 'list'] as const,
  list: (page: number, size: number, filters?: TSalesmanFilters) =>
    [...salesmenQueryKeys.lists(), { page, size, filters }] as const,
  details: () => [...salesmenQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...salesmenQueryKeys.details(), id] as const,
};

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
 * @description Query to get a paginated and filtered list of salesmen.
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
 * @description Query to get a salesman by ID.
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
 * @description Mutation to create a new salesman.
 */
export const useCreateSalesman = (
  options?: UseMutationOptions<
    ApiMutationResponse<TSalesman>,
    Error,
    TSalesmanCreateInput
  >
): ReturnType<
  typeof useMutation<
    ApiMutationResponse<TSalesman>,
    Error,
    TSalesmanCreateInput
  >
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    ApiMutationResponse<TSalesman>,
    Error,
    TSalesmanCreateInput
  >({
    ...options,
    mutationFn: salesmanApi.createSalesman,
    onSuccess: (newSalesman, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: salesmenQueryKeys.lists() });
      queryClient.setQueryData(
        salesmenQueryKeys.detail(newSalesman.content.id),
        newSalesman.content
      );
      showToast(
        newSalesman.message ?? 'Vendedor criado com sucesso',
        'success'
      );
      options?.onSuccess?.(newSalesman, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      showToast(getErrorMessage(error), 'error');
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
};

/**
 * @description Mutation to update an existing salesman.
 */
export const useUpdateSalesman = (
  options?: UseMutationOptions<
    ApiMutationResponse<TSalesman>,
    Error,
    { uuid: string; data: TSalesmanUpdateInput }
  >
): ReturnType<
  typeof useMutation<
    ApiMutationResponse<TSalesman>,
    Error,
    { uuid: string; data: TSalesmanUpdateInput }
  >
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    ApiMutationResponse<TSalesman>,
    Error,
    { uuid: string; data: TSalesmanUpdateInput }
  >({
    ...options,
    mutationFn: ({ uuid, data }) => salesmanApi.updateSalesman(uuid, data),
    onSuccess: (updatedSalesman, variables, onMutateResult, context) => {
      queryClient.setQueryData(
        salesmenQueryKeys.detail(updatedSalesman.content.id),
        updatedSalesman.content
      );
      queryClient.invalidateQueries({ queryKey: salesmenQueryKeys.lists() });
      showToast(
        updatedSalesman.message ?? 'Vendedor atualizado com sucesso',
        'success'
      );
      options?.onSuccess?.(updatedSalesman, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      showToast(getErrorMessage(error), 'error');
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
};
