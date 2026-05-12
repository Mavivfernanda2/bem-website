import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { toast } from 'sonner';
import type {
  ApiResponse,
  OrganizationMember,
  OrganizationMemberInput,
} from '../types/api';

const QUERY_KEY = ['organization'];

// ============= QUERIES =============

export function useGetOrganization() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<OrganizationMember[]>>('/organization');
      return data.data;
    },
  });
}

export function useGetOrganizationMember(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<OrganizationMember>>(`/organization/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

// ============= MUTATIONS =============

export function useCreateOrganizationMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: OrganizationMemberInput) => {
      const { data } = await api.post<ApiResponse<OrganizationMember>>('/organization', input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Pengurus berhasil ditambahkan');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menambahkan pengurus');
    },
  });
}

export function useUpdateOrganizationMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: OrganizationMemberInput & { id: string }) => {
      const { data } = await api.patch<ApiResponse<OrganizationMember>>(`/organization/${id}`, input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Pengurus berhasil diperbarui');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal memperbarui pengurus');
    },
  });
}

export function useDeleteOrganizationMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/organization/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Pengurus berhasil dihapus');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menghapus pengurus');
    },
  });
}
