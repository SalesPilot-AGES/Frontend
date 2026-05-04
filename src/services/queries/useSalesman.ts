import { salesmanApi } from '@services/api/salesman';
import type {
  TCreateSalesman,
  TSalesman,
  TSalesmanWithCompany,
} from '@services/models/SalesmanSchema';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';

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
    queryFn: () => salesmanApi.getSalesmen(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useCreateSalesman = (
  options?: UseMutationOptions<TSalesman, Error, TCreateSalesman>
): ReturnType<typeof useMutation<TSalesman, Error, TCreateSalesman>> => {
  const queryClient = useQueryClient();
  return useMutation<TSalesman, Error, TCreateSalesman>({
    mutationFn: (data: TCreateSalesman) => salesmanApi.createSalesman(data),
    ...options,
    onSuccess: (newSalesman: TSalesman, ...args) => {
      queryClient.invalidateQueries({ queryKey: salesmenQueryKeys.lists() });
      queryClient.setQueryData(
        salesmenQueryKeys.detail(newSalesman.id),
        newSalesman
      );
      options?.onSuccess?.(newSalesman, ...args);
    },
  });
};
