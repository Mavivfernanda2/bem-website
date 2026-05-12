import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { toast } from 'sonner';
import type { ApiResponse, News, NewsInput } from '../types/api';

const QUERY_KEY = ['news'];

export function useGetNews() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<News[]>>('/news');
      return data.data;
    },
  });
}

export function useCreateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: NewsInput) => {
      const { data } = await api.post<ApiResponse<News>>('/news', input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Berita berhasil ditambahkan');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menambahkan berita');
    },
  });
}

export function useUpdateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: NewsInput & { id: string }) => {
      const { data } = await api.patch<ApiResponse<News>>(`/news/${id}`, input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Berita berhasil diperbarui');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal memperbarui berita');
    },
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/news/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Berita berhasil dihapus');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menghapus berita');
    },
  });
}
