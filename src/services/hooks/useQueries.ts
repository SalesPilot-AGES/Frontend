// import { useMutation, useQuery } from '@tanstack/react-query';
// import { apiClient } from '../utils/apiClient';

// Example: Fetch companies
/*
export interface Company {
  id: string;
  name: string;
  // ... other fields
}

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => apiClient.get<Company[]>('/companies'),
  });
};

// Example: Create a company
export const useCreateCompany = () => {
  return useMutation({
    mutationFn: (data: Omit<Company, 'id'>) =>
      apiClient.post<Company>('/companies', data),
    // Optionally invalidate queries after success
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['companies'] });
    // },
  });
};

// Example: Update a company
export const useUpdateCompany = () => {
  return useMutation({
    mutationFn: ({ id, ...data }: Company) =>
      apiClient.put<Company>(`/companies/${id}`, data),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['companies'] });
    // },
  });
};

// Example: Delete a company
export const useDeleteCompany = () => {
  return useMutation({
    mutationFn: (id: string) =>
      apiClient.delete<void>(`/companies/${id}`),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['companies'] });
    // },
  });
};
*/
