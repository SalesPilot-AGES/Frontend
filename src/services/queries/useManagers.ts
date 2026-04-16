import { managerApi } from '@services/api/manager';
import type {
  TCreateManager,
  TManager,
  TManagerWithCompany,
  TUpdateManager,
} from '@services/models/ManagerSchema';
import {
  useMutation,
  type UseMutationOptions,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';

// Query keys
export const managersQueryKeys = {
  all: ['managers'] as const,
  lists: () => [...managersQueryKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, filters?: unknown) =>
    [...managersQueryKeys.lists(), { page, pageSize, filters }] as const,
  details: () => [...managersQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...managersQueryKeys.details(), id] as const,
};

// GET queries
export const useGetManagers = (
  options?: UseQueryOptions<TManagerWithCompany[]>
): ReturnType<typeof useQuery<TManagerWithCompany[], Error>> => {
  return useQuery<TManagerWithCompany[], Error>({
    queryKey: managersQueryKeys.lists(),
    queryFn: () => managerApi.getManagers(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useGetManagerById = (
  id: string | null,
  options?: UseQueryOptions<TManagerWithCompany>
): ReturnType<typeof useQuery<TManagerWithCompany, Error>> => {
  return useQuery<TManagerWithCompany, Error>({
    queryKey: managersQueryKeys.detail(id || ''),
    queryFn: () => managerApi.getManagerById(id!),
    enabled: !!id,
    ...options,
  });
};

export const useCreateManager = (
  options?: UseMutationOptions<TManager, Error, TCreateManager>
): ReturnType<typeof useMutation<TManager, Error, TCreateManager>> => {
  const queryClient = useQueryClient();
  return useMutation<TManager, Error, TCreateManager>({
    mutationFn: (data: TCreateManager) => managerApi.createManager(data),
    onSuccess: (newManager) => {
      queryClient.invalidateQueries({ queryKey: managersQueryKeys.lists() });
      queryClient.setQueryData(
        managersQueryKeys.detail(newManager.id),
        newManager
      );
    },
    ...options,
  });
};

export const useUpdateManager = (
  options?: UseMutationOptions<
    TManager,
    Error,
    { id: string; data: TUpdateManager }
  >
): ReturnType<
  typeof useMutation<TManager, Error, { id: string; data: TUpdateManager }>
> => {
  const queryClient = useQueryClient();
  return useMutation<TManager, Error, { id: string; data: TUpdateManager }>({
    mutationFn: ({ id, data }: { id: string; data: TUpdateManager }) =>
      managerApi.updateManager(id, data),
    onSuccess: (updatedManager, { id }) => {
      queryClient.invalidateQueries({ queryKey: managersQueryKeys.lists() });
      queryClient.setQueryData(managersQueryKeys.detail(id), updatedManager);
    },
    ...options,
  });
};
