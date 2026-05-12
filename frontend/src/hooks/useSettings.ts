import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { toast } from 'sonner';
import type { ApiResponse } from '../types/api';

const QUERY_KEY = ['settings'];

export function useGetSettings() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<Record<string, string>>>('/settings');
      return data.data;
    },
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Record<string, string | boolean>) => {
      const { data } = await api.post<ApiResponse<Record<string, string>>>('/settings', input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Pengaturan berhasil disimpan');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menyimpan pengaturan');
    },
  });
}
