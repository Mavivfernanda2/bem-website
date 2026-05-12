import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { toast } from 'sonner';
import type { ApiResponse, GalleryItem, GalleryItemInput } from '../types/api';

const QUERY_KEY = ['gallery'];

export function useGetGallery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<GalleryItem[]>>('/gallery');
      return data.data;
    },
  });
}

export function useCreateGallery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: GalleryItemInput) => {
      const { data } = await api.post<ApiResponse<GalleryItem>>('/gallery', input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Foto berhasil ditambahkan');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menambahkan foto');
    },
  });
}

export function useUpdateGallery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...input }: GalleryItemInput & { id: string }) => {
      const { data } = await api.patch<ApiResponse<GalleryItem>>(`/gallery/${id}`, input);
      return data.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Foto berhasil diperbarui');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal memperbarui foto');
    },
  });
}

export function useDeleteGallery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/gallery/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success('Foto berhasil dihapus');
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Gagal menghapus foto');
    },
  });
}
