import { companyApi } from '@services/api/company';
import type {
  TCompany,
  TCompanyCreatePayload,
  TCompanyFilters,
  TCompanyList,
  TCompanyUpdatePayload,
} from '@services/models/CompanySchema';
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

/**
 * @description Query keys for companies.
 * @property {string[]} all - All companies.
 * @property {function} lists - All companies lists.
 * @property {function} list - A specific companies list with pagination and filters.
 * @property {function} details - All company details.
 * @property {function} detail - A specific company detail by id.
 */
export const companyQueryKeys = {
  all: ['companies'] as const,
  lists: () => [...companyQueryKeys.all, 'list'] as const,
  list: (page: number, size: number, filters?: TCompanyFilters) =>
    [...companyQueryKeys.lists(), { page, size, filters }] as const,
  details: () => [...companyQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...companyQueryKeys.details(), id] as const,
};

/**
 * @description A helper function to get query options for the companies list query.
 * @param {number} page - The page number to fetch.
 * @param {number} size - The number of items per page.
 * @param {TCompanyFilters} filters - Filters to apply to the query.
 * @returns {Pick<UseQueryOptions<TCompanyList, Error>, 'queryKey' | 'queryFn' | 'staleTime'>} The query options.
 */
const getCompaniesListQueryOptions = (
  page: number = 0,
  size: number = 20,
  filters?: TCompanyFilters
): Pick<
  UseQueryOptions<TCompanyList, Error>,
  'queryKey' | 'queryFn' | 'staleTime'
> => ({
  queryKey: companyQueryKeys.list(page, size, filters),
  queryFn: (): Promise<TCompanyList> =>
    companyApi.getCompanies(page, size, filters),
  staleTime: 0,
});

/**
 * @description A query to get a paginated and filtered list of companies.
 * @param {number} page - The page number to fetch.
 * @param {number} size - The number of items per page.
 * @param {TCompanyFilters} filters - Filters to apply to the query.
 * @param {UseQueryOptions<TCompanyList>} options - Additional query options.
 * @returns {ReturnType<typeof useQuery<TCompanyList, Error>>} The query result.
 */
export const useGetCompanies = (
  page: number = 0,
  size: number = 20,
  filters?: TCompanyFilters,
  options?: UseQueryOptions<TCompanyList>
): ReturnType<typeof useQuery<TCompanyList, Error>> => {
  return useQuery<TCompanyList, Error>({
    ...getCompaniesListQueryOptions(page, size, filters),
    ...options,
  });
};

/**
 * @description A query to get a company by its ID.
 * @param {string | null} uuid - The ID of the company to fetch.
 * @param {UseQueryOptions<TCompany>} options - Additional query options.
 * @returns {ReturnType<typeof useQuery<TCompany, Error>>} The query result.
 */
export const useGetCompanyById = (
  uuid: string | null,
  options?: UseQueryOptions<TCompany>
): ReturnType<typeof useQuery<TCompany, Error>> => {
  return useQuery<TCompany, Error>({
    queryKey: companyQueryKeys.detail(uuid || ''),
    queryFn: () => companyApi.getCompanyById(uuid!),
    enabled: !!uuid, // Only run query if uuid is provided
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

/**
 * @description A query to get all companies with infinite scrolling.
 * @param {TCompanyFilters} filters - Filters to apply to the query.
 * @returns {ReturnType<typeof useInfiniteQuery<TCompanyList, Error>>} The query result.
 */
export const useGetAllCompanies = (
  size: number = 20,
  filters?: TCompanyFilters
): ReturnType<typeof useInfiniteQuery<TCompanyList, Error>> => {
  return useInfiniteQuery<TCompanyList, Error>({
    queryKey: [...companyQueryKeys.lists(), 'infinite', { size, filters }],
    queryFn: ({ pageParam = 0 }) =>
      companyApi.getCompanies(pageParam as number, size, filters),
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
 * @description A mutation to create a new company.
 * @param {UseMutationOptions<TCompany, Error, TCompanyCreatePayload>} options - Mutation options.
 * @returns {ReturnType<typeof useMutation<TCompany, Error, TCompanyCreatePayload>>} The mutation result.
 */
export const useCreateCompany = (
  options?: UseMutationOptions<TCompany, Error, TCompanyCreatePayload>
): ReturnType<typeof useMutation<TCompany, Error, TCompanyCreatePayload>> => {
  const queryClient = useQueryClient();

  return useMutation<TCompany, Error, TCompanyCreatePayload>({
    ...options,
    mutationFn: companyApi.createCompany,
    onSuccess: (newCompany, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() });
      queryClient.setQueryData(
        companyQueryKeys.detail(newCompany.id),
        newCompany
      );
      options?.onSuccess?.(newCompany, variables, onMutateResult, context);
    },
  });
};

/**
 * @description A mutation to update an existing company.
 * @param {UseMutationOptions<TCompany, Error, { uuid: string; data: TCompanyUpdatePayload }>} options - Mutation options.
 * @returns {ReturnType<typeof useMutation<TCompany, Error, { uuid: string; data: TCompanyUpdatePayload }>>} The mutation result.
 */
export const useUpdateCompany = (
  options?: UseMutationOptions<
    TCompany,
    Error,
    { uuid: string; data: TCompanyUpdatePayload }
  >
): ReturnType<
  typeof useMutation<
    TCompany,
    Error,
    { uuid: string; data: TCompanyUpdatePayload }
  >
> => {
  const queryClient = useQueryClient();

  return useMutation<
    TCompany,
    Error,
    { uuid: string; data: TCompanyUpdatePayload }
  >({
    ...options,
    mutationFn: ({ uuid, data }) => companyApi.updateCompany(uuid, data),
    onSuccess: (updatedCompany, variables, onMutateResult, context) => {
      queryClient.setQueryData(
        companyQueryKeys.detail(updatedCompany.id),
        updatedCompany
      );
      queryClient.invalidateQueries({ queryKey: companyQueryKeys.lists() });
      options?.onSuccess?.(updatedCompany, variables, onMutateResult, context);
    },
  });
};
