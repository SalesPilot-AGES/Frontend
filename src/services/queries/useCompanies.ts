import { companyApi } from '@services/api/company';
import type {
  CompaniesResponse,
  Company,
  CompanyCreateInput,
  CompanyDetail,
  CompanyFilters,
  CompanyUpdateInput,
} from '@services/models/CompanySchema';
import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const companiesQueryKeys = {
  all: ['companies'] as const,
  lists: () => [...companiesQueryKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, filters?: CompanyFilters) =>
    [...companiesQueryKeys.lists(), { page, pageSize, filters }] as const,
  details: () => [...companiesQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...companiesQueryKeys.details(), id] as const,
};

/** Opções da query de listagem (dados sempre “stale” para refletir o GET ao entrar na tela). */
const getCompaniesListQueryOptions = (
  page: number = 0,
  size: number = 20,
  filters?: CompanyFilters
): Pick<
  UseQueryOptions<CompaniesResponse, Error>,
  'queryKey' | 'queryFn' | 'staleTime'
> => ({
  queryKey: companiesQueryKeys.list(page, size, filters),
  queryFn: (): Promise<CompaniesResponse> =>
    companyApi.getCompanies(page, size, filters),
  staleTime: 0,
});

// GET queries
export const useGetCompanies = (
  page: number = 0,
  size: number = 20,
  filters?: CompanyFilters,
  options?: UseQueryOptions<CompaniesResponse>
): ReturnType<typeof useQuery<CompaniesResponse, Error>> => {
  return useQuery<CompaniesResponse, Error>({
    ...getCompaniesListQueryOptions(page, size, filters),
    ...options,
  });
};

export const useGetCompanyById = (
  uuid: string | null,
  options?: UseQueryOptions<CompanyDetail>
): ReturnType<typeof useQuery<CompanyDetail, Error>> => {
  return useQuery<CompanyDetail, Error>({
    queryKey: companiesQueryKeys.detail(uuid || ''),
    queryFn: () => companyApi.getCompanyById(uuid!),
    enabled: !!uuid, // Only run query if uuid is provided
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

// POST mutation
export const useCreateCompany = (
  options?: UseMutationOptions<Company, Error, CompanyCreateInput>
): ReturnType<typeof useMutation<Company, Error, CompanyCreateInput>> => {
  const queryClient = useQueryClient();

  return useMutation<Company, Error, CompanyCreateInput>({
    mutationFn: companyApi.createCompany,
    onSuccess: (newCompany) => {
      // Invalidate and refetch companies list
      queryClient.invalidateQueries({
        queryKey: companiesQueryKeys.lists(),
      });
      // Add to cache
      queryClient.setQueryData(
        companiesQueryKeys.detail(newCompany.id),
        newCompany
      );
    },
    ...options,
  });
};

// PUT mutation
export const useUpdateCompany = (
  options?: UseMutationOptions<
    CompanyDetail,
    Error,
    { uuid: string; data: CompanyUpdateInput }
  >
): ReturnType<
  typeof useMutation<
    CompanyDetail,
    Error,
    { uuid: string; data: CompanyUpdateInput }
  >
> => {
  const queryClient = useQueryClient();

  return useMutation<
    CompanyDetail,
    Error,
    { uuid: string; data: CompanyUpdateInput }
  >({
    mutationFn: ({ uuid, data }) => companyApi.updateCompany(uuid, data),
    onSuccess: (updatedCompany) => {
      // Update cache
      queryClient.setQueryData(
        companiesQueryKeys.detail(updatedCompany.id),
        updatedCompany
      );
      // Invalidate list
      queryClient.invalidateQueries({
        queryKey: companiesQueryKeys.lists(),
      });
    },
    ...options,
  });
};
