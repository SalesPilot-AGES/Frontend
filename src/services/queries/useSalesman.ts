import { getErrorMessage } from '@services/api/errorHandler';
import { type ApiMutationResponse } from '@services/api/responseMessage';
import { salesmanApi } from '@services/api/salesman';
import type {
  TCreateSalesman,
  TSalesman,
  TSalesmanCreateInput,
  TSalesmanWithCompany,
} from '@services/models/SalesmanSchema';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { useToast } from '@UI/Toast/useToast';

export const salesmenQueryKeys = {
  all: ['salesmen'] as const,
  lists: () => [...salesmenQueryKeys.all, 'list'] as const,
  details: () => [...salesmenQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...salesmenQueryKeys.details(), id] as const,
};

export const useGetSalesmen = (
  options?: UseQueryOptions<TSalesmanWithCompany[]>
): ReturnType<typeof useQuery<TSalesmanWithCompany[], Error>> => {
  return useQuery<TSalesmanWithCompany[], Error>({
    queryKey: salesmenQueryKeys.lists(),
    queryFn: async () => {
      const response = await salesmanApi.getSalesmen();
      return response.content;
    },
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useCreateSalesman = (
  options?: UseMutationOptions<
    ApiMutationResponse<TSalesman>,
    Error,
    TCreateSalesman
  >
): ReturnType<
  typeof useMutation<ApiMutationResponse<TSalesman>, Error, TCreateSalesman>
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  return useMutation<ApiMutationResponse<TSalesman>, Error, TCreateSalesman>({
    mutationFn: (data: TCreateSalesman) => {
      const payload: TSalesmanCreateInput = {
        name: data.name,
        email: data.email,
        company_id: data.company.id,
        active: data.active,
        preferences: data.preferences,
      };
      return salesmanApi.createSalesman(payload);
    },
    ...options,
    onSuccess: (newSalesman, ...args) => {
      queryClient.invalidateQueries({ queryKey: salesmenQueryKeys.lists() });
      queryClient.setQueryData(
        salesmenQueryKeys.detail(newSalesman.content.id),
        newSalesman.content
      );
      showToast(
        newSalesman.message ?? 'Vendedor criado com sucesso',
        'success'
      );
      options?.onSuccess?.(newSalesman, ...args);
    },
    onError: (error, ...args) => {
      showToast(getErrorMessage(error), 'error');
      options?.onError?.(error, ...args);
    },
  });
};
