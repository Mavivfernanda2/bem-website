import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { toast } from 'sonner';
import type { ApiResponse, Department, DepartmentInput } from '../types/api';

const QUERY_KEY = ['departments'];

// ============= QUERIES =============

export function useDepartments() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Department[]>>('/departments');
      return data.data;
    },
  });
}

export function useDepartment(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Department>>(`/departments/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

// ============= MUTATIONS =============

export function useCreateDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: DepartmentInput) => {
      const { data } = await api.post<ApiResponse<Department>>('/departments', input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Departemen berhasil ditambahkan');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menambahkan departemen');
    },
  });
}

export function useUpdateDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: DepartmentInput & { id: string }) => {
      const { data } = await api.patch<ApiResponse<Department>>(`/departments/${id}`, input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Departemen berhasil diperbarui');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal memperbarui departemen');
    },
  });
}

export function useDeleteDepartment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/departments/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Departemen berhasil dihapus');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menghapus departemen');
    },
  });
}
