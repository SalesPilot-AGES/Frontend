import { getErrorMessage } from '@services/api/errorHandler';
import { managerApi } from '@services/api/manager';
import { type ApiMutationResponse } from '@services/api/responseMessage';
import type {
  TManager,
  TManagerCreatePayload,
  TManagerFilters,
  TManagerList,
  TManagerUpdatePayload,
} from '@services/models/ManagerSchema';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useToast } from '@UI/Toast/useToast';

/**
 * @description Query keys for managers.
 * @property {string[]} all - All managers.
 * @property {function} lists - All managers lists.
 * @property {function} list - A specific managers list with pagination and filters.
 * @property {function} details - All manager details.
 * @property {function} detail - A specific manager detail by id.
 */
export const managerQueryKeys = {
  all: ['managers'] as const,
  lists: () => [...managerQueryKeys.all, 'list'] as const,
  list: (page: number, size: number, filters: TManagerFilters) =>
    [...managerQueryKeys.lists(), { page, size, filters }] as const,
  details: () => [...managerQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...managerQueryKeys.details(), id] as const,
};

/**
 * @description A helper function to get query options for the managers list query.
 * @param {number} page - The page number to fetch.
 * @param {number} size - The number of items per page.
 * @param {TManagerFilters} filters - Filters to apply to the query.
 * @returns {Pick<UseQueryOptions<TManagerList, Error>, 'queryKey' | 'queryFn' | 'staleTime' | 'enabled'>} The query options.
 */
const getManagersListQueryOptions = (
  page: number = 0,
  size: number = 20,
  filters: TManagerFilters
): Pick<
  UseQueryOptions<TManagerList, Error>,
  'queryKey' | 'queryFn' | 'staleTime' | 'enabled'
> => ({
  queryKey: managerQueryKeys.list(page, size, filters),
  queryFn: (): Promise<TManagerList> =>
    managerApi.getManagers(page, size, filters),
  staleTime: 0,
});

/**
 * @description A query to get a paginated and filtered list of managers.
 * @param {number} page - The page number to fetch.
 * @param {number} size - The number of items per page.
 * @param {TManagerFilters} filters - Filters to apply to the query.
 * @param {UseQueryOptions<TManagerList>} options - Additional query options.
 * @returns {ReturnType<typeof useQuery<TManagerList, Error>>} The query result.
 */
export const useGetManagers = (
  page: number = 0,
  size: number = 20,
  filters: TManagerFilters,
  options?: UseQueryOptions<TManagerList>
): ReturnType<typeof useQuery<TManagerList, Error>> => {
  return useQuery<TManagerList, Error>({
    ...getManagersListQueryOptions(page, size, filters),
    ...options,
  });
};

/**
 * @description A query to get a manager by its ID.
 * @param {string | null} uuid - The ID of the manager to fetch.
 * @param {UseQueryOptions<TManager>} options - Additional query options.
 * @returns {ReturnType<typeof useQuery<TManager, Error>>} The query result.
 */
export const useGetManagerById = (
  uuid: string | null,
  options?: UseQueryOptions<TManager>
): ReturnType<typeof useQuery<TManager, Error>> => {
  return useQuery<TManager, Error>({
    queryKey: managerQueryKeys.detail(uuid || ''),
    queryFn: () => managerApi.getManagerById(uuid!),
    enabled: !!uuid, // Only run query if uuid is provided
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * @description A query to get all managers with infinite scrolling.
 * @param {TManagerFilters} filters - Filters to apply to the query.
 * @returns {ReturnType<typeof useInfiniteQuery<TManagerList, Error>>} The query result.
 */
export const useGetAllManagers = (
  filters: TManagerFilters
): ReturnType<typeof useInfiniteQuery<TManagerList, Error>> => {
  return useInfiniteQuery<TManagerList, Error>({
    queryKey: [...managerQueryKeys.lists(), 'infinite', { filters }],
    queryFn: ({ pageParam = 0 }) =>
      managerApi.getManagers(pageParam as number, 20, filters),
    getNextPageParam: (lastPage) => {
      if (lastPage.number < lastPage.total_pages - 1) {
        return lastPage.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });
};

/**
 * @description A mutation to create a new manager.
 * @param {UseMutationOptions<TManager, Error, TManagerCreatePayload>} options - Mutation options.
 * @returns {ReturnType<typeof useMutation<TManager, Error, TManagerCreatePayload>>} The mutation result.
 */
export const useCreateManager = (
  options?: UseMutationOptions<
    ApiMutationResponse<TManager>,
    Error,
    TManagerCreatePayload
  >
): ReturnType<
  typeof useMutation<
    ApiMutationResponse<TManager>,
    Error,
    TManagerCreatePayload
  >
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    ApiMutationResponse<TManager>,
    Error,
    TManagerCreatePayload
  >({
    ...options,
    mutationFn: managerApi.createManager,
    onSuccess: (newManager, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: managerQueryKeys.lists() });
      queryClient.setQueryData(
        managerQueryKeys.detail(newManager.content.id),
        newManager.content
      );
      showToast(newManager.message ?? 'Gerente criado com sucesso', 'success');
      options?.onSuccess?.(newManager, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      showToast(getErrorMessage(error), 'error');
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
};

/**
 * @description A mutation to update an existing manager.
 * @param {UseMutationOptions<TManager, Error, { uuid: string; data: TManagerUpdatePayload }>} options - Mutation options.
 * @returns {ReturnType<typeof useMutation<TManager, Error, { uuid: string; data: TManagerUpdatePayload }>>} The mutation result.
 */
export const useUpdateManager = (
  options?: UseMutationOptions<
    ApiMutationResponse<TManager>,
    Error,
    { uuid: string; data: TManagerUpdatePayload }
  >
): ReturnType<
  typeof useMutation<
    ApiMutationResponse<TManager>,
    Error,
    { uuid: string; data: TManagerUpdatePayload }
  >
> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation<
    ApiMutationResponse<TManager>,
    Error,
    { uuid: string; data: TManagerUpdatePayload }
  >({
    ...options,
    mutationFn: ({ uuid, data }) => managerApi.updateManager(uuid, data),
    onSuccess: (updatedManager, variables, onMutateResult, context) => {
      queryClient.setQueryData(
        managerQueryKeys.detail(updatedManager.content.id),
        updatedManager.content
      );
      queryClient.invalidateQueries({ queryKey: managerQueryKeys.lists() });
      showToast(
        updatedManager.message ?? 'Gerente atualizado com sucesso',
        'success'
      );
      options?.onSuccess?.(updatedManager, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      showToast(getErrorMessage(error), 'error');
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
};
